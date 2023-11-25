var express = require("express");
var router = express.Router();


var dashEspecificaController = require("../controllers/dashEspecificaController");


router.get("/componentesPrincipais/:id_funcionario", function (req, res) {
    dashEspecificaController.componentesPrincipais(req, res);
});


router.get("/relatorioProblema/:id_usuario", function (req, res) {
    dashEspecificaController.relatorioProblema(req, res);
});



router.get("/tempoInatividade/:id_usuario", function (req, res) {
    dashEspecificaController.tempoInatividade(req, res);
});

module.exports = router;