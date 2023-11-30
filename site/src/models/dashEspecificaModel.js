
var database = require("../database/config")
function componentesPrincipais(id_funcionario) {

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT
            c.id_componente,
            c.nome AS nome_componente,
            dc.uso
        FROM
            componente c
        JOIN (
            SELECT
                dc.fk_componente,
                MAX(dc.data_captura) AS ultima_captura
            FROM
                dados_captura dc
            JOIN
                componente comp ON dc.fk_componente = comp.id_componente
            JOIN
                maquina m ON comp.fk_maquina = m.id_maquina
            JOIN
                usuario u ON m.fk_usuario = u.id_usuario
            WHERE
                u.id_usuario = ${id_funcionario}
            GROUP BY
                dc.fk_componente
        ) AS ultimas_capturas ON c.id_componente = ultimas_capturas.fk_componente
        JOIN
            dados_captura dc ON ultimas_capturas.fk_componente = dc.fk_componente AND ultimas_capturas.ultima_captura = dc.data_captura;
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT
            c.id_componente,
            c.nome AS nome_componente,
            dc.uso
        FROM
            componente c
        JOIN (
            SELECT
                dc.fk_componente,
                MAX(dc.data_captura) AS ultima_captura
            FROM
                dados_captura dc
            JOIN
                componente comp ON dc.fk_componente = comp.id_componente
            JOIN
                maquina m ON comp.fk_maquina = m.id_maquina
            JOIN
                usuario u ON m.fk_usuario = u.id_usuario
            WHERE
                u.id_usuario = ${id_funcionario}
            GROUP BY
                dc.fk_componente
        ) AS ultimas_capturas ON c.id_componente = ultimas_capturas.fk_componente
        JOIN
            dados_captura dc ON ultimas_capturas.fk_componente = dc.fk_componente AND ultimas_capturas.ultima_captura = dc.data_captura;;
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function relatorioProblema(id_funcionario) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT
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
            usuario.id_usuario = ${id_funcionario}
        GROUP BY
            id_maquina, nome;
    `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT
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
            usuario.id_usuario = ${id_funcionario}
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

function usoDisco(id_maquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        WITH UsoDiario AS (
            SELECT
                c.id_componente,
                c.nome AS nome_componente,
                AVG((dc.byte_leitura + dc.byte_escrita) / ic.total) AS media_uso_diario,
                ic.total AS capacidade_total
            FROM
                componente c
            JOIN dados_captura dc ON c.id_componente = dc.fk_componente
            JOIN info_componente ic ON c.fk_info = ic.id_info
            WHERE
                dc.data_captura >= CURRENT_DATE - INTERVAL 30 DAY -- Ajuste na condição
                AND c.fk_maquina = 1 -- Substitua 1 pelo ID da máquina desejada
            GROUP BY
                c.id_componente, c.nome, ic.total
        )

        SELECT
            nome_componente,
            CASE
                WHEN media_uso_diario > 0 AND capacidade_total > 0 THEN
                    ROUND((media_uso_diario * 100), 4) 
                ELSE
                    NULL
            END AS porcentagem_uso_diario,
            CASE
                WHEN media_uso_diario > 0 AND capacidade_total > 0 THEN
                    CAST((capacidade_total / media_uso_diario) AS SIGNED)
                ELSE
                    NULL
            END AS dias_restantes
        FROM
            UsoDiario
        WHERE
            media_uso_diario > 0;

    `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        WITH UsoDiario AS (
            SELECT
                c.id_componente,
                c.nome AS nome_componente,
                AVG((dc.byte_leitura + dc.byte_escrita) / ic.total) AS media_uso_diario,
                ic.total AS capacidade_total
            FROM
                componente c
            JOIN dados_captura dc ON c.id_componente = dc.fk_componente
            JOIN info_componente ic ON c.fk_info = ic.id_info
            WHERE
                dc.data_captura >= CURRENT_DATE - INTERVAL 30 DAY -- Ajuste na condição
                AND c.fk_maquina = ${id_maquina} -- Substitua 1 pelo ID da máquina desejada
            GROUP BY
                c.id_componente, c.nome, ic.total
        )

        SELECT
            nome_componente,
            CASE
                WHEN media_uso_diario > 0 AND capacidade_total > 0 THEN
                    ROUND((media_uso_diario * 100), 4) 
                ELSE
                    NULL
            END AS porcentagem_uso_diario,
            CASE
                WHEN media_uso_diario > 0 AND capacidade_total > 0 THEN
                    CAST((capacidade_total / media_uso_diario) AS SIGNED)
                ELSE
                    NULL
            END AS dias_restantes
        FROM
            UsoDiario
        WHERE
            media_uso_diario > 0;

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
    usoDisco,
    tempoInatividade
};