//Deklarering av variabler
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let drawState
let strekState = 0;
ctx.lineWidth = 3;
var xPrev;
var yPrev;
let farge = "#000000";
let lineWidth;

//Eventlisteners, forteller tegnfunksjonen hvilket verktøy som er valgt
document.querySelector("#tools > div:nth-child(1)").addEventListener("click", function () { setDrawState("draw") });
document.querySelector("#tools > div:nth-child(2)").addEventListener("click", function () { setDrawState("firkant") });
document.querySelector("#tools > div:nth-child(3)").addEventListener("click", function () { setDrawState("sirkel") });
document.querySelector("#tools > div:nth-child(5)").addEventListener("click", function () { setDrawState("strek") });
document.querySelector("#tools > div:nth-child(6)").addEventListener("click", function () { setDrawState("visk") });

function setDrawState(state) {
    drawState = state;
}

//Funksjon for å lage en circel med fyll, ofte en dott
function dot(x, y, color, str) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.arc(x, y, str, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = farge;
    ctx.fillStyle = "#ffffff";
}


// mouseUp og mouseMove forteller tegnefunksjonen når man trykker ned og når man beveger musen over canvas, gitt at man har valgt "tegne-verktøyet"
function mouseUp(evt) {
    if (drawState == "draw" || drawState == "visk") {
        let x = getMousePos(evt).x;
        let y = getMousePos(evt).y;
        ctx.lineTo(x, y);
        ctx.stroke();
        strekState = 0;
    }
    if (ctx.strokeStyle == "#ffffff") {
        ctx.strokeStyle = farge;
    }
}
function mouseMove(evt) {
    if ((strekState == 1 && drawState == "draw") || (strekState == 1 && drawState == "visk")) {
        let x = getMousePos(evt).x;
        let y = getMousePos(evt).y;
        ctx.lineTo(x, y)
        ctx.stroke();
    }
}
//Tegnefunksjonen, 
//hva den gjør er avhengig av hvilket verktøy som er valgt
//hadde kanskje vært bedre å hatt individuelle funskjoner, men for mye jobb å endre.
function draw(evt) {
    ctx.lineWidth = lineWidth;
    let x = getMousePos(evt).x;
    let y = getMousePos(evt).y;
    switch (drawState) {
        case "draw":
            ctx.beginPath();
            ctx.lineTo(x, y);
            strekState = 1;
            break;
        case "firkant":
            if (strekState == 1) {
                x = getMousePos(evt).x;
                y = getMousePos(evt).y;
                ctx.rect(xPrev, yPrev, x - xPrev, y - yPrev);
                ctx.stroke();
                strekState = 0;
            }
            else {
                ctx.beginPath();
                xPrev = x;
                yPrev = y;
                strekState = 1;
            }
            break;
        case "strek":
            if (strekState == 1) {
                x = getMousePos(evt).x;
                y = getMousePos(evt).y;
                ctx.lineTo(x, y);
                ctx.stroke();
                strekState = 0;
            }
            else {
                ctx.beginPath();
                ctx.moveTo(x, y);
                strekState = 1;
            }
            break;
        case "sirkel":
            if (strekState == 1) {
                x = getMousePos(evt).x;
                y = getMousePos(evt).y;
                let radius = Math.sqrt((xPrev - x) * (xPrev - x) + (yPrev - y) * (yPrev - y));
                ctx.arc(xPrev, yPrev, radius, 0, Math.PI * 2);
                ctx.stroke();
                dot(xPrev, yPrev, "white", 2);
                ctx.lineWidth = lineWidth;
                strekState = 0;
            }
            else {
                dot(x, y, farge, 1);
                ctx.beginPath();
                xPrev = x;
                yPrev = y;
                strekState = 1;
            }
            break;
        case "visk":
            ctx.beginPath();
            ctx.strokeStyle = "white";
            ctx.lineTo(x, y);
            strekState = 1;
            break;
        default:
            alert("Ingen verktøy valgt");
            break;
    }
}

//Finner alle div i farge-velger, og setter på eventlistener
document.querySelector("#farger > div:nth-child(1)").addEventListener("click", function () { setColor("#ff0000") });
document.querySelector("#farger > div:nth-child(2)").addEventListener("click", function () { setColor("#008000") });
document.querySelector("#farger > div:nth-child(3)").addEventListener("click", function () { setColor("#0000ff") });
document.querySelector("#farger > div:nth-child(4)").addEventListener("click", function () { setColor("#f0f000") });
document.querySelector("#farger > div:nth-child(5)").addEventListener("click", function () { setColor("#000000") });

//Farge selector:
function setColor(color) {
    farge = color;
    ctx.strokeStyle = farge;
}

//Line width slider:
var slider = document.getElementById("lineWidth");
var output = document.getElementById("widthValue");
output.innerHTML = slider.value; 

slider.oninput = function() {
  output.innerHTML = this.value;
  lineWidth = this.value;
}

//Musepekerposisjon:
function getMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}
