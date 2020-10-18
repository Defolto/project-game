from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from pymongo import MongoClient

client = MongoClient("mongodb+srv://test:952863mak@cluster0-ainc3.mongodb.net/<dbname>?retryWrites=true&w=majority")
db = client.get_database("student_db")
records = db.student_records

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
CORS(app)

# Создание нового документа
def insert_document(collection, data):
    return collection.insert_one(data).inserted_id

# Обновление документа
def update_document(collection, query_elements, new_values):
    collection.update_one(query_elements, {'$set': new_values})

# Удаление документа
def delete_document(collection, query):
    collection.delete_one(query)

# Вход в аккаунт
@app.route("/login", methods=['POST'])
def login():
    newData = request.json
    print(newData)
    akk = records.find_one({"email": newData.get("user_email"), "password": newData.get("user_password")}, {"_id": 0})
    if akk:
       pass
    else:
        akk = False
    return jsonify(akk)

# Регистрация аккаунта
@app.route("/register", methods=['POST'])
def register():
    newData = request.json
    print(newData)

    check = records.find_one({"email": newData.get("user_email")}, {"_id": 0})
    if check:
        return False

    new_akk ={
        "email": newData.get("user_email"),
        "password": newData.get("user_password"),
        "radius": 1,
        "evol": 0,
        "growPx": 0,
        "growEvol": 0,
        "color": "#000"
    }
    akk = insert_document(records, new_akk)
    print(akk)

    if akk:
       pass
    else:
        akk = False
    return jsonify(akk)

@app.route("/getInfo", methods=['POST'])
def getInfo():
    newData = request.json
    print(newData)
    akk = records.find_one({"email": newData.get("user_email")}, {"_id": 0})
    return jsonify(akk)