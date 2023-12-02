var database = require("../database/config")

function listarMaquinas(id_admin) {

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT
        maquina.id_maquina,
        maquina.ip,
        funcionario.nome AS funcionario,
        funcionario.id_usuario AS id_funcionario
    FROM 
        usuario AS admin
    JOIN 
        token ON admin.id_usuario = token.fk_usuario
    JOIN
        maquina ON token.idtoken = maquina.fk_token
    JOIN 
        usuario AS funcionario ON funcionario.id_usuario = maquina.fk_usuario
    JOIN 
        componente ON maquina.id_maquina = componente.fk_maquina
    JOIN 
        dados_captura ON componente.id_componente = dados_captura.fk_componente
    LEFT JOIN 
        alerta ON dados_captura.id_dados_captura = alerta.fk_dados_captura
    WHERE admin.id_usuario = ${id_admin}
    GROUP BY maquina.id_maquina, maquina.ip, funcionario.nome, funcionario.id_usuario;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT
    maquina.id_maquina,
    maquina.ip,
    funcionario.nome AS funcionario,
    funcionario.id_usuario AS id_funcionario
FROM 
    usuario AS admin
JOIN 
    token ON admin.id_usuario = token.fk_usuario
JOIN
    maquina ON token.idtoken = maquina.fk_token
JOIN 
    usuario AS funcionario ON funcionario.id_usuario = maquina.fk_usuario
JOIN 
    componente ON maquina.id_maquina = componente.fk_maquina
JOIN 
    dados_captura ON componente.id_componente = dados_captura.fk_componente
LEFT JOIN 
    alerta ON dados_captura.id_dados_captura = alerta.fk_dados_captura
WHERE admin.id_usuario = ${id_admin}
GROUP BY maquina.id_maquina, maquina.ip, funcionario.nome, funcionario.id_usuario;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listarMaquinas
};