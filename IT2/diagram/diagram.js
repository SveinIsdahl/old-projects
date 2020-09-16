//@ts-check


const tallListe = [];


function setup() {

    const inpTallverdi = /** @type {HTMLInputElement} */ (document.getElementById("tallverdi"));
    const btnLagre = document.getElementById("lagre");
    const btnTegn = document.getElementById("tegn");
    const divTalldata = document.getElementById("talldata")

    inpTallverdi.addEventListener("keydown", (e) => {
        if (e.keyCode === 13) {
            lagre();
        }
    })

    btnLagre.addEventListener("click", lagre);
    btnTegn.addEventListener("click", tegnSoyler);

    function lagre() {
        let tall = Number(inpTallverdi.value);

        tallListe.push(tall);
        inpTallverdi.value = "";
        inpTallverdi.focus();
        divTalldata.innerHTML = String(tallListe);
        const max = maximum(tallListe);
        const sum = summer(tallListe);
        const min = minimum(tallListe)
        const spenn = max - min;
        const snitt = gjennomsnitt(tallListe);
        const med = median(tallListe);
        divTalldata.innerHTML += `<br> summen er : ${sum}`;
        divTalldata.innerHTML += `<br> Max er : ${max}`;
        divTalldata.innerHTML += `<br> Min er : ${min}`;
        divTalldata.innerHTML += `<br> Dynamisk spenn er : ${spenn}`;
        divTalldata.innerHTML += `<br> Gjennomsnitt er : ${snitt}`;
        divTalldata.innerHTML += `<br> Median er : ${med}`;


    }

    function tegnSoyler() {

    }

}

/**
 *  Summerer tallene i array
 * @param {number[]} array
 * @returns {number}
 */
function summer(array) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += array[i];
    }
    return sum
}

/**
 * @param {number[]} array
 * @returns {number}
 */
function maximum(array) {
    let num = array[0]
    for (let i = 1; i < array.length; i++) {
        if (array[i] > num) {
            num = array[i];
        }
    }
    return num
}

/**
 * @param {number[]} array
 * @returns {number}
 */
function minimum(array) {
    let num = array[0]
    for (let i = 1; i < array.length; i++) {
        if (array[i] < num) {
            num = array[i];
        }
    }
    return num
}

/**
 * @param {number[]} array
 * @returns {number|undefined}
 */
function gjennomsnitt(array) {
    if (array.length === 0) {
        return undefined
    }
    let sum = summer(array);
    let average = sum / array.length;
    return average
}
/**
 * Finner median
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
window.onload = setup;