// @ts-check

//Array for å oppbevare alle puntker på komponenter for å kunne "klikke" dem sammen, inneholder bare mange punkter som objekt
let componentPointArray = [];
const pi = Math.PI; // kjekk å ha

/**
 * Beregner avstand mellom to punkt a og b
 * @param {{ x: number; y: number; }} a
 * @param {{ x: number; y: number; }} b
 */
function dist(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function rotate(p, theta) {
  return {
    x: p.x*Math.cos(theta)-p.y*Math.sin(theta),
    y: p.x*Math.sin(theta)+p.y*Math.cos(theta)
  }
}

function tegnRutenett(ctx) {
  ctx.beginPath()
  ctx.strokeStyle = 'rgba(0,0,200,0.1)';
  for (let i = 0; i < 40; i++) {
    ctx.moveTo(0, 10 * i);
    ctx.lineTo(400, 10 * i);
    ctx.moveTo(10 * i, 0);
    ctx.lineTo(10 * i, 400);
  }
  ctx.stroke()
}

function motstand(ctx, p1, p2) {
  const theta = Math.atan((p2.y-p1.y)/(p2.x-p1.x));

  console.log(theta);
  ctx.beginPath();
  let x1 = rotate({x:0, y:40}, theta).x;
  let y1 = rotate({x:0, y:40}, theta).y;
  let x2 = rotate({x:40, y:0}, theta).x;
  let y2 = rotate({x:40, y:0}, theta).y;
  const path = new Path2D(
    //`M ${p1.x} ${p1.y} h 20 l 2 5  l 4 -10  l 4 10  l 4 -10  l 4 10  l 4 -10  l 2 5 h 16`
    `M ${p1.x} ${p1.y} l ${x1} ${y1} l ${x2} ${y2}`
  );
    ctx.stroke(path);
    ctx.stroke();
}
function ledning() {
  console.log("ledning")
}
function spole() {
  console.log("spole")
}
function kondensator() {
  console.log("kondensator")
}
function jord() {
  console.log("jord")
}
function plusspol() {
  console.log("pluss")
}
function setup() {
  const canvas =
    /** @type {HTMLCanvasElement} */
    (document.getElementById("tegning"));
  const bg =
    /** @type {HTMLCanvasElement} */
    (document.getElementById("bakgrunn"));
  const ctxArk = canvas.getContext("2d");
  // kobling til tegnings-kontekst for canvas ctx = context

  const ctxBG = bg.getContext("2d");
  // tegner på bakgrunn

  tegnRutenett(ctxBG);


  canvas.addEventListener("click", registrerPunkt);


  // Alltid Første punkt
  let p1 = {
    x: 0,
    y: 0
  }
  //Alltid Punkt 2, p2 skal aldri ha verdi uten at p1 har verdi
  let p2 = {
    x: 0,
    y: 0
  }
  let antallPunkt = 1;

  function registrerPunkt(e) {
    const {offsetX, offsetY} = e;
    if (antallPunkt === 2) {
      //@ts-ignore
      p2.x = offsetX;
      p2.y = offsetY;
      const type = document.getElementById("type").value;
      console.log(type)
      tegn(type);
      antallPunkt = 1;
    }
    else if(antallPunkt === 1) {
      p1.x = offsetX;
      p1.y = offsetY;
      antallPunkt = 2;
    }

  }
  /**
   * @param {string} type
   */
  function tegn(type) {
    const angle = Math.atan((p2.y-p1.y)/(p2.x-p1.x));
    
    switch (type) {
      case "motstand":
        {
          motstand(ctxArk, p1, p2);

        }
      case "ledning":
        {
          ledning(ctxArk, p1, p2);

        }
      case "spole":
        {
          spole(ctxArk, p1, p2);

        }
      case "kondensator":
        {
          kondensator(ctxArk, p1, p2);

        }
      case "jord":
        {
          jord(ctxArk, p1, p2);

        }
      case "plusspol":
        {

          plusspol(ctxArk, p1, p2, 5);

        }
    }


  }

  // clearRect(x,y,w,h)
}
