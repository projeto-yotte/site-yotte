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
        u.id_usuario = 2
    GROUP BY
        dc.fk_componente
) AS ultimas_capturas ON c.id_componente = ultimas_capturas.fk_componente
JOIN
    dados_captura dc ON ultimas_capturas.fk_componente = dc.fk_componente AND ultimas_capturas.ultima_captura = dc.data_captura;