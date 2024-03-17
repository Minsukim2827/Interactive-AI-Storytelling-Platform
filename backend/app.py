from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # This will enable CORS for all routes

@app.route('/api/hello')
def hello():
    return jsonify({'message': 'Hello, world!'})

if __name__ == '__main__':
    app.run(debug=True)
