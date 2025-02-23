import os
from fastapi import FastAPI
from pymongo import MongoClient

app = FastAPI()

# Read MongoDB URI from environment variable
MONGO_URI = os.getenv("MONGO_URI", "mongodb://mongo:FEbHVqzLCTpeDSxLvKWAYXzZqiMMiCBw@maglev.proxy.rlwy.net:52256")  # Fallback to hardcoded if not set

client = MongoClient(MONGO_URI)
database = client.Tracker
collection = database.Symptoms
users_collection = database.Users

@app.on_event("startup")
async def startup_db():
    # Test the connection by fetching a document (optional)
    sample_document = collection.find_one()
    if sample_document:
        print("MongoDB connected successfully")
    else:
        print("Failed to connect to MongoDB")

@app.on_event("shutdown")
def shutdown_db():
    client.close()

@app.get("/")
async def read_root():
    # You can interact with your collections here
    user = users_collection.find_one({"username": "example"})
    return {"message": "MongoDB connected!", "user": user}

