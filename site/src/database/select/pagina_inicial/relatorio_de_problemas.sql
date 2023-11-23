SELECT
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
        empresa.id_empresa = 2
    GROUP BY
        maquina.id_maquina
) AS subquery;
