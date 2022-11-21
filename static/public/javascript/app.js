let dadosTreemap; // Temporário para popular o treemap de termos
let modalBuscaPendente; // Variável para o modal da busca pendente


function popularPainelAnos(dados) {
  let locationAno = document.querySelector("#location-anos")
  let buttonAno = document.createElement("button")
  let spanNumero = document.createElement("span")

  let idx = 0;
  dados['total_anos'].forEach((ano) => {
    buttonAno.setAttribute("type", "button")
    buttonAno.classList.add("btn", "btn-warning", "position-relative", "mt-3", "mx-2", "p-1")
    buttonAno.setAttribute("style", "font-size: 15px")
    buttonAno.innerHTML = parseInt(ano[0])
    buttonAno.setAttribute("id", "id-button-" + idx)

    spanNumero.classList.add("position-absolute", "top-0", "start-100", "translate-middle", "badge", "rounded-pill", "bg-danger")
    spanNumero.innerHTML = ano[1]

    buttonAno.innerHTML += spanNumero.outerHTML

    locationAno.append(buttonAno)
    idx++
  })
}

function popularPainelNgramas(dados) { // Verificar funcionamento
  let locationNgramas = document.querySelector("#local-ngramas")
  let buttonNgrama;
  let spanNgrama = document.createElement("span")
  let spanQtdNgrama = document.createElement("span")

  let idx = 0;
  dados['resultado_ngramas'].forEach((nGrama) => {
    //console.log(elem, buttonNgrama)
    buttonNgrama = document.createElement("button")
    buttonNgrama.setAttribute("type", "button")
    buttonNgrama.classList.add("btn", "btn-warning", "position-relative","mt-3","mx-2","p-1")
    buttonNgrama.setAttribute("style", "font-size: 15px")
    buttonNgrama.setAttribute("id", "id-ngrama-" + idx)
    buttonNgrama.setAttribute("draggable", "true")
    buttonNgrama.setAttribute("ondragstart", "drag(event)")

    spanNgrama.innerHTML = nGrama[0][0] + " " + nGrama[0][1]

    spanQtdNgrama.classList.add("position-absolute", "top-0", "start-100", "translate-middle", "badge", "rounded-pill", "bg-light", "text-dark")
    spanQtdNgrama.innerHTML = nGrama[1]

    buttonNgrama.innerHTML += spanNgrama.outerHTML
    buttonNgrama.innerHTML += spanQtdNgrama.outerHTML

    locationNgramas.append(buttonNgrama)
    idx++
  })
}

function popularPainelSubjects(dados) {
  let locationSubjects = document.querySelector("#local-subjects")
  let buttonSubject;
  let spanSubject = document.createElement("span")
  let spanQtdSubject = document.createElement("span")

  let idx = 0;
  dados['total_assuntos'].forEach((assunto) => {
    buttonSubject = document.createElement("button")
    buttonSubject.setAttribute("type", "button")
    buttonSubject.classList.add("btn", "btn-light", "position-relative", "mt-3", "mx-2", "p-1")
    buttonSubject.setAttribute("style", "font-size: 15px")
    buttonSubject.setAttribute("id", "id-subject-" + idx)
    buttonSubject.setAttribute("draggable", "true")
    buttonSubject.setAttribute("ondragstart", "drag(event)")

    spanSubject.innerHTML = assunto[0] // TODO: Verificar conteúdo e atribuir de acordo com a var assunto

    spanQtdSubject.classList.add("position-absolute", "top-0", "start-100", "translate-middle", "badge", "rounded-pill", "bg-warning", "text-dark")
    spanQtdSubject.innerHTML = assunto[1] // TODO: Verificar conteúdo...

    buttonSubject.innerHTML += spanSubject.outerHTML
    buttonSubject.innerHTML += spanQtdSubject.outerHTML

    locationSubjects.append(buttonSubject)
    idx++
  }) 

  // {# {% for assunto in total_assuntos %}
  //         <button type="button" class="btn btn-light position-relative mt-3 mx-2 p-1" style="font-size: 15px"
  //           id="assunto_{{loop.index}}" draggable="true" ondragstart="drag(event)">
  //           {{ assunto[0] }}
  //           <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
  //             {{ assunto[1] }}
  //           </span>
  //         </button>
  //         {% endfor %} #}
  //       </div>
}

//Efeito Máquina de escrever
function typeWrite(elemento) {
  const textoArray = elemento.innerHTML.split("")
  elemento.innerHTML = " "
  textoArray.forEach(function (letra, i) {
    setTimeout(function () {
      elemento.innerHTML += letra
    }, 150 * i)
  })
}

try {
  const titulo = document.querySelector(".titulo-principal")
  window.onload = typeWrite(titulo)
} catch {
  console.log("Título Principal não está disponível ou alcançável...\nVocê abriu esta página diretamente?")
}

//PréLoader
function show_anything(evento) {
  let valor_input = document.querySelector("#id-search")
  let pre_loader = document.querySelector("#preloader")
  let alerta = document.querySelector("#alerta")
  let springerlink = document.querySelector("#id-springerlink").checked
  let sciencedirect = document.querySelector("#id-sciencedirect").checked
  const div_mensagem = document.querySelector("#alerta-mensagem")

  if (valor_input.value == "") {
    evento.preventDefault()
    alerta.classList.remove("hidden-anything")
    alerta.classList.add("show-anything")
    div_mensagem.innerHTML = `É necessário informar algum termo no campo de busca, exemplo: <strong>Technology</strong>`
  } else if ((springerlink == false || springerlink == null) && (sciencedirect == false || sciencedirect == null)) {
    evento.preventDefault()
    alerta.classList.remove("hidden-anything")
    alerta.classList.add("show-anything")
    div_mensagem.innerHTML = `É necessário escolher uma base de dados!`
  } else {
    pre_loader.classList.remove("hidden-anything")
    pre_loader.classList.add("show-anything")
  }
}
try {
  const btn = document.querySelector("#button-addon2")
  btn.addEventListener("click", show_anything, false)
} catch {
  console.log("No button...")
}

//arrasta e solta JS
function allowDrop(ev) {
  ev.preventDefault()
}

function drag(ev) {
  ev.dataTransfer.setData("text/plain", ev.target.id)
}

function drop(ev) {
  ev.preventDefault()
  let data = ev.dataTransfer.getData("text")
  ev.target.appendChild(document.getElementById(data))
}

let classificationBoxId = 0

function createClassification(nome) {
  let location = document.querySelector("#location-classification")
  let boxClassification = document.createElement("div")
  let headerClassification = document.createElement("div")
  let nameClassification = document.createElement("input")
  let bodyClassification = document.createElement("div")
  let footerClassification = document.createElement("div")
  let btnDownloadResult = document.createElement("button")
  let btnCloseClassification = document.createElement("button")
  let id = classificationBoxId

  btnDownloadResult.setAttribute("onclick", `printResult(${id})`)
  btnDownloadResult.setAttribute("id", `btn-download-classification-${id}`)
  btnDownloadResult.classList.add("btn-download-result")
  btnDownloadResult.innerHTML = "Download"

  btnCloseClassification.setAttribute("style", "backdrop-filter: blur(50px)")
  btnCloseClassification.style.backgroundColor = "#ffc107"
  btnCloseClassification.style.opacity = 1.0
  btnCloseClassification.setAttribute("type", "button")
  btnCloseClassification.classList.add("position-absolute", "top-0", "start-0", "translate-middle", "btn-close")
  btnCloseClassification.setAttribute("id", `btn-close-classification-${id}`)
  btnCloseClassification.setAttribute("onclick", "return this.parentNode.remove()")
  // Procurar forma alternativa de setar o mouse over
  btnCloseClassification.setAttribute("onmouseover", "this.style.backgroundColor = \"#ffcd39\" ")
  btnCloseClassification.setAttribute("onmouseout", "this.style.backgroundColor = \"#ffc107\" ")

  footerClassification.classList.add("d-flex", "justify-content-end")

  bodyClassification.setAttribute("ondrop", "drop(event)")
  bodyClassification.setAttribute("ondragover", "allowDrop(event)")
  bodyClassification.setAttribute("id", `body-classification-${id}`)
  bodyClassification.classList.add("card-body", "text-primary", "conteudo")
  bodyClassification.style.minWidth = '100%'
  bodyClassification.style.padding = '2em'

  nameClassification.setAttribute("type", "text")
  nameClassification.setAttribute("placeholder", "Nome da classificação")
  nameClassification.setAttribute("id", `nameClassification-${id}`)
  nameClassification.classList.add("d-block", "w-100", "input-name-classification")

  if (nome) {
    nameClassification.value = nome
  }

  headerClassification.classList.add("card-header", "d-flex", "justify-content-center", "w-100", "classification-header")
  headerClassification.append(nameClassification)

  boxClassification.setAttribute("id", `box-classification-${id}`)
  boxClassification.classList.add("card", "border-warning", "mb-3", "mt-3", "box-classification")
  boxClassification.append(headerClassification, bodyClassification, footerClassification, btnCloseClassification)

  location.append(boxClassification)
  classificationBoxId += 1
}

function deleteClassification() {
  // TODO
}

function inicializarClassificationPadrao() {
  createClassification("Tecnologias")
  createClassification("Impactos")
  createClassification("Oportunidades")
}

let indiceDownloadTreemap = 0

function printResult() {

  let allBoxList = document.querySelectorAll(`.box-classification`)
  let listaValores = []

  allBoxList.forEach((elem) => {

    let valores = []
    let titulo = elem.childNodes[0].childNodes[0].value
    let conteudos = elem.childNodes[1].childNodes

    conteudos.forEach((elem) => {
      let texto = elem.childNodes[0].innerText // Pode quebrar (antigo valor: 1)
      let quantidade = elem.childNodes[1].innerText // Pode quebrar (antigo valor: 3)
      let addValores = [texto, quantidade]
      valores.push(addValores)
    })

    let classificacao = {
      Classificação: titulo,
      Termos: valores
    }

    listaValores.push(classificacao)
  })

  return listaValores
}

function baixarGraficos() {
  alert("Aguarde. Todos os TreeMaps serão baixados individualmente.")
  Highcharts.charts.forEach(chart => {
    chart.exportChart()
  })
}

function mostrarGraficoTreemapDownload(nomeClassificacao, objetosTreemap) {
  let graficoTreemap = Highcharts.chart('graficoTreemapDownload', {
    plotOptions: {
      treemap: {
        stacking: 'normal',
        cropThreshold: 10,
        dataGrouping: {
          enabled: true
        }
      }
    },
    colorAxis: {
      minColor: '#FFFFFF',
      maxColor: Highcharts.getOptions().colors[0]
    },
    series: [{
      type: 'treemap',
      layoutAlgorithm: 'squarified',
      data: objetosTreemap
    }],
    title: {
      text: nomeClassificacao
    }
  })
}

function parseDados(resultados) {
  let objetosTreemap = []
  let nomeClassificacao

  let elem = resultados[indiceDownloadTreemap]

  try {
    nomeClassificacao = elem['Classificação']
  }
  catch {
    // Por algum motivo em certas ocasiões o nome da classificação fica vazio, vamos então retornar silenciosamente como se nada tivesse acontecido
    // Funcionalmente não há problemas
    return ""
  }
  for (let i = 0; i < elem['Termos'].length; i++) {
    objetosTreemap.push({ name: elem['Termos'][i][0], value: parseInt(elem['Termos'][i][1]), colorValue: parseInt(elem['Termos'][i][1]) })
  }

  let indicador = document.querySelector("#counterTreemap")
  indicador.innerText = `${indiceDownloadTreemap+1}/${resultados.length}`

  mostrarGraficoTreemapDownload(nomeClassificacao, objetosTreemap)
}

function proximoGraficoTreemapDL() {
  qtdBoxClassification = document.querySelectorAll(`.box-classification`).length
  if (indiceDownloadTreemap < qtdBoxClassification) {
    indiceDownloadTreemap += 1
    parseDados(printResult())
  }
}

function anteriorGraficoTreemapDL() {
  if (indiceDownloadTreemap > 0) {
    indiceDownloadTreemap -= 1
    parseDados(printResult())
  }
}

var rand = function () {
  return Math.random().toString(36).substring(2)
}

async function efetuarBusca() {
  let springerlink = document.querySelector("#id-springerlink").checked
  let sciencedirect = document.querySelector("#id-sciencedirect").checked
  let buscaRapida = document.querySelector("#id-busca-rapida").checked
  let stringSpringerlink = "&springerlink=true"
  let stringSciencedirect = "&sciencedirect=true"
  let buscaRapidaStr = "&busca-rapida=true"
  let strBusca = "busca="
  let termo = document.querySelector("#id-search").value

  strBusca += termo

  if (springerlink) {
    strBusca += stringSpringerlink
  }

  if (sciencedirect) {
    strBusca += stringSciencedirect
  }

  if (buscaRapida) {
    strBusca += buscaRapidaStr
  }

  let link_busca = "https://nostradamus.up.railway.app/search?" + strBusca
  
  promise = retornarQualquerJsonEmPromise(link_busca)

  promise.then((dados) => {
    window.location = '/result?token=' + dados['token']
  });
}

function buscarToken(){
  let token = document.querySelector("#id-search-restore").value
  window.location = "/result?token=" + token
}

function retornarQueryDoNavegador(name){
  if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
    return decodeURIComponent(name[1]);
}

function retornarTodosOsDadosDePesquisa() {
  let token = retornarQueryDoNavegador('token')
  document.querySelector("#token-busca").innerHTML = token

  if (token) {
    resultadoBuscaEmPromise = realizarConsulta(token) 
    resultadoBuscaEmPromise.then((dados) => {
      if (dados['resposta']){
        exibirModal() 
        atualizarModal()
      }
      else {
        dadosTreemap = dados // TODO: Mudar futuramente
        popularPainelAnos(dados)
        popularPainelNgramas(dados)
        popularPainelSubjects(dados)
        popularGraficoLinha(dados)
        inicializarClassificationPadrao()
      } 
    })
  }
}

// Função para mostrar o gráfico de artigos por ano - gráfico de linha
function mostrarGraficoLinha(vetorDadosAno) {
  Highcharts.chart("graficoLinha", {
    title: {
      text: "Distribuição de Artigos por Ano",
    },

    subtitle: {
      text: 'Fontes: <a href="" target="_blank">ScienceDirect, SpringerLink</a>', // TODO: Linkar as fontes de acordo com a seleção
    },

    yAxis: {
      title: {
        text: "Quantidade de Artigos",
      },
    },

    xAxis: {
      tickInterval: 1,
      labels: {
        enabled: true,
        formatter: function () { return vetorDadosAno[this.value][0]; },
      }
    },

    legend: {
      layout: "vertical",
      align: "center",
      verticalAlign: "bottom",
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
      },
    },

    series: [
      {
        name: "Artigos",
        data: vetorDadosAno,
      },
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  });
}

function mostrarGraficoTreemap() {
  Highcharts.chart('graficoTreemap', {
    plotOptions: {
      treemap: {
        stacking: 'normal',
        cropThreshold: 10,
        dataGrouping: {
          enabled: true
        }
      }
    },
    colorAxis: {
      minColor: '#FFFFFF',
      maxColor: Highcharts.getOptions().colors[0]
    },
    series: [{
      type: 'treemap',
      layoutAlgorithm: 'squarified',
      data: setTermosTreemap()
    }],
    title: {
      text: 'Termos mais relevantes'
    }
  });
}

function popularGraficoLinha(dados){
  let vetorDadosAno = [];

  // Coloca os dados de artigos/ano no vetorDadosAno
  for (let i = 0; i < dados['total_anos'].length; i++) {
    vetorDadosAno.push([dados['total_anos'][i][0], dados['total_anos'][i][1]])
  }

  mostrarGraficoLinha(vetorDadosAno)
}

async function realizarConsulta(tokenPesquisa) {
  link_consulta = "https://nostradamus.up.railway.app/consulta?token=" + tokenPesquisa
  return retornarQualquerJsonEmPromise(link_consulta)
}

async function retornarQualquerJsonEmPromise(link) {
  return await fetch(link).then((response) => {return response.json()})
}

function setTermosTreemap() {
  let vetorTermosTreemap = [];

  for (let i = 0; i < dadosTreemap['total_assuntos'].length; i++) {
    vetorTermosTreemap.push(entradaTreemap(dadosTreemap['total_assuntos'][i]));
  }

  // Coloca os ngramas no vetor de termos Treemap
  dadosTreemap['resultado_ngramas'].forEach((termo, qtd) => {
    vetorTermosTreemap.push(entradaTreemap([termo[0][0] + " " + termo[0][1], qtd, qtd]))
  })

  return vetorTermosTreemap;
}

function entradaTreemap(termoDados) {
  let termo = termoDados[0]
  let valor = termoDados[1]
  return { name: termo, value: valor, colorValue: valor };
}

function exibirModal() { // --> Apenas <-- será exibido no promise de uma resposta e NÃO de maneira completamente automática!!
  modalBuscaPendente = new bootstrap.Modal(document.querySelector("#modal-busca-pendente"), {})
  modalBuscaPendente.show()
}

function esconderModal() {
  modalBuscaPendente.hide()
}

function atualizarModal() {
  let textoModal = document.querySelector("#texto-modal")
  let textoTitle = document.querySelector("#label-modal-busca-pendente")
  let token = retornarQueryDoNavegador('token')
  textoTitle.innerHTML = 'Busca Pendente [' + token + ']'
  let secs = 60
  setInterval(() => {
    textoModal.innerHTML = `Aguarde ` + secs + ` segundos`
    if (secs >= 1) {
      secs -= 1
    } else {
      textoModal.innerHTML = `Tentando novamente...`
      location.reload()
    }
  }, 1000)
}

function recarregarBusca() {
  location.reload()
}
