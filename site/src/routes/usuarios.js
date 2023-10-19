var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/cadastrarAdm", function (req, res) {
    usuarioController.cadastrarAdm(req, res);
});


router.post("/loginAdm", function (req, res) {
    usuarioController.loginAdm(req, res);
});

router.post("/cadastrarUser", function (req, res) {
    usuarioController.cadastrarUser(req, res);
});


router.post("/cadastrarToken", function (req, res) {
    usuarioController.cadastrarToken(req, res);
});

router.get("/listarUsuarios/:id_empresa", function (req, res) {    
    usuarioController.listarUsuario(req, res);
});


router.delete("/deletarUsuario/:id_Usuario", function (req, res) {
    usuarioController.deletarUsuario(req, res);
});






module.exports = router;