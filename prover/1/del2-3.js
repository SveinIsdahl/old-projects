//@ts-check

window.onload = () => {
    const input = document.getElementById("farge");
    const btn = document.getElementById("button");

    const fargeSpan = document.getElementById("fargeSpan")
    const hexSpan = document.getElementById("hex")

    //Div som inneholde begge span, blir synelig etter knapp et trykket
    const tekstDiv = document.getElementById("tekst");

    const fargeDiv = document.getElementById("fargeDiv");

    let fargeArr = ["rød", "grønn", "blå", "gul", "svart", "hvit", "cyan", "lilla"];
    let hexArr = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#000000", "#ffffff", "#00ffff", "#ff00ff"];


    let div = document.createElement("div")
    document.querySelector("body").append(div);
    div.style.width = "100px"
    div.style.height = "100px";
    div.style.right = "100px"
    div.style.position = "absolute"

    btn.addEventListener("click", () => {
        //@ts-ignore


        let farge = input.value;
        let hex = "";

        //Min løsning for å ikke endre html i tidligere oppgaver er å sjekke om input er hex-kode, 
        //da finner kode farge som er nærmest
        if (farge[0] === "#") {
            div.style.backgroundColor = farge;

            //Fargen i input
            let red = parseInt(farge[1] + farge[2], 16);
            let green = parseInt(farge[3] + farge[4], 16);
            let blue = parseInt(farge[5] + farge[6], 16);

            let avstandArr = [];

            for (let i = 0; i < hexArr.length; i++) {
                let hexVerdi = hexArr[i];

                //avstand mellom farger https://en.wikipedia.org/wiki/Color_difference
                //Første løsningen min virket ikke fordi summene ikke var vektet som her
                let arrSum = Math.sqrt(((parseInt(hexVerdi[1] + hexVerdi[2], 16) - red) ** 2) + ((parseInt(hexVerdi[3] + hexVerdi[4], 16) - green) ** 2) + ((parseInt(hexVerdi[5] + hexVerdi[6], 16) - blue) ** 2));

                avstandArr.push(arrSum);

            }

            //Loop finner hvilken indeks i arrayet med differanser som har verdi næmest 0
            //Den indeksen som velges er den nærmeste fargen fordi avstanden er kortest
            let index = 0;
            for (let i = 0; i < avstandArr.length; i++) {
                if (avstandArr[i] < avstandArr[index]) {
                    index = i;
                }
            }
            hex = hexArr[index];
            farge = fargeArr[index];

        } else {
            let state = 0;
            for (let i = 0; i < fargeArr.length; i++) {
                if (farge === fargeArr[i]) {
                    hex = hexArr[i];
                    state = 1;
                }

            }
            if (state === 0) {
                //Samme som default i switch statement

                alert("ikke støttet farge");
                tekstDiv.style.opacity = "0";
                hex = "FFFFFF"
                farge = ""

            }
        }

        tekstDiv.style.opacity = "1";

        hexSpan.innerHTML = hex.toUpperCase();
        fargeSpan.innerHTML = farge;
        fargeDiv.style.backgroundColor = hex;



    })
}