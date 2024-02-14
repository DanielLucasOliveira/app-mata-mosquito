var altura = 0;
var largura = 0;

function ajustaTamanho() {
    altura = window.innerHeight;
    largura = window.innerWidth;
}

ajustaTamanho()

function posicaoMosquito() {

    // remover mosquito anterior caso exista
    if(document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove();
    }

    var posicaoX = Math.floor(Math.random() * largura) - 90;
    var posicaoY = Math.floor(Math.random() * altura) - 90;

    posicaoX = posicaoX < 0 ? 0 : posicaoX;
    posicaoY = posicaoY < 0 ? 0 : posicaoY;
    //criar elemento html

    var mosquito = document.createElement('img');
    mosquito.src = 'img/mosca.png';
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio();
    mosquito.style.left = posicaoX + 'px';
    mosquito.style.top = posicaoY + 'px';
    mosquito.style.position = 'absolute';
    mosquito.id = 'mosquito'

    document.body.appendChild(mosquito);

    
}

function tamanhoAleatorio() {
    var tamanho = Math.floor(Math.random() * 3);

    switch (tamanho) {
        case 0:
            return 'mosquito_um';
        case 1:
            return 'mosquito_dois';
        case 2:
            return 'mosquito_tres';
    }
}

function ladoAleatorio() {
    var lado = Math.floor(Math.random() * 2);

    switch (lado) {
        case 0:
            return 'direita';
        case 1:
            return 'esquerda';
    }
}