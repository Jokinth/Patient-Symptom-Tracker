from pymongo import MongoClient

# MongoDB URI with database name in the connection string
MONGODB_URI = 'mongodb://mongo:FEbHVqzLCTpeDSxLvKWAYXzZqiMMiCBw@maglev.proxy.rlwy.net:52256/my_database'

client = MongoClient(MONGODB_URI)
db = client['my_database']  # Use the database name here

# Now you can access collections
collection = db['your_collection_name']
users_collection = db['users']
