let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;

let r = 50
let x = 500
let y = 500
let velX = 0
let velY = 0
let accX = 0
let accY = 0

function Ball(r, x ,y, velX, velY, accX, accY){
    this.r = r;
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.accX = accX;
    this.accY = accY;
}

let ball = new Ball(r, x, y, velX, velY, accX, accY);

function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.ellipse(ball.x, ball.y, ball.r, ball.r, 2 * Math.PI, 0, 2 * Math.PI);
    ctx.stroke();

    ball.x += ball.velX;
    ball.y += ball.velY;

    ball.velX += ball.accX;
    ball.velY += ball.accY;  
    
    if (ball.x > width-ball.r || ball.x < ball.r){
        ball.velX = -ball.velX;
    }
    if (ball.y > height-ball.r || ball.y < ball.r) {
        ball.velY = -ball.velY;
    }
    ball.accY +=0.0015;
    ball.accX +=0.002;
}
setInterval(draw, 16);