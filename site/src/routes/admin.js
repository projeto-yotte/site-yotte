var express = require("express");
var router = express.Router();


var adminController = require("../controllers/adminController");

router.post("/cadastrarAdm", function (req, res) {
    adminController.cadastrarAdm(req, res);
});


router.post("/loginAdm", function (req, res) {
    adminController.loginAdm(req, res);
});

router.post("/cadastrarToken", function (req, res) {
    adminController.cadastrarToken(req, res);
});


module.exports = router;