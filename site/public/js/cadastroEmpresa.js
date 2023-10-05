
function cadastrar(){

    var nomeVar = nomeEmpresa.value;
    var cnpjVar = cnpj.value;
    var emailVar = email.value;
    var senhaVar = senha.value;



    if (nomeVar == "" || cnpjVar == "" || emailVar == "" || senhaVar == "" ) {
        //cardErro.style.display = "block"
        // swal("Ops", "Preencha todos os campos 😠", "error")

        alert('entrei no if')
        // finalizarAguardar();
        return false;
    } else if (senhaVar.length < 8) {
        alert("Ops", "A senha inserida é muito curta. Por favor,insira uma senha com pelo menos 8 caracteres 😠", "warning")
        return false;
    }else if (emailVar.indexOf("@") == -1 || emailVar.indexOf(".com") == -1 || emailVar.length < 7) {
        alert("Ops", "A senha inserida é muito curta. Por favor,insira uma senha com pelo menos 8 caracteres 😠", "warning")
        return false;
    } else {
        setInterval('oi', 5000)
        console.log('cheguei aqui')

    }
        
        // Enviando o valor da nova input
        fetch("/usuarios/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                nomeServer: nomeVar,
                cnpjServer: cnpjVar,
                emailServer: emailVar,
                senhaServer: senhaVar,
                
               

            })
        }).then(function (resposta) {

            console.log("resposta: ", resposta);

            if (resposta.ok) {
                //cardErro.style.display = "block";
                alert("Parábens", "Cadastro realizado com sucesso redirecionando a tela de login 😄...!", "success");


                setTimeout(() => {
                    window.location = "login.html";
                }, 3000)

                limparFormulario();
                // finalizarAguardar();
            } else {
                alert("Ops", "Mais de um usuário com o mesmo login e senha 😭!")
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            // finalizarAguardar();
        });

        return false;
    }