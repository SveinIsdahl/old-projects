// @ts-check

const $ = (id) => document.getElementById(id);

function setup() {

    let nyttTall = true;
    let minne = 0;
    let operator = "";
    let trigMode = "deg";

    const divDisplay = $("display");
    const divTall = $("tall");
    const divAC = $("ac");
    const divOperator = $("operator");
    const divErlik = $("erlik");
    const divFunk = $("funk")
    const divSpecial = $("specials")
    const divMode = $("mode")


    divOperator.addEventListener("click", opererTall);
    divFunk.addEventListener("click", matteFunk);
    divErlik.addEventListener("click", doOperation);
    divSpecial.addEventListener("click", specialFunk);


    divTall.addEventListener("click", sjekkTall);
    divAC.addEventListener("click", nullstill);

    function visMode() {
        divMode.innerHTML = ` ${trigMode}`
    }
    visMode();

    function matteFunk(e) {
        const t = e.target;
        if (t.className === "button") {
            nyttTall = true;
            const funknavn = t.innerHTML;
            let tall = Number(divDisplay.innerHTML);

            if ("sincostan".includes(funknavn)) {
                console.log(trigMode)
                if (trigMode === "deg") {
                    tall /= 180;
                    tall *= Math.PI
                }
                switch (funknavn) {
                    case "sin":
                        {
                            divDisplay.innerHTML = "" + Math.sin(tall).toFixed(8);
                            break;
                        }
                    case "cos":
                        {
                            divDisplay.innerHTML = "" + Math.cos(tall).toFixed(8);
                            break;
                        }
                    case "tan":
                        {
                            divDisplay.innerHTML = "" + Math.tan(tall).toFixed(8);
                            break;
                        }

                    default:
                        break;
                }
                visMode();
            } else {
                alert("feil navn på funksjon" + funknavn + "mangler");
            }
        }
    }

    function specialFunk(e) {
        const t = e.target;
        if (t.className === "button") {
            const funknavn = t.innerHTML;

            if ("degrad".includes(funknavn)) {
                switch (funknavn) {
                    case "degrad":
                        {
                            /*
                            if  (trigMode === "rad") {
                                trigMode = "deg"
                            } else {
                                trigMode = "rad"
                            }
                            */
                            trigMode = trigMode === "deg" ? "rad" : "deg";
                            visMode();

                        }
                    default:
                        break;
                }
            } else {
                alert("feil navn på funksjon " + funknavn + " mangler");
            }
        }
    }

    function doOperation(e) {
        let svar;

        switch (operator) {
            case "+":
                svar = minne + Number(divDisplay.innerHTML);
                divDisplay.innerHTML = String(svar);
                minne = svar;
                nyttTall = true;

                break;
            case "-":
                svar = minne - Number(divDisplay.innerHTML);
                divDisplay.innerHTML = String(svar);
                minne = svar;
                nyttTall = true;

                break;
            case "/":
                svar = minne / Number(divDisplay.innerHTML);
                divDisplay.innerHTML = String(svar);
                minne = svar;
                nyttTall = true;

                break;
            case "*":
                svar = minne * Number(divDisplay.innerHTML);
                divDisplay.innerHTML = String(svar);
                minne = svar;
                nyttTall = true;

                break;

            default:
                break;
        }
    }

    function opererTall(e) {
        const t = e.target;
        if (t.className === "button") {
            if (operator !== "") {
                doOperation(null)
            }
            operator = t.innerHTML;
            minne = Number(divDisplay.innerHTML);
            nyttTall = true;
        }
    }

    function nullstill(e) {
        divDisplay.innerHTML = "0";
        nyttTall = true;
    }

    function sjekkTall(e) {
        const t = e.target;
        if (t.className === "button") {
            if (divDisplay.innerHTML.includes(".") && t.innerHTML === (".")) {
                return;
            }
            if (t.innerHTML.includes("-")) {
                if (divDisplay.innerHTML === "0" || divDisplay.innerHTML === "") {
                    return
                }
                if (divDisplay.innerHTML.includes("-")) {
                    divDisplay.innerHTML = divDisplay.innerHTML.substr(1); //Begynner på plass nr 1
                } else {
                    divDisplay.innerHTML = "-" + divDisplay.innerHTML;
                }
                return
            }
            if (nyttTall) {
                minne = Number(divDisplay.innerHTML);
                divDisplay.innerHTML = "";
            }
            nyttTall = false;
            const verdi = t.innerHTML;
            divDisplay.innerHTML += verdi;
        }
    }

    lageKnapper("tall", "789456123-0.".split(""));
    lageKnapper("operator", "+-*/".split(""));
    lageKnapper("funk", "sin,cos,tan".split(","));
    lageKnapper("specials", "degrad".split(","));


    function lageKnapper(id, symboler) {
        const divRamme = $(id);
        for (let i = 0; i < symboler.length; i++) {
            const div = document.createElement("div");
            div.className = "button";
            divRamme.append(div);
            div.innerHTML = symboler[i];
        }
    }



}