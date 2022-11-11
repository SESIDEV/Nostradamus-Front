from flask import Blueprint, render_template
from flask_cors import CORS

main = Blueprint('home', __name__, template_folder='templates')
CORS(main) # MUDAR DEPOIS

@main.route("/")
def index():
    return render_template("content/index.html")

@main.route("/search")
def busca():
    return render_template("content/search.html")

@main.route("/search-restore")
def recuperarBusca():
    return render_template("content/search-restore.html")

@main.route("/result")
def resultado():
    return render_template("content/result.html")
