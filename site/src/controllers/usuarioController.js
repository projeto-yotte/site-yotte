var usuarioModel = require("../models/usuarioModel");
var usuarioModel = require("../models/usuarioModel");
var usuarioModel = require("../models/usuarioModel");
var usuarioModel = require("../models/usuarioModel");
var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
        var email = req.body.emailServer;
        var senha = req.body.senhaServer;
    
        if (email == undefined) {
            res.status(400).send("Seu email está undefined!");
        } else if (senha == undefined) {
            res.status(400).send("Sua senha está indefinida!");
        } else {
            
            usuarioModel.autenticar(email, senha)
                .then(
                    function (resultado) {
                        console.log(`\nResultados encontrados: ${resultado.length}`);
                        console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String
    
                        if (resultado.length == 1) {
                            console.log(resultado);
                            res.json(resultado[0]);
                        } else if (resultado.length == 0) {
                            res.status(403).send("Email e/ou senha inválido(s)");
                        } else {
                            res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                        }
                    }
                ).catch(
                    function (erro) {
                        console.log(erro);
                        console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                        res.status(500).json(erro.sqlMessage);
                    }
                );
        }
    
    }

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var cnpj = req.body.cnpjServer
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Sua empresa está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome,cnpj, email, senha )
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


function cadastrarAdm(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var area = req.body.areaServer
    var cargo = req.body.cargoServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
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
    }else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (fk_empresa == undefined) {
        res.status(400).send("Sua fk_empresa está undefined!");
    }else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarAdm(nome,area, cargo,email, senha, fk_empresa, fk_tipo_usuario )
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


function loginAdm(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        
        usuarioModel.loginAdm(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

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


function cadastrarToken(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var token = req.body.fk_tokenServer;


    // Faça as validações dos valores
    if (token == undefined) {
        res.status(400).send("Seu token está undefined!");
    }

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarToken(token )
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

function listarUsuario(req, res) {
    var id_empresa = req.params.id_empresa;
    usuarioModel.listarUsuarios(id_empresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}



function deletarUsuario(req, res) {
    var id_Usuario = req.params.id_Usuario;

    usuarioModel.deletarUsuario (id_Usuario)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}


function editarUsuario(req, res) {
    
    var id_Adm = req.params.id_usuario;
    var nomeAdm = req.body.nomeAdmServer;
    var areaAdm = req.body.areaAdmServer;
    var cargoAdm = req.body.cargoAdmServer;

    console.log("controllers");
    usuarioModel.editarUsuario(id_Adm,nomeAdm, areaAdm, cargoAdm )
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}

    

module.exports = {
    autenticar,
    cadastrar,
    cadastrarAdm, 
    loginAdm,
    cadastrarUser,
    cadastrarToken,
    listarUsuario,
    deletarUsuario,
    editarUsuario
}