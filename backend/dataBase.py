from pymongo import MongoClient


MONGO_DETAILS = "mongodb://mongo:FEbHVqzLCTpeDSxLvKWAYXzZqiMMiCBw@maglev.proxy.rlwy.net:52256"

client = MongoClient(MONGO_DETAILS)
database = client.Tracker
collection = database.Symptoms
users_collection = database.Users
