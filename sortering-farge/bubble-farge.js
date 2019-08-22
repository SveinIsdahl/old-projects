// Bubble sorting Algorithm, bytter to variabler i et array hvis de ikke er i korekt rekkefølger, starter fra begynnelse/slutt
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let verdier = [];

function setup() {
    for (let i = 0; i < 1000; i++) {
        verdier[i] = Math.floor(Math.random()*360);
    }
    tegn();
}

function tegn() {

    for (let i = 0; i < 1000; i++) {
        ctx.beginPath();
        ctx.strokeStyle = "hsl("+verdier[i]+", 100%, 50%)";
        ctx.moveTo(i,360);
        ctx.lineTo(i,verdier[i]);
        ctx.stroke();
    }
    sorter();

}

function sorter() {

    function bytt() {
        
    }
}

setup();
console.log(verdier);