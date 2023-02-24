//variáveis da bolinha
let xBolinha = 400;
let yBolinha = 300;
let diametro = 30;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 9;
let velocidadeYBolinha = 9;
let raqueteComprimento = 10;
let raqueteAltura = 100;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 250;

//variáveis do oponente
let xRaqueteOponente = 785;
let yRaqueteOponente = 250;
let velocidadeYOponente;
let chanceDeErrar = 0;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente =0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(800, 600);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if (xBolinha + raio > width ||
     xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height ||
     yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete (x,y){
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function verificaColisaoRaquete (x,y){
  colidiu = collideRectCircle(x,y,raqueteComprimento,raqueteAltura,xBolinha,yBolinha,raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

//jogar com a máquina
function movimentaRaqueteOponente (){
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 -60;
  yRaqueteOponente += velocidadeYOponente;
}

//jogar multiplayer
//function movimentaRaqueteOponente (){
//  if (keyIsDown(87)){
//    yRaqueteOponente -= 10;
//  }
//  if (keyIsDown(83)){
//    yRaqueteOponente += 10;
//  }
//}

function incluiPlacar (){
  stroke(255);
  textAlign(CENTER);
  textSize(18);
  fill(color(255, 140, 0));
  rect(250, 10, 40, 22);
  fill(255);
  text(meusPontos, 270, 26);
  fill(color(255, 140, 0));
  rect(500, 10, 40, 22);
  fill(255);
  text(pontosDoOponente, 520, 26);
  text('X', 400, 26);    
}

function marcaPonto (){
  if (xBolinha > 780){
    meusPontos += 1;
    ponto.play();
  }
  if(xBolinha < 15){
    pontosDoOponente += 1;
    ponto.play();
  }
}

