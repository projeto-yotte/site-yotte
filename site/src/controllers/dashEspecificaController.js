var dashEspecificaModel = require("../models/dashEspecificaModel");

    
function componentesPrincipais(req, res) {


    var id_usuario = req.params.id_usuario;

    dashEspecificaModel.componentesPrincipais(id_usuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function relatorioProblema(req, res) {


    var id_usuario = req.params.id_usuario;

    dashEspecificaModel.relatorioProblema(id_usuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function tempoInatividade(req, res) {


    var id_usuario = req.params.id_usuario;

    dashEspecificaModel.tempoInatividade(id_usuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    componentesPrincipais,
    relatorioProblema,
    tempoInatividade
}