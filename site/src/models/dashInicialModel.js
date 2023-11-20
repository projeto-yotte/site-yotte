var database = require("../database/config")


function AtivosInativosUltimas(id_empresa) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = ``;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function foraExpedienteUltima(id_empresa) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = ``;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function relatorioProblemasUltimas(id_empresa) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT
        SUM(count_alerta_cpu) AS total_alerta_cpu,
        SUM(count_alerta_ram) AS total_alerta_ram,
        SUM(count_alerta_disco) AS total_alerta_disco
    FROM (
        SELECT
            maquina.id_maquina,
            COUNT(CASE WHEN componente.nome LIKE '%CPU%' THEN alerta.id_alerta END) AS count_alerta_cpu,
            COUNT(CASE WHEN componente.nome LIKE 'RAM%' THEN alerta.id_alerta END) AS count_alerta_ram,
            COUNT(CASE WHEN componente.nome LIKE '%HD%' OR componente.nome LIKE '%SSD%' THEN alerta.id_alerta END) AS count_alerta_disco
        FROM
            alerta
        JOIN dados_captura ON alerta.fk_dados_captura = dados_captura.id_dados_captura
        JOIN componente ON dados_captura.fk_componente = componente.id_componente
        JOIN maquina ON componente.fk_maquina = maquina.id_maquina
        JOIN usuario ON maquina.fk_usuario = usuario.id_usuario
        JOIN empresa ON usuario.fk_empresa = empresa.id_empresa
        WHERE
            empresa.id_empresa = ${id_empresa}
        GROUP BY
            maquina.id_maquina
    ) AS subquery;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT
        SUM(count_alerta_cpu) AS total_alerta_cpu,
        SUM(count_alerta_ram) AS total_alerta_ram,
        SUM(count_alerta_disco) AS total_alerta_disco
    FROM (
        SELECT
            maquina.id_maquina,
            COUNT(CASE WHEN componente.nome LIKE '%CPU%' THEN alerta.id_alerta END) AS count_alerta_cpu,
            COUNT(CASE WHEN componente.nome LIKE 'RAM%' THEN alerta.id_alerta END) AS count_alerta_ram,
            COUNT(CASE WHEN componente.nome LIKE '%HD%' OR componente.nome LIKE '%SSD%' THEN alerta.id_alerta END) AS count_alerta_disco
        FROM
            alerta
        JOIN dados_captura ON alerta.fk_dados_captura = dados_captura.id_dados_captura
        JOIN componente ON dados_captura.fk_componente = componente.id_componente
        JOIN maquina ON componente.fk_maquina = maquina.id_maquina
        JOIN usuario ON maquina.fk_usuario = usuario.id_usuario
        JOIN empresa ON usuario.fk_empresa = empresa.id_empresa
        WHERE
            empresa.id_empresa = ${id_empresa}
        GROUP BY
            maquina.id_maquina
    ) AS subquery;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function tempoInatividadeUltimas(id_empresa) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `WITH DiferencaCapturas AS (
            SELECT
                id_maquina,
                data_captura,
                empresa.nome as nomeEmpresa,
                usuario.nome as nomeUsuario,
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
        WHERE id_empresa = ${id_empresa}
        GROUP BY id_maquina
        ORDER BY tempo_inatividade_horas ASC
        LIMIT 3;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `WITH DiferencaCapturas AS (
            SELECT
                id_maquina,
                data_captura,
                empresa.nome as nomeEmpresa,
                usuario.nome as nomeUsuario,
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
        WHERE id_empresa = ${id_empresa}
        GROUP BY id_maquina
        ORDER BY tempo_inatividade_horas ASC
        LIMIT 3;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    tempoInatividadeUltimas,
    foraExpedienteUltima,
    AtivosInativosUltimas,
    relatorioProblemasUltimas
};