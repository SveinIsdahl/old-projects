// @ts-check

function setup() {
    const divMain = document.getElementById("main");
    const spanPris = document.getElementById("pris");
    const spanAvslag = document.getElementById("avslag");
    const inpDager = (document.getElementById("dager"));
    const inpAlder = (document.getElementById("alder"));
    const btnberegn = document.getElementById("beregn");
    btnberegn.addEventListener("click", beregnPriss);

    const StandardPrisVoksen = 200;
    const StandardPrisBarn = 100;

    /**
     * Beregner pris gitt alder og dager
     * @param {number} alder
     * @param {number} dager
     * @returns {number} pris
     */
    function beregnPris(alder,dager) {
        if (alder < 13) {
            return StandardPrisBarn * dager;
        } else {
            return StandardPrisVoksen * dager;
        }
        // koden her er nesten selvforklarende - trenger ikke kommentarer
    }

    /**
     * Beregner avslag etter reglene
     * @param {number} alder
     * @param {number} pris
     * @returns {number} pris med avslag
     */
    function beregnAvslag(alder,pris) {
        if (alder < 13) {  // barn
            return Math.min(500, pris);
        } else {           // voksen
           return Math.min(1000,pris);
        }
    }

    function beregnPriss() { // @ts-ignore
        const dager = inpDager.valueAsNumber;// @ts-ignore
        const alder = inpAlder.valueAsNumber;
        if (dager > 7) {
            alert("Kan ikke bestille for mer enn en uke");
            return;
        }
        const pris = beregnPris(alder,dager);
        const prisMedAvslag = beregnAvslag(alder,pris);
        const avslag = pris - prisMedAvslag;

        spanPris.innerHTML = `Prisen blir ${prisMedAvslag} kr`;

        if (avslag > 0) {
            spanAvslag.innerHTML = `Du fikk avslag på ${avslag} kr.`;
        }
        
    }
    
}