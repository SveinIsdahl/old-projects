let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
var vinkel = 0;
let kurve = [];
let buttonState = 0;
//ctx.translate(250, 250)
//FLytter alt på canvas ned og bort 250px
//Virker ikke når andre verdier (x og y) settes til 0
function draw() {
    let radius = 125;
    ctx.beginPath();
    ctx.ellipse(250, 250, radius, radius, 2 * Math.PI, 0, 2 * Math.PI);
    ctx.stroke();
    //lager sirkel på 250, 250 med radius
    //siste 3 parmetrene er rotasjon (360 deg), start og slutt vinkel. Alle utrykket i radianer.

    let x = radius * Math.cos(vinkel);
    let y = radius * Math.sin(vinkel);
    let xCos = (x / radius);
    let ySin = (y / radius);
    let tan = Math.tan(vinkel);
    let tanPos = tan;
    let xRep = x;
    let yRep = y;
    let xxRep = 0
    let yyRep = 0

    if (xCos < 0) {
        xCos *= (-1);
    }
    if (ySin < 0) {
        ySin *= (-1);
    }
    if (x < 1) {
        xRep -= 75;
    }
    if (y < 1) {
        yRep += 30;
    }
    if (x < 1) {
        xxRep += 55;
    }
    if (y > 1) {
        yyRep += 30;
    }
    if (tanPos < 0) {
        tanPos *= (-1);
    }

    ctx.font = "14px Arial";
    ctx.fillStyle = "blue";
    ctx.fillText("cos=" + xCos.toPrecision(4), xxRep + x + 250 - 50, yyRep + y + 250 - 10);
    ctx.fillStyle = "red";
    ctx.fillText("sin=" + ySin.toPrecision(4), xRep + 250 + 3, yRep + 250 - 10);
    ctx.fillStyle = "black";
    ctx.fillText("Tan=" + (tanPos).toPrecision(4), 80, 130)
    //Viser sin og cos i positive verdier

    /*    ctx.beginPath();
        ctx.moveTo(x + 250, y + 250);
        ctx.lineTo(tan*radius+250, 250);
        ctx.stroke();
    */
    //tan virker ikke, tallet som vises er korrekt, men ikke linja

    kurve.unshift(y);
    ctx.beginPath();
    ctx.ellipse(x + 250, y + 250, 5, 5, 2 * Math.PI, 0, 2 * Math.PI);
    ctx.stroke();
    //sirkel på sirkelperiferi x, y

    ctx.beginPath();
    ctx.arc(250, 250, 25, 0 * Math.PI, vinkel, true);
    ctx.stroke();
    // Lager vinkel 

    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.lineTo(x + 250, y + 250);
    ctx.stroke();
    //linje fra midten til sirkelperiferi x, y

    ctx.beginPath();
    ctx.moveTo(x + 250, y + 250);
    ctx.lineTo(250 + 200, kurve[0] + 250);
    ctx.stroke();

    ctx.lineWidth = "2";
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(x + 250, y + 250);
    ctx.lineTo(x + 250, 250);
    ctx.stroke();
    //Sinus-linje fra punkt til x av punkt, men 250 i y-akse

    ctx.strokeStyle = "blue";

    ctx.beginPath();
    ctx.moveTo(x + 250, y + 250);
    ctx.lineTo(250, y + 250);
    ctx.stroke();

    //Cosinus-linje fra punkt til y av punkt, men 250 i x-akse

    ctx.strokeStyle = "black";
    ctx.lineWidth = "1";


    ctx.beginPath();
    ctx.moveTo(125, 250);
    ctx.lineTo(2250, 250);
    ctx.stroke();
    //Linje fra sirkelperiferi til enden av canvas, 

    ctx.beginPath();
    ctx.moveTo(250, 125);
    ctx.lineTo(250, 375);
    ctx.stroke();
    //Linje fra sirkelperiferi til sirkelperiferi i y-aksen

    //Avstand sinus

    for (let i = 0; i < kurve.length + 1; i++) {
        ctx.fillRect(i + 250 + 200, kurve[i] + 250, 2, 2);
    }
    //Lager sinuskurven av 2px*2px firkanter

    if (kurve.length > 1400) {
        kurve.pop();
    }

    let vinkelGrader = vinkel * 180 / Math.PI * (-1);
    vinkelGraderAvrundet = Math.round(vinkelGrader)
    document.getElementById("vinkelOutput").innerHTML = "vinkel=" + vinkelGraderAvrundet;

    if (vinkelGraderAvrundet >= 360) {
        vinkel = 0;
    }

    vinkel -= 0.015;
}

function drawLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
}

var loop = setInterval(drawLoop, 50);

/*function button1(){
    var loop = setInterval(drawLoop, 100);
}
*/

function button() {
    clearInterval(loop);
}