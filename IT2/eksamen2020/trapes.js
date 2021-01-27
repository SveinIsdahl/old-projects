//@ts-check

/**
 * @param {string} id
 */
const $ = (id) => {
    return document.getElementById(id)
}

//Cm per pixel
const cmPixel = 50;

const tabell = [
    ["Type Firkant", "Bunnlinje", "Topplinje", "Høyde", "Forskyvning", "Areal"],
    ["Kvadrat", 10, 10, 10, 0, 100],
    ["Rektangel", 20, 20, 5, 0, 100],
    ["Paralellogram", 20, 20, 10, 2, 200],
    ["Trapes", 20, 10, 5, 2, 75],
    ["Trapes", 5, 3, 10, 5, 40],
]

function displayData(tabellDiv, ctx) {
    tabellDiv.innerHTML = "";
    for (let i = 0; i < tabell.length; i++) {
        const rad = tabell[i];

        let tr = document.createElement("tr");
        tabellDiv.appendChild(tr);

        for (let j = 0; j < rad.length; j++) {
            const element = rad[j];
            let td = document.createElement("td");
            tr.appendChild(td);
            td.innerHTML = element + "";
            td.style.border = "1px solid black";

            td.addEventListener("click", () => {
                drawRect(ctx, rad[1], rad[2], rad[3], rad[4]);
            })
        }
    }
}


function findAreal(bunnlinje, topplinje, hoyde) {
    return ((topplinje + bunnlinje) * hoyde) / 2;
}
function findType(bunnlinje, topplinje, hoyde, forskyvning) {
    if (((bunnlinje === topplinje) && (topplinje === hoyde)) && forskyvning === 0) {
        return "Kvadrat"
    }
    else if ((bunnlinje === topplinje) && (forskyvning === 0)) {
        return "Rektangel"
    }
    else if ((bunnlinje === topplinje) && (forskyvning !== 0)) {
        return "Paralellogram"
    }
    else if (bunnlinje !== topplinje) {
        return "Trapes"
    }
    else {
        alert("error, no type matching")
    }
}

function addData(bunnlinje, topplinje, hoyde, forskyvning) {

    const areal = findAreal(bunnlinje, topplinje, hoyde);
    const type = findType(bunnlinje, topplinje, hoyde, forskyvning);

    tabell.push([type, bunnlinje, topplinje, hoyde, forskyvning, areal]);

}

window.onload = () => {
    const canvas = $("canvas");
    // @ts-ignore
    const ctx = canvas.getContext("2d");
    const tabellDiv = $("tabell");
    const btnDiv = $("btn");

    const divArray = [$("bunn"), $("topp"), $("hoyde"), $("forskyvning")];

    let valueArray = [];
    btnDiv.addEventListener("click", () => {
        for (let i = 0; i < divArray.length; i++) {
            const div = divArray[i];
            valueArray[i] = Number(div.value);
        }
        addData(valueArray[0], valueArray[1], valueArray[2], valueArray[3]);
        displayData(tabellDiv, ctx);
    })



    displayData(tabellDiv, ctx);


}

function drawRect(c, bunnlinje, topplinje, hoyde, forskyvning) {
    c.clearRect(0, 0, 4000, 4000)
    c.beginPath();
    c.moveTo(forskyvning * cmPixel, 0)
    c.lineTo((topplinje + forskyvning) * cmPixel, 0);
    c.lineTo(bunnlinje * cmPixel, hoyde * cmPixel);
    c.lineTo(0, hoyde * cmPixel);
    c.lineTo(forskyvning * cmPixel, 0);

    c.stroke();
}