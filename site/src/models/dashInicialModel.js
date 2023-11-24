var database = require("../database/config")


function AtivosInativos(id_empresa) {

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT
        COUNT(CASE WHEN desligada = 0 THEN 1 END) AS count_ligadas,
        COUNT(CASE WHEN desligada = 1 THEN 1 END) AS count_desligadas
      FROM (
        SELECT
          maquina.id_maquina,
          MAX(dados_captura.desligada) AS desligada
        FROM dados_captura
          JOIN componente ON dados_captura.fk_componente = componente.id_componente
          JOIN maquina ON componente.fk_maquina = maquina.id_maquina
          JOIN usuario ON maquina.fk_usuario = usuario.id_usuario
          JOIN empresa on usuario.fk_empresa = empresa.id_empresa
          AND id_empresa = ${id_empresa}
        GROUP BY maquina.id_maquina
        ORDER BY maquina.id_maquina DESC
      ) AS maquinas;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT
        COUNT(CASE WHEN desligada = 0 THEN 1 END) AS count_ligadas,
        COUNT(CASE WHEN desligada = 1 THEN 1 END) AS count_desligadas
      FROM (
        SELECT
          maquina.id_maquina,
          MAX(dados_captura.desligada) AS desligada
        FROM dados_captura
          JOIN componente ON dados_captura.fk_componente = componente.id_componente
          JOIN maquina ON componente.fk_maquina = maquina.id_maquina
          JOIN usuario ON maquina.fk_usuario = usuario.id_usuario
          JOIN empresa on usuario.fk_empresa = empresa.id_empresa
          AND id_empresa = ${id_empresa}
        GROUP BY maquina.id_maquina
        ORDER BY maquina.id_maquina DESC
      ) AS maquinas;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function foraDoEspediente(maquinas) {

    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", maquinas)
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `WITH DiferencaCapturas AS (
            SELECT
                id_maquina,
                usuario.nome as nome_usuario,
                id_usuario,
                MAX(data_captura) as ultima_captura_dia,
                MIN(data_captura) AS primeira_captura_dia,
                desligada,
                CASE
                    WHEN HOUR(MIN(data_captura)) < 7 OR HOUR(MAX(data_captura)) > 19 THEN true
                    ELSE false
                END AS aviso
            FROM dados_captura
            JOIN componente ON dados_captura.fk_componente = componente.id_componente
            JOIN maquina ON componente.fk_maquina = maquina.id_maquina
            JOIN usuario ON maquina.fk_usuario = usuario.id_usuario
            WHERE DATE(data_captura) = CURDATE() -- Considera apenas os dados do dia de hoje
            GROUP BY id_maquina, nome_usuario, id_usuario, desligada
        )
        SELECT
            id_maquina,
            nome_usuario,
            SUM(CASE WHEN aviso THEN TIMESTAMPDIFF(MINUTE, primeira_captura_dia, ultima_captura_dia) ELSE 0 END) AS tempo_fora_expediente_minutos
        FROM DiferencaCapturas
        GROUP BY id_maquina, nome_usuario
        ORDER BY tempo_fora_expediente_minutos DESC;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `WITH DiferencaCapturas AS (
            SELECT
                id_maquina,
                usuario.nome as nome_usuario,
                id_usuario,
                MAX(data_captura) as ultima_captura_dia,
                MIN(data_captura) AS primeira_captura_dia,
                desligada,
                CASE
                    WHEN HOUR(MIN(data_captura)) < 7 OR HOUR(MAX(data_captura)) > 19 THEN true
                    ELSE false
                END AS aviso
            FROM dados_captura
            JOIN componente ON dados_captura.fk_componente = componente.id_componente
            JOIN maquina ON componente.fk_maquina = maquina.id_maquina
            JOIN usuario ON maquina.fk_usuario = usuario.id_usuario
            WHERE DATE(data_captura) = CURDATE() -- Considera apenas os dados do dia de hoje
            GROUP BY id_maquina, nome_usuario, id_usuario, desligada
        )
        SELECT
            id_maquina,
            nome_usuario,
            SUM(CASE WHEN aviso THEN TIMESTAMPDIFF(MINUTE, primeira_captura_dia, ultima_captura_dia) ELSE 0 END) AS tempo_fora_expediente_minutos
        FROM DiferencaCapturas
        GROUP BY id_maquina, nome_usuario
        ORDER BY tempo_fora_expediente_minutos DESC;`;
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
    foraDoEspediente,
    AtivosInativos,
    relatorioProblemasUltimas
};