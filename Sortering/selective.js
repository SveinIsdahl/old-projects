function setup() {
    var canvas2 = createCanvas(800, 400);
    canvas2.position(50, 500);
    let verdier = new Array(width);
    for (let i = 0; i < values.length; i++) {
        values[i] = random(height);
    }
}

function draw() {
    background(0);

    if (i < values.length) {
        for (let j = 0; j < values.length - i - 1; j++) {
            //values.length-i-1 fordi etter hver sortering trenger ikke siste variabel i values sortert
            a = values[j];
            b = values[j + 1];
            if (a > b) {
                swap(values, j, j + 1);
            }
        }
    } else {
        console.log("Ferdig");
        noLoop();

    }
    // Avlsutter draw loop
    i++

    for (let i = 0; i < values.length; i++) {
        stroke(200);
        line(i, height, i, height - values[i]);

    }
    //Tegner linjer
}
function sort1(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        //Flytte variabler av arr[0..i-1] som er større enn key frem en posisjon
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }

}


// Hvorfor er det svarte linjer etter det er sortert?

