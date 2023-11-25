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
