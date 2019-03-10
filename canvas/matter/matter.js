var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function () {
    output.innerHTML = this.value;
}


let bounce = 1.3;
let gravity = 1;
let mass = 1;

//bounce = slider;


const { Engine,
    World,
    Bodies,
    Mouse,
    MouseConstraint,
    Constraint
} = Matter;
let ground;
let ball;

let baller = [];
let baller1 = [];
let baller2 = [];
let baller3 = [];
let baller4 = [];
let baller5 = [];
let baller6 = [];
let baller7 = [];
let baller8 = [];
let baller9 = [];

let box;
let world, engine;
let constraint;

let xB = 10;
let yB = 200;

function setup() {
    const canvas = createCanvas(1200, 600);
    engine = Engine.create();
    world = engine.world;
    engine.world.gravity.y = gravity;
    ground = new Ground(width / 2, height + 10, width, 20);
    groundR = new Ground(width + 10, height / 2, 20, height);
    groundL = new Ground(0 + -10, height / 2, 20, height)
    groundT = new Ground(width / 2, 0 - 10, width, 20)
    //    box = new Box(300, 100, 20, 50);
    for (let i = 0; i < 118; i++) {
        xB += 10;
        yB = 10;
        baller[i] = new Ball(xB, yB, 5);
        baller1[i] = new Ball(xB, yB + 10*2, 5);
        baller2[i] = new Ball(xB, yB + 20 * 2, 5);
        baller3[i] = new Ball(xB, yB + 30 * 2, 5);
        baller4[i] = new Ball(xB, yB + 40*2, 5);
        baller5[i] = new Ball(xB, yB + 50 * 2, 5);
        baller6[i] = new Ball(xB, yB + 60 * 2, 5);
        baller7[i] = new Ball(xB, yB + 70 * 2, 5);
        baller8[i] = new Ball(xB, yB + 80 * 2, 5);
        baller9[i] = new Ball(xB, yB + 90 * 2, 5);

    }
    const mouse = Mouse.create(canvas.elt);

    const options = {
        mouse: mouse
    }
    constraint = MouseConstraint.create(engine, options);
    World.add(world, constraint);
}
function draw() {
    background(0);
    Engine.update(engine);
    ground.show();
    //    box.show();

    for (let ball of baller) {
        ball.show();
    }
    for (let ball of baller1) {
        ball.show();
    }
    for (let ball of baller2) {
        ball.show();
    }
    for (let ball of baller3) {
        ball.show();
    }
    for (let ball of baller4) {
        ball.show();
    }
    for (let ball of baller5) {
        ball.show();
    } 
    for (let ball of baller6) {
        ball.show();
    }
    for (let ball of baller7) {
        ball.show();
    }
    for (let ball of baller8) {
        ball.show();
    }
    for (let ball of baller9) {
        ball.show();
    }
}