var dashEspecificaModel = require("../models/dashEspecificaModel");

    
function componentesPrincipais(req, res) {
    var id_funcionario = req.params.id_funcionario;

    dashEspecificaModel.componentesPrincipais(id_funcionario).then(function (resultado) {
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
    var id_funcionario = req.params.id_funcionario;

    dashEspecificaModel.relatorioProblema(id_funcionario).then(function (resultado) {
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

function usoDisco(req, res) {
    var id_maquina = req.params.id_maquina;

    dashEspecificaModel.usoDisco(id_maquina).then(function (resultado) {
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

function tempoJanela(req, res) {
    var id_maquina = req.params.id_maquina;

    dashEspecificaModel.tempoJanela(id_maquina).then(function (resultado) {
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
    usoDisco,
    tempoInatividade,
    tempoJanela
}