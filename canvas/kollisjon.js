let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;

let ball1 = {
    r: 50,
    x: 300,
    y: 300,
    xvel: 0,
    yvel: 0,
    xacc: 0.0007,
    yacc: 0.032,
}
let ball2 = {
    r: 50,
    x: 500,
    y: 200,
    xvel: 0,
    yvel: 0,
    xacc: 0.008,
    yacc: 0.075
}

let ball3 = {
    r: 50,
    x: 500,
    y: 100,
    xvel: 0,
    yvel: 0,
    xacc: 0.001,
    yacc: 0.035
}

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