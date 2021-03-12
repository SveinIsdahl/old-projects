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

/**
 * Finner forkortinger i en tekst.
 * Gir tilbake ordliste { NTB:"Norsk Telegram Byrå" }
 * @param {string} a
 * @returns {object}
**/
function forkort(a) {
    let object = {};
    // Array med alle ord utenom forkortelser
    const wordArray = a.split(/[ .,!]+/).filter(word => (word !== word.toUpperCase()) || (word.length < 2));

    // Array med forkortelser
    const forkortelser = a.split(/[ .,!]+/).filter(word => word === word.toUpperCase() && word.length >= 2);

    //Traverserer alle forkortelser
    for (let i = 0; i < forkortelser.length; i++) {
        const forkortelseOrd = forkortelser[i].split("");
        //Traverserer alle ord som kan matche
        for (let k = 0; k < wordArray.length; k++) {
            //Traverserer forkortelseord for å sjekke hver bosktav
            if (forkortelseOrd[0] === wordArray[k].charAt(0)) {
                for (let l = 0; l < forkortelseOrd.length; l++) {
                    const forkortLetter = forkortelseOrd[l];
                    const firstLetterinWordArray = wordArray[k + l].charAt(0);
                    if (firstLetterinWordArray === forkortLetter) {
                        object[forkortelseOrd.join("")] === undefined ? object[forkortelseOrd.join("")] = wordArray[k + l] : object[forkortelseOrd.join("")] += " " + wordArray[k + l]
                    }
                }
            }

        }
    }
    return object
}






/**
 * @param {string} a
 */
function forstavelse(a) {
    const first = a.substr(0, 3)
    let b = a.split("");
    const main = b.slice(3, a.length).join("")
    return main + first;
}


forstavelse("abcdefghi")



/**
 * @param {string} a
 */
function nettNumber(a) {
    let array = a.split(",");
    let c = 0;
    let prevLetter = "";
    for (let i = 0; i < array.length; i++) {
        let string = array[i];
        let s = string.replace("-", "").split("");
        if (s[0] === prevLetter) {
        }
        else {
            c++
        }
        prevLetter = s[1];
    }
    return c
}



const l = (x) => { console.log(x) }
/**
 * @param {string} a
 */
function nettCycles(a) {
    let counter = 0;
    let networkPointsArr = a.split(",").join("-").split("-");
    networkPointsArr.forEach((l, i) => {
        networkPointsArr.forEach((k, j) => {
            l === k && i > (j+1) ? counter++ : undefined
        })
    })
    return counter;
}
//console.log(nettCycles("a-b,b-a"));
//console.log(nettCycles("a-b,b-c,c-d,d-e,e-f,f-g,g-a,h-i,i-j,j-k,k-l,l-m,n-o,o-p,p-q,q-r,r-n,s-t,t-u"));
