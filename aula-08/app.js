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


    // EndPoint: Retorna todos os dados do aluno
    app.get('/v1/lion-school/aluno', cors(), async function(request, response) {
    });
    // EndPoint: Retorna todos os dados do aluno pelo ID
    app.get('/v1/lion-school/:id', cors(), async function(request, response) {
    });
    // EndPoint: Inserir um novo aluno
    app.post('/v1/lion-school/aluno', cors(), async function(request, response) {
    });
    // EndPoint: Atualiza um aluno pelo ID
    app.put('/v1/lion-school/:id', cors(), async function(request, response) {
    });
    // EndPoint: Exclui um aluno pelo ID
    app.delete('/v1/lion-school/:id', cors(), async function(request, response) {
    });