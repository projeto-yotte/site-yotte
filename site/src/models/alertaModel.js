var database = require("../database/config");

function listar() {

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
            SELECT
                    funcionario.nome nome,
                    descricao,
                    ip
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
                JOIN 
                    alerta ON dados_captura.id_dados_captura = alerta.fk_dados_captura
                JOIN 
                    empresa ON funcionario.fk_empresa = id_empresa
                    WHERE admin.id_usuario = 1 AND id_empresa = 1;
                    `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            SELECT
                funcionario.nome nome,
                descricao,
                ip
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
            JOIN 
                alerta ON dados_captura.id_dados_captura = alerta.fk_dados_captura
            JOIN 
                empresa ON funcionario.fk_empresa = id_empresa
                WHERE admin.id_usuario = 1 AND id_empresa = 1;
                `;
    }
   
    return database.executar(instrucao);
    
}

module.exports = {
    listar,
}
