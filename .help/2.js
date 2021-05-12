//@ts-check
const $ = (/** @type {string} */ id) => {return document.getElementById(id)};

const aktDiv = $("aktivitet");
const varigDiv = $("varighet");
const svarDiv = $("svar");

document.getElementById("beregn").addEventListener("click", ()=> {
    const radioBtns = document.querySelectorAll(`input[name="intensitet"]`);
    let intensVal;
    for(let /** @type {HTMLButtonElement} */ btn of radioBtns) {
        //@ts-ignore
        if(btn.checked) {
            intensVal = btn.value;
            break;
        }
    }
    svarDiv.innerHTML = beregn(aktDiv.value, Number(intensVal), Number(varigDiv.value))
});
function beregn(aktivitet, intensitet, varighet) {
    let aktMult;
    switch (aktivitet) {
        case "Aerobic":
            aktMult = 814;
            break;
        case "Bordtennis":
            aktMult = 237;
            break;
        case "Fotball":
            aktMult = 510;
            break;
        case "Golf":
            aktMult = 244;
            break;
        case "Jogging":
            aktMult = 666;
            break;

        default:
            console.log("Invlaid activity")
            break;
    }
    return String(Math.round(aktMult*intensitet*varighet/60));
}