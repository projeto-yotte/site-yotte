SELECT
    j.titulo AS nome_janela,
    SUM(CASE WHEN j.visivel = 1 THEN TIMESTAMPDIFF(MINUTE, j.data_captura, COALESCE((SELECT MIN(data_captura) FROM janela WHERE id_janela > j.id_janela AND fk_maquina = j.fk_maquina AND visivel = 0 AND DATE(data_captura) = CURDATE() - INTERVAL 1 DAY), NOW())) ELSE 0 END) AS tempo_segundo_plano_em_minutos,
    SUM(CASE WHEN j.visivel = 0 THEN TIMESTAMPDIFF(MINUTE, j.data_captura, COALESCE((SELECT MIN(data_captura) FROM janela WHERE id_janela > j.id_janela AND fk_maquina = j.fk_maquina AND visivel = 1 AND DATE(data_captura) = CURDATE() - INTERVAL 1 DAY), NOW())) ELSE 0 END) AS tempo_primeiro_plano_em_minutos,
    j.pid,
    j.data_captura
FROM
    janela j
LEFT JOIN
    processo p ON j.pid = p.pid AND j.fk_maquina = p.fk_maquina
WHERE
    j.fk_maquina = 1
    AND DATE(j.data_captura) >= CURDATE() - INTERVAL 1 DAY -- Considera o dia anterior
    AND j.data_captura >= NOW() - INTERVAL 1 HOUR -- Filtra janelas usadas na última hora
GROUP BY
    j.titulo, j.pid, j.data_captura
ORDER BY
    j.data_captura desc;
