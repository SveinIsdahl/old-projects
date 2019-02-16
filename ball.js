let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let radius = 40

let pos = {x:radius+700, y:radius};
let vel = {x:0, y:0};
let acc = {x:0.000, y:0.00};

function ball(){
    ctx.lineWidth = "5";
    ctx.beginPath();
    ctx.ellipse(pos.x, pos.y, radius, radius, 2 * Math.PI, 0, 2 * Math.PI);

    let ran1 = Math.floor(Math.random() * 255) + 0;
    let ran2 = Math.floor(Math.random() * 255) + 0;
    let ran3 = Math.floor(Math.random() * 255) + 0;
    console.log(ran1)
    if (pos.x > 1775 || pos.x < 25) {    
        ctx.fillStyle = `rgb(
        ${Math.floor(ran1)},
        ${Math.floor(ran2)}, 
        ${Math.floor(ran3)})`;
    }
    if (pos.y > 870 || pos.y < 25) {
        ctx.fillStyle = `rgb(
        ${Math.floor(ran3)},
        ${Math.floor(ran1)}, 
        ${Math.floor(ran2)})`;

    }
    ctx.fill();
    ctx.stroke();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball();
    if (pos.y < 0){
        pos.y = 5;
    }
    if (pos.x < 0) {
        pos.x = 5;
    }

    pos.x += vel.x;
    pos.y += vel.y;

    vel.x += acc.x;
    vel.y += acc.y;  
    
    if (pos.x > 1775 || pos.x < 25){
        vel.x = -vel.x;  
    }
    if (pos.y > 870 || pos.y < 25) {
        vel.y = -vel.y;

    }
    
    let ranY = (Math.random() - 0.5);
    let ranX = (Math.random() - 0.5);
    acc.y = ranY/10;
    acc.x = ranX/10;
    
}

setInterval(draw, 1.6);