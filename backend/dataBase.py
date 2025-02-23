from pymongo import MongoClient

# Replace with your actual MongoDB URI from Railway
MONGODB_URI = "mongodb+srv://<username>:<password>@cluster0.mongodb.net/test?retryWrites=true&w=majority"

client = MongoClient(MONGODB_URI)
db = client.get_database()  # You can specify the name of the database here
users_collection = db.users  # Example collection
