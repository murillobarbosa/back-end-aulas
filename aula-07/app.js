/*
 * Objetivo: Criar uma API para manipulação de dados de Estados e Cidades 
 * Autor: Murillo
 * Data: 10/03/2023
 * Versão: 1.0
 * 
 */


/*
 * Express - dependencia do Node, que permite a integração entre o protocolo http com o codigo
 *          npm install express --save
 * 
 * Cors - Gerenciador de permissões para o protocolo HTTP
 *          npm install cors --save
 * 
 * Body-parser - É uma dependecia que permite manipular dados enviados pelo body da requisição
 *          npm install body-parser --save
 * 
 */

//  Import das dependencias para criar a API 

// responsavel pelas requisições 
const express = require('express')
// Responsavel pelas permissões das requisições 
const cors = require('cors')
// Responsavel pela manipulação do body da requisição 
const bodyParser = require('body-parser')
// Import do arquivo de funções 
const estadosCidades = require('./modulo/estados_cidades')

const { request, response } = require('express')


// Cria um objeto com as imformações da classe express
const app = express();

// Define as permissões no header da API
app.use((request, response, next) => {
    // Permite gerenciar a origem das requisições da API
    // * - significa que a API será publica
    // IP - se colocar o IP, a API somente responderá para aquela maquina
    response.header('Access-Control-Allow-Origin', '*')

    // Permite gerenciar quais verbos (metodos) poderão fazer requisições
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    // Ativa no cors das requisições as permissões estabelecidas
    app.use(cors())

    next()
})

// endPoints

let statusCode
let dadoEstado = {}

//  endPoints para Listar os Estados
app.get('/v1/senai/estados', cors(), async function(request, response, next) {


    // chama a função que retorna as estados
    let listaDeEstados = estadosCidades.getListaDeEstados();
    // Tratamento para validar se a função realizou o processamento
    if (listaDeEstados) {
        //Retorna o Json e o status code
        response.json(listaDeEstados)
        response.status(200)
    } else {
        response.status(500)
    }
})

// endPoint: Lista as caracteristicas do estados pela sigla
app.get('/v1/senai/estado/sigla/:uf', cors(), async function(request, response, next) {
    // :uf - e uma variavel que sera utilizada para passagem de valores, na URL da requisição

    // Recebe o valor da variavel UF, que sera ecaminhada na URL da requisição
    let siglaEstado = request.params.uf;


    if (siglaEstado == '' || siglaEstado == undefined || siglaEstado.length != 2 || !isNaN(siglaEstado)) {
        statusCode = 400
        dadoEstado.message = "Não é possivel processar a requisição pois a sigla do estado não foi informada ou não a tende a quantidade de caracteres (2 digitos)"
    } else {
        //chama a função que filtra o estado pela sigla
        let estado = estadosCidades.getDadosEstados(siglaEstado)

        // Valida se houve retorno valido da função
        if (estado) {
            statusCode = 200  // Estado encontrado
            dadoEstado = estado
        } else {
            statusCode = 404; // Estado não encontrado
        }
    }

    response.status(statusCode)
    response.json(dadoEstado)
})

app.get('/v1/senai/capital/sigla/:uf', cors(), async function(request, response, next) {

    let siglaCapital = request.params.uf

    if (siglaCapital == '' || siglaCapital == undefined || siglaCapital.length != 2 || !isNaN(siglaCapital)) {
        statusCode = 400
        dadoEstado.message = "Não é possivel processar a requisição pois a sigla do estado não foi informada ou não atende a quantidade de caracteres (2 digitos)"
    } else {

        let capital = estadosCidades.getCapitalEstado(siglaCapital)

        if (capital) {
            statusCode = 200
            dadoEstado = capital
        } else {
            statusCode = 400
        }
    }
    response.status(statusCode)
    response.json(dadoEstado)


})

app.get('/v1/senai/regiao/sigla/:regiao', cors(), async function(request, response, next) {
    let siglaRegiao = request.params.regiao

    if (siglaRegiao == '' || siglaRegiao == undefined || !isNaN(siglaRegiao)) {
        statusCode = 400
        dadoEstado.message = "Não é possivel processar a requisição pois a sigla do estado não foi informada ou não atende a quantidade de caracteres (2 digitos)"

    } else {
        let regiao = estadosCidades.getEstadosRegiao(siglaRegiao)

        if (regiao) {
            statusCode = 200
            dadoEstado = regiao
        } else {
            statusCode = 400
        }
    }
    response.status(statusCode)
    response.json(dadoEstado)
})

app.get('/v1/senai/pais/capital', cors(), async function(request, response, next) {
    // chama a função que retorna as estados
    let listaDeCapitais = estadosCidades.getCapitalPais();
    // Tratamento para validar se a função realizou o processamento
    if (listaDeCapitais) {
        //Retorna o Json e o status code
        response.json(listaDeCapitais)
        response.status(200)
    } else {
        response.status(500)
    }
})

// app.get('/estado/cidade/:uf', cors(), async function(request, response, next){
//     let siglaDoEstado = request.params.uf

//     if( siglaDoEstado == '' || siglaDoEstado == undefined  || !isNaN(siglaDoEstado)){
//         statusCode = 400
//         dadoEstado.message = "Não é possivel processar a requisição pois a sigla do estado não foi informada ou não atende a quantidade de caracteres (2 digitos)"

//     } else{
//         let cidade = estadosCidades.getCidades(siglaDoEstado)

//         if (cidade){
//             statusCode = 200
//             dadoEstado = cidade
//         } else{
//             statusCode = 400
//         }
//     }
//     response.status(statusCode)
//     response.json(dadoEstado)


// })

//EndPoint: Lista as cidades filtrada pelas siglas do estado
app.get('/v1/senai/cidades', cors(), async function(request, response, next) {

    // Recebe o valor da variavel que será enviada por QueryString
    //Ex: www.uol.com.br?uf=sp

    /*
    * Usamos a query para receber diversas variaveis para realizar filtros 
    * Usamos o params para receber ID (PC), geralmente para fazer PUT, DELETE, GET
    */

    let siglaEstado = request.query.uf

    if (siglaEstado == '' || siglaEstado == undefined || siglaEstado.length != 2 || !isNaN(siglaEstado)) {
        statusCode = 400
        dadoEstado.message = "Não é possivel processar a requisição pois a sigla do estado não foi informada ou não atende a quantidade de caracteres (2 digitos)"

    } else {
        let cidades = estadosCidades.getCidades(siglaEstado)

        if (cidades) {
            statusCode = 200
            dadoEstado = cidades
        } else {
            statusCode = 400
        }
    }
    response.status(statusCode)
    response.json(dadoEstado)


})

//EndPoint: Lista as cidades filtrada pelas siglas do estado
//com mais detalhes
app.get('/v2/senai/cidades', cors(), async function(request, response, next){

})























// Permite carregar os endPointas criados e aguarda as requisições pelo protocolo http na porta 8080
app.listen(8080, function () {
    console.log('Servidor aguardando requisições na porta 8080')
})




















