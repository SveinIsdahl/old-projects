// @ts-check

function setup() {
  let bod = document.querySelector("body");
  let svg = document.querySelector("#svg svg");
  let aktivt = document.querySelector("#skisse div");
  let targets = Array.from(document.querySelectorAll(".firkant"));
  let lines = svg.querySelectorAll("g");
  let panel = document.createElement("div");
  panel.id = "panel";
  bod.appendChild(panel);
  panel.innerHTML = `<span>Ny pil</span><i>Lag ny pil</i> <span>Clear</span><i>Slett piler</i>
                    <span>Flytt bokser</span><i>Du kan flytte bokser</i><span>Ny Boks</span><i>Lager en ny boks</i>
                    <span>Slett Bokser</span><i>Slett 8 bokser</i>`;
  let nu = panel.querySelector("span:nth-of-type(1)");
  let info = panel.querySelector("i:nth-of-type(1)");
  let clear = panel.querySelector("span:nth-of-type(2)");
  let move = panel.querySelector("span:nth-of-type(3)");
  let flytt = panel.querySelector("i:nth-of-type(3)");
  let ny = panel.querySelector("span:nth-of-type(4)");
  let fjern = panel.querySelector("span:nth-of-type(5)");
  let fjerne = panel.querySelector("i:nth-of-type(5)");

  let antallBokser = 0;
  let liste;
  let farger = ["red", "blue", "green", "purple", "pink", "orange"];
  let farge = 0;

  let state = "off";
  let movingDiv = null;

  let f = document.getElementById("farger");
  let f1 = f.querySelector("div:nth-of-type(1)");
  /*
  let f2 = f.querySelector("div:nth-of-type(2)");
  let f3 = f.querySelector("div:nth-of-type(3)");
  let f4 = f.querySelector("div:nth-of-type(4)");
  let f5 = f.querySelector("div:nth-of-type(5)");
  let f6 = f.querySelector("div:nth-of-type(6)");
  let f7 = f.querySelector("div:nth-of-type(7)");
  let f8 = f.querySelector("div:nth-of-type(8)");
  let f9 = f.querySelector("div:nth-of-type(9)");
  */
  f1.addEventListener("click", endreFarge);

 // f2.addEventListener("click", endreFarge);


  function endreFarge(e) {
    
    //.style.backgroundColor = farger[Math.floor(Math.random()*6)]
    
    console.log(e);
    
  }


  clear.addEventListener("click", cleansvg);
  nu.addEventListener("click", startLine);
  move.addEventListener("click", moveBoxes);
  ny.addEventListener("click", nyBoks);
  fjern.addEventListener("click", clearBox);

  function nyBoks() {      
    antallBokser += 1;
    farge = antallBokser%6;

    if (antallBokser == 1) {
        fjerne.innerHTML = "Slett boksen";
    }
    else {
      fjerne.innerHTML = "Slett " + antallBokser + " bokser"
    }
    let x = document.createElement("div");
    let navn = prompt("Skriv inn navn p?? boks", "Navn");
    x.style.backgroundColor = farger[farge];
    x.className = "firkant";
    x.innerHTML = navn;
    x.classList.remove("selected")
    document.getElementById("mal").appendChild(x);
    liste = [];
  }

  function clearBox() {
    if (antallBokser !== 0) {
      [].forEach.call(document.querySelectorAll('.firkant'),
        function (e) {
          e.parentNode.removeChild(e);
        });

      fjerne.innerHTML = "Ingen bokser tegnet"
      antallBokser = 0;
    }

  }

  function moveBoxes() {
    if (state !== "move") {
      state = "move";
      flytt.innerHTML = "klikk for ?? slippe";
    } else {
      state = "off";
      movingDiv = null;
      flytt.innerHTML = "Du kan flytte";
    }
  }

  function cleansvg() {
    let gs = svg.querySelectorAll("g");
    gs.forEach(e => svg.removeChild(e));
  }

  function follow(e) {
    let x = e.clientX;
    let y = e.clientY;
    if (movingDiv) {
      movingDiv.style.top = y - 50 + "px";
      movingDiv.style.left = x - 50 + "px";
    }
  }

  aktivt.addEventListener("click", selectedDiv);

  function startLine(e) {
    info.innerHTML = "Velg startpunkt";
    targets.forEach(e => e.classList.remove("selected"));
    state = "start";
    liste = [];
  }

  function selectedDiv(e) {
    let div = e.target;
    if (!div.classList.contains("firkant")) return;
    switch (state) {
      case "off":
        return;
      case "start":
        div.classList.add("selected");
        info.innerHTML = "Velg Endepunkt";
        state = "next";
        liste.push(div);
        break;
      case "next":
        if (!div.classList.contains("selected")) {
          div.classList.add("selected");
          state = "end";
          liste.push(div);
          info.innerHTML = " En gang til for ?? bekrefte ";
        }
        break;
      case "end":
        if (div.classList.contains("selected")) {
          state = "off";
          info.innerHTML = " Lag enda en ny pil ";
          targets.forEach(e => e.classList.remove("selected"));
          makeArrow(liste);
        }
        break;
      case "move":
        try {
          movingDiv.removeEventListener("mousemove", follow);
        } catch (e) { }
        div.addEventListener("mousemove", follow);
        movingDiv = div;
        state = "moving";
        break;
      case "moving":
        try {
          movingDiv.removeEventListener("mousemove", follow);
        } catch (e) { }
        state = "move";
        movingDiv = null;
        break;
    }
  }

  function makeArrow([d1, d2]) {
    let nuline = (x1, y1, x2, y2, mark = "") =>
      `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#f00" stroke-width="2" ${mark}/>`;
    let nug = () => document.createElementNS("http://www.w3.org/2000/svg", "g");
    let p1 = {
      x: +d1.offsetLeft,
      y: +d1.offsetTop,
      w: +d1.clientWidth,
      h: +d1.clientHeight
    };
    let p2 = {
      x: +d2.offsetLeft,
      y: +d2.offsetTop,
      w: +d2.clientWidth,
      h: +d2.clientHeight
    };
    let boks1 = {
      vx: (p1.x),
      vy: (p1.y + p1.h / 2),
      hx: (p1.x + p1.w),
      hy: (p1.y + p1.h / 2),
      tx: (p1.x + p1.w / 2),
      ty: (p1.y),
      bx: (p1.x + p1.w),
      by: (p1.y + p1.h)
    }
    console.log(p1, p2);
    let l1;
    //Ned h??yre
    if ((p1.y + p1.h) < p2.y && (p1.x + p1.w) < p2.x) {
      let x1 = Math.trunc(p1.x + p1.w / 2);
      let y1 = p1.y + p1.h + 2;
      let x2 = x1;
      let y2 = Math.trunc(p2.y + p2.h / 2 - 2);
      l1 = nuline(x1, y1, x2, y2);
      x1 = p2.x - 20;
      y1 = y2;
      l1 += nuline(x2, y2, x1, y1, 'marker-end="url(#arrowhead)"');
    }
    //Ned venstre
    if ((p1.y + p1.h) < p2.y && (p1.x - p1.w) > p2.x) {
      let x1 = Math.trunc(p1.x + p1.w / 2);
      let y1 = p1.y + p1.h + 2;
      let x2 = x1;
      let y2 = Math.trunc(p2.y + p2.h / 2 - 2);
      l1 = nuline(x1, y1, x2, y2);
      x1 = p2.w + p2.x + 20 + 2;
      y1 = y2;
      console.log(x1, x2);
      l1 += nuline(x2, y2, x1, y1, 'marker-end="url(#arrowhead)"');
    }
    //Opp h??yre
    if ((p1.y - p1.h) > p2.y && (p1.x + p1.w) < p2.x) {
      let x1 = Math.trunc(p1.x + p1.w / 2);
      let y1 = p1.y + p1.h - 1;
      let x2 = x1;
      let y2 = Math.trunc(p2.y + p2.h / 2 - 2);
      l1 = nuline(x1, y1 - p1.h, x2, y2);
      x1 = p2.x - 20;
      y1 = y2;
      l1 += nuline(x2, y2, x1, y1, 'marker-end="url(#arrowhead)"');
    }
    //Opp Venstre
    if ((p1.y - p1.h) > p2.y && (p1.x - p1.y) > p2.x) {
      let x1 = Math.trunc(p1.x + p1.w / 2);
      let y1 = p1.y + p1.h - 1;
      let x2 = x1;
      let y2 = Math.trunc(p2.y + p2.h / 2 - 2);
      l1 = nuline(x1, y1 - p1.h, x2, y2);
      x1 = p2.w + p2.x + 20 + 2;
      y1 = y2;
      l1 += nuline(x2, y2, x1, y1, 'marker-end="url(#arrowhead)"');
    }

    if (l1) {
      let g = nug();
      g.innerHTML = l1;
      svg.appendChild(g);
    }
  }
}
//Bytt ut if statements me switch, p1/p2 som expression