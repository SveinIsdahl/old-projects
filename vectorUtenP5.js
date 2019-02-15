let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let radius = 40
let gravity = 0.5;
let bounce = 0.1;

let pos = {x:radius+700, y:radius};
let vel = {x:0, y:0};
let acc = {x:0.00, y:0.00};

function draw() {

    if (vel.x > 1000){
        vel.x = 5;
    }
    if (vel.y > 1000) {
        vel.y = 5;
    }

    acc.y += gravity;


    pos.x += vel.x;
    pos.y += vel.y;

    vel.x += acc.x;
    vel.y += acc.y;  
      
    if (pos.x > 1775){
        pos.x = radius;
    }
    if (pos.y > 870) {
        vel.y *= -bounce;
    }
    ctx.lineWidth = "5";
    ctx.beginPath();
    ctx.ellipse(pos.x, pos.y, radius, radius, 2 * Math.PI, 0, 2 * Math.PI);
    ctx.stroke();
    
}
function drawLoop(e) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
}

var loop = setInterval(drawLoop, 10);