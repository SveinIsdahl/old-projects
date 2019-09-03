var i = 200;
function setup(){
    createCanvas(windowWidth, windowHeight);    
    background(100);
    ellipse(100, 100, 50);
    strokeWeight(3);
    line(10 , 10, 20, 300);
}

function draw(){

    i = i+1;
    line(100, 100, 10+i, 10+i);

}