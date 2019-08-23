// Bubble sorting Algorithm, bytter to variabler i et array hvis de ikke er i korekt rekkefølger, starter fra begynnelse/slutt
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let i = 0;
let j = 0;
let verdier = [];
let width = 2;
function setup() {
    for (let i = 0; i < 360/width; i++) {
        verdier[i] = Math.floor(Math.random()*360);
    }
}

function tegn() {

    for (let i = 0; i < verdier.length; i++) {
        ctx.beginPath();
        ctx.strokeStyle = "hsl("+verdier[i]+", 100%, 50%)";
        ctx.lineWidth = width;
        ctx.moveTo(i*width,360);
        ctx.lineTo(i*width,0);
        ctx.stroke();
    }

}

function sorter() {
    let a
    let b
    function bytt(arr, a, b) {
        let rep = arr[a];
        arr[a] = arr[b];
        arr[b] = rep;
        
    }
    if (i < verdier.length) {
        for (let j = 0; j < verdier.length - i - 1; j++) {
            a = verdier[j];
            b = verdier[j + 1];
            if (a < b) {
                bytt(verdier, j, j+1);
                
                ctx.clearRect(0, 0, canvas.clientHeight, canvas.width)
                tegn();
            }
        }
    }
    else {
        console.log("Ferdig");
        clearInterval(sorter);
        tegn();
        
    }
    i++
}

setup();
setInterval(sorter, 30);
console.log(verdier);