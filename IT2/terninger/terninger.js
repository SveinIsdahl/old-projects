// @ts-check

function setup() {
    let btnRoll = document.getElementById("roll");
    let terninger = document.querySelectorAll("dice-roll");
    let antall = 0;
    let g = {};
    btnRoll.addEventListener("click", () => { antall=0; rollDice() });
console.log(terninger);
console.log(g)
    function rollDice() {

        antall++;
        for (let t of terninger) {
            t.setAttribute("roll", "yes");
        }
        



    }
}
