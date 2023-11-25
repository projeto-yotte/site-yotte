var database = require("../database/config")

function cadastrarUser(nome,area, cargo, email , fk_empresa,fk_tipo_usuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome,area, cargo,email, fk_empresa, fk_tipo_usuario);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO usuario (nome, area, cargo, email, fk_empresa, fk_tipo_usuario) VALUES ('${nome}', '${area}', '${cargo}','${email}', '${fk_empresa}', '${fk_tipo_usuario}');
    `;

    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarDadosFuncionario(id_funcionario) {
    var instrucao = `
        SELECT
        u.id_usuario as id_funcionario,
        u.nome as nome_funcionario,
        u.email as email_funcionario,
        u.area as area_funcionario,
        u.cargo as cargo_funcionario,
        m.id_maquina,
        m.ip,
        m.so,
        m.modelo
    FROM
        usuario u
    JOIN
        maquina m ON u.id_usuario = m.fk_usuario
    WHERE
        m.fk_usuario = ${id_funcionario}
    LIMIT 1;
    `;

    return database.executar(instrucao);
}




module.exports = {
    cadastrarUser,
    listarDadosFuncionario
};