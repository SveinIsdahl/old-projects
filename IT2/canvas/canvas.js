// @ts-check

const π = Math.PI; // kjekk å ha

/**
 * Beregner avstand mellom to punkt a og b
 * @param {{ x: number; y: number; }} a
 * @param {{ x: number; y: number; }} b
 */
function dist(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy)
}

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {{ x: any; y: any; }} p
 * @param {number} r
 */
function sirkel(ctx, p, r) {
  // tegner en sirkel
  ctx.beginPath();
  ctx.arc(p.x, p.y, r, 0, 2 * π);
  ctx.stroke();
}

/**
 * Tegn en firkant
 * @param {CanvasRenderingContext2D} ctx
 * @param {{ x: any; y: any; }} p1
 * @param {{ x: any; y: any; }} p2
 */
function firkant(ctx, p1, p2) {
  // tegner en firkant
  const w = p2.x - p1.x;
  const h = p2.y - p1.y;
  ctx.beginPath();
  ctx.strokeRect(p1.x, p1.y, w, h);
  //ctx.stroke();
}


/**
 * Tegn en trekant
 * @param {CanvasRenderingContext2D} ctx
 * @param {{ x: any; y: any; }} p1
 * @param {{ x: any; y: any; }} p2
 */
function trekant(ctx, p1, p2) {
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.lineTo(p1.x, p2.y);
  ctx.closePath()
  ctx.stroke();
}

function resistor(ctx,p1,p2) {
  // henta denne fra MDN - søkte på canvas path mdn
  // m x y <=> moveTo(x,y)
  // l x y <=> lineTo(x,y)
  // h x   => lineTo(x,0)
  // v y   => lineTo(0,y)
  //let p = new Path2D('M10 10 h 80 v 80 h -80 Z');
  ctx.beginPath();
  let p = new Path2D(
    `M ${p1.x} ${p1.y} h 20 l 5 5 l 10 -10 l 10 10 l 10 -10 l 10 10 l 10 -10 l 5 5 h 20`);
  //------/\/\/-----
  ctx.stroke(p);
}


const p1 = { x: 1, y: 1 };
const p2 = { x: 1, y: 1 };
let antallPunkt = 0;


/**
 * @param {MouseEvent} e
 */
function registrerPunkt(e) {
  p2.x = p1.x; p2.y = p1.y;
  const { offsetX, offsetY } = e;
  p1.x = Math.round(offsetX/10)*10;
  p1.y = Math.round(offsetY/10)*10;
  antallPunkt++;
  if (antallPunkt === 2) {
    const event = new Event('toPunkt');
    dispatchEvent(event);
    antallPunkt = 0;
  }
}


function setup() {
  const canvas = /** @type {HTMLCanvasElement} */
    (document.getElementById("tegning"));
  const ctx = canvas.getContext("2d");
  // kobling til tegnings-kontekst for canvas ctx = context

  const selType = document.getElementById("type");

  canvas.addEventListener("click", registrerPunkt);

  addEventListener("toPunkt", tegn);
  function tegn() {
    const type = selType.value;
    if (type === "resistor") {
      resistor(ctx,p1,p2);
    }
    if (type === "sirkel") {
      const radius = dist(p1, p2);
      sirkel(ctx,p1,radius);
    }
    if (type === "firkant") {
      firkant(ctx,p1,p2);
    }
    if (type === "trekant") {
      trekant(ctx,p1,p2);
    }
    if (type === "kondensator") {
      trekant(ctx,p1,p2);
    }if (type === "spole") {
      trekant(ctx,p1,p2);
    }
  }

  // clearRect(x,y,w,h)
  

}
