// @ts-check

//Lagrer alle komponenter som tegnes 
let komponentListe = [];



const π = Math.PI; // kjekk å ha
class Punkt {
  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

const komponentInfo = {
  resistor: { p: ` h 20 l 2 5  l 4 -10  l 4 10  l 4 -10  l 4 10  l 4 -10  l 2 5 h 16`, l: 60 },
  capacitor: { p: ` h 20 m 0 -15 v 30 m 10 0 v -30 m 0 15 h 20`, l: 50 },
  spole: { p: ` h 10 t 2 -5 , 4 0 , 4 0, 4 0, 4 0, 4 0, 4 0, 4 0 l 2 5 h 10`, l: 50 },
  jord: { p: ` h 20 m 0 -15 v 30 m 5 -25 v 20 m 5 -15 v 10`, l: 50, j: false },
  plusspol: { p: `h 20`, l: 50 },
  ledning: { p: ``, l: 0, j: false },
}

const komponentNavn = Object.keys(komponentInfo);


class Komponent {
  /**
   * @param {Punkt} p1
   * @param {Punkt} p2
   * @param {string} type
   * @param {number} verdi
   */
  constructor(p1, p2, type, verdi) {
    this.p1 = { x: p1.x, y: p1.y };
    this.p2 = { x: p2.x, y: p2.y };
    this.type = type;
    this.verdi = verdi;
  }

  tegnDeg(ctx) {
    const { p1, p2, type } = this;
    const { p, l, j = true } = komponentInfo[type];
    const start = `M ${p2.x} ${p2.y} `;
    const path = p;
    const minw = l;
    const joinup = j;
    tegnKomponent(ctx, p1, p2, start, path, minw, joinup);
  }
}

class PPol extends Komponent {
  constructor(p2, verdi) {
    const pp = { x: p2.x + 20, y: p2.y };
    super(pp, p2, "plusspol", verdi)
  }
  tegnDeg(ctx) {
    super.tegnDeg(ctx);
    const { p1, p2, type } = this;
    ctx.strokeText(`(${this.verdi}V)`, p2.x - 35, p2.y + 3);
    sirkel(ctx, p2, 3);
  }
}

/**
 * Tegner en komponent fra p1 til p2
 * @param {CanvasRenderingContext2D} ctx
 * @param {Punkt} p1
 * @param {Punkt} p2
 * @param {string} startPos
 * @param {string[]} pathCmds
 * @param {boolean} joinup  true dersom det skal være linje p1-p2
 */
function tegnKomponent(ctx, p1, p2, startPos, pathCmds, plengde = 50, joinup = true) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  const angle = Math.atan2(dy, dx);
  const missing = Math.max(0, dist(p1, p2) - plengde) / 2;
  const path = new Path2D(startPos + ` h ${missing}` + pathCmds + ` h ${missing}`);
  ctx.beginPath();
  ctx.save();
  ctx.translate(p2.x, p2.y);
  ctx.rotate(angle);
  ctx.translate(-p2.x, -p2.y);
  ctx.stroke(path);
  ctx.stroke();
  ctx.restore();
}


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
  ctx.closePath();
  ctx.stroke();
}


const p1 = { x: 1, y: 1 };
const p2 = { x: 1, y: 1 };
let antallPunkt = 0;
let mustJoin = false;  // true dersom vi må velge et eksisterende punkt

function knownPoint(p) {
  return komponentListe.some(k => k.p1.x === p.x && k.p1.y === p.y ||
    k.p2.x === p.x && k.p2.y === p.y);
}

/**
 * @param {MouseEvent} e
 */
function registrerPunkt(e) {
  p2.x = p1.x;
  p2.y = p1.y;
  const { offsetX, offsetY } = e;
  p1.x = Math.round(offsetX / 20) * 20;
  p1.y = Math.round(offsetY / 20) * 20;
  antallPunkt++;
  if (antallPunkt > 1) {
    if (! mustJoin || (knownPoint(p1) || knownPoint(p2))) {
      const event = new Event("toPunkt");
      dispatchEvent(event);
    }
    antallPunkt = 0;
  }
}

function tegnRutenett(ctx) {
  ctx.strokeStyle = 'rgba(0,0,200,0.1)';
  for (let i = 0; i < 40; i++) {
    const i10 = 10 * i;
    ctx.moveTo(0, i10);
    ctx.lineTo(400, i10);
    ctx.moveTo(i10, 0);
    ctx.lineTo(i10, 400);
  }
  ctx.stroke()
}

function tegnSirkler(ctx) {
  ctx.beginPath()
  ctx.strokeStyle = 'rgba(0,0,200,0.5)';
  for (let y = 2; y < 40; y+=2) {
    for (let x = 2; x < 40; x+=2) {
      let obj = {x:10*x, y:10*y}
      sirkel(ctx, obj, 2.5);
      ctx.strokeStyle = 'rgb(0,0,0)';
      sirkel(ctx, obj, 1);
      ctx.strokeStyle = 'rgba(0,0,200,0.8)';

    }
  }
  ctx.stroke()
}

/**
 * Oppstart av komponent-editoren
 * Sørger for at vi bare kan velge plusspol eller jord ved oppstart
 */
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

  const lblVolt = document.getElementById("volt");
  const btnAngre = document.getElementById("angre");
  const selType = document.getElementById("type");
  const btnLagre = document.getElementById("lagre");


  function lagre() {
      const strKomp = JSON.stringify(komponentListe);
      localStorage.setItem("komp", strKomp);
  }

  if(localStorage.getItem("komp")) {
    const str = localStorage.getItem("komp");
    const nykomponentListe = JSON.parse(str);
    for(const komp of nykomponentListe) {
      const {p1,p2,type,verdi} = komp;
      const nyKomp = new Komponent(p1,p2,type,verdi);
      komponentListe.push(nyKomp);
    }
    console.log(komponentListe);
    tegnListe();
  }


  // seltype skal bare vise jord/plusspol ved start
  selType.innerHTML = "jord,plusspol".split(",").map(e => `<option>${e}</option>`).join("");

  selType.addEventListener("change", visEkstra);
  btnAngre.addEventListener("click", undoLast);
  btnLagre.addEventListener("click", lagre);
  function undoLast() {
    if (komponentListe.length > 0) {
      komponentListe.pop();
      tegnListe();
    }
  }

  tegnRutenett(ctxBG);
  tegnSirkler(ctxBG);

  function visEkstra() {
    const type = selType.value;
    if (type === "plusspol") {
      lblVolt.style.opacity = "1";
    } else {
      lblVolt.style.opacity = "0";
    }
  }

  canvas.addEventListener("click", registrerPunkt);

  addEventListener("toPunkt", tegn);
  function tegn() {
    const type = selType.value;
    const inpVolt = document.querySelector("#volt > input");
    const verdi = Number(inpVolt.value);
    // spesialtilfelle for plusspol - lager da en PPol som er
    // en utvida komponent
    const komp = (type === 'plusspol') ?
      new PPol(p2, verdi)
      : new Komponent(p1, p2, type, verdi);
    komponentListe.push(komp);
    tegnListe();
    selType.innerHTML = komponentNavn.map(e => `<option>${e}</option>`).join("");
    mustJoin = true;  // fra nå må vi koble sammen
  }

  function tegnListe() {
    ctxArk.clearRect(0, 0, 400, 400);
    for (let i = 0; i < komponentListe.length; i++) {
      const komp = komponentListe[i];
      komp.tegnDeg(ctxArk);
    }
  }

}
