
var database = require("../database/config")
function componentesPrincipais(id_funcionario) {

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        WITH Porcentagens AS (
            SELECT
                componente.nome,
                ROUND(
                    CASE
                        WHEN componente.nome = 'cpu' THEN dados_captura.uso / 100 * 100
                        WHEN componente.nome IN ('disco', 'memoria') THEN dados_captura.uso / info_componente.total * 100
                        ELSE 0 
                    END, 2
                ) AS porcentagem,
                dados_captura.uso,
                info_componente.total,
                usuario.id_usuario,
                dados_captura.data_captura
            FROM
                dados_captura
                JOIN componente ON dados_captura.fk_componente = componente.id_componente
                JOIN info_componente ON info_componente.id_info = componente.fk_info
                JOIN maquina ON componente.id_componente = maquina.id_maquina
                JOIN usuario ON usuario.id_usuario = maquina.fk_usuario
            WHERE
                (
                    (componente.nome = 'cpu' AND dados_captura.uso IS NOT NULL)
                    OR
                    (componente.nome IN ('disco', 'memoria') AND dados_captura.uso IS NOT NULL)
                )
                AND dados_captura.data_captura >= DATEADD(DAY, -10, GETDATE())
                AND usuario.id_usuario = ${id_funcionario}
        ),
        PorcentagensOrdenadas AS (
            SELECT
                nome,
                porcentagem,
                uso,
                total,
                id_usuario,
                data_captura,
                ROW_NUMBER() OVER (PARTITION BY nome ORDER BY data_captura DESC) AS row_num
            FROM
                Porcentagens
        )
        SELECT *
        FROM
            PorcentagensOrdenadas
        WHERE
            row_num = 1;              
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        WITH Porcentagens AS (
            SELECT
              componente.nome,
              ROUND(
                CASE
                  WHEN componente.nome = 'cpu' THEN dados_captura.uso / 100 * 100
                  WHEN componente.nome IN ('disco', 'memoria') THEN dados_captura.uso / info_componente.total * 100
                  ELSE 0 -- Adicione condições adicionais conforme necessário
                END, 2
              ) AS porcentagem,
              uso,
              total,
              id_usuario,
              dados_captura.data_captura
            FROM
              dados_captura
              JOIN componente ON dados_captura.fk_componente = componente.id_componente
              JOIN info_componente ON info_componente.id_info = componente.fk_info
              JOIN maquina ON componente.id_componente = maquina.id_maquina
              JOIN usuario ON usuario.id_usuario = maquina.fk_usuario
            WHERE
              (
                (componente.nome = 'cpu' AND dados_captura.uso IS NOT NULL)
                OR
                (componente.nome IN ('disco', 'memoria') AND dados_captura.uso IS NOT NULL)
              )
              AND dados_captura.data_captura >= CURDATE() - INTERVAL 10 DAY
              AND usuario.id_usuario = ${id_funcionario}
          ),
          PorcentagensOrdenadas AS (
            SELECT
              nome,
              porcentagem,
              uso,
              total,
              id_usuario,
              data_captura,
              ROW_NUMBER() OVER (PARTITION BY nome ORDER BY data_captura DESC) AS row_num
            FROM
              Porcentagens
          )
          SELECT *
          FROM
            PorcentagensOrdenadas
          WHERE
            row_num = 1;
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
    COUNT(CASE WHEN componente.nome = 'cpu' THEN alerta.id_alerta END) AS qtd_alertas_cpu,
    COUNT(CASE WHEN componente.nome = 'memoria' THEN alerta.id_alerta END) AS qtd_alertas_memoria,
    COUNT(CASE WHEN componente.nome = 'disco' THEN alerta.id_alerta END) AS qtd_alertas_disco
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
    maquina.id_maquina, usuario.nome;

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
                dc.data_captura >= DATEADD(DAY, -30, GETDATE())
                AND c.fk_maquina = ${id_maquina}
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
                    CAST((capacidade_total / media_uso_diario) AS INT)
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
                AND c.fk_maquina = ${id_maquina}
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
                empresa.nome AS nomeEmpresa,
                usuario.nome AS nomeUsuario,
                id_usuario,
                empresa.id_empresa,
                LAG(data_captura) OVER (PARTITION BY id_maquina ORDER BY data_captura) AS data_captura_anterior,
                desligada
            FROM dados_captura
            JOIN componente ON dados_captura.fk_componente = componente.id_componente
            JOIN maquina ON componente.fk_maquina = maquina.id_maquina
            JOIN usuario ON maquina.fk_usuario = usuario.id_usuario
            JOIN empresa ON usuario.fk_empresa = empresa.id_empresa
            WHERE data_captura >= DATEADD(DAY, -7, GETDATE()) 
        )
        SELECT
            id_maquina,
            DATEDIFF(HOUR, MAX(data_captura_anterior), MIN(data_captura)) AS tempo_inatividade_horas
        FROM DiferencaCapturas
        WHERE id_usuario = ${id_usuario}
        GROUP BY id_maquina
        ORDER BY tempo_inatividade_horas ASC;
`;
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

function tempoJanela(id_maquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT
            j.titulo AS nome_janela,
            SUM(CASE WHEN j.visivel = 1 THEN TIMESTAMPDIFF(MINUTE, j.data_captura, COALESCE((SELECT MIN(data_captura) FROM janela WHERE id_janela > j.id_janela AND fk_maquina = j.fk_maquina AND visivel = 0 AND DATE(data_captura) = CURDATE() - INTERVAL 1 DAY), NOW())) ELSE 0 END) AS tempo_segundo_plano_em_minutos,
            SUM(CASE WHEN j.visivel = 0 THEN TIMESTAMPDIFF(MINUTE, j.data_captura, COALESCE((SELECT MIN(data_captura) FROM janela WHERE id_janela > j.id_janela AND fk_maquina = j.fk_maquina AND visivel = 1 AND DATE(data_captura) = CURDATE() - INTERVAL 1 DAY), NOW())) ELSE 0 END) AS tempo_primeiro_plano_em_minutos,
            j.pid,
            j.data_captura
        FROM
            janela j
        LEFT JOIN
            processo p ON j.pid = p.pid AND j.fk_maquina = p.fk_maquina
        WHERE
            j.fk_maquina = ${id_maquina}
            AND DATE(j.data_captura) >= CURDATE() - INTERVAL 1 DAY -- Considera o dia anterior
            AND j.data_captura >= NOW() - INTERVAL 1 HOUR -- Filtra janelas usadas na última hora
        GROUP BY
            j.titulo, j.pid, j.data_captura
        ORDER BY
            j.data_captura desc
        LIMIT 20;
`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT
            j.titulo AS nome_janela,
            SUM(CASE WHEN j.visivel = 1 THEN TIMESTAMPDIFF(MINUTE, j.data_captura, COALESCE((SELECT MIN(data_captura) FROM janela WHERE id_janela > j.id_janela AND fk_maquina = j.fk_maquina AND visivel = 0 AND DATE(data_captura) = CURDATE() - INTERVAL 1 DAY), NOW())) ELSE 0 END) AS tempo_segundo_plano_em_minutos,
            SUM(CASE WHEN j.visivel = 0 THEN TIMESTAMPDIFF(MINUTE, j.data_captura, COALESCE((SELECT MIN(data_captura) FROM janela WHERE id_janela > j.id_janela AND fk_maquina = j.fk_maquina AND visivel = 1 AND DATE(data_captura) = CURDATE() - INTERVAL 1 DAY), NOW())) ELSE 0 END) AS tempo_primeiro_plano_em_minutos,
            j.pid,
            j.data_captura
        FROM
            janela j
        LEFT JOIN
            processo p ON j.pid = p.pid AND j.fk_maquina = p.fk_maquina
        WHERE
            j.fk_maquina = ${id_maquina}
            AND DATE(j.data_captura) >= CURDATE() - INTERVAL 1 DAY -- Considera o dia anterior
            AND j.data_captura >= NOW() - INTERVAL 1 HOUR -- Filtra janelas usadas na última hora
        GROUP BY
            j.titulo, j.pid, j.data_captura
        ORDER BY
            j.data_captura desc
        LIMIT 20;
        `;
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
    tempoInatividade,
    tempoJanela
};