let dadosPesquisa;

function criarAnos() {
  let locationAno = document.querySelector("#location-anos")
  let buttonAno = document.createElement("button")
  let spanNumero = document.createElement("span")

  dadosPesquisa.forEach((elem) => {
    console.log(elem)
  })

  buttonAno.setAttribute("type", "button")
  buttonAno.classList.add("btn", "btn-warning", "position-relative", "mt-3", "mx-2", "p-1")
  buttonAno.setAttribute("style", "font-size: 15px")
  buttonAno.innerHTML = `2012` // TODO: Colocar o ano aqui (um loop irá realizar essa tarefa)
  buttonAno.setAttribute("id", "id-button-" + '2')

  spanNumero.classList.add("position-absolute", "top-0", "start-100", "translate-middle", "badge", "rounded-pill", "bg-danger")
  spanNumero.innerHTML = `4` // TODO: Colocar a quantidade relativa ao ano aqui (um loop irá realizar essa tarefa)

  buttonAno.innerHTML += spanNumero.outerHTML

  locationAno.append(buttonAno)


  // <!-- {% for ano in total_anos %}
  // <button type="button" class="btn btn-warning position-relative mt-3 mx-2 p-1" style="font-size: 15px">
  //   {{ ano[0] }}
  //   <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
  //     {{ ano[1] }}
  //   </span>
  // </button>
  // {% endfor %} -->
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
  } else if (springerlink == false && sciencedirect == false) {
    evento.preventDefault()
    alerta.classList.remove("hidden-anything")
    alerta.classList.add("show-anything")
    div_mensagem.innerHTML = `É necessário escolher uma base de dados!`
  } else {
    pre_loader.classList.remove("hidden-anything")
    pre_loader.classList.add("show-anything")
  }
}
const btn = document.querySelector("#button-addon2")
btn.addEventListener("click", show_anything, false)

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

function createClassification() {
  let location = document.querySelector("#location-classification")
  let boxClassification = document.createElement("div")
  let headerClassification = document.createElement("div")
  let nameClassification = document.createElement("input")
  let bodyClassification = document.createElement("div")
  let footerClassification = document.createElement("div")
  let btnDownloadResult = document.createElement("button")
  let id = classificationBoxId

  btnDownloadResult.setAttribute("onclick", `printResult(${id})`)
  btnDownloadResult.setAttribute("id", `btn-download-classification-${id}`)
  btnDownloadResult.classList.add("btn-download-result")
  btnDownloadResult.innerHTML = "Download"

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

  headerClassification.classList.add("card-header", "d-flex", "justify-content-center", "w-100", "classification-header")
  headerClassification.append(nameClassification)

  boxClassification.setAttribute("id", `box-classification-${id}`)
  boxClassification.classList.add("card", "border-warning", "mb-3", "mt-3", "box-classification")
  boxClassification.append(headerClassification, bodyClassification, footerClassification)

  location.append(boxClassification)
  classificationBoxId += 1
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
      let texto = elem.childNodes[1].innerText
      let quantidade = elem.childNodes[3].innerText
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

function generateZIP() {
  console.log('TEST')
  var zip = new JSZip()
  var count = 0
  var zipFilename = "Pictures.zip"

  links.forEach(function (url, i) {
    var filename = links[i]
    filename = filename.replace(/[\/\*\|\:\<\>\?\"\\]/gi, '').replace("httpsi.imgur.com", "")
    // loading a file and add it in a zip file
    JSZipUtils.getBinaryContent(url, function (err, data) {
      if (err) {
        throw err // or handle the error
      }
      zip.file(filename, data, { binary: true })
      count++
      if (count == links.length) {
        zip.generateAsync({ type: 'blob' }).then(function (content) {
          saveAs(content, zipFilename)
        })
      }
    })
  })
}

function baixarGraficos() {
  alert("Aguarde. Todos os TreeMaps serão baixados individualmente.")
  Highcharts.charts.forEach(chart => {
    chart.exportChart()
  })
}

function mostrarGraficoTreemapDownload(nomeClassificacao, objetosTreemap) {
  Highcharts.chart('graficoTreemapDownload', {
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

  nomeClassificacao = elem['Classificação']
  for (let i = 0; i < elem['Termos'].length; i++) {
    objetosTreemap.push({ name: elem['Termos'][i][0], value: parseInt(elem['Termos'][i][1]), colorValue: parseInt(elem['Termos'][i][1]) })
  }

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
  let slStr = "&springerlink=true"
  let sdStr = "&sciencedirect=true"
  let buscaRapidaStr = "&busca-rapida=true"
  let strBusca = "busca="
  let termo = document.querySelector("#id-search").value

  strBusca += termo

  if (springerlink) {
    strBusca += slStr
  }

  if (sciencedirect) {
    strBusca += sdStr
  }

  if (buscaRapida) {
    strBusca += buscaRapidaStr
  }

  let link_busca = "https://nostradamus.up.railway.app/search?" + strBusca
  
  promisse = retornarQualquerJsonEmPromisse(link_busca)

  promisse.then((dados) => {
    window.location.pathname = '/result?token=' + dados['token']
  });
}

function buscarToken(){
  let token = document.querySelector("#consultaToken")
  window.location.pathname = '/result?token=' + token
}

function retornarQueryDoNavegador(name){
  if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
    return decodeURIComponent(name[1]);
}

function retornarTodosOsDadosDePesquisa() {
  let token = retornarQueryDoNavegador('token')
  document.querySelector("#id-search-restore").value = token

  resultadoBusca = realizarConsulta(token)
  //a variavel acima contem um promisse; a partir deste ponto o promisse precisará ser tratando dentro do método .then
}

async function realizarConsulta(tokenPesquisa) {
  link_consulta = "https://nostradamus.up.railway.app/consulta?token=" + tokenPesquisa
  return retornarQualquerJsonEmPromisse(link_consulta)
}

async function retornarQualquerJsonEmPromisse(link) {
  return await fetch(link).then((response) => {return response.json()})
}
  //return valor
