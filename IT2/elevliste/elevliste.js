// @ts-check

const elevListe = [
    "ole",
    "petter",
    "kari",
    "lise",
    "sjur",
    "anne"
]

function setup() {
    let btnVis = document.getElementById("vis");
    let divFunnet = document.getElementById("funnet")
    let divElever = document.getElementById("elever")

    btnVis.addEventListener("click", visElever);

    function visElever() {
        let s = "";
        for (let i = 0; i < elevListe.length; i++) {
            s += " " + elevListe[i];

        }
        divElever.innerHTML = s;
    }
}