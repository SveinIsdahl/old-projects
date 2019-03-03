let canvas = document.getElementById("canvas");
let ctx = document.getContext("2d");

let ball1 = {
    r: 50,
    xpos: 300,
    ypos: 300,
    xvel: 0,
    yvel: 0,
    xacc: 0.0017,
    yacc: 0.0032,
}
let ball2 = {
    r: 50,
    xpos: 500,
    ypos: 500,
    xvel: 0,
    yvel: 0,
    xacc: 0.0038,
    yacc: 0.0025
}

function draw(){
    
}

setInterval(draw, 16);
// funskjon som tar en parameter i form av et objekt og bruker properties i objektet til å utføre funksjon
// ball1 og ball 2 i en funksjon^ hvor alt som endres i fiunksjonen er objektet ball og dets properties