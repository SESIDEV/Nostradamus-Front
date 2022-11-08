from flask import Blueprint, render_template, request
from controllers.busca import efetuarBusca


main = Blueprint('home', __name__, template_folder='templates')


@main.route("/")
def index():
    return render_template("content/index.html")


@main.route("/search")
def busca():
    termo = request.args.get("search")

    if termo != None and termo != "":
        return render_template("content/result.html")
    else:
        return render_template("content/search.html")


@main.route("/result")
def resultado():
    return render_template("content/search.html")
