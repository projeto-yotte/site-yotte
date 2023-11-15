WITH DiferencaCapturas AS (
    SELECT
        id_maquina,
        usuario.nome as nome_usuario,
        id_usuario,
        MAX(data_captura) as ultima_captura_dia,
        MIN(data_captura) AS primeira_captura_dia,
        desligada,
        CASE
            WHEN HOUR(MIN(data_captura)) < 7 OR HOUR(MAX(data_captura)) > 19 THEN true
            ELSE false
        END AS aviso
    FROM dados_captura
    JOIN componente ON dados_captura.fk_componente = componente.id_componente
    JOIN maquina ON componente.fk_maquina = maquina.id_maquina
    JOIN usuario ON maquina.fk_usuario = usuario.id_usuario
    WHERE DATE(data_captura) = CURDATE() -- Considera apenas os dados do dia de hoje
    GROUP BY id_maquina, nome_usuario, id_usuario, desligada
)
SELECT
    id_maquina,
    nome_usuario,
    SUM(CASE WHEN aviso THEN TIMESTAMPDIFF(MINUTE, primeira_captura_dia, ultima_captura_dia) ELSE 0 END) AS tempo_fora_expediente_minutos
FROM DiferencaCapturas
GROUP BY id_maquina, nome_usuario
ORDER BY tempo_fora_expediente_minutos DESC;