//@ts-check

let year = 2021;
let month = 2;

const mNavn = "Januar,Februar,Mars,April,Mai,Juni,Juli,August,September,Oktober,November,Desember".split(",");

window.onload = () => {
    const yearDiv = document.getElementById("year");
    const main = document.getElementById("main");
    const py = document.getElementById("py");
    const ny = document.getElementById("ny");


    py.addEventListener("click", prevYear);
    ny.addEventListener("click", nextYear);


    function prevYear() {
        year--
        yearDiv.innerHTML = year + "";
    }
    function nextYear() {
        year++
        yearDiv.innerHTML = year + "";
    }
    
    for (let i = 0; i < 12; i++) {
        const div = document.createElement("div");
        div.className += "mnd";
        main.appendChild(div);
        drawMonth(2021, i, div);
    }
    let divmnd = document.querySelectorAll(".mnd");

    
}
/**
 * @param {number} y År
 * @param {number} m Måned, 0..11
 * @param {HTMLElement} div Div hvor måned skal renders
 */
function drawMonth(y, m, div) {
    let template = document.getElementById("temp");
    //let clone = template.content.cloneNode(true);
    let dagene = "";
    for (let i = 1; i <= 31; i++) {
        if(i % 7 === 0) {
            dagene += `<span style="color:red;">${i}</span>`
        }   
        else {
            dagene += `<span>${i}</span>`
        }
    }
    div.innerHTML = "";
    div.classList.add("month");
    let s = "";

    s += `
    <fieldset>
        <legend> ${mNavn[m]} </legend>
        <div class="ukedager">
            <span>Ma</span>
            <span>Ti</span>
            <span>On</span>
            <span>To</span>
            <span>Fr</span>
            <span>Lø</span>
            <span>Sø</span>
        </div>
        <div class="dager">
            ${dagene}
        </div>
    </fieldset>
    `
    div.innerHTML = s;
}
