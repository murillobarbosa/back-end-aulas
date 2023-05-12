/*
 * Objetivo: Arquivo responsável pelas variaveis, constantes e funções globais de projeto
 * Autor: Murillo
 * Data: 28/04/2023
 * Versão: 1.0
 */
/******************************** Constantes de ERROS ********************************/
const ERROR_REQUIRED_DATA = { status: 400, message: 'Existem dados obrigatórios que não foram preenchidos.' };
const ERROR_REQUIRED_ID = { status: 400, message: 'O atributo ID é obrigatório na requisição.' };
const ERROR_INTERNAL_SERVER = { status: 500, message: 'Erro interno .' };
const ERROR_INVALID_CONTENT_TYPE = { status: 415, message: 'O tipo de mídia Content-type da solicitação não é compativel com o servidor. [application/json]' };
const ERROR_NOT_FOUND = { status: 404, message: 'Nenhum registro encontrado na requisição.' };

/******************************** Constantes de SUCESSO ********************************/
const CREATED_ITEM = { status: 201, message: 'Registro criado com sucesso' };
const UPDATE_ITEM = { status: 200, message: 'Registro atualizado com sucesso' };
const DELETE_ITEM = { status: 200, message: 'Registro deletado' }

module.exports = {
    ERROR_REQUIRED_DATA,
    CREATED_ITEM,
    ERROR_INTERNAL_SERVER,
    ERROR_REQUIRED_ID,
    UPDATE_ITEM,
    ERROR_INVALID_CONTENT_TYPE,
    DELETE_ITEM,
    ERROR_NOT_FOUND

}