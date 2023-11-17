var maquinaModel = require("../models/maquinaModel");

function listarMaquinas(req, res) {
    maquinaModel.listarMaquinas()
        .then(function (maquinas) {
            if (maquinas.length > 0) {
                res.status(200).json(maquinas);
            } else {
                res.status(204).send("Nenhuma máquina encontrada!");
            }
        })
        .catch(function (error) {
            console.error(error);
            res.status(500).json({ message: "Erro ao buscar máquinas" });
        });
}


module.exports = {
    listarMaquinas
}