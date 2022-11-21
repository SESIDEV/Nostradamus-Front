from flask import Flask
from templates.content.main import main
from flask_cors import CORS


app = Flask(__name__)
CORS(app) # MUDAR DEPOIS
app.register_blueprint(main)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
