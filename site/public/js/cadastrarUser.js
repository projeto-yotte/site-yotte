function gerarCodigoAleatorio() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let codigo = '';

    while (codigo.length <= 20) {
        const caractere = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        if (codigo.indexOf(caractere) === -1) {
            codigo += caractere;
        }
    }

    mensagemCodigo.innerHTML = `${codigo}`


}