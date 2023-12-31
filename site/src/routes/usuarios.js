var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js



router.post("/cadastrarUser", function (req, res) {
    usuarioController.cadastrarUser(req, res);
});

router.get("/listarDadosFuncionario/:id_funcionario", function (req, res) {
    usuarioController.listarDadosFuncionario(req, res);
});




module.exports = router;