const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const height = canvas.height;
const width = canvas.width;


let theta = 0;
let step = 2*Math.PI/100

//hode
let h = {
    x:100,
    y:100,
    r:10,
}

function draw() {
    ctx.clearRect(0, 0, width, height);

    if (theta < 2*Math.PI) {
        
        h.x = h.x + 3*Math.cos(theta);
        h.y = h.y + 3*Math.sin(theta);
       
        theta += step;
    }
    else {
        theta = 0;
    }   
    

    ctx.beginPath();
    ctx.lineWidth = "2"
    ctx.arc(h.x,h.y, h.r, h.r, 0, Math.PI*2);
    ctx.stroke();

    ctx.fillStyle = 'rgba(255, 255, 255, .05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
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
    console.log("Game Over");
}
 


setInterval(draw, 15);