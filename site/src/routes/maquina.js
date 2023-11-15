// routes.js

const express = require('express');
const maquinasController = require('../controllers/maquinasController');

const router = express.Router();

router.get('/maquinas', maquinasController.listarMaquinas);

module.exports = router;
