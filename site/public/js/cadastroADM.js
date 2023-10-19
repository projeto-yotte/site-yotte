
const modalAdm = document.getElementById("modal-add-adm")
const fecharModal = document.getElementById("FecharModal")

fecharModal.addEventListener('click', closeModal)
console.log(sessionStorage.ID_EMPRESA)

function butaoAdm(){
    modalAdm.showModal()
}

function closeModal(){
    modalAdm.close()
}

function testeAdm() {
    modalAdm.close()
    Swal.fire(
        'Admin Cadastrado com sucesso!',
        'Adicionando...',
        'success'
      )
}


function excluirAdm(id_usuario) {
    Swal.fire({
        title: 'Deletar Admin',
        text: "Certeza que deseja deletar esse Admin?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim'
      }).then((result) => {

        if (result.isConfirmed) {
            fetch(`/usuarios/deletarUsuario/${id_usuario}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json"
                }
              }).then(function (resposta) {
          
                if (resposta.ok) {  
                  window.location = "/area_controle.html"
                } else if (resposta.status == 404) {
                  window.alert("Deu 404!");
                } else {
                  throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
                }
              }).catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
              });
            
          Swal.fire(
            'Deletado!',
            'Usuário Admin deletado com sucesso!',
            'success'
          )
        }
      })
}



function habilitarEdicao(button) {
    var row = button.parentNode.parentNode;
    var inputs = row.getElementsByTagName('input');

    for (var i = 0; i < inputs.length; i++) {
        inputs[i].removeAttribute('readonly');
        inputs[i].style.pointerEvents = 'all';
        inputs[i].style.border = '2px #e32832 solid';
        inputs[i].style.borderRadius = '4px';
        inputs[i].style.padding = '4px';

        // Adiciona eventos de teclado e foco para cada input
        inputs[i].addEventListener('keydown', function(event) {
            // Se a tecla Enter for pressionada
            if (event.keyCode === 13) {
                event.preventDefault();
                confirmarAlteracao(this);
            }
        });

        inputs[i].addEventListener('blur', function() {
            confirmarAlteracao(this);
        });
    }
}

function confirmarAlteracao(input) {
    // Exibe um alerta ou usa SweetAlert2 para confirmar a alteração
    Swal.fire({
        title: 'Confirmar Alteração',
        text: 'Deseja realmente fazer essa alteração?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim'
    }).then((result) => {
        if (result.isConfirmed) {
            // Aqui você pode implementar o código para atualizar o banco de dados
            input.setAttribute('readonly', 'readonly');
            input.style.pointerEvents = 'none';
        } else {
            // Reverta as alterações se o usuário cancelar
            input.value = input.defaultValue;
        }

        // Desabilita o pointer-events para impedir a interação com todas as inputs
        var allInputs = document.getElementsByTagName('input');
        for (var i = 0; i < allInputs.length; i++) {
            allInputs[i].style.pointerEvents = 'none';
            allInputs.style.border = 'none';
            allInputs.style.borderRadius = 'none';
        }
    });
}

function CadastrarAdm(){
    var nomeAdmVar = NomeAdm.value;
    var areaVar = AreaAdm.value;
    var cargoAdmVar = cargoAdm.value;
    var emailAdmVar = emailAdm.value
    var senhaAdmVar = senhaAdm.value;


    if (nomeAdmVar == "" || areaVar == "" || cargoAdmVar == "" || senhaAdmVar == "" ) {
        //cardErro.style.display = "block"
        swal.fire("Ops", "Preencha todos os campos 😠", "error")

        // finalizarAguardar();
        return false;
    } else if (senhaAdmVar.length < 8) {
        Swal.fire("Ops senha", "A senha inserida é muito curta. Por favor,insira uma senha com pelo menos 8 caracteres 😠", "warning")
        return false;
    }else if (emailAdmVar.indexOf("@") == -1 || emailAdmVar.indexOf(".com") == -1 || emailAdmVar.length < 7) {
        Swal.fire("Ops", "O e-mail cadastrado é inválido. Por favor, insira um e-mail válido 😠 😠", "warning")
        return false;
    }else {
        setInterval('oi', 5000)
        console.log('cheguei aqui')

    }
        
        // Enviando o valor da nova input
        fetch("/usuarios/cadastrarAdm", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                nomeServer: nomeAdmVar,
                areaServer: areaVar,
                cargoServer: cargoAdmVar,
                emailServer: emailAdmVar,
                senhaServer :  senhaAdmVar,
                fk_empresaServer : sessionStorage.ID_EMPRESA,
                tipoUsuarioServer : 2, 
                


            })
        }).then(function (resposta) {

            console.log("resposta: ", resposta);

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
                limparFormulario();
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            // finalizarAguardar();
        });
        modalAdm.close()

        return false;
}

