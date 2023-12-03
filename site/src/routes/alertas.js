var express = require("express");
var router = express.Router();

var alertaController = require("../controllers/alertaController");


router.get(`/listar/:${id_admin}`, function (req, res) {
    alertaController.listar(req, res);
});


module.exports = router;