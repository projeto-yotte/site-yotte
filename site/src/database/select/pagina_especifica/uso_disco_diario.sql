WITH UsoDiario AS (
    SELECT
        maquina.id_maquina,
        dados_captura.data_captura,
        AVG(COALESCE(dados_captura.uso, 0)) AS media_uso_diario,
        info_componente.total AS capacidade_total
    FROM
        maquina
    JOIN componente ON maquina.id_maquina = componente.fk_maquina AND componente.nome LIKE '%disco%'
    JOIN dados_captura ON componente.id_componente = dados_captura.fk_componente
    JOIN info_componente ON componente.fk_info = info_componente.id_info
    WHERE
        maquina.id_maquina = 1 
        AND dados_captura.data_captura BETWEEN CURRENT_DATE - INTERVAL 30 DAY AND CURRENT_DATE
    GROUP BY
        maquina.id_maquina, dados_captura.data_captura, info_componente.total
)
SELECT
    id_maquina,
    CASE
        WHEN media_uso_diario > 0 AND capacidade_total > 0 THEN
            ROUND((media_uso_diario / capacidade_total) * 100, 4) 
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