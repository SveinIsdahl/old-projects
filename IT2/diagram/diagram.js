// @ts-check


const tallListe = [];

function setup() {
    const inpTallverdi = /**  @type {HTMLInputElement} */
        (document.getElementById("tallverdi"));
    const btnTegn = document.getElementById("tegn");
    const divTalldata = document.getElementById("talldata");
    const divDiagram = document.getElementById("diagram");

    btnTegn.addEventListener("click", tegnDiagram);
    inpTallverdi.addEventListener("keyup", sjekkTall);

    /**
     * @param {KeyboardEvent} e
     */
    function sjekkTall(e) {
        if (e.key === "Enter") {
            lagreData();
        }
    }

    let max;

    function lagreData() {
        const tall = inpTallverdi.valueAsNumber;
        tallListe.push(tall);
        inpTallverdi.value = "";
        inpTallverdi.focus();
        divTalldata.innerHTML = String(tallListe);
        max = maximum(tallListe);
        const sum = summer(tallListe);
        const min = minimum(tallListe);
        const snitt = gjennomsnitt(tallListe);
        const med = median(tallListe);
        divTalldata.innerHTML += `<br> Summen er ${sum}`;
        divTalldata.innerHTML += `<br> Max er ${max}`;
        divTalldata.innerHTML += `<br> Min er ${min}`;
        const spenn = max - min;
        const dupl = duplikater(tallListe);
        divTalldata.innerHTML += `<br> Dynamisk spenn er ${spenn}`;
        divTalldata.innerHTML += `<br> Gjennomsnitt er ${snitt}`;
        divTalldata.innerHTML += `<br> Duplikater er ${dupl}`;
    }

    function tegnDiagram() {
        tegnSoyler(tallListe);
    }

    /**
     * @param {number[]} tabell
     * @returns {void}
     */
    function tegnSoyler(tabell) {
        divDiagram.innerHTML = "";
        for (let i = 0; i < tabell.length; i += 1) {
            const tall = 490 * tabell[i] / max
            const divSoyle = document.createElement("div");
            divSoyle.className = "soyle";
            divDiagram.append(divSoyle);
            divSoyle.style.width = `${tall}px`;
        }
    }
}

/**
 * Beregner gjennomsnitt av tallverdier i en tabell
 * @param {number[]} tabell
 * @returns {number|undefined}
 */
function gjennomsnitt(tabell) {
    if (tabell.length === 0) {
        return undefined;
    }
    const sum = summer(tabell);
    return sum / tabell.length;
}


/**
 * Finner det minste tallet i en tabell
 * @param {number[]} tabell
 * @returns {number}
 */
function minimum(tabell) {
    let min = tabell[0];
    for (let i = 1; i < tabell.length; i += 1) {
        const tall = tabell[i];
        if (tall < min) {
            min = tall;
        }
    }
    return min;
}

/**
 * Finner det største tallet i en tabell
 * @param {number[]} tabell
 * @returns {number}
 */
function maximum(tabell) {
    let max = tabell[0];
    for (let i = 1; i < tabell.length; i += 1) {
        const tall = tabell[i];
        if (tall > max) {
            max = tall;
        }
    }
    return max;
}


/**
 * Summerer tallene i en array
 * @param {number[]} tallSerie
 * @returns {number}
 */
function summer(tallSerie) {
    let sum = 0;
    for (let i = 0; i < tallSerie.length; i += 1) {
        const tall = tallSerie[i];
        sum += tall;
    }
    return sum;
}


/**
 * Finner medianverdien for en tallrekke
 * @param {number[]} array
 * @returns {number|undefined}
 */
function median(array) {
    let kopi = array.slice();
    kopi.sort((a, b) => { return a - b });
    const midten = kopi.length / 2;
    console.log(kopi);
    if (kopi.length % 2 === 0) {
        return (kopi[midten - 1] + kopi[midten]) / 2
    } else {
        return kopi[Math.trunc(midten)]
    }
}

/**  WARNINING ! ENTRATE VIETATO ! CAVE PERICULO ! ACHTUNG ! SE OPP
 * Funksjonene under er ment for de som allerede kan programmere.
 * Dersom du er nybegynner kan du kikke på dem, men merk at de
 * bruker teknikker som vi ikke går gjennom før helt på slutten
 * av kurset.
 */


/**
 * Gir tilbake en liste av duplikate verdier
 * duplikater([1,2,2,3,4,4,2,2,2,4,4,2,7]) => [2,4]
 * Fordelen med denne er at koden er kort
 * Ville valgt denne dersom tabell alltid vil ha n<1000
 * og det er garantert at ikke brukes inne i en løkke
 * @param {number[]} tabell
 * @returns {number[]}
 */
function duplikater(tabell) {
    const dupdups = tabell.filter((e, i) => tabell.indexOf(e) !== i);
    return Array.from(new Set(dupdups));
    // dupdups kan inneholde [2,2,2,2,2,4,4]
    // ved å kovertere til Set og tilbake forsvinner alle duplikater
    // skal ikke ha duplikater i lista over duplikater
}

/**
 * Denne gjør det samme som funksjonen over
 * Fordelen med denne er at den er lettere å forstå
 */
function dupexplicit(tabell) {
    const dups = []; // tom liste med dups
    for (let i = 0; i < tabell.length; i += 1) {
        const e = tabell[i];
        if (tabell.indexOf(e) !== i) {
            // fant en duplikat
            if (!dups.includes(e)) {
                // den er ikke allerede lagret
                dups.push(e);
            }
        }
    }
    return dups;
}

// samme som de over
// men er raskere da tabell itereres bare en gang
// O(n) betyr at tiden er prop med n elementer
// O(1) tilnærma konstant tidsbruk (uavhengig av n)
// oppslag i dupcount er O(1)
// indexOf,includes er O(n)
// de andre har O(n) inne i en løkke (filter er en løkke)
function dupByobject(tabell) {
    const dups = [];
    const dupcount = {};
    tabell.forEach(e => {
        dupcount[e] = (dupcount[e] || 0) + 1;
        if (dupcount[e] === 2) {
            dups.push(e);
        }
    })
    return dups;
}

function duplikater2(tabell) {
    let set = new Set();
    let dupArray = [];
    for (let i = 0; i < tabell.length; i++) {
        let prevLength = set.size;
        set.add(tabell[i]);
        let currentLength = set.size;

        if (prevLength === currentLength) {
            dupArray.push(tabell[i]);
        }

    }
    return dupArray;
}