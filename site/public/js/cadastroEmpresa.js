
function cadastrar(){

    var nomeVar = nomeEmpresa.value;
    var cnpjVar = cnpj.value.replace(/[^\d]/g, ''); // remove todas as caracteres especiais
    var emailVar = email.value;
    var senhaVar = senha.value;


    if (nomeVar == "" || cnpjVar == "" || emailVar == "" || senhaVar == "" ) {
        //cardErro.style.display = "block"
        // swal("Ops", "Preencha todos os campos 😠", "error")
        // finalizarAguardar();
        return false;
    } else if (senhaVar.length < 8) {
        Swal.fire("Ops", "A senha inserida é muito curta. Por favor,insira uma senha com pelo menos 8 caracteres 😠", "warning")
        return false;
    }else if (emailVar.indexOf("@") == -1 || emailVar.indexOf(".com") == -1 || emailVar.length < 7) {
        Swal.fire("Ops", "O e-mail cadastrado é inválido. Por favor, insira um e-mail válido 😠 😠", "warning")
        return false;
    } else {
        setInterval('oi', 5000)

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
                swal.fire("Parábens", "Cadastro realizado com sucesso redirecionando a tela de login 😄...!", "success");


                setTimeout(() => {
                    window.location = "login.html";
                }, 3000)

                limparFormulario();
                // finalizarAguardar();
            } else {
                Swal.fire("Ops", "Mais de um usuário com o mesmo login e senha 😭!")
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            // finalizarAguardar();
        });

        return false;
    }