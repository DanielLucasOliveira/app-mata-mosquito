var altura = 0;
var largura = 0;
var vidas = 1;
var tempo = 30;

var tempoMosca = 1500;

var nivel = window.location.search;
nivel = nivel.replace('?', '');

if (nivel === 'facil') {
    tempoMosca = 1500;
} else if (nivel === 'normal') {
    tempoMosca = 1000;
} else if (nivel === 'dificil') {
    tempoMosca = 750;
}


function ajustaTamanho() {
    altura = window.innerHeight;
    largura = window.innerWidth;
}

ajustaTamanho();

var cronometro = setInterval(function () {


    tempo -= 1

    if (tempo < 0) {
        clearInterval(cronometro);
        clearInterval(criaMosca);
        window.location.href = '/pages/vitoria.html'
    } else {
        document.getElementById('cronometro').innerHTML = tempo
    }

}, 1000)

function posicaoMosquito() {
    // remover mosquito anterior caso exista
    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove();

        if (vidas > 3) {
            window.location.href = '/pages/fim_de_jogo.html'
        } else {
            console.log('v' + vidas);
            document.getElementById('v' + vidas).src = '/img/coracao_vazio.png'
            vidas++
        }
    }

    var posicaoX = Math.floor(Math.random() * largura) - 90;
    var posicaoY = Math.floor(Math.random() * altura) - 90;

    posicaoX = posicaoX < 0 ? 0 : posicaoX;
    posicaoY = posicaoY < 0 ? 0 : posicaoY;
    //criar elemento html

    var mosquito = document.createElement('img');
    mosquito.src = '/img/mosca.png';
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio();
    mosquito.style.left = posicaoX + 'px';
    mosquito.style.top = posicaoY + 'px';
    mosquito.style.position = 'absolute';
    mosquito.id = 'mosquito';
    mosquito.onclick = function () {
        this.remove();
    }

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

function iniciarPartida() {
    var nivel = document.getElementById('nivel').value

    if (nivel === '') {
        alert('Selecione um nivel para iniciar o jogo')
        return false;
    }

    window.location.href = '/pages/app.html?' + nivel
    
}

function reiniciar() {
    window.location.href = '/pages/app.html'
}

function inicioJogo() {
    window.location.href = '/pages/index.html'
}