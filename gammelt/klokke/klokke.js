function setup() {
  let divKlokke = document.getElementById("klokke");
  let tall = Array(60).fill(1);
  let rot = 0;
  for (let t of tall) {
    let div = document.createElement("div");
    div.className = "tall";
    div.style.transform = `rotate(${rot}deg)`;
    rot += 6;
    divKlokke.appendChild(div);
  }
}


function setup1() {
  let divKlokke = document.getElementById("klokke");
  let tall = Array(12).fill(1);
  let rot = 0;
  for (let t of tall) {
    let div1 = document.createElement("div");
    div1.className = "tall1";
    div1.style.transform = `rotate(${rot}deg)`;
    rot += 30;
    divKlokke.appendChild(div1);
  }
}
