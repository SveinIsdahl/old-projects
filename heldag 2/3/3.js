
//@ts-check
import {getValue, l, $, makeSelect} from "../funcs.js"
/**
 * Besvarelse oppg 2,4,5,6 hvor ansatte kan tildeles oppdrag og og tas av oppdrag og legge til flere ansatte
 * Dekker mål: Klasse, funksjon m. parameter
 * Tror alle mål utenom klasse er dekket i andre besvarelse 1 og 2
 * Antar at det er nok å implementere i JS, ikke nødvendig med HTML, bare console
 * 
 * bruker da klasse for ansatte slik at det lett kan lages nye
 * Ser ikke hvordan arv ved bruka av super() kan passe inn i løsning, 
 * men kunne vært mulig dersom man skal ha ulike typer ansatte med ulike egenskaper
 * 
 */



class Ansatt {
    /**
     * @param {string} navn greit å ha navn som egenskap dersom det er upraktisk å bruke navn på objektet som lages, kan da ha navn på objekt lik en id
     *  
     */
    constructor(navn) {
        this.navn = navn;
        this.oppdrag = [];
    }
    /**
     * @param {string} oppdrag
     */
    leggTilOppdrag(oppdrag) {
        this.oppdrag.push(oppdrag);
        let array = oppdragObjekt[oppdrag].split(",");
        //Fjerner tom string laget av split
        if(array[0] === "") {array.shift()}
        array.push(this.navn);
        oppdragObjekt[oppdrag] = array.join(",");
    }
    /**
     * @param {string} oppdrag
     */
    fjernOppdrag(oppdrag) {
        //Fjerner fra personen
        const index = this.oppdrag.indexOf(oppdrag);
        if (index > -1) {
            this.oppdrag.splice(index, 1);
        }
        
        //Fjerner fra oppdragObjekt
        
        let string = oppdragObjekt[oppdrag]+"";
        string = string.replace(this.navn, "");
        //Fjerner komma dersom det er på slutten
        oppdragObjekt[oppdrag] = string.slice(-1) === "," ? string.slice(0,-1): string;
    }
    get antallOppdrag(){
        return this.oppdrag.length;
    } 
}


const per = new Ansatt("Per");
let oppdragObjekt = {
    A: "",
    B: "",
    C: "Ola,Svein,Audun"
}

per.leggTilOppdrag("B");
per.leggTilOppdrag("C");
l("antall oppdrag hos per: " + per.antallOppdrag)
l(oppdragObjekt)
l("Oppdragene til per:" + per.oppdrag);
per.fjernOppdrag("C");
l("Oppdragene til per etter fjerning: " + per.oppdrag);
const kari = new Ansatt("Kari");
kari.leggTilOppdrag("C")
l("Kari lagt og Per fjernet i C: ")
l(oppdragObjekt)

/**
 * Kode kan forbedres ved å la parameter i leggTilOppdrag være array i tillegg til string
 */

