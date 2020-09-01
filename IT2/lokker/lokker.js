// @ts-check

function setup() {
    let div20 = document.getElementById("div20");
    let div70 = document.getElementById("div70");
    let divpar = document.getElementById("divpar");
    let divodde = document.getElementById("divodde");
    let div100 = document.getElementById("div100");

    let btnVis = document.getElementById("vis");
    btnVis.addEventListener("click", doStuff)

    function doStuff() {


        let s = "<hr>";
        for (let i = 20; i <= 50; i++) {
            s += " " + String(i);

        }
        div20.innerHTML = s;

        s = "<p>"
        for (let i = 70; i >= 60; i--) {
            s += " " + String(i);

        }

        div70.innerHTML = s;
        s = "<p>"

        for (let i = 2; i <= 100; i += 2) {

            s += String(i) + " ";
        }
        divpar.innerHTML = s;
        s = "<p>"

        for (let i = 1; i <= 99; i += 2) {

            s += String(i) + " ";
        }
        divodde.innerHTML = s;
        s = "<p>"

        for (let i = 100; i <= 10000; i += 100) {

            s += String(i) + " ";
        }
        div100.innerHTML = s;


    }

}