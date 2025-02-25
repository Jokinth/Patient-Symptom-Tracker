from pymongo import MongoClient

# MongoDB URI with database name in the connection string
MONGODB_URI = 'mongodb://mongo:FEbHVqzLCTpeDSxLvKWAYXzZqiMMiCBw@maglev.proxy.rlwy.net:52256'

client = MongoClient(MONGODB_URI)
db = client['my_database']  # Use the database name here

# Define collections
collection = db['symptoms']
users_collection = db['users']
