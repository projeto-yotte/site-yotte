var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
    SELECT id_empresa, email, senha FROM empresa where email = '${email}' and '${senha}';

    `;
    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}

function loginAdm(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
    SELECT  email, senha FROM usuario where email = '${email}' and '${senha}';

    `;
    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome,cnpj, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome,cnpj, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO empresa (nome_fantasia, cnpj, email, senha) VALUES ('${nome}', '${cnpj}', '${email}', '${senha} ');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarAdm(nome,area, cargo, email ,senha, fk_empresa, fk_tipo_usuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome,area, cargo,email, senha, fk_empresa, fk_tipo_usuario);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO usuario (nome, area, cargo, email, senha, fk_empresa, fk_tipo_usuario ) VALUES ('${nome}', '${area}', '${cargo}','${email}' ,'${senha}', '${fk_empresa}','${fk_tipo_usuario}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarUser(nome,area, cargo, email , fk_empresa,fk_tipo_usuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome,area, cargo,email, fk_empresa, fk_tipo_usuario);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO usuario (nome, area, cargo, email, fk_empresa, fk_tipo_usuario) VALUES ('${nome}', '${area}', '${cargo}','${email}', '${fk_empresa}', '${fk_tipo_usuario}');
    `;

    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function cadastrarToken(token) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", token);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `INSERT INTO token(token, data_criado) VALUES('${token}', now())`

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function dadosDaEmpresa(id_empresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", id_empresa)
    var instrucao = `
        
                    SELECT * FROM empresa WHERE id_empresa = ${id_empresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function listarUsuarios(id_empresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", id_empresa)
    var instrucao = `
        
                    SELECT * FROM empresa JOIN usuario	WHERE
                    id_empresa = fk_empresa and id_empresa = ${id_empresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletarUsuario(id_Usuario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", id_Usuario);
    var instrucao = `
    
        DELETE FROM usuario WHERE id_Usuario = ${id_Usuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function editarUsuario(id_Adm,nomeAdm, areaAdm, cargoAdm) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", id_Adm, nomeAdm, areaAdm, cargoAdm);
    var instrucao = `
        
    UPDATE usuario SET nome = '${nomeAdm}',  area = '${areaAdm}', cargo = '${cargoAdm}' WHERE id_usuario = ${id_Adm};
`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function editarEmpresa(idEmpresa, nomeEmpresa,nomeFantasiaEmpresa, cpnjEmpresa, emailEmpresa ) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", idEmpresa, nomeEmpresa,nomeFantasiaEmpresa, cpnjEmpresa, emailEmpresa );
    var instrucao = `
        
    UPDATE empresa SET nome = '${nomeEmpresa}',  nome_fantasia = '${nomeFantasiaEmpresa}', cnpj = '${cpnjEmpresa}', email= '${emailEmpresa}' WHERE id_empresa = ${idEmpresa};
`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function editarSenhaEmpresa(idEmpresa, novaSenha ) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", idEmpresa, novaSenha );
    var instrucao = `
        
    UPDATE empresa SET senha = '${novaSenha}' WHERE id_empresa = ${idEmpresa};
`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}



module.exports = {
    autenticar,
    cadastrar,
    cadastrarAdm,
    loginAdm,
    cadastrarUser,
    cadastrarToken,
    dadosDaEmpresa,
    listarUsuarios,
    deletarUsuario,
    editarUsuario,
    editarEmpresa,
    editarSenhaEmpresa
};