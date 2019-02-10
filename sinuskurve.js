var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
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
    kurve.push(y);
    ctx.beginPath();
    ctx.ellipse(x + 250, y + 250, 8, 8, 2 * Math.PI, 0, 2 * Math.PI);
    ctx.stroke();
    //sirkel på sirkelperiferi x, y

    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.lineTo(x + 250, y + 250);
    ctx.stroke();
    //linje fra midten til sirkelperiferi x, y

    /*   ctx.beginPath();
       ctx.moveTo(x+250, y+250);
       ctx.lineTo(350, 250);
       ctx.stroke();
   */
  for(let i = 0; i < 10000; i++){
    ctx.fillRect(i+250+100, kurve[i]+250, 1, 1);
  }

    vinkel += 0.01;
}

function draw1() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
}
setInterval(draw1, 20);


