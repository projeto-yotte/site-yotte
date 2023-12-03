var alertaModel = require("../models/alertaModel");

function listar(req, res) {
    var id_admin = req.params.id_admin;
    var id_empresa = req.params.id_empresa;

    alertaModel.listar(id_admin, id_empresa).then(function (resposta) {
        if (resposta.length > 0) {
            res.status(200).json(resposta);
            console.log(JSON.stringify(resposta))
        } else {
            res.status(204).send("Nenhuma resposta encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    listar
}