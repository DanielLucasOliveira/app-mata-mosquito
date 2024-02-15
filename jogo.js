var altura = 0;
var largura = 0;
var vidas = 1;
var pontuacao = 0;
var tempoMosca = 1500;


var queryString = window.location.search;
var params = new URLSearchParams(queryString);
var nivel = params.get('nivel')
if (nivel === 'facil') {
    tempoMosca = 1500;
} else if (nivel === 'normal') {
    tempoMosca = 1000;
} else if (nivel === 'dificil') {
    tempoMosca = 750;
}

var tempoJogo = params.get('tempoJogo')

localStorage.setItem('tempoJogo', tempoJogo)


function ajustaTamanho() {
    altura = window.innerHeight;
    largura = window.innerWidth;
}

ajustaTamanho();



var cronometro = setInterval(function () {
    // console.log(tempoJogo);
    tempoJogo -= 1
    if (tempoJogo < 1) {
        clearInterval(cronometro);
        clearInterval(criaMosca);
        window.location.href = '/pages/vitoria.html?' + 'pontuacao_final=' + localStorage.getItem('pontuacao_final') + '&nivel=' + nivel + '&tempoJogo=' + localStorage.getItem('tempoJogo');
    } else if (cronometro > 0) {
        document.getElementById('cronometro').innerHTML = tempoJogo;
    }

}, tempoMosca)

function posicaoMosquito() {
    // remover mosquito anterior caso exista
    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove();

        if (vidas > 3) {
            window.location.href = ('/pages/fim_de_jogo.html?' + 'pontuacao_final=' + localStorage.getItem('pontuacao_final') + 
            '&nivel=' + nivel + '&tempoJogo=' + localStorage.getItem('tempoJogo'));
        } else {
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
        pontuacao++
        document.getElementById('pontuacao').innerHTML = pontuacao
        localStorage.setItem('pontuacao_final', pontuacao);
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
    var tempoJogo = document.getElementById('tempoJogo').value

    if (nivel === '') {
        alert('Selecione um nivel para iniciar o jogo')
        return false;
    }

    window.location.href = '/pages/app.html?nivel=' + nivel + '&tempoJogo=' + tempoJogo

}

function reiniciar() {
    window.location.href = '/pages/app.html'
}

function inicioJogo() {
    window.location.href = '/pages/index.html'
}