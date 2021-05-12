// @ts-check

// etter å ha lest oppgaven ser jeg at jeg har bytta
// rekkefølge på hytte/ferie
// Skal velge ferie først, får da opp ledige hytter

// Ser nå at vi trenger tabell 2, hadde ikke lest hele oppgaveteksten ....

// Løsningen er mellomgod - bør egentlig lage begge
//   selectene ut fra tabellene - slik at en ikke kan velge
//   en sesong som er fullbooka.
// Velger denne løsningen da den forekommer oftere blandt eksamenssettene
// -- dvs opplagt lurt å lage den første select i html og bare den andre med kode
// her bør begge kodes

/**
 * Kortform for document.getElementById
 * @param {string} id 
 * @returns {any}
 */
const $ = id => document.getElementById(id);

/**
 * For å slippe røde streker under .value
 * @param {any} elm 
 * @returns {string}
 */
const getValue = elm => elm.value

const VELG = "...velg...";

const utleie = {
    Jul:["Granbo"],
    Påske:["Granstua"],
    Vinterferie:["Granbo","Grantoppen","Granhaug"],
}

const hytter = {
    Granstua: {senger:4,standard:"høy",badstu:true,pris:12,bilde:""},
    Granbo: {senger:6,standard:"middels",badstu:false,pris:15,bilde:""},
    Grantoppen: {senger:8,standard:"lav",badstu:false,pris:16,bilde:""},
    Granhaug:{senger:10,standard:"høy",badstu:true,pris:30,bilde:""},
}

function setup() {
    const selFerie = $("feriesel");
    const divHytte = $("hytte");
    const btnLagre = $("lagre");
    const divInfo = $("hytteinfo");

    selFerie.addEventListener("change", visHytte);
    btnLagre.addEventListener("click", lagreBestilling);

    function visHytte() {
        const ferie = getValue(selFerie);
        const liste = utleie[ferie];
        divInfo.innerHTML = "";
        if (liste) {
            const sel = makeSelect(liste);
            divHytte.innerHTML = "";
            divHytte.append(sel);
            sel.addEventListener("change",visinfo);
            function visinfo() {
                const hytte = getValue(sel);
                const info = hytter[hytte];
                if (info) {
                    divInfo.innerHTML = `${hytte} senger ${info.senger}`
                }
            }
        }
    }
    function lagreBestilling() {
        const hytte = getValue( document.querySelector("#hytte select"));
        const ferie = getValue( selFerie);
        if (hytte && ferie) {  // denne trengs kanskje ikke
            if (hytte !== VELG && ferie !== VELG) {
                const ledige = new Set(utleie[ferie]);
                ledige.delete(hytte);
                utleie[ferie] = Array.from(ledige);
                selFerie.selectedIndex = 0;
                divHytte.innerHTML = "";
                divInfo.innerHTML = "";
            }
        }
    }
}

/**
 * Lager en select fra en array med tekst
 * @param {Array<string>} liste 
 * @returns {HTMLSelectElement}
 */
function makeSelect(liste) {
    const sel = document.createElement("select");
    let s = "<option>" + VELG + "</option>";
    for (const opt of liste) {
        s += `<option>${opt}</option>`;
    }
    sel.innerHTML = s;
    return sel;
}


export { setup };