// @ts-check

const elevListe = [];

class Elev {
    fornavn = "";
    etternavn = "";
    adresse = "";
    klasse = "";
}


function setup() {
    let divFunnet = document.getElementById("funnet");
    let divElever = document.getElementById("elever");
    let inputSearch = document.getElementById("inputSearch")
    let inputFornavn = document.getElementById("fornavn");
    let inputEtternavn = document.getElementById("etternavn");
    let inputAdresse = document.getElementById("adresse");
    let inputKlasse = document.getElementById("klasse");


    inputSearch.addEventListener("keyup", (event) => {
        // 13 === enter-tast
        if (event.keyCode === 13) {
            btnSearch.click();
        }
    })

    let btnLagre = document.getElementById("lagre");
    btnLagre.addEventListener("click", lagreElev);

    let btnSearch = document.getElementById("search");
    btnSearch.addEventListener("click", searchElev);

    function searchElev() {
        // @ts-ignore

        let navn = inputSearch.value;
        let funnet = "";

        for (let i = 0; i < elevListe.length; i++) {
            let elev = elevListe[i];

            if (elev.fornavn.includes(navn) || elev.etternavn.includes(navn)) {
                funnet += elev.fornavn + " " + elev.etternavn + " " + elev.klasse + " " + elev.adresse + "<br>"

                //break;
            }
            divFunnet.innerHTML = funnet;
        }
    }


    function visElever() {
        let s = "";
        for (let i = 0; i < elevListe.length; i++) {
            let elev = elevListe[i];
            s += elev.fornavn + " " + elev.etternavn + "<br>";
        }
        divElever.innerHTML = s;
    }

    function lagreElev() {
        // @ts-ignore
        let fornavn = inputFornavn.value;
        let etternavn = inputEtternavn.value;
        let adresse = inputAdresse.value;
        let klasse = inputKlasse.value;


        if (fornavn === "") {
            alert("Skriv inn ett navn");
            return;
        }
        let elev = new Elev;
        elev.fornavn = fornavn;
        elev.etternavn = etternavn;
        elev.adresse = adresse;
        elev.klasse = klasse;
        elevListe.push(elev);

        /*
        inputNavn.focus();
        inputNavn.value = "";
        */
        visElever();
        //elevListe[elevListe.length] = navn;
    }
}
//Push pop, bak
//Shift unshift framme