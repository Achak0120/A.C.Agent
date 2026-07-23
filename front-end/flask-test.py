from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def confirm():
    return "<p>Running flask backend!</p>"

# command to turn on flask server: flask --app flask-test run --debug
