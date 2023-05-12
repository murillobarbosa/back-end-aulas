/*
 * Objetivo: Implementar a regra de negocio entre o app e a model
 * Autor: Murillo
 * Data: 14/04/2023
 * Versão: 1.0
 */
// Import do arquivo de acesso ao BD
var alunoDAO = require('../model/dao/alunoDAO.js');
var message = require('./modulo/config.js');
// Função para receber dados do APP e enviar para a Model
const inserirAluno = async function(dadosAluno) {

    if (dadosAluno.nome == '' || dadosAluno.nome == undefined || dadosAluno.nome.length >= 100 ||
        dadosAluno.cpf == '' || dadosAluno.cpf == undefined || dadosAluno.cpf > 18 ||
        dadosAluno.rg == '' || dadosAluno.rg == undefined || dadosAluno.rg > 15 ||
        dadosAluno.data_nascimento == '' || dadosAluno.data_nascimento == undefined || dadosAluno.data_nascimento > 10 ||
        dadosAluno.email == '' || dadosAluno.email == undefined || dadosAluno.email > 250
    ) {
        message.ERROR_REQUIRED_DATA;
    } else {
        // Envia os dados a model a serem inseridos no BD
        let status = await alunoDAO.insertAluno(dadosAluno);


        if (status) {
            let dadosJSON = {};
            let alunoNovoId = await alunoDAO.selectLastId();
            dadosAluno.id = alunoNovoId;

            dadosJSON.status = message.CREATED_ITEM.status;
            dadosJSON.aluno = dadosAluno;

            return dadosJSON;
        } else
            return message.ERROR_INTERNAL_SERVER;
    }
};
// Função para receber dados do APP e enviar para a Model para atualizar um item existentes
const atualizarAluno = async function(dadosAluno, idAluno) {

    // Validação dos dados
    if (dadosAluno.nome == '' || dadosAluno.nome == undefined || dadosAluno.nome.length >= 100 ||
        dadosAluno.cpf == '' || dadosAluno.cpf == undefined || dadosAluno.cpf > 18 ||
        dadosAluno.rg == '' || dadosAluno.rg == undefined || dadosAluno.rg > 15 ||
        dadosAluno.data_nascimento == '' || dadosAluno.data_nascimento == undefined || dadosAluno.data_nascimento > 10 ||
        dadosAluno.email == '' || dadosAluno.email == undefined || dadosAluno.email > 250
    ) {
        return message.ERROR_REQUIRED_DATA;
        // Validação para o id
    } else if (idAluno == '' || idAluno == undefined || isNaN(idAluno)) {
        return message.ERROR_REQUIRED_ID
    } else {
        // Adiciona o ID no JSON com todos os dados
        dadosAluno.id = idAluno

        let status = await alunoDAO.updateAluno(dadosAluno);

        if (status)
            return message.UPDATE_ITEM;
        else
            return message.ERROR_INTERNAL_SERVER;
    }
};
// Função para excluir um aluno filtrado pelo ID, que será encaminhado para a model
const deletarAluno = async function(id) {
    if (idAluno == '' || idAluno == undefined || isNaN(idAluno)) {
        return message.ERROR_REQUIRED_ID
    } else {
        //adiciona o id no json com todos os dados, acresentando o id 

        //encaminha para a Dao os dados para serem alterados
        let status = await alunoDAO.deleteAluno(idAluno);
        if (status) {
            return message.DELETE_ITEM;
        } else {

            return message.ERROR_INTERNAL_SERVER;
        }
    }


};
// Função para retornar todos os itens da tabela recebidos da model
const selecionarTodosAlunos = async function() {
    // Solicita ao DAO todos os alunos do BD
    let dadosAluno = await alunoDAO.selectAllAluno();

    // Cria um objeto do tipo JSON
    let dadosJson = {};

    // Valida se o BD teve registros
    if (dadosAluno) {
        // Adiciona o array de alunos e um JSON para retornar ao app
        dadosJson.status = 200;
        dadosJson.count = dadosAluno.length;
        dadosJson.alunos = dadosAluno;
        return dadosJson
    } else {
        return message.ERROR_NOT_FOUND;
    }

};
// Função para buscar um item filtrado pelo ID, que será encaminhado para a model
const buscarIdAluno = async function(id) {
    // Validação para o ID
    if (id == '' || id == undefined || isNaN(id))
        return message.ERROR_REQUIRED_ID
    else {
        // Solicita ao DAO todos os alunos do BD
        let dadosAluno = await alunoDAO.selectByidAluno(id);

        // Cria um objeto do tipo JSON
        let dadosJson = {};

        // Valida se o BD teve registros
        if (dadosAluno) {
            // Adiciona o array de alunos e um JSON para retornar ao app
            dadosJson.status = 200;
            dadosJson.alunos = dadosAluno;
            return dadosJson;
        } else {
            return message.ERROR_NOT_FOUND;
        }
    }

};

module.exports = {
    selecionarTodosAlunos,
    inserirAluno,
    atualizarAluno,
    deletarAluno,
    buscarIdAluno
};