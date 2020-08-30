// Bubble sorting Algorithm, bytter to variabler i et array hvis de ikke er i korekt rekkefølger, starter fra begynnelse/slutt
let values = [];
let a;
let b;
let i = 0;
let j = 0;
function setup() {
    createCanvas(windowWidth-10, windowHeight-100);
    values = new Array(width);
    for (let i = 0; i < values.length; i++) {
        values[i] = random(height);
    }
}
function draw() {
    background(0);
    bubble();
    frameRate();

    for (let i = 0; i < values.length; i++) {
        stroke(130);
        line(i, height, i, height - values[i]);

    }
    //Tegner linjer 

    
}

function bubble() {

    function swap(arr, a, b) {
        let rep = arr[a]
        arr[a] = arr[b];
        arr[b] = rep;
    }
    if (i < values.length) {
        for (let j = 0; j < values.length - i - 1; j++) {
            //values.length-i-1 fordi etter hver sortering trenger ikke siste variabel i values sortert
            a = values[j];
            b = values[j + 1];
            if (a > b) {
                swap(values, j, j + 1);
            }
        }
    }
    else {
        console.log("Ferdig");
        noLoop();

    }
    // Avlsutter draw loop
    i++

}



function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}



/* 
function selective1(){
        selective(values);
    }   
    setTimeout(selective1, 1000);
  */   