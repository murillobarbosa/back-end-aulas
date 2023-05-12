/*
 * Objetivo: API para interagir com Banco de Dados (GET, POST, DELETE, PUT) 
 * Autor: Murillo
 * Data: 14/04/2023
 * Versão: 1.0
 */

/*
       Para realizar a conexão com o Banco de Dados iremos utilizar o PRISMA
       npm install prisma --save
       npx prisma
       npx prisma init
       npm install @prisma/client
*/

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const controller_aluno = require('./controller/controller_aluno.js');

const app = express();

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    app.use(cors());
    next();
});

// CRUD (Create, Read, Update e Delete)

/*-*-*-*-*-*-*--*-*-*-*-*-*-*-*-*-*
 * EndPoint: Tabela de alunos
 * Data: 14/04/2023
 * Versão: 1.0
 *-*-*-*-*-*-*--*-*-*-*-*-*-*-*-*-*/

const bodyJSON = bodyParser.json();
// Import da controller do aluno
let controllerAluno = require('./controller/controller_aluno.js');
var message = require('./controller/modulo/config.js')
    // EndPoint: Retorna todos os dados do aluno
app.get('/v1/lion-school/aluno', cors(), async function(request, response) {

    // Solicita a controller que retorna todos os alunos do BD
    let dados = await controllerAluno.selecionarTodosAlunos();

    // Valida se existem registros para retornar a requisição
    response.status(dados.status)
    response.json(dados)

});

// EndPoint: Retorna todos os dados do aluno pelo ID
app.get('/v1/lion-school/aluno/:id', cors(), async function(request, response) {

    // Recebe o ID enviado da requisição
    let idAluno = request.params.id;
    // Solicita a controller que retorna todos os alunos do BD
    let dados = await controllerAluno.buscarIdAluno(idAluno);

    // Valida se existem registros para retornar a requisição
    response.status(dados.status)
    response.json(dados)


});
// EndPoint: Inserir um novo aluno
app.post('/v1/lion-school/aluno', cors(), bodyJSON, async function(request, response) {

    let contentType = request.headers['content-type'];
    if (contentType == 'application/json') {
        // Recebe os dados encaminhados no body da requisição
        let dadosBody = request.body;
        console.log(dadosBody);


        // Envia os dados para a controller
        let resultInsertDados = await controller_aluno.inserirAluno(dadosBody);

        console.log(resultInsertDados);


        // Retorna o status code e a message
        response.status(resultInsertDados.status);
        response.json(resultInsertDados);
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status);
        response.json(message.ERROR_INVALID_CONTENT_TYPE);
    }

});
// EndPoint: Atualiza um aluno pelo ID
app.put('/v1/lion-school/:id', cors(), bodyJSON, async function(request, response) {
    // Recebe os dados do body
    let dadosBody = request.body;

    // Recebe o id do aluno
    let idAluno = request.params.id;

    let resultUpdateDados = await controllerAluno.atualizarAluno(dadosBody, idAluno);

    response.status(resultUpdateDados.status);
    response.json(resultUpdateDados);
});
// EndPoint: Exclui um aluno pelo ID
app.delete('/v1/lion-school/:id', cors(), async function(request, response) {
    let idAluno = request.params.id;
    let resultDeleteDados = await controllerAluno.deletarAluno(idAluno)

    response.status(resultDeleteDados.status)
    response.json(resultDeleteDados)


});

app.listen(8080, function() {
    console.log('Servidor aguardando requisição');
});