/*
 * Objetivo: Implementar a regra de negocio entre o app e a model
 * Autor: Murillo
 * Data: 14/04/2023
 * Versão: 1.0
 */

// Função para receber dados do APP e enviar para a Model
const inserirAluno = function (dadosAluno) {
}
// Função para receber dados do APP e enviar para a Model para atualizar um item existentes
const atualizarAluno = function (dadosAluno) {
}
// Função para excluir um aluno filtrado pelo ID, que será encaminhado para a model
const deletarAluno = function (id) {
}
// Função para retornar todos os itens da tabela recebidos da model
const selecionarTodosAlunos = async function () {
    // Import do arquivo de acesso ao BD
    let alunoDAO = require('../model/dao/alunoDAO.js');

    // Solicita ao DAO todos os alunos do BD
    let dadosAluno = await alunoDAO.selectAllAluno();

    // Cria um objeto do tipo JSON
    let dadosJson = {};

    // Valida se o BD teve registros
    if (dadosAluno) {
        // Adiciona o array de alunos e um JSON para retornar ao app
        dadosJson.alunos = dadosAluno;
        return dadosJson
    } else
        return false;
}
// Função para buscar um item filtrado pelo ID, que será encaminhado para a model
const buscarIdAluno = function (id) {
}

module.exports = {
    selecionarTodosAlunos
}
