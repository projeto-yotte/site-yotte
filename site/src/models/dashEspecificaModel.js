
var database = require("../database/config")
function componentesPrincipais(id_usuario) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select * from empresa;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from empresa;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function relatorioProblema(id_usuario) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT
        maquina.id_maquina,
        usuario.nome,
        COUNT(CASE WHEN componente.nome = 'CPU' THEN alerta.id_alerta END) AS count_alerta_cpu,
        COUNT(CASE WHEN componente.nome= 'RAM' THEN alerta.id_alerta END) AS count_alerta_ram,
        COUNT(CASE WHEN componente.nome = 'HD' THEN alerta.id_alerta END) AS count_alerta_hd
    FROM
        alerta
    JOIN dados_captura ON alerta.fk_dados_captura = dados_captura.id_dados_captura
    JOIN componente ON dados_captura.fk_componente = componente.id_componente
    JOIN maquina ON componente.fk_maquina = maquina.id_maquina
    JOIN usuario ON maquina.fk_usuario = usuario.id_usuario
    JOIN empresa ON usuario.fk_empresa = empresa.id_empresa
    WHERE
        usuario.id_usuario = 6
    GROUP BY
        id_maquina, nome;
    `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT
        maquina.id_maquina,
        usuario.nome,
        COUNT(CASE WHEN componente.nome = 'CPU' THEN alerta.id_alerta END) AS count_alerta_cpu,
        COUNT(CASE WHEN componente.nome= 'RAM' THEN alerta.id_alerta END) AS count_alerta_ram,
        COUNT(CASE WHEN componente.nome = 'HD' THEN alerta.id_alerta END) AS count_alerta_hd
    FROM
        alerta
    JOIN dados_captura ON alerta.fk_dados_captura = dados_captura.id_dados_captura
    JOIN componente ON dados_captura.fk_componente = componente.id_componente
    JOIN maquina ON componente.fk_maquina = maquina.id_maquina
    JOIN usuario ON maquina.fk_usuario = usuario.id_usuario
    JOIN empresa ON usuario.fk_empresa = empresa.id_empresa
    WHERE
        usuario.id_usuario = 6
    GROUP BY
        id_maquina, nome;
    `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function tempoInatividade(id_usuario) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `WITH DiferencaCapturas AS (
            SELECT
                id_maquina,
                data_captura,
                empresa.nome as nomeEmpresa,
                usuario.nome as nomeUsuario,
                id_usuario,
                empresa.id_empresa,
                LAG(data_captura) OVER (PARTITION BY id_maquina ORDER BY data_captura) AS data_captura_anterior,
                desligada
            FROM dados_captura
            JOIN componente ON dados_captura.fk_componente = componente.id_componente
            JOIN maquina ON componente.fk_maquina = maquina.id_maquina
            JOIN usuario on maquina.fk_usuario = usuario.id_usuario
            JOIN empresa on usuario.fk_empresa = empresa.id_empresa
            WHERE data_captura >= CURRENT_DATE - INTERVAL 7 DAY
        )
        SELECT
            id_maquina,
            TIMESTAMPDIFF(HOUR, MAX(data_captura_anterior), MIN(data_captura)) AS tempo_inatividade_horas
        FROM DiferencaCapturas
        WHERE id_usuario = 1
        GROUP BY id_maquina
        ORDER BY tempo_inatividade_horas ASC;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `WITH DiferencaCapturas AS (
            SELECT
                id_maquina,
                data_captura,
                empresa.nome as nomeEmpresa,
                usuario.nome as nomeUsuario,
                id_usuario,
                empresa.id_empresa,
                LAG(data_captura) OVER (PARTITION BY id_maquina ORDER BY data_captura) AS data_captura_anterior,
                desligada
            FROM dados_captura
            JOIN componente ON dados_captura.fk_componente = componente.id_componente
            JOIN maquina ON componente.fk_maquina = maquina.id_maquina
            JOIN usuario on maquina.fk_usuario = usuario.id_usuario
            JOIN empresa on usuario.fk_empresa = empresa.id_empresa
            WHERE data_captura >= CURRENT_DATE - INTERVAL 7 DAY
        )
        SELECT
            id_maquina,
            TIMESTAMPDIFF(HOUR, MAX(data_captura_anterior), MIN(data_captura)) AS tempo_inatividade_horas
        FROM DiferencaCapturas
        WHERE id_usuario = ${id_usuario}
        GROUP BY id_maquina
        ORDER BY tempo_inatividade_horas ASC;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
module.exports = {
    componentesPrincipais,
    relatorioProblema,
    tempoInatividade
};