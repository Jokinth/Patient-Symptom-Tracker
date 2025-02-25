from datetime import datetime, timedelta
from pydantic import BaseModel, EmailStr, Field
from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from passlib.context import CryptContext
from dataBase import collection, users_collection
from bson import ObjectId  # To handle MongoDB ObjectIds
import jwt
from fastapi.security import OAuth2PasswordBearer
from typing import Optional

# Constants for JWT
SECRET_KEY = "25"  
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

app = FastAPI()

# Add CORSMiddleware to handle CORS for preflight requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ✅ Replace with your actual frontend URL
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # ✅ Explicitly allow necessary methods
    allow_headers=["Authorization", "Content-Type", "Accept"],  # ✅ Ensure valid headers
    expose_headers=["Authorization", "Content-Type"],  # ✅ Expose headers if needed
)

# Custom CORS middleware to add Access-Control headers
@app.middleware("http")
async def add_cors_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["Access-Control-Allow-Origin"] = "https://patient-symptom-tracker.vercel.app"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type, Accept"
    return response

@app.options("/{full_path:path}")
async def preflight_handler(full_path: str):
    return JSONResponse(
        content={},
        headers={
            "Access-Control-Allow-Origin": "https://patient-symptom-tracker.vercel.app",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Authorization, Content-Type, Accept",
            "Access-Control-Max-Age": "86400",  # Cache preflight response for 24 hours
        },
    )

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# OAuth2 Password Bearer for JWT
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# Pydantic models
class Symptom(BaseModel):
    name: str
    severity: int
    user_id: str = Field(..., description="ID of the user who logged the symptom")

class User(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserSignup(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Helper function to serialize symptoms
def symptom_serializer(symptom) -> dict:
    return {
        "id": str(symptom["_id"]),
        "name": symptom["name"],
        "severity": symptom["severity"],
        "date": symptom["date"],
        "user_id": symptom["user_id"]
    }

# JWT Token Utilities
def create_access_token(data: dict, expires_delta: timedelta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

def get_current_user(token: str = Depends(oauth2_scheme)):
    return verify_token(token)

# Password hashing functions
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# Add a symptom for a specific user
@app.post("/symptoms/")
async def add_symptom(symptom: Symptom, current_user: dict = Depends(get_current_user)):
    symptom_data = symptom.dict()
    symptom_data["user_id"] = current_user["user_id"]  # Ensure the logged-in user is associated with the symptom
    symptom_data["date"] = datetime.utcnow().strftime("%d-%m-%Y")
    result = collection.insert_one(symptom_data)
    return {"msg": "Symptom logged successfully", "symptom_id": str(result.inserted_id)}

# Get symptoms for a specific user
@app.get("/symptoms/")
async def get_symptoms(current_user: dict = Depends(get_current_user)):
    symptoms = collection.find({"user_id": current_user["user_id"]})
    return [symptom_serializer(symptom) for symptom in symptoms]

# User signup endpoint
@app.post("/signup/")
async def signup(user: UserSignup):
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = hash_password(user.password)
    user_data = {
        "name": user.name,
        "email": user.email,
        "password": hashed_password,
    }

    result = users_collection.insert_one(user_data)
    return {"msg": "User created successfully", "user_id": str(result.inserted_id)}

# User login endpoint
@app.post("/login/")
async def login(user: UserLogin):
    db_user = users_collection.find_one({"email": user.email})
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    if not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    access_token = create_access_token(data={"user_id": str(db_user["_id"])})

    return {"access_token": access_token, "token_type": "bearer"}
