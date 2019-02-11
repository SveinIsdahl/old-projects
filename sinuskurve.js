let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let vinkel = 0;
let kurve = [];
//ctx.translate(250, 250)
//FLytter alt på canvas ned og bort 250px
//Virker ikke når andre verdier (x og y) settes til 0
function draw() {
    let radius = 100;
    ctx.beginPath();
    ctx.ellipse(250, 250, radius, radius, 2 * Math.PI, 0, 2 * Math.PI);
    ctx.stroke();
    //lager sirkel på 250, 250 med radius=100
    //siste 3 parmetrene er rotasjon (360 deg), start og slutt vinkel. Alle utrykket i radianer.

    let x = radius * Math.cos(vinkel);
    let y = radius * Math.sin(vinkel);
    kurve.unshift(y);
    ctx.beginPath();
    ctx.ellipse(x + 250, y + 250, 8, 8, 2 * Math.PI, 0, 2 * Math.PI);
    ctx.stroke();
    //sirkel på sirkelperiferi x, y

    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.lineTo(x + 250, y + 250);
    ctx.stroke();
    //linje fra midten til sirkelperiferi x, y

    ctx.beginPath();
    ctx.moveTo(x + 250, y + 250);
    ctx.lineTo(250 + 200, kurve[0] + 250);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x+250, y+250);
    ctx.lineTo(x+250, 250);
    ctx.stroke();
    //Sinus-linje fra punkt til x av punkt, men 250 i y-akse

    ctx.beginPath();
    ctx.moveTo(150, 250);
    ctx.lineTo(2250, 250);
    ctx.stroke();
    //Linje fra sirkelperiferi til enden av canvas, 

    ctx.beginPath();
    ctx.moveTo(250, 150);
    ctx.lineTo(250, 350);
    ctx.stroke();
    //Linje fra sirkelperiferi til sirkelperiferi i y-aksen



    for (let i = 0; i < kurve.length + 1; i++) {
        ctx.fillRect(i + 250 + 200, kurve[i] + 250, 2, 2);
    }
    //Lager sinuskurven av 2px*2px firkanter

    if (kurve.length > 1400){
        kurve.pop();
    }
    vinkel += 0.02;
}

function drawLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
}
setInterval(drawLoop, 20);

