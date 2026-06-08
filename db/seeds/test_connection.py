import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

client = MongoClient(os.getenv("MONGODB_URI"))
db = client[os.getenv("DB_NAME")]

# Это создаст тестовый документ, а затем удалит его
db.connection_test.insert_one({"message": "KOYASH DB is alive"})
doc = db.connection_test.find_one({"message": "KOYASH DB is alive"})
print("Connection successful:", doc)
db.connection_test.drop()

client.close()