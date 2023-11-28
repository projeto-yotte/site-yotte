var express = require("express");
var router = express.Router();


var empresaController = require("../controllers/empresaController");

router.post("/cadastrar", function (req, res) {
    empresaController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    empresaController.autenticar(req, res);
});

router.get("/dadosDaEmpresa/:id_empresa", function (req, res) {
    empresaController.dadosDaEmpresa(req, res);
});

router.get("/listarUsuarios/:id_empresa", function (req, res) {    
    empresaController.listarUsuario(req, res);
});


router.delete("/deletarUsuario/:id_usuario", function (req, res) {
    empresaController.deletarUsuario(req, res);
});


router.put("/editarUsuario/:id_usuario", function (req, res) {
    empresaController.editarUsuario(req, res);
});

router.put("/editarEmpresa/:id_empresa", function (req, res) {
    empresaController.editarEmpresa(req, res);
});

router.put("/editarSenhaEmpresa/:id_empresa", function (req, res) {
    empresaController.editarSenhaEmpresa(req, res);
});

router.get("/parametroEmpresa/:id_empresa", function (req, res) {
    empresaController.parametroEmpresa(req, res);
});

router.get("/pesquisarAdmin/:id_empresa", function (req, res) {
    empresaController.pesquisarAdmin(req, res);
});




module.exports = router;