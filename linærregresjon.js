let xs = [];
let ys = [];

function setup() {
    createCanvas(800, 600);
    background(0);
    let m = tf.scalar(random(1)).variable();
    let b = tf.scalar(random(1)).variable();

}
function mousePressed() {
    let x = map(mouseX, 0, width, 0, 1);
    let y = map(mouseY, 0, height, 1, 0);
    xs.push(x);
    ys.push(y);
}
function draw() {
    stroke(255);
    strokeWeight(8);
    for (let i = 0; i < xs.length; i++) {
        let px = map(xs[i], 0, 1, 0, width)
        let py = map(ys[i], 0, 1, height, 0);
        point(px, py);
    }

}