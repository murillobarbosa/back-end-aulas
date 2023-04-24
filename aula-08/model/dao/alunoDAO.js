/*
 * Objetivo: Realizar intereração do Aluno com o Banco de Dados
 * Autor: Murillo
 * Data: 14/04/2023
 * Versão: 1.0
 */

// Inserir um novo registro no Banco de Dados
const insertAluno = function (dadosAluno) {
}
// Atualizar um novo registro no Banco de Dados
const updateAluno = function (dadosAluno) {
}
// Excluir um novo registro no Banco de Dados
const deleteAluno = function (id) {
}
// Retorna todos os Registros do Banco de Dados
const selectAllAluno = async function () {
    // Import da biblioteca do prisma client (responsável por manipular dados no BD)
    let { PrismaClient } = require('@prisma/client');

    // Instancia da classe do PrismaClient
    let prisma = new PrismaClient();

    // Variavel com o scriptSQL para executar o BD
    let sql = 'select * from tbl_aluno';

    // Executa no BD o scriptSQL
    // $queryRawUnsafe() é utilizado quando o scriptSQL esta em uma variavel
    // $queryRaw() é utilizado quando passar o script direto no metodo (EX: $queryRaw('select * from tbl_aluno'))
    let rsAluno = await prisma.$queryRawUnsafe(sql);
    
    // Valida se o BO retornou algum registro
    if(rsAluno.length > 0)
        return rsAluno;
    else
        return false;    

};
// Retorna um registro filtrado pelo ID do Banco de Dados
const selectByidAluno = function (id) {
}

module.exports ={
    selectAllAluno
}