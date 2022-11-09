from flask import Blueprint, render_template, request
# from controllers.busca import efetuarBusca


main = Blueprint('home', __name__, template_folder='templates')


@main.route("/")
def index():
    return render_template("content/index.html")


@main.route("/search")
def busca():
    bases = ["springerlink", "sciencedirect"]
    bases_selecionadas = list()
    termo = request.args.get("search")
    busca_rapida = request.args.get("busca-rapida")

    for base in bases:
        if request.args.get(base):
            bases_selecionadas.append(base)

    if termo != None and termo != "":
        # resultados = efetuarBusca(termo, busca_rapida, bases_selecionadas) # RETORNA UMA TUPLA (resultado_ngramas, artigos_em_string_json)
        # return render_template("content/result.html", termo=termo, resultados_ngramas=resultados[0], dados_das_buscas=resultados[1], total_assuntos=resultados[2], total_anos=resultados[3])
        return render_template("content/result.html")
    else:
        return render_template("content/search.html")


@main.route("/result")
def resultado():
    return render_template("content/search.html")
