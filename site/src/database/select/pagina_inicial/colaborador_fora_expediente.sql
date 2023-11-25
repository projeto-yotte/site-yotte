WITH DiferencaCapturas AS (
    SELECT
        maquina.id_maquina,
        usuario.nome as nome_usuario,
        MAX(dados_captura.data_captura) as ultima_captura_dia,
        MIN(dados_captura.data_captura) AS primeira_captura_dia,
        CASE
            WHEN HOUR(MIN(dados_captura.data_captura)) < 7 OR HOUR(MAX(dados_captura.data_captura)) > 19 THEN true
            ELSE false
        END AS aviso
    FROM
        usuario AS admin
    JOIN
        token ON admin.id_usuario = token.fk_usuario
    JOIN
        maquina ON token.idtoken = maquina.fk_token
    JOIN
        usuario ON maquina.fk_usuario = usuario.id_usuario
    JOIN
        componente ON maquina.id_maquina = componente.fk_maquina
    JOIN
        dados_captura ON dados_captura.fk_componente = componente.id_componente
    WHERE
        admin.id_usuario = 1 -- Filtre pelo ID do admin
        AND DATE(dados_captura.data_captura) = CURDATE() -- Considera apenas os dados do dia de hoje
    GROUP BY maquina.id_maquina, nome_usuario
)
SELECT
    id_maquina,
    nome_usuario,
    ultima_captura_dia,
    SUM(CASE WHEN aviso THEN TIMESTAMPDIFF(MINUTE, primeira_captura_dia, ultima_captura_dia) ELSE 0 END) AS tempo_fora_expediente_minutos
FROM DiferencaCapturas
GROUP BY id_maquina, nome_usuario
ORDER BY tempo_fora_expediente_minutos DESC;
