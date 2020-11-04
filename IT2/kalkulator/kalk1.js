//@ts-check

/**
 * @param {string} id
 */
const $ = (id) => document.getElementById(id);


window.onload = () => {

    let nyttTall = true;
    let minne = 0;
    let operator = "";


    const divDisplay = $("display");
    const divTall = $("tall");
    const divAc = $("ac")
    const divOp = $("operatorer")
    const divErlik = $("erlik")

    divTall.addEventListener("click", sjekkTall);
    divOp.addEventListener("click", opererTall);
    divAc.addEventListener("click", clear);
    divErlik.addEventListener("click", erlik);


    //±
    const symboler1 = "7,8,9,4,5,6,1,2,3,-,0,.".split(",");
    const symboler2 = "+,-,*,/".split(",");
    const symboler3 = "sin,cos,tan".split(",");

    lageKnapper("tall", symboler1);
    lageKnapper("operatorer", symboler2);
    lageKnapper("funk", symboler3);

    /**
     * @param {string} id
     * @param {any[]} symboler
     */


    function lageKnapper(id, symboler) {
        const divRamme = $(id);
        for (let i = 0; i < symboler.length; i++) {
            const div = document.createElement("div");
            div.className = "button";
            divRamme.append(div);
            div.innerHTML = symboler[i]
        }
    }

    function sjekkTall(e) {
        const t = e.target;
        if (t.className === "button") {
            if (nyttTall) {
                minne = Number(divDisplay.innerHTML)
                divDisplay.innerHTML = "";
            }
            nyttTall = false
            const verdi = t.innerHTML;
            divDisplay.innerHTML += verdi;
        }
    }

    function clear() {
        divDisplay.innerHTML = "";
        nyttTall = true;
    }

    function opererTall(e) {
        const t = e.target;
        if (t.className === "button") {
            operator = t.innerHTML;
            minne = Number(divDisplay.innerHTML)
            nyttTall = true;
        }
    }

    function erlik() {
        let svar;
        let display = Number(divDisplay.innerHTML);
        switch (operator) {
            case "+":
                svar = minne + display;
                break;
            case "-":
                svar = minne - display;
                break;
            case "*":
                svar = minne * display;
                break;
            case "/":
                svar = minne / display;
                break;
            default:
                alert("error");
                break;
        }
        divDisplay.innerHTML = String(svar);
        minne = svar;
        nyttTall = true

    }
}