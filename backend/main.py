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

# @app.route("/", methods=['GET'])
# @app.route("/index", methods=['GET'])
# def main_page():
#     list1 = list(records.find({}, {"_id": 0}))
#     return jsonify(list1)

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
    akk = records.find_one({"email": newData.get("user_email"), "password": newData.get("user_password")}, {"_id": 0})
    if akk:
       pass
    else:
        akk = False
    return jsonify(akk)

@app.route("/add", methods=['POST'])
def add():
    newData = request.json
    new_show = {
        "name": newData.get("user_name"),
        "password": newData.get("user_password")
    }
    print(insert_document(records, new_show))
    return jsonify("акк создан")