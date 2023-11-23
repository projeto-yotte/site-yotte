var dashInicialModel = require("../models/dashInicialModel");



function AtivosInativosUltimas(req, res) {


    var id_empresa = req.params.id_empresa;

    dashInicialModel.AtivosInativosUltimas(id_empresa).then(function (resultado) {
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

function foraExpedienteUltima(req, res) {


    var id_empresa = req.params.id_empresa;

    dashInicialModel.foraExpedienteUltima(id_empresa).then(function (resultado) {
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


function relatorioProblemasUltimas(req, res) {


    var id_empresa = req.params.id_empresa;

    dashInicialModel.relatorioProblemasUltimas(id_empresa).then(function (resultado) {
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
function tempoInatividadeUltimas(req, res) {


    var id_empresa = req.params.id_empresa;

    dashInicialModel.tempoInatividadeUltimas(id_empresa).then(function (resultado) {
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
    tempoInatividadeUltimas,
    foraExpedienteUltima,
    AtivosInativosUltimas,
    relatorioProblemasUltimas,
    
}