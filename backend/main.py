from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import threading
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

# Установка интервала
def set_interval(func, sec):
    def func_wrapper():
        set_interval(func, sec)
        func()
    t = threading.Timer(sec, func_wrapper)
    t.start()
    return t

# Получение эвол за час
def getEvol():
    akks = list(records.find({}, {"_id": 0}))
    for akk in akks:
        update_document(records, {"email": akk.get("email")}, {"evol": round((akk.get("evol")+akk.get("growEvol")), 2)})

# Получение эвол за час
def getPx():
    akks = list(records.find({}, {"_id": 0}))
    for akk in akks:
        update_document(records, {"email": akk.get("email")}, {"radius": round((akk.get("radius")+akk.get("growPx")), 2)})

# set_interval(getEvol(), 3600)
# set_interval(getPx(), 3600)

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
        "radius": 8,
        "evol": 0,
        "growPx": 0,
        "growEvol": 0,
        "evolClick": 1,
        "color": "#000"
    }
    akk = insert_document(records, new_akk)
    thisAkk = records.find_one({"_id": akk}, {"_id": 0})
    print(thisAkk)
    if akk:
       pass
    else:
        akk = False
    return jsonify(thisAkk)

@app.route("/getInfo", methods=['POST'])
def getInfo():
    newData = request.json
    print(newData)
    akk = records.find_one({"email": newData.get("user_email")}, {"_id": 0})
    return jsonify(akk)

@app.route("/upgrade", methods=['POST'])
def upgrade():
    newData = request.json
    print(newData)
    type = newData.get("user_type")
    if type == "growEvol":
        update_document(records, {"email": newData.get("user_email")}, {"growEvol": newData.get("user_newType"), "evol": newData.get("user_evol")})
    elif type == "evolClick":
        update_document(records, {"email": newData.get("user_email")}, {"evolClick": newData.get("user_newType"), "evol": newData.get("user_evol")})
    else:
        update_document(records, {"email": newData.get("user_email")}, {"growPx": newData.get("user_newType"), "evol": newData.get("user_evol")})
    return jsonify("okay")

@app.route("/click", methods=['POST'])
def click():
    newData = request.json
    update_document(records, {"email": newData.get("user_email")}, {"evol": newData.get("user_evol")})
    getPx()
    return jsonify("okay")

@app.route("/changeColor", methods=['POST'])
def changeColor():
    newData = request.json
    update_document(records, {"email": newData.get("user_email")}, {"color": newData.get("user_color")})
    getPx()
    return jsonify("okay")