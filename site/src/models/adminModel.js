var database = require("../database/config")



function loginAdm(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
            SELECT  fk_empresa,id_usuario as id_admin,email, senha, nome as nome_admin FROM usuario where email = '${email}' and senha = '${senha}';
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            SELECT  fk_empresa,id_usuario as id_admin,email, senha, nome as nome_admin FROM usuario where email = '${email}' and senha = '${senha}';
        `;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}

function cadastrarAdm(nome,area, cargo, email ,senha, fk_empresa, fk_tipo_usuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome,area, cargo,email, senha, fk_empresa, fk_tipo_usuario);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        INSERT INTO usuario (nome, area, cargo, email, senha, fk_empresa, fk_tipo_usuario ) VALUES ('${nome}', '${area}', '${cargo}','${email}' ,'${senha}', '${fk_empresa}','${fk_tipo_usuario}');`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            INSERT INTO usuario (nome, area, cargo, email, senha, fk_empresa, fk_tipo_usuario ) VALUES ('${nome}', '${area}', '${cargo}','${email}' ,'${senha}', '${fk_empresa}','${fk_tipo_usuario}');`;
    }
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function cadastrarToken(token, fk_usuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", token, fk_usuario);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `INSERT INTO token(token, data_criado, fk_usuario) VALUES('${token}', now(), '${fk_usuario}')`
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `INSERT INTO token(token, data_criado, fk_usuario) VALUES('${token}', now(), '${fk_usuario}')`
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    loginAdm,
    cadastrarAdm,
    cadastrarToken
}