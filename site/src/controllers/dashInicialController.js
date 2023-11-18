var dashInicialModel = require("../models/dashInicialModel");

function tempoInatividade(req, res){
    var id_empresa = req.params.id_empresa;
    console.log(id_empresa)
    dashInicialModel.tempoInatividade(id_empresa)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os avisos: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    tempoInatividade
}