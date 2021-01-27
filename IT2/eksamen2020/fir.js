//@ts-check


// Kunne brukt set, men for seint å endre
const drawnArray = [];
// Piksler pr centimeter
const cmWidth = 50;
window.onload = () => {
    const btnDiv = document.getElementById("button");
    const inpDiv = document.getElementById("input");
    const boxDiv = document.getElementById("box");
    const arealDiv = document.getElementById("areal");
    btnDiv.addEventListener("click", () => {
        let val = inpDiv.value;
        val = Number(val);
        function checkDrawn() {
            for (let i = 0; i < drawnArray.length; i++) {
                const num = drawnArray[i];
                if (num == val) {
                    return true;
                }
            }
        }
        if (checkDrawn()) {
            alert("Already drawn")
        }

        else if (val < 1 || val > 9) {
            alert("Number not in specified area");
        }
        else {
            drawnArray.push(val);
            boxDiv.style.height = 10 * cmWidth - val * cmWidth + "px";
            boxDiv.style.width = val * cmWidth + "px";
            arealDiv.innerHTML =  val * (10-val) + "";
            if (drawnArray.length === 9) {
                setTimeout(() => { alert("Alle tall er brukt opp") }, 2000)
            }
            let alpha = 0;
            let interval = setInterval(() => {
                applyAnimation(boxDiv, alpha);
                alpha += 0.01;
                if (alpha >= 1) {
                    clearInterval(interval);
                }
            }, 20);
            //100 Intervaller * 20ms = 2 sek
            //Andre metoder er sannsynligvis mer nøyaktige, men her kreves ikke nøyaktighet
            console.log(boxDiv)
        }



    })
}
function applyAnimation(div, alpha) {
    div.style.border = `rgba(0,0,0, ${alpha}) solid 2px`;
    div.style.background = `rgba(100,20,100, ${alpha}`
}