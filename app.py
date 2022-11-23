from flask import Flask
from templates.content.main import main

app = Flask(__name__)

app.register_blueprint(main)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
