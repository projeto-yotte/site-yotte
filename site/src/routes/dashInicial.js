var express = require("express");
var router = express.Router();
var dashInicialController = require("../controllers/dashInicialController");


router.get("/AtivosInativosUltimas/:id_empresa", function (req, res) {
    dashInicialController.AtivosInativosUltimas(req, res);
});

router.get("/foraDoEspediente/:id_admin", function (req, res) {
    dashInicialController.foraDoEspediente(req, res);
});

router.get("/ativosInativos/:id_empresa", function (req, res) {
    dashInicialController.AtivosInativos(req, res);
});

router.get("/relatorioProblemasUltimas/:id_empresa", function (req, res) {
    dashInicialController.relatorioProblemasUltimas(req, res);
});

router.get("/tempoInatividadeUltimas/:id_empresa", function (req, res) {
    dashInicialController.tempoInatividadeUltimas(req, res);
});




module.exports = router;