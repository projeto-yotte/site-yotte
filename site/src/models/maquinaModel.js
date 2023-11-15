var database = require("../database/config")

function listarMaquinas(maquinas) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", maquinas)
    var instrucao = `SELECT
    id_maquina,
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
    GROUP BY id_maquina, funcionario;`


    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}

module.exports = {
    listarMaquinas
};