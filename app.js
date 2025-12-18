alert(`Bem-vindo!`);

//Criação do numero secreto
let listaDeNumeros = [];
let numeroSecreto = criarNumero();
console.log(numeroSecreto);

function criarNumero() {
   let numeroNovo = parseInt(Math.random() * 10 + 1); 
   let quantidadeDeNumeros = listaDeNumeros.length; 

   if (quantidadeDeNumeros == 10) {
    listaDeNumeros = [];
   };

    if (listaDeNumeros.includes(numeroNovo)) {
        return criarNumero(); 
    } else {
        listaDeNumeros.push(numeroNovo); 
        console.log(listaDeNumeros);
        return numeroNovo; 
    }
};
let tentativas = 1;

//Interação com a tela
function mostrarTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
     if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.5; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    } 
};

function mensagemInicial() {
    mostrarTextoNaTela(`h1`, `Jogo do numero secreto`);
    mostrarTextoNaTela(`p`, `escolha um número de 1 até 10`);

};

mensagemInicial();

//Funcionando o jogo 

function verificarChute() {
    let chute = document.querySelector(`input`).value
    console.log(chute);
    let palavraTentativas = tentativas > 1 ? `tentativas` : `tentativa`; 
    if (chute == numeroSecreto) {
    let mensagemFinal = `Parabéns, voce advinhou o numero secreto com ${tentativas} ${palavraTentativas}`; 
    mostrarTextoNaTela(`p`, mensagemFinal);
    document.getElementById(`reiniciar`).removeAttribute(`disabled`);
}   else {
        if (chute < numeroSecreto) {
            mostrarTextoNaTela(`h1`, `o numero é maior`); 
        }
        else { 
            mostrarTextoNaTela(`h1`, `o numero é menor`);
        };
        tentativas ++;
        console.log(tentativas); 
        limparTexto(); 
};

};

function limparTexto() {
    chute = document.querySelector(`input`);
    chute.value = ''; 
};

//Reiniciando o jogo.

function reiniciarJogo() {
    numeroSecreto = criarNumero();
    limparTexto();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
};