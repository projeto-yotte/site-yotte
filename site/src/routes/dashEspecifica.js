var express = require("express");
var router = express.Router();


var dashEspecificaController = require("../controllers/dashEspecificaController");


router.get("/componentesPrincipais/:id_funcionario", function (req, res) {
    dashEspecificaController.componentesPrincipais(req, res);
});


router.get("/relatorioProblema/:id_funcionario", function (req, res) {
    dashEspecificaController.relatorioProblema(req, res);
});

router.get("/usoDisco/:id_maquina", function (req, res) {
    dashEspecificaController.usoDisco(req, res);
});



router.get("/tempoInatividade/:id_usuario", function (req, res) {
    dashEspecificaController.tempoInatividade(req, res);
});

router.get("/tempoJanela/:id_maquina", function (req, res) {
    dashEspecificaController.tempoJanela(req, res);
});

module.exports = router;