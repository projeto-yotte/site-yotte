var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = ``;

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `SELECT id_empresa, email, senha FROM empresa where email = '${email}' and senha = '${senha}';`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `SELECT id_empresa, email, senha FROM empresa where email = '${email}' and senha = '${senha}';`;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}


// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome,cnpj, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome,cnpj, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = ``;

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `INSERT INTO empresa (nome, cnpj, email, senha) VALUES ('${nome}', '${cnpj}', '${email}', '${senha} ');`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `INSERT INTO empresa (nome, cnpj, email, senha) VALUES ('${nome}', '${cnpj}', '${email}', '${senha} ');`;
    }
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function dadosDaEmpresa(id_empresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", id_empresa)
    var instrucao = ``;

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `SELECT * FROM empresa WHERE id_empresa = ${id_empresa};`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `SELECT * FROM empresa WHERE id_empresa = ${id_empresa};`;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function listarUsuarios(id_empresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", id_empresa)
    var instrucao = ``;

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `    
        SELECT  id_usuario,usuario.nome, area, cargo FROM usuario JOIN empresa on id_empresa = fk_empresa JOIN tipo_usuario on id_tipo_usuario = fk_tipo_usuario WHERE
        id_empresa = ${id_empresa} and id_tipo_usuario = 2;
    `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `    
        SELECT  id_usuario,usuario.nome, area, cargo FROM usuario JOIN empresa on id_empresa = fk_empresa JOIN tipo_usuario on id_tipo_usuario = fk_tipo_usuario WHERE
        id_empresa = ${id_empresa} and id_tipo_usuario = 2;
    `;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletarUsuario(id_usuario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", id_usuario);
    var instrucao = ``;

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `DELETE FROM usuario WHERE id_usuario = ${id_usuario};`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `DELETE FROM usuario WHERE id_usuario = ${id_usuario};`;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function editarUsuario(id_Adm,nomeAdm, areaAdm, cargoAdm) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", id_Adm, nomeAdm, areaAdm, cargoAdm);
    var instrucao = ``;

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `UPDATE usuario SET nome = '${nomeAdm}',  area = '${areaAdm}', cargo = '${cargoAdm}' WHERE id_usuario = ${id_Adm};`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `UPDATE usuario SET nome = '${nomeAdm}',  area = '${areaAdm}', cargo = '${cargoAdm}' WHERE id_usuario = ${id_Adm};`;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function editarEmpresa(idEmpresa, nomeEmpresa,nomeFantasiaEmpresa, cpnjEmpresa, emailEmpresa ) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", idEmpresa, nomeEmpresa,nomeFantasiaEmpresa, cpnjEmpresa, emailEmpresa );
    var instrucao = ``;

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `UPDATE empresa SET nome = '${nomeEmpresa}',  nome_fantasia = '${nomeFantasiaEmpresa}', cnpj = '${cpnjEmpresa}', email= '${emailEmpresa}' WHERE id_empresa = ${idEmpresa};`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `UPDATE empresa SET nome = '${nomeEmpresa}',  nome_fantasia = '${nomeFantasiaEmpresa}', cnpj = '${cpnjEmpresa}', email= '${emailEmpresa}' WHERE id_empresa = ${idEmpresa};`;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function editarSenhaEmpresa(idEmpresa, novaSenha ) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", idEmpresa, novaSenha );
    var instrucao = ``;

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `UPDATE empresa SET senha = '${novaSenha}' WHERE id_empresa = ${idEmpresa};`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `UPDATE empresa SET senha = '${novaSenha}' WHERE id_empresa = ${idEmpresa};`;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function parametroEmpresa(idEmpresa, parametro, desc) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", idEmpresa, parametro, desc)
    var instrucao = ``;

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `SELECT * FROM usuario WHERE fk_empresa = ${idEmpresa} ORDER BY ${parametro} ${desc};`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `SELECT * FROM usuario WHERE fk_empresa = ${idEmpresa} ORDER BY ${parametro} ${desc};`;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}   


function pesquisarAdmin(pesquisar, idEmpresa) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = ``;
    
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `select * from usuario WHERE nome LIKE '${pesquisar}' || email LIKE '${pesquisar}' || area LIKE '${pesquisar}' || cargo LIKE '${pesquisar}' && fk_empresa = ${idEmpresa};`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `select * from usuario WHERE nome LIKE '${pesquisar}' || email LIKE '${pesquisar}' || area LIKE '${pesquisar}' || cargo LIKE '${pesquisar}' && fk_empresa = ${idEmpresa};`;
    }
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    autenticar,
    cadastrar,
    dadosDaEmpresa,
    listarUsuarios,
    deletarUsuario,
    editarUsuario,
    editarEmpresa,
    editarSenhaEmpresa,
    parametroEmpresa,
    pesquisarAdmin
    
}