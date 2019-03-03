let xs = [];
let ys = [];

function setup() {
    createCanvas(800, 600);
    background(0);
}
function mousePressed() {
    let pos = createVector(mouseX, mouseY);
    xs.push(pos.x);
    ys.push(pos.y);
}
function draw() {
    stroke(255);
    strokeWeight(8);
    for (let i = 0; i < xs.length; i++) {
        let pPos = createVector(xs[i], ys[i]);
        point(pPos.x, pPos.y);
    }
}

