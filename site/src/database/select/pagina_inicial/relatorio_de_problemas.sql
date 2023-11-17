SELECT
    maquina.id_maquina,
    COUNT(CASE WHEN componente.nome like '%CPU%' THEN alerta.id_alerta END) AS count_alerta_cpu,
    COUNT(CASE WHEN componente.nome like 'RAM%' THEN alerta.id_alerta END) AS count_alerta_ram,
    COUNT(CASE WHEN componente.nome like '%HD%' OR '%SSD' THEN alerta.id_alerta END) AS count_alerta_disco
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
    id_maquina;