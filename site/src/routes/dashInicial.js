var express = require("express");
var router = express.Router();
var dashInicialController = require("../controllers/dashInicialController");

router.get('/tempoInatividade/:id_empresa', function (req, res) {
    dashInicialController.tempoInatividade(req, res);
});



module.exports = router;