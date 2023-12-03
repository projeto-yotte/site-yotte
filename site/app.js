// process.env.AMBIENTE_PROCESSO = "desenvolvimento";
process.env.AMBIENTE_PROCESSO = "desenvolvimento";

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = process.env.AMBIENTE_PROCESSO == "producao" ? 80 : 3333;

var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");


var empresaRouter = require("./src/routes/empresa");
var adminRouter = require("./src/routes/admin");
var dashInicialRouter = require("./src/routes/dashInicial");
var dashEspecificaRouter = require("./src/routes/dashEspecifica");
var maquinaRouter = require("./src/routes/maquina")
var alertaRouter = require("./src/routes/alertas")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);

app.use("/empresa", empresaRouter);
app.use("/admin", adminRouter);
app.use("/dashInicial", dashInicialRouter);
app.use("/dashEspecifica", dashEspecificaRouter);
app.use("/maquina", maquinaRouter);
app.use("/alertas", alertaRouter);

app.listen(PORTA, function () {
    console.log(`Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar: http://localhost:${PORTA} \n
    Você está rodando sua aplicação em Ambiente de ${process.env.AMBIENTE_PROCESSO} \n
    \t\tSe "desenvolvimento", você está se conectando ao banco LOCAL (MySQL Workbench). \n
    \t\tSe "producao", você está se conectando ao banco REMOTO (SQL Server em nuvem Azure) \n
    \t\t\t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'`);
});