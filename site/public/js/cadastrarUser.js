
let codigo;
function gerarCodigoAleatorio() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    codigo = ''

    while (codigo.length <= 20) {
        const caractere = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        if (codigo.indexOf(caractere) === -1) {
            codigo += caractere;
        }
    }

    mensagemCodigo.innerHTML = `${codigo}`

    var token = codigo

    if(token == ""){
        swal.fire("Ops", "Preencha todos os campos 😠", "error")

        // finalizarAguardar();
        return false;
    }

    fetch("/admin/cadastrarToken", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
           
            tokenServer: token,
            fk_usuarioServer : sessionStorage.ID_USUARIO
        })
    }).then(function (resposta) {
    
        console.log("resposta: ", JSON.stringify(resposta));
    
        if (resposta.ok) {
            //cardErro.style.display = "block";
            Swal("Parábens", "Cadastro realizado com sucesso 😄...!", "success");
    
    
            setTimeout(() => {
                // window.location = "login.html";
            }, 3000)
    
            limparFormulario();
            // finalizarAguardar();
        } else {
            Swal.fire("Ops", "Mais de um usuário com o mesmo login e senha 😭!")
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${JSON.stringify(resposta)}`);
        // finalizarAguardar();
    });
    
    
    return false;

}



// function cadastrarUser(){
//     var nomeVar = nomeFuncionario.value;
//     var areaVar = area.value;
//     var cargoVar = cargo.value;
//     var emailVar = email.value
//     var tokenVar = codigo;
    
    

//     if (nomeVar == "" || areaVar == "" || cargoVar == "" ||  emailVar == "" || tokenVar =="" ) {
//         //cardErro.style.display = "block"
//         // swal("Ops", "Preencha todos os campos 😠", "error")
//         Swal.fire('entrei no if')
//         // finalizarAguardar();
//         return false;
//     }else if (emailVar.indexOf("@") == -1 || emailVar.indexOf(".com") == -1 || emailVar.length < 7) {
//         Swal.fire("Ops", "O e-mail cadastrado é inválido. Por favor, insira um e-mail válido 😠 😠", "warning")
//         return false;
//     }else if (tokenVar == undefined) {
//         Swal.fire("Ops", "O usuario precisa de um codigo", "warning")
//         return false;
//     }else {
//         setInterval('oi', 5000)
//         console.log('cheguei aqui')

//     }
        
//         // Enviando o valor da nova input
//         fetch("/usuarios/cadastrarUser", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 // crie um atributo que recebe o valor recuperado aqui
//                 // Agora vá para o arquivo routes/usuario.js
//                 nomeServer: nomeVar,
//                 areaServer: areaVar,
//                 cargoServer: cargoVar,
//                 emailServer: emailVar,
//                 fk_tokenServer : tokenVar,
//                 fk_empresaServer : sessionStorage.ID_EMPRESA,
//                 tipoUsuarioServer : 3, 
                


//             })
//         }).then(function (resposta) {

//             console.log("resposta: ", resposta);

//             if (resposta.ok) {
//                 //cardErro.style.display = "block";
//                 Swal("Parábens", "Cadastro realizado com sucesso 😄...!", "success");


//                 setTimeout(() => {
//                     // window.location = "login.html";
//                 }, 3000)

//                 limparFormulario();
//                 // finalizarAguardar();
//             } else {
//                 Swal.fire("Ops", "Mais de um usuário com o mesmo login e senha 😭!")
//             }
//         }).catch(function (resposta) {
//             console.log(`#ERRO: ${resposta}`);
//             // finalizarAguardar();
//         });


// }

