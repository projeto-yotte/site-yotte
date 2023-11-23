SELECT
    usuario.id_usuario,
    usuario.nome AS nome_usuario,
    COUNT(alerta.id_alerta) AS quantidade_alertas
FROM
	empresa
JOIN 
	usuario on empresa.id_empresa = usuario.fk_empresa
JOIN
    maquina ON usuario.id_usuario = maquina.fk_usuario
LEFT JOIN
    componente ON maquina.id_maquina = componente.fk_maquina
LEFT JOIN
    dados_captura ON componente.id_componente = dados_captura.fk_componente
LEFT JOIN
    alerta ON dados_captura.id_dados_captura = alerta.fk_dados_captura
WHERE
    empresa.id_empresa = 'xpto'
GROUP BY
    usuario.id_usuario
ORDER BY
    quantidade_alertas DESC;