
//@ts-check
//Deklarering av variabler

const canvas = /**@type {HTMLCanvasElement} */ (document.getElementById("canvas"));
const ctx = canvas.getContext("2d");
let strekState = 0;
let xPrev;
let yPrev;
let farge = "#000000";
let lineWidth, drawState;
let cords = [];
let fill = false;

function setup() {
    ctx.fillStyle = "black";
    ctx.lineWidth = 3;
}

const toolArray = document.getElementById("tools").querySelectorAll("div");
for (let i = 1; i <= toolArray.length; i++) {
    document.querySelector(`#tools > div:nth-child(${i})`).addEventListener("click", () => { setDrawState(toolArray[i - 1].title) });
}

/**
 * @param {string} state
 */
function setDrawState(state) {
    drawState = state;
    console.log(state);
    if (drawState === "clear") {
        ctx.clearRect(0, 0, 1000, 1000);
    }
}

//Funksjon for å lage en sirkel med fyll, ofte en dott
/*
function dot(x, y, color, str) {
    ctx.beginPath();
    ctx.strokeStyle = farge;
    ctx.fillStyle = farge;
    ctx.arc(x, y, str, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = farge;
    ctx.fillStyle = farge;
}
*/

// mouseUp og mouseMove forteller tegnefunksjonen når man trykker ned og når man beveger musen over canvas, gitt at man har valgt "tegne-verktøyet"
function mouseUp(evt) {
    if (drawState == "draw" || drawState == "visk") {
        let x = getMousePos(evt).x;
        let y = getMousePos(evt).y;
        ctx.lineTo(x, y);
        ctx.stroke();
        strekState = 0;

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
    ctx.strokeStyle = farge;
    switch (drawState) {
        case "draw":
            ctx.beginPath();
            ctx.lineTo(x, y);
            strekState = 1;
            break;
        case "firkant":
            if (strekState == 1) {
                ctx.rect(xPrev, yPrev, x - xPrev, y - yPrev);
                if (fill == true) {
                    ctx.fill();
                }
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
        case "trekant":
            if (strekState == 2) {
                cords[4] = getMousePos(evt).x;
                cords[5] = getMousePos(evt).y;
                ctx.lineTo(cords[4], cords[5]);
                ctx.moveTo(cords[4], cords[5]);
                ctx.stroke();
                ctx.lineTo(cords[0], cords[1]);
                if (fill == true) {
                    ctx.fill();
                }
                ctx.stroke();
                strekState = 0;
            }
            else if (strekState == 1) {
                cords[2] = getMousePos(evt).x;
                cords[3] = getMousePos(evt).y;
                ctx.lineTo(cords[2], cords[3]);
                ctx.stroke();
                strekState = 2;
            }
            else {
                cords[0] = getMousePos(evt).x;
                cords[1] = getMousePos(evt).y;
                ctx.beginPath();
                ctx.moveTo(cords[0], cords[1]);
                strekState = 1;
            }
            break;
        case "strek":
            if (strekState == 1) {
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
                let radius = Math.sqrt((xPrev - x) * (xPrev - x) + (yPrev - y) * (yPrev - y));
                ctx.arc(xPrev, yPrev, radius, 0, Math.PI * 2);
                if (fill == true) {
                    ctx.fill();
                }
                ctx.stroke();
                ctx.lineWidth = lineWidth;
                strekState = 0;
            }
            else {
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

const colorArray = ["#ff0000", "#008000", "#0000ff", "#f0f000", "#000000"];
//Finner alle div i farge-velger, og setter på eventlistener
for (let i = 1; i <= colorArray.length; i++) {
    document.querySelector(`#farger > div:nth-child(${i})`).addEventListener("click", () => { setColor(colorArray[i - 1], false) });
}

//Finner alle div i fill-velger, og setter på eventlistener
for (let i = 1; i <= colorArray.length; i++) {
    document.querySelector(`#fill > div:nth-child(${i})`).addEventListener("click", () => { setColor(colorArray[i - 1], true) });
}

//Farge selector:
function setColor(color, fyll) {
    farge = color;
    ctx.strokeStyle = farge;
    ctx.fillStyle = farge;
    fill = fyll;
}

//Line width slider:
var slider = /**@type {HTMLInputElement} */ (document.getElementById("lineWidth"));
var output = document.getElementById("widthValue");
output.innerHTML = slider.value;

slider.oninput = () => {
    output.innerHTML = slider.value;
    lineWidth = slider.value;
}

//Musepekerposisjon:
function getMousePos(evt) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}

setup();