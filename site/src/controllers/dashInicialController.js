var dashInicialModel = require("../models/dashInicialModel");



function AtivosInativos(req, res) {
    var id_empresa = req.params.id_empresa;

    dashInicialModel.AtivosInativos(id_empresa).then(function (resultado) {
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

function foraDoEspediente(req, res) {
    var id_admin = req.params.id_admin;

    dashInicialModel.foraDoEspediente(id_admin)
        .then(function (response) {
            if (response.length > 0) {
                res.status(200).json(response);
            } else {
                res.status(204).send("Nenhuma máquina encontrada!");
            }
        })
        .catch(function (error) {
            console.error(error);
            res.status(500).json({ message: "Erro ao buscar máquinas" });
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
    foraDoEspediente,
    AtivosInativos,
    relatorioProblemasUltimas,
    
}