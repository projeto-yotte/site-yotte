SELECT
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
    AND id_empresa = 1
  GROUP BY maquina.id_maquina
  ORDER BY maquina.id_maquina DESC
) AS maquinas;