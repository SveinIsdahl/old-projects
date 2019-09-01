// HAr tatt utgangspunkt i chase.js, 
//men endra fra musepeker til middle, 
//og endra til ellipse for visualisering, 
//bruker da array for å lagre posisjon


var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function () {
    output.innerHTML = this.value;
}


// varibaler for å endre visualiseringen:
let start_x = 30;
let start_y = 30;
let vel = 0.4;
let radius = 10;
//let radius = slider.value;

let p_pos
let p_vel
let array_x
let array_y

let middle

resetSketch();

function setup() {
    let width = windowWidth - radius;
    let height = windowHeight - radius-150;    
    createCanvas(width, height);

    let button = createButton("reset");
    button.mousePressed(resetSketch);

}

function resetSketch() {    
    array_x = [];
    array_y = [];
    p_pos = { x: start_x, y: start_y };
    p_vel = { x: 0, y: 0 };
    
}

function draw() {

    console.log(slider.value);



    background(10);
    middle = createVector(width/2, height/2-4);
    p_pos.x += p_vel.x;
    p_pos.y += p_vel.y;

    // Hvis posisjon til p ikke er samme som middle, øk akselerasjon mot middle
    if (p_pos.x < middle.x) {
        p_vel.x += vel;
    }

    if (p_pos.x > middle.x) {
        p_vel.x -= vel;
    }

    if (p_pos.y < middle.y) {
        p_vel.y += vel;
    }

    if (p_pos.y > middle.y) {
        p_vel.y -= vel;
    }    

    array_x.push(p_pos.x);
    array_y.push(p_pos.y);
    for (let i = 0; i < array_x.length; i++) {

        fill(150);
        ellipse(array_x[i], array_y[i], radius);
    }


}