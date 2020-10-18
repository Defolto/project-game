from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from pymongo import MongoClient

client = MongoClient("mongodb+srv://test:952863mak@cluster0-ainc3.mongodb.net/<dbname>?retryWrites=true&w=majority")
db = client.get_database("student_db")
records = db.student_records

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
CORS(app)

def insert_document(collection, data):
    """ Function to insert a document into a collection and
    return the document's id.
    """
    return collection.insert_one(data).inserted_id

@app.route("/", methods=['GET'])
@app.route("/index", methods=['GET'])
def main_page():
    list1 = list(records.find({}, {"_id": 0}))
    return jsonify(list1)

@app.route("/login", methods=['POST'])
def login():
    newData = request.json
    print(newData)
    akk = records.find_one({"name": newData.get("user_name"), "password": newData.get("user_password")}, {"_id": 0, "info": 1})
    if akk:
       pass
    else:
        akk = "Пользователь не найден"
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