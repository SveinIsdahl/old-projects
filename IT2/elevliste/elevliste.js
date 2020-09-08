// @ts-check
class Elev {
    fornavn = "";
    etternavn = "";
    adresse = "";
    klasse = "";
    kontaktlerar = "";
}

const elevListe = [];


function setup() {
    const divElever = document.getElementById("elever");
    const divFunnet = document.getElementById("funnet");
    // forklarer vs-code at inpFornavn osv  er et HTMLInputElement, ikke et vanlig HTMLElement
    // slipper da å skrive // @ts-ignore alle plasser hvor jeg bruker .value
    const inpFornavn = /**  @type {HTMLInputElement} */ (document.getElementById("fornavn"));
    const inpEtternavn = /**  @type {HTMLInputElement} */ (document.getElementById("etternavn"));
    const inpAdresse = /**  @type {HTMLInputElement} */ (document.getElementById("adresse"));
    const inpKlasse = /**  @type {HTMLInputElement} */ (document.getElementById("klasse"));
    const inpKontaktlerar = /**  @type {HTMLInputElement} */ (document.getElementById("kontaktlerar"));
    const inpLetefelt = /**  @type {HTMLInputElement} */ (document.getElementById("letefelt"));

    let btnLagre = document.getElementById("lagre");
    btnLagre.addEventListener("click", lagreElev);

    let btnFinn = document.getElementById("finn");
    btnFinn.addEventListener("click", finnElev);

    function finnElev() {
        divFunnet.innerHTML = "";
        // @ts-ignore
        let navn = inpLetefelt.value;
        let antall = elevListe.length;
        for (let i = 0; i < antall; i += 1) {
            let elev = elevListe[i];
            if (elev.etternavn.includes(navn)) {
                divFunnet.innerHTML +=
                    elev.fornavn + " " +
                    elev.adresse + "<br>";
                // break;
            }
        }
    }

    function lagreElev() {
        const fornavn = inpFornavn.value;
        const etternavn = inpEtternavn.value;
        const adresse = inpAdresse.value;
        const klasse = inpKlasse.value;
        const kontaktlerar = inpKontaktlerar.value;
        if (fornavn === "") {
            alert("Skriv ett gyldig navn");
            return;
        }
        let elev = new Elev();
        elev.fornavn = fornavn;
        elev.etternavn = etternavn;
        elev.adresse = adresse;
        elev.klasse = klasse;
        elev.kontaktlerar = kontaktlerar;
        elevListe.push(elev);
        visElever();
    }

    function visElever() {
        let s = "";
        const antall = elevListe.length;
        for (let i = 0; i < antall; i += 1) {
            const elev = elevListe[i];
            s += elev.fornavn + " " + elev.etternavn + "<br>";
        }
        divElever.innerHTML = s;
    }
}