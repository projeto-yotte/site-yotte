SELECT
    funcionario.id_usuario id_func,
    COUNT(alerta.id_alerta) as count_alertas,
    admin.nome as admins,
    funcionario.nome as funcionario
FROM 
	usuario as admin 
JOIN 
	token ON admin.id_usuario = token.fk_usuario
JOIN
    maquina ON token.idtoken = maquina.fk_token
JOIN 
	usuario as funcionario ON funcionario.id_usuario = maquina.fk_usuario
JOIN 
	dados_captura 
JOIN 
	alerta ON dados_captura.id_dados_captura = alerta.fk_dados_captura
JOIN 
	empresa ON funcionario.fk_empresa = id_empresa
	WHERE admin.id_usuario = 1 AND id_empresa = 1
    GROUP BY id_func, admins, funcionario;