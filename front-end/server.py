from flask import Flask
from flask import request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def confirm():
    return "<p>Running flask backend!</p>"

# command to turn on flask server: flask --app server run --debug

@app.route("/api/entries", methods=['GET', 'POST'])
def access_request():
    data = request.get_json()
    print(data)
    return "<p> Recieved input data!</p>"