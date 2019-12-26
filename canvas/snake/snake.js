const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const height = canvas.height;
const width = canvas.width;

let kjør = 1;
let timer = 0;
let theta = 0;
let step = 2*Math.PI/100

//hode
let h = {
    x:200,
    y:200,
    r:10,
}

let h2 = {
    x:200,
    y:200,
    r:10,
}

function draw() {
    ctx.clearRect(0, 0, width, height);
    
    ctx.lineWidth = "2";

    timer += 1;    

            
    ctx.beginPath();    
    ctx.arc(h2.x,h2.y, h2.r, h2.r, 0, Math.PI*2);
    ctx.stroke();
    if ((timer % 2) == 0) {
        h2.x = h.x;
        h2.y = h.y;
    }

    if (theta < 2*Math.PI) {
        
        h.x = h.x + 3*Math.cos(theta);
        h.y = h.y + 3*Math.sin(theta);
       
        theta += step;
    }
    else {
        theta = 0;
    }   
    

    ctx.beginPath();
    ctx.arc(h.x,h.y, h.r, h.r, 0, Math.PI*2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();
  
    //Utenfor canvas = gameover
    if (((h.x + h.r) > width) || ((h.x - h.r) < 0)|| ((h.y + h.r) > height)|| ((h.y - h.r) < 0)) {
        gameover();
    }
    
}

function reverse() {
    step = -step;

}

canvas.addEventListener("click", reverse);

function gameover() {
    // stopp draw-loop
    kjør = 0;
    console.log("Game Over");
}

function run() {
    if (kjør == 1) {
        draw()
    }
}
function start() {
    kjør = 1;
    h.x = 200;
    h.y = 200;
}

setInterval(run, 15);