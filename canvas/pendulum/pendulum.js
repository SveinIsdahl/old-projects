//se linje 36-50


/*
input-slider i html
tar verdien til input(range) og legger den i var slider
var output displayer verdi til slider i demo(id til span)
*/
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function () {
    output.innerHTML = this.value;
}

//slider for startposisjon i x-akse:
var slider_x = document.getElementById("x");
var output_x = document.getElementById("demo_x");
output_x.innerHTML = slider_x.value;

slider_x.oninput = function () {
    output_x.innerHTML = this.value;
}

//slider for startposisjon i y-akse:
var slider_y = document.getElementById("y");
var output_y = document.getElementById("demo_y");
output_y.innerHTML = slider_y.value;

slider_y.oninput = function () {
    output_y.innerHTML = this.value;
}


//startposisjon:
/*
parseInt(slider_x) og parseInt(sldier_y) er ikke tall ifølge console
Samme metode virket helt fint for radius, parseInt(slider) er et tall og virker fint
start_x og start_y virker helt fint med verdi 30, virker ikke med parseInt(slider_x)

hvorfor er ikke parseInt(slider_x) et tall??????????????????
*/

let start_x = 30;
let start_y = 30;
//let start_x = parseInt(slider_x);
//let start_y = parseInt(slider_y);
console.log(start_x);
console.log(start_y);


//hastighet
let vel = 0.4;

//radius til sirklene
let radius = parseInt(slider.value);

//posisjon
let p_pos

//hastighet
let p_vel

// for å oppbevare tidligere posisjon til p
let array_x
let array_y

//midten av canvas
let middle

resetSketch();

function setup() {
    let width = windowWidth - radius - 150;
    let height = windowHeight - radius - 100;
    createCanvas(width, height);

    //reset knapp
    let button = createButton("reset");
    button.mousePressed(resetSketch);
    button.position(width + 50, height + 60)

}

function resetSketch() {
    array_x = [];
    array_y = [];
    p_pos = { x: start_x, y: start_y };
    p_vel = { x: 0, y: 0 };

}

function draw() {

    let radius = parseInt(slider.value);
    background(10);
    middle = createVector(width / 2, height / 2 - 4);

    p_pos.x += p_vel.x;
    p_pos.y += p_vel.y;

    // Hvis posisjon til p ikke er samme som midten, øk hastighet mot midten
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

    //legger posisjon i array, 
    array_x.push(p_pos.x);
    array_y.push(p_pos.y);
    for (let i = 0; i < array_x.length; i++) {

        fill(150);
        ellipse(array_x[i], array_y[i], radius);
    }
}