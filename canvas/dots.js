function setup() {
    createCanvas(800, 600);
    background(0);
}
function mousePressed() {
    stroke(255);
    strokeWeight(8)
    point(mouseX, mouseY);
}

