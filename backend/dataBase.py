from pymongo import MongoClient


MONGO_DETAILS = "mongodb://127.0.0.1:27017"

client = MongoClient(MONGO_DETAILS)
database = client.Tracker
collection = database.Symptoms
users_collection = database.Users
