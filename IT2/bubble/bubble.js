// @ts-nocheck
'use strict'
let shootingState = false;
class Ball {

    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.vx = 0;
        this.vy = 0;
        this.div;
    }
    update() {

        this.x += this.vx;
        this.y += this.vy;
        this.div.style.left = (this.x - this.w / 2 - 1) + "px";
        this.div.style.top = (this.y - this.h / 2) + "px";
    }
    setDefault() {
        this.x = 300;
        this.y = 650;
        this.update();
    }
}



function setup() {
    let mouseX;
    let mouseY;
    let vector = {
        x: 0,
        y: 0
    }
    let canvas = document.getElementById("canvas");
    // @ts-ignore
    let c = canvas.getContext("2d");
    let divBrett = document.getElementById("brett")

    let mainBall = new Ball(300, 650, 10, 10);

    mainBall.div = document.createElement("div");
    divBrett.append(mainBall.div);
    mainBall.div.className = "ball";

    canvas.addEventListener("mouseup", mouseup);
    canvas.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        vector.x = (mouseX - mainBall.x)
        vector.y = (mouseY - mainBall.y)
        let length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
        vector.x /= -length * 0.01;
        vector.y /= -length * 0.01;
    });

    let ballArray = [];

    function mouseup() {
        console.log("up");

        let tempball = mainBall;
        tempball.vx = vector.x * (-0.1);
        tempball.vy = vector.y * (-0.1);

        ballArray.push(mainBall);
        mainBall.setDefault();
    }



    function draw() {
        c.clearRect(0, 0, 600, 700);

        c.beginPath();
        c.moveTo(mainBall.x - 5, mainBall.y - 5);
        c.lineTo(mainBall.x - vector.x - 5, mainBall.y - vector.y - 5);
        c.stroke();



        mainBall.update();
        requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);

}

//La mainBall bli lagd på nytt etter hvert skudd, push mainBall inn i array etter den er skutt