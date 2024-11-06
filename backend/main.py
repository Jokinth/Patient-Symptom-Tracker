from datetime import datetime
from pydantic import BaseModel, EmailStr
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from passlib.context import CryptContext
from dataBase import collection, users_collection  

app = FastAPI()

origins = [
    "http://localhost:3000",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],  
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Pydantic model for symptoms
class Symptom(BaseModel):
    name: str
    severity: int

# User model for signup and login
class User(BaseModel):
    name: str
    email: EmailStr
    password: str

# Signup request model
class UserSignup(BaseModel):
    name: str
    email: EmailStr
    password: str

# Login request model
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Helper function to convert MongoDB ObjectId to string, including date
def symptom_serializer(symptom) -> dict:
    return {
        "id": str(symptom["_id"]),
        "name": symptom["name"],
        "severity": symptom["severity"],
        "date": symptom["date"]
    }

# Add a symptom with current date
@app.post("/symptoms/")
async def add_symptom(symptom: Symptom):
    symptom_data = symptom.dict()
    symptom_data["date"] = datetime.utcnow().strftime("%d-%m-%Y")
    result = collection.insert_one(symptom_data)
    return {"msg": "Symptom logged successfully", "symptom_id": str(result.inserted_id)}

# Get all symptoms
@app.get("/symptoms/")
async def get_symptoms():
    symptoms = collection.find()  
    return [symptom_serializer(symptom) for symptom in symptoms]

# Password hashing functions
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# User signup endpoint
@app.post("/signup/")
async def signup(user: UserSignup):
    # Check if user already exists
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash the password
    hashed_password = hash_password(user.password)
    user_data = {
        "name": user.name,
        "email": user.email,
        "password": hashed_password,
    }

    # Insert the user data
    result = users_collection.insert_one(user_data)
    return {"msg": "User created successfully", "user_id": str(result.inserted_id)}

# User login endpoint
@app.post("/login/")
async def login(user: UserLogin):
    # Find the user by email
    db_user = users_collection.find_one({"email": user.email})
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    # Verify the password
    if not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    return {"msg": "Login successful", "user_id": str(db_user["_id"])}
