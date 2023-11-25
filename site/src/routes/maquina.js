const express = require("express");
const router = express.Router();
const maquinasController = require("../controllers/maquinasController");

router.get('/maquinas/:id_admin', function (req, res) {

    try {
        maquinasController.listarMaquinas(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro interno do servidor");
    }
});



module.exports = router;
