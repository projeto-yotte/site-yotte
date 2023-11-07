var usuarioModel = require("../models/usuarioModel");
var usuarioModel = require("../models/usuarioModel");
var usuarioModel = require("../models/usuarioModel");
var usuarioModel = require("../models/usuarioModel");
var usuarioModel = require("../models/usuarioModel");




function cadastrarUser(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var area = req.body.areaServer
    var cargo = req.body.cargoServer;
    var email = req.body.emailServer;
    var fk_empresa = req.body.fk_empresaServer;
    var fk_tipo_usuario = req.body.tipoUsuarioServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (area == undefined) {
        res.status(400).send("Sua area está undefined!");
    } else if (cargo == undefined) {
        res.status(400).send("Sua cargo está undefined!");
    }else if (email == undefined) {
        res.status(400).send("Sua email está undefined!");
    } else if (fk_empresa == undefined) {
        res.status(400).send("Sua fk_empresa está undefined!");
    }else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarUser(nome,area, cargo,email, fk_empresa, fk_tipo_usuario )
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


module.exports = {
    cadastrarUser
}