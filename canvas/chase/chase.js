let p_pos = { x: 100, y: 100};
let p_vel = { x: 0, y: 0 };
let vel = 0.1;
let radius = 50;




function setup() {
    createCanvas(windowWidth-20, windowHeight-20);

}

function draw() {
    background(10);

    let mouse = createVector(mouseX, mouseY);

    p_pos.x += p_vel.x;
    p_pos.y += p_vel.y;

    if (p_pos.x < mouse.x) {
        p_vel.x += vel;
    }

    if (p_pos.x > mouse.x) {
        p_vel.x -= vel;
    }

    if (p_pos.y < mouse.y) {
        p_vel.y += vel;
    }

    if (p_pos.y > mouse.y) {
        p_vel.y -= vel;
    }

// Hvis player treffer border, reverser retning og reduser velocity
    if (p_pos.x > windowWidth - radius || p_pos.x < radius-20) {
        p_vel.x = -p_vel.x*0.7;
    }
    if (p_pos.y > windowHeight - radius || p_pos.y < radius-20) {
        p_vel.y = -p_vel.y*0.7;

    }

// Hvis player blir stuck utenfor canvas, teleproter 5px tilbake
    if (p_pos.x > windowWidth+5 - radius) {
        p_pos.x -= 10;
    }
    if (p_pos.y > windowHeight+5 - radius) {
        p_vel.y -= 10
    }

    if (p_pos.x < radius - 25) {
        p_vel.x += 10;
    }
    if (p_pos.y < radius - 25) {
        p_vel.y += 10;

    }


    ellipse(p_pos.x, p_pos.y, radius);
}