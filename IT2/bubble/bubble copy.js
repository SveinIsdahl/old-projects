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
        this.div.style.left = this.x + "px";
        this.div.style.top = this.y + "px";
    }
}
let mouseX;
let mouseY;
let vector = {
    x: 0,
    y: 0
}


function setup() {
    let ballArray = [];



    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;


    })
    let divBrett = document.getElementById("brett");

    let mainBall = new Ball(300 + 5, 650, 10, 10);

    mainBall.div = document.createElement("div");
    divBrett.append(mainBall.div);
    mainBall.div.className = "ball";

    for (let i = 0; i < 30; i++) {
        let b = ballArray[i];
        ballArray[i] = new Ball(9 + i * 20, 10, 10, 10);
        ballArray[i].div = document.createElement("div");
        divBrett.append(ballArray[i].div);
        ballArray[i].div.className = "ball";
        ballArray[i].div.style.left = ballArray[i].x + "px";
        ballArray[i].div.style.top = ballArray[i].y + "px";
    }

    divBrett.addEventListener("mouseup", mouseup)

    function mouseup() {
        /*
        if (downBoolean === false) {
            return
        }
        */
        mainBall.x += 10;
        mainBall.y += 10;
        vector.x = (mouseX - mainBall.x)
        vector.y = (mouseY - mainBall.y)
        let length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
        vector.x /= length;
        vector.y /= length;

        mainBall.vx = vector.x * 5;
        mainBall.vy = vector.y * 5;
        console.log(vector)

        vector.x = 0;
        vector.y = 0;
        mainBall.x -= 10
        mainBall.y -= 10

        //downBoolean = false;
    }



    function animate() {

        mainBall.update();
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
}