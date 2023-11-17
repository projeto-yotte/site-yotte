WITH DiferencaCapturas AS (
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
WHERE id_empresa = 1
AND id_usuario = 1
GROUP BY id_maquina
ORDER BY tempo_inatividade_horas ASC;