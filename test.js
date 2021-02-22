//@ts-check
// List, only words all uppercase AND >= 2 chars 
/*

let forkortelseListe = new Set();
wordArray.forEach((word)=> {
    let isForkorting = 0;
    word.split("").forEach(letter => {
        if((letter === letter.toUpperCase())) {
            isForkorting++
        }
    });
    if(isForkorting === word.length && word.length >= 2) {
        forkortelseListe.add(word);
    }
})
for(let forkort in forkortelseListe) {
        const forkortelse = forkort.split("");
        for(let letter in forkortelse) {
            wordArray.forEach(()=> {

            })
            
        }
    }
*/
/**
 * Finner forkortinger i en tekst.
 * Gir tilbake ordliste { NTB:"Norsk Telegram Byrå" }
 * @param {string} a
 * @returns {object}
**/
function forkort(a) {
    let object = {};
    // Array med alle ord utenom forkortelser
    const wordArray = a.split(/[ .,!]+/).filter( word => (word !== word.toUpperCase()) || (word.length < 2));

    // Array med forkortelser
    const forkortelser = a.split(/[ .,!]+/).filter(word => word === word.toUpperCase() && word.length >= 2);

    //Traverserer alle forkortelser
    for (let i = 0; i < forkortelser.length; i++) {
        const forkortelseOrd = forkortelser[i].split("");
            //Traverserer alle ord som kan matche
            for (let k = 0; k < wordArray.length; k++) {
                //Traverserer forkortelseord for å sjekke hver bosktav
                if(forkortelseOrd[0] === wordArray[k].charAt(0)) {
                    for (let l = 0; l < forkortelseOrd.length; l++) {
                        const forkortLetter = forkortelseOrd[l];
                        const firstLetterinWordArray = wordArray[k+l].charAt(0);
                        if (firstLetterinWordArray === forkortLetter) {
                            object[forkortelseOrd.join("")] === undefined ? object[forkortelseOrd.join("")] = wordArray[k + l] : object[forkortelseOrd.join("")] += " " + wordArray[k + l]                            
                        }
                    }
                }
                
            }
    }
    return object
}




console.log(forkort("I et skriv Ferje Og Rogaland Samband har FORS Norges Offentlige Utredninger lagt fram en undersøkelse av forekomst av frostskader på barmark. Videre har NOU rapporten argumentert for viktigheten av påstrøing av mold på sentliggende snø.").NOU)



