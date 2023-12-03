var database = require("../database/config")

function listarMaquinas(id_admin) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")
    
    var instrucao = ``;


    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        SELECT
            id_maquina,
            maquina.ip,
            funcionario.nome as funcionario,
            funcionario.id_usuario as id_funcionario
        FROM 
            usuario as admin
        JOIN 
            token ON admin.id_usuario = token.fk_usuario
        JOIN
            maquina ON token.idtoken = maquina.fk_token
        JOIN 
            usuario as funcionario ON funcionario.id_usuario = maquina.fk_usuario
        JOIN 
            dados_captura 
        LEFT JOIN 
            alerta ON dados_captura.id_dados_captura = alerta.fk_dados_captura
        WHERE admin.id_usuario = ${id_admin}
    GROUP BY id_maquina, funcionario`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
        SELECT
            id_maquina,
            maquina.ip,
            funcionario.nome as funcionario,
            funcionario.id_usuario as id_funcionario
        FROM 
            usuario as admin
        JOIN 
            token ON admin.id_usuario = token.fk_usuario
        JOIN
            maquina ON token.idtoken = maquina.fk_token
        JOIN 
            usuario as funcionario ON funcionario.id_usuario = maquina.fk_usuario
        JOIN 
            dados_captura 
        LEFT JOIN 
            alerta ON dados_captura.id_dados_captura = alerta.fk_dados_captura
        WHERE admin.id_usuario = ${id_admin}
        GROUP BY id_maquina, funcionario`;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}

module.exports = {
    listarMaquinas
};