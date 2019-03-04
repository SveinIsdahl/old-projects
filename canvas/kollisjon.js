let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;

function ball_con(x, y, xacc, yacc){
    this.r = 25;
    this.x = x;
    this.y = y;
    this.xvel = 0;
    this.yvel = 0;
    this.xacc = xacc;
    this.yacc = yacc;
}
let ball1 = new ball_con(150, 100, 0.03, 0.01);
let ball2 = new ball_con(100, 200, 0.01, 0.11);
let ball3 = new ball_con(300, 100, 0.02, 0.04);

function ball(ball) {
    ctx.lineWidth = "5";
    ctx.beginPath();
    ctx.ellipse(ball.x, ball.y, ball.r, ball.r, 2 * Math.PI, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    ball.x += ball.xvel;
    ball.y += ball.yvel;

    ball.xvel += ball.xacc;
    ball.yvel += ball.yacc;

    if (ball.x > width - ball.r || ball.x < ball.r) {
        ball.xvel *= -0.9;
    }
    if (ball.y > height - ball.r || ball.y < ball.r) {
        ball.yvel *= -0.9;
    }
}

function draw() {
    ctx.clearRect(0, 0, width, height);

    ball(ball1);
    ball(ball2);
    ball(ball3);
}
setInterval(draw, 16);

//Legg til object constructor for å konstruere flere baller
//Legg til collition-detection (Uten box2d, bruk tutorial på detection kun m. baller)
//Legg til slider for antall baller 1-100? Random properties?
//Test max antall baller
//if vel < (Lavt tall f.eks 0.0001) vel = 0
//Dette hindrer vibrasjoner når de ligger ved enden av canvas