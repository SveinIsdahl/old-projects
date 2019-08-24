let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;

let radius = 40

let pos = {x:radius+700, y:radius+500};
let vel = {x:0, y:0};
let acc = {x:0.000, y:0.000};

function ball(){
    ctx.lineWidth = "5";
    ctx.beginPath();
    ctx.ellipse(pos.x, pos.y, radius, radius, 2 * Math.PI, 0, 2 * Math.PI);

    let ran1 = Math.floor(Math.random() * 255) + 0;
    let ran2 = Math.floor(Math.random() * 255) + 0;
    let ran3 = Math.floor(Math.random() * 255) + 0;
    if (pos.x > width-radius || pos.x < radius) {    
        ctx.fillStyle = `rgb(
        ${Math.floor(ran1)},
        ${Math.floor(ran2)}, 
        ${Math.floor(ran3)})`;
    }
    if (pos.y > height-radius || pos.y < radius) {
        ctx.fillStyle = `rgb(
        ${Math.floor(ran3)},
        ${Math.floor(ran1)}, 
        ${Math.floor(ran2)})`;

    }
    ctx.fill();
    ctx.stroke();
}

function draw() {
    ctx.clearRect(0, 0, width, height);
    ball();

    pos.x += vel.x;
    pos.y += vel.y;

    vel.x += acc.x;
    vel.y += acc.y;  
    
    if (pos.x > width-radius || pos.x < radius){
        vel.x = -vel.x;  
    }
    if (pos.y > height-radius || pos.y < radius) {
        vel.y = -vel.y;

    }
    
    let ranY = (Math.random()*10 - 5);
    let ranX = (Math.random()*10 - 5);
    acc.y = ranY/10;
    acc.x = ranX/10;
    
}

setInterval(draw, 16);