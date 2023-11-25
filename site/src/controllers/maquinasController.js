var maquinaModel = require("../models/maquinaModel");



function listarMaquinas(req, res) {
    var id_admin = req.params.id_admin;

    maquinaModel.listarMaquinas(id_admin)
        .then(function (resultado) {

            if (resultado.length > 0) {
                res.status(200).json(resultado);
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
    listarMaquinas,
   
}