//@ts-check
import {getValue, l, $, makeSelect} from "../funcs.js"

const selectDiv = $("selectDiv");
const oppdragSelectorDiv = $("oppdragSelector");
const komboDiv = $("komboboks");
const ledigDiv = $("ledig");


const oppdragObjekt = {
    A:"GUI design",
    B:"Login/out",
    C:"Chat",
    D:"testing",
    E:"Rendering",
    F:"Assets",
    G:"Map Design",
    X:"Effects",
    Y:"Collision",
    Z:"Pathfinding",
}
//Kunne hatt ansatt-klasse slik at hver ansatt var object med flere egenskaper.
const ansatteOppdrag = {
    per:"A,B,C",
    anne:"B,D,E",
    ola:"X,Y,Z",
    kari:"D,B",
    jens:"A",
    lise:"A,F,E"
}
//Lager ansattArray fra objektet
let ansattArray = ["velg"];
let tempArr = Object.keys(ansatteOppdrag);
for (let i = 0; i < tempArr.length; i++) {
    ansattArray.push(tempArr[i]) 
}
//Lager select og legger inn i div
const ansattSelect = makeSelect(ansattArray);
selectDiv.append(ansattSelect);

ansattSelect.addEventListener("change", ()=> {
    const valgtAnsatt = getValue(ansattSelect);
    if(valgtAnsatt === "velg") {
        //Fjerner verdier fra info.diver 
        //og selekter dersom "velg-option er valgt"
        oppdragSelectorDiv.innerHTML = "";
        komboDiv.innerHTML = ""
        ledigDiv.innerHTML = ""
    }
    else {
        visOppdrag(valgtAnsatt);
    } 
});

/**
 * Viser oppdrag til valgt ansatt i en select-boks
 * @param {string} ansatt
 */
function visOppdrag(ansatt) {
    //Clearer divs for at ny selector kan lages
    oppdragSelectorDiv.innerHTML = "";
    komboDiv.innerHTML = ""
    ledigDiv.innerHTML = ""

    let oppdrag = ["velg"].concat(ansatteOppdrag[ansatt].split(","));
    
    //Sjekker om det ikke ikke er oppdrag
    //Må gjøre dette fordi .split legger til tom string i array dersom det ikke finnes oppdrag
    if(oppdrag[1] === "") {
        oppdrag = ["velg"];
    }
    const oppdragSelect = makeSelect(oppdrag)
    oppdragSelectorDiv.append(oppdragSelect);

    //Setter div til ledig/opptatt avhengig av antall oppdrag
    const antallOppdrag = oppdrag.length-1;
    if(antallOppdrag === 0) {
        ledigDiv.innerHTML = "Ledig";
    }
    else if(antallOppdrag > 3) {
        ledigDiv.innerHTML = "Opptatt"
    } 

    oppdragSelect.addEventListener("change", ()=> {
        visInfo(getValue(oppdragSelect), antallOppdrag);
    })
    

}
/**
 *  Viser info i komboboks 
 * @param {string} oppdragBokstav
 * @param {number} antallOppdrag
 */
function visInfo(oppdragBokstav, antallOppdrag) {
    let oppdrag = oppdragObjekt[oppdragBokstav];
    if(oppdragBokstav === "velg") {
        oppdrag = "";
    }

    l(oppdragBokstav)
    if(antallOppdrag === 0) {
        komboDiv.innerHTML = "";
    }
    else if(antallOppdrag > 3) {
        komboDiv.innerHTML = oppdrag + "<br>";
    } 
    else {
        komboDiv.innerHTML = oppdrag + "<br>";
    }
    //Kunne hatt bare else, men tryggere å sjekke mer dersom mer skal legges til senere
}