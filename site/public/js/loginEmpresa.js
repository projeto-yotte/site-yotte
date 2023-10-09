function login() {
    var emailVar = email.value;
    var senhaVar = senha.value;
    
    if (emailVar == "" || senhaVar == "") {
        // cardErro.style.display = "block"
        alert("Ops", "Preencha os campos para logar 😠!", "error")
        finalizarAguardar();
        return false;
    }
    else {
        alert("Parábens", "Login realizado com sucesso redirecionando a tela do seu time 😄se divirta...!", "success");
        setInterval('...', 2000)
    
    
        console.log("FORM LOGIN: ", emailVar);
        console.log("FORM SENHA: ", senhaVar);
    
        fetch("/usuarios/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: emailVar,
                senhaServer: senhaVar
    
    
                
            })
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO entrar()!")
    
            if (resposta.ok) {
                console.log(resposta);
    
                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));
                    sessionStorage.ID_EMPRESA = json.id_empresa;


    
    
                    setTimeout(function () {
                       window.location = 'area_controle.html'
                       
                    }, 3000); // apenas para exibir o loading
    
                });
    
            } else {
    
                alert("Ops", "Email e/ou senha inválido(s)", "error")
    
                resposta.text().then(texto => {
                    console.error(texto);
                    // finalizarAguardar(texto);
                });
            }
    
        }).catch(function (erro) {
            console.log(erro);
        })
    
        return false;
    }
    }