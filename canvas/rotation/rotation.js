const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;
const PI = Math.PI;
ctx.lineWidth = "4";
class Point {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        //retning, 1 = høyre/ned, -1 = venstre/opp
    }
}

function drawPoint(x, y) {    
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2*PI);
    ctx.stroke();
}

let p1 = new Point(50, height/2, 1);
let p2 = new Point(50, height/2, 1);
function update() {    
    ctx.clearRect(0, 0, width, height);
    if (p1.x < 50) {
        p1.r = 1;
        p1.x += p1.r;
    }
    else if (p1.x > (width - 50)) {
        p1.r = -1;
        p1.x += p1.r;

    }
    else {
        p1.x += p1.r;
    }
    drawPoint(p1.x, p1.y, p1.r);

    if (p2.y < 50) {
        p2.r = 1;
        p2.y += p2.r;
    }
    else if (p2.y > (height - 50)) {
        p2.r = -1;
        p2.y += p2.r;
    }
    else {
        p2.y += p2.r;
    }
    drawPoint(p2.x, p2.y);

    ctx.beginPath();
    let x_midtPunkt = Math.abs(p2.x-p1.x)/2+50;
    let y_midtPunkt = (p2.y-p1.y)/2+height/2;
    ctx.arc(x_midtPunkt, y_midtPunkt, Math.sqrt((p1.x-p2.x)**2+(p1.y-p2.y)**2)/2, 0, PI*2);
    console.log(x_midtPunkt);
    console.log(y_midtPunkt);
    ctx.stroke();

    drawPoint(x_midtPunkt, y_midtPunkt);

    ctx.beginPath();
    ctx.moveTo(x_midtPunkt, y_midtPunkt);
    ctx.lineTo(p1.x, p1.y);
    ctx.stroke();
}

setInterval(update, 50);