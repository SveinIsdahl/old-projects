let max = 6;
class template {
    constructor(r, x, y, velX, velY, accX, accY) {
        this.r = r;
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.accX = accX;
        this.accY = accY;
    }
}

function setup() {
    createCanvas(windowWidth - 25, windowHeight - 25);
    noCursor();
    rect(0, 0, windowWidth-25, windowHeight-25);
}

let player = new template(30, 700, 600, 0, 0, 0, 0);

function draw() {
    clear();
    fill(0,0,0,0);
    rect(0, 0, windowWidth-26, windowHeight-26);
    fill(250);
    ellipse(player.x, player.y, player.r);

    player.x += player.velX;
    player.y += player.velY;

    player.velX += player.accX;
    player.velY += player.accY;

    //S
    if (keyIsDown(83)) {
        player.velY += 0.5;
    }
    //D
    if (keyIsDown(68)) {
        player.velX += 0.5;
    }
    //W
    if (keyIsDown(87)) {
        player.velY -= 0.5;
    }
    //A
    if (keyIsDown(65)) {
        player.velX -= 0.5;
    }

    if (player.x > windowWidth-10-player.r || player.x < player.r/2){
        player.velX = -player.velX;
    }
    if (player.y > windowHeight-10-player.r || player.y < player.r/2) {
        player.velY = -player.velY;
    }
    if (player.velX > max){
        player.velX = max;
    }
    if (player.velY > max){
        player.velY = max;
    }
    if (player.velX < -max){
        player.velX = -max;
    }
 
    if (player.velY < -max){
        player.velY = -max;
    }
}
