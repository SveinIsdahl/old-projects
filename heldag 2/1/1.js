//@ts-check
//Burde gjort animasjon i JS, men trodde css var raskere. 
//Fant deretter ut at lyd skulle times, dette ble upraktisk når animasjon er ren css
//Har ikke tid å endre, derfor dårlig impletasjon og timing
//Kunne hatt forskjellige animasjoner på ulik tid og gjort all timing i JS
//Hadde da blitt finere css ettersom jeg hadde sluppet å skrive mange ekstra classes og animasjoner


import {getValue, l, $, makeSelect} from "../funcs.js"

const audio = new Audio("zonk.mp3");
const button = $("button");
const time = $("time");
const managment = $("managment");
const system = $("system");

button.addEventListener("click", ()=> {
    time.className = "t"
    managment.className = "man"
    system.className = "sys"

    setTimeout(()=> {
        //Spiller lyd etter 2sek
        audio.play();

        //Spiller lyd etter 2 sek + 0.3 sek, 
        //deretter 2 sek + 0.6sek

        for (let i = 1; i < 3; i++) {
            setTimeout(()=> {
                audio.currentTime=0;
                audio.play();
            }, 300*i)
        }
    }, 1700)
    //Uperfekt timing, men virker
    
})
