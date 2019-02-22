var pos = null;
var x = 0;
function setup() {
    createCanvas(640, 480);

}

function draw() {
    if (pos.x == 0){
        var pos = createVector(100, 100);
        var vel = createVector(10, 10);
        var accel = createVector(10, 10);
    }


    pos.x += 1;

    background(0)
    stroke(255);
    fill(255);
    ellipse(pos.x, pos.x, 80, 80);

    if (pos.x > 520){
        pos.x=1;
    }

}


