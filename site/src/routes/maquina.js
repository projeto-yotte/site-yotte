// routes.js

const express = require('express');
const maquinasController = require('../controllers/maquinasController');

const router = express.Router();

router.get('/maquinas', function (req, res) {
    maquinasController.listarMaquinas(req, res);
});



module.exports = router;
