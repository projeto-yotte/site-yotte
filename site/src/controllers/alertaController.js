var alertaModel = require("../models/alertaModel");

function listar(req, res) {
    alertaModel.listar().then(function (resposta) {
        if (resposta.length > 0) {
            res.status(200).json(resposta);
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