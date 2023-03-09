/***********************************************************************
 * Objetivo: Trabalhando com Array
 * Data: 27/02/2023
 * Autor: Murillo
 * Versão: 1.0
 **********************************************************************/

// [ ] - significa que estamos manipulando um array de dados
// { } - significa que estamos manipulando um formato JSON de dados

const listaNomes = ['José', 'Maria', 'Luiz', 'Carlos', 'Luizinho', 'Zezinho']
const listaProdutos = ['Teclado', 'Mouse', 'Monitor', 'Computador', 'Fone', 'Impressora', 'Scanner', 'WebCam']
const listaProdutosJSON = {}


//Forma ERRADA de manipular um conjunto de dados
// const nome1 = 'José';
// const nome2 = 'Maria';
// const nome3 = 'Luiz';

const manipulandoElementos = function() {
    //Veririfica o tipo de dados do elemento listaNomes    
    //console.log(typeof(listaNomes));

    //Veririfica o tipo de dados de um indice (item) do array     
    console.log(typeof(listaNomes[1]))

    //Exibe todos os elementos do array
    console.log(listaNomes)

    //Exibe apenas um elemento conforme o seu indice
    console.log(listaNomes[0])

    console.log('O nome do usuário é ' + listaNomes[0])
    console.log(`O nome do usuário é ${listaNomes[1]}`)

    //length - permite contar quantos elementos tem em um array
    console.log(`A qtde de itens do meu array é: ${listaNomes.length}`)

    //Percorrendo um array usando While
    let cont = 0; //start
    let qtdeItens = listaNomes.length; //stop

    console.log('Exibindo dados do array com While')
    while (cont < qtdeItens) {
        console.log(`Nome: ${listaNomes[cont]}`)
        cont += 1;
    }

    //Percorrendo um array usando FOR
    console.log('Exibindo dados do array com FOR')
    let qtdeNomes = listaNomes.length; //stop

    for (let cont = 0; cont < qtdeNomes; cont++)
        console.log(`Nome: ${listaNomes[cont]}`)



    //Percorrendo um array usando FOREACH
    console.log('Exibindo dados do array com FOREACH')

    //forEach é um metodo de um objeto array, que retorna uma função de call back
    listaNomes.forEach(function(nome) {
        console.log(`Nome: ${nome}`)
    })


    //Adicionando elementos novos no ARRAY
    //Push - adiciona elementos no final do array
    listaNomes.push('Alexandre')
    listaNomes.push('Marcos', 'Lucas')
    console.log(listaNomes)

    //unshift - adiciona elementos no inicio do array (ele muda a
    // posição de todos os próximos elementos)
    listaNomes.unshift('Ana Maria', 'Leonardo')
    console.log(listaNomes)

    //Removendo elementos do Array
    //pop - remove o ultimo elemento do array
    listaNomes.pop()
    console.log(listaNomes)

    //shift - remove o primeiro elemento do array (reorganiza todos os
    //próximos elementos)
    listaNomes.shift()
    console.log(listaNomes)

}

const filtrandoElementos = function() {

    //indexof - permite buscar elementos dentro de um array
    // se o retorno for -1 (não encontrou o item)
    // se o retorno for maior ou igual 0 (item encontrado)
    console.log(listaProdutos)
        //console.log(listaProdutos.indexOf('Fone de Ouvido'));

    if (listaProdutos.indexOf('Monitor') >= 0)
        console.log('O item pesquisado foi encontrado.')
    else
        console.log('Item não encontrado.')

    //slice - permite criar uma cópia do array, podendo selecionar os itens
    //const novosProdutos = listaProdutos.slice();
    const novosProdutos = listaProdutos.slice(0, 3)

    console.log(listaProdutos)
    console.log(novosProdutos)

}

const removerElemento = function(array, nomeItem) {
    //Cria uma cópia do Array
    let novaLista = array.slice()

    let nome = nomeItem;
    let indice = novaLista.indexOf(nome)
    let status;

    //splice - permite remover um elemento do array, pelo indice 
    //    (não esquecer de passar a qtde de itens a ser removido)
    if (indice >= 0) {
        novaLista.splice(indice, 1)
        status = true
    } else {
        status = false
    }

    if (status)
        return novaLista
    else
        return status
}

const listagemProdutos = function() {
    let listProdutosJSON = {}

    let listProdutos = [
        { nome: 'Teclado DELL', valor: 200, quantidade: 50 },
        { nome: 'Monitor DEL', valor: 1000, quantidade: 70 }, 
        { nome: 'Mouse DEL', valor: 100, quantidade: 350 }
    ]          
    
    let listCores = ['Branco', 'Preto', 'Cinza']
    let listTipoTeclados = ['Mecânico', 'Semi-Mecânico', 'Membrana']
    let listTipoMonitores = ['LCD', 'Full-HD', '4K', 'OLED']

    // Adiciona chaves (opções) no Teclado
    listProdutos[0].cores = listCores
    listProdutos[0].tipo = listTipoTeclados

    // Adiciona chaves (opções) no Monitor
    listProdutos[1].cores = listCores
    listProdutos[1].tipo = listTipoMonitores

    // Adiciona chaves (opções) no Mouse
    listProdutos[2].cores = listCores

    // Adiona uma chave produtos e coloca toda a estrutura dos produtos dentro dela
    listProdutosJSON.produtos = listProdutos


    console.log(listProdutosJSON)

    // console.log('nome:' + listProdutosJSON.produtos[1].nome)
    // console.log('\n valor:' + listProdutosJSON.produtos[1].valor)
    // console.log('\n cor:' + listProdutosJSON.produtos[1].cores[1])

    // Retorna todos os dados do produto (1° nivel de dados do JSON)
    listProdutosJSON.produtos.forEach(function(dadosProdutos){
        console.log(' \nNome: ' + dadosProdutos.nome)
        console.log('Valor: ' + dadosProdutos.valor)
        
        //Validação para tratar quando não existe tipos de produto
        if(dadosProdutos.cores != undefined){
        // Retorna todas as cores existentes para cada produto
        dadosProdutos.cores.forEach(function(dadosCores){
            console.log('**' + dadosCores)
        })
    }
        
        //Validação para tratar quando não existe tipos de produto
        if(dadosProdutos.tipo != undefined){
        // Retorna os tipos existentes para cada produto
        dadosProdutos.tipo.forEach(function(dadosTipo){
            console.log('**' + dadosTipo)
        })
      }
    })



    // listaProdutosJSON.produtos = listaProdutos
    // listaProdutosJSON.clientes = listaNomes

    console.log('\n')
    // console.log(listaProdutosJSON)
    // console.log(listaProdutosJSON.clientes[2]);
    console.log('\n')
}

listagemProdutos()



// console.log(removerElemento(listaNomes, 'Luiz'));
//console.log(listaProdutos);