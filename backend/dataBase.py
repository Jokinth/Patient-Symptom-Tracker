from pymongo import MongoClient

# Replace with your actual MongoDB URI from Railway
MONGODB_URI = "mongodb://mongo:FEbHVqzLCTpeDSxLvKWAYXzZqiMMiCBw@maglev.proxy.rlwy.net:52256"

client = MongoClient(MONGODB_URI)
db = client.get_database()  # You can specify the name of the database here
users_collection = db.users  # Example collection
