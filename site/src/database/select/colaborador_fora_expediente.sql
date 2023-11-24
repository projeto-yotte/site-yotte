WITH DiferencaCapturas AS (
    SELECT
        id_maquina,
        usuario.nome as nome_usuario,
        id_usuario,
        DATE(data_captura) AS data_captura_dia,
        MIN(data_captura) AS primeira_captura_dia,
        MAX(data_captura) AS ultima_captura_dia,
        desligada,
        CASE
            WHEN HOUR(MIN(data_captura)) < 9 OR HOUR(MAX(data_captura)) > 17 THEN true
            ELSE false
        END AS aviso
    FROM dados_captura
    JOIN componente ON dados_captura.fk_componente = componente.id_componente
    JOIN maquina ON componente.fk_maquina = maquina.id_maquina
    JOIN usuario ON maquina.fk_usuario = usuario.id_usuario
    GROUP BY id_maquina, nome_usuario, id_usuario, data_captura_dia, desligada
)
SELECT
    id_maquina,
    nome_usuario,
    MAX(ultima_captura_dia) AS ultima_captura,
    MIN(primeira_captura_dia) AS primeira_captura,
    TIMESTAMPDIFF(MINUTE, MIN(primeira_captura_dia), MAX(ultima_captura_dia)) AS tempo_atividade_minutos,
    MAX(aviso) AS aviso
FROM DiferencaCapturas
WHERE desligada = 0
AND id_usuario = 1
GROUP BY id_maquina, nome_usuario;
