//@ts-check

/**
 * @param {string} id
 */
const $ = (id) => {
    return document.getElementById(id)
}
/**
 * @typedef {[String, (String | Number), (String | Number), (String | Number), (String | Number), (String | Number)]} Tabell
 */
/**
 * @type Tabell[]
 */
const tabell = [
    ["Type Firkant", "Bunnlinje", "Topplinje", "Høyde", "Forskyvning", "Areal"],
    ["Kvadrat", 10, 10, 10, 0, 100],
    ["Rektangel", 20, 20, 5, 0, 100],
    ["Paralellogram", 20, 20, 10, 2, 200],
    ["Trapes", 20, 10, 5, 2, 75],
    ["Trapes", 5, 3, 10, 5, 40],
]

//Cm per pixel
const cmPixel = 50;

//Canvas oppsett
const canvas = $("canvas");
// @ts-ignore
const c = canvas.getContext("2d");

//HTML-elements
const tabellDiv = $("tabell");
const btnAdd = $("add");
const btnupdate = $("update");
const btnremove = $("remove");
const divArray = [$("bunn"), $("topp"), $("hoyde"), $("forskyvning")];

//Globale variabler
let selectedIndex;
// Array med alle inputvalues
let valArr = [];

btnAdd.addEventListener("click", () => {
    updateValueArray();

    addData(valArr[0], valArr[1], valArr[2], valArr[3]);
    selectedIndex = tabell.length-1;
    drawRect(valArr[0], valArr[1], valArr[2], valArr[3]);

    displayData();
})
btnupdate.addEventListener("click", () => {
    if(selectedIndex !== undefined) {
        updateValueArray();
        
        const type = findType(valArr[0], valArr[1], valArr[2], valArr[3]);
        const areal = findAreal(valArr[0], valArr[1], valArr[2]);
        tabell.push([type, valArr[0], valArr[1], valArr[2], valArr[3], areal]);
        removeSelectedFromTabell();
        selectedIndex = tabell.length-1;

        displayData();
        drawRect(valArr[0], valArr[1], valArr[2], valArr[3]);
    }
})
btnremove.addEventListener("click", () => {
    if(selectedIndex !== undefined) {

        removeSelectedFromTabell()
        c.clearRect(0,0,2000,2000);

    }

})

function removeSelectedFromTabell() {
    //Fjerne fra tabell så den ikke blir displayet på nytt
    tabell.splice(selectedIndex, 1);
    selectedIndex = undefined;
    displayData();
}
function updateValueArray() {
    for (let i = 0; i < divArray.length; i++) {
        const div = divArray[i];
        // @ts-ignore
        valArr[i] = Number(div.value);
    }
}

displayData();

function displayData() {
    tabellDiv.innerHTML = "";

    let tr = document.createElement("tr");
    tabellDiv.appendChild(tr);

    //Loop for header-rad
    for (let i = 0; i < tabell[0].length; i++) {
        const element = tabell[0];
        let th = document.createElement("th");
        tr.appendChild(th);
        th.innerHTML = element[i] + "";
        th.style.border = "1px solid black";

    }
    //Loop for resten av tabellen
    for (let i = 1; i < tabell.length; i++) {
        
        const rad = tabell[i];

        let tr = document.createElement("tr");
        tabellDiv.appendChild(tr);

        

        //Setter bakgrunnsfarge på selected row
        if (i === selectedIndex) {
            tr.style.background = "rgba(10, 50, 10, 0.3)";

        }
        //Setter annen bakgrunnsfarge for annen hver rad
        else if(i % 2 === 0) {
            tr.style.background = "rgba(230, 230, 255, 1)";
            console.log("test");
        }
        else {
            tr.style.background = "rgb(255, 255, 255)";
        }

        for (let j = 0; j < rad.length; j++) {
            const element = rad[j];
            let td = document.createElement("td");
            tr.appendChild(td);
            td.innerHTML = element + "";
            td.style.border = "1px solid black";


            td.addEventListener("click", () => {
                drawRect(rad[1], rad[2], rad[3], rad[4]);
                setInputs(rad[1], rad[2], rad[3], rad[4]);
                selectedIndex = i;
                // Redisplay data for å resette farge og selecte rett
                displayData();

            })
        }
    }
}



function findAreal(bunnlinje, topplinje, hoyde) {
    return ((topplinje + bunnlinje) * hoyde) / 2;
}
function findType(bunnlinje, topplinje, hoyde, forskyvning) {
    if(bunnlinje === 0 || topplinje === 0) {
        alert("Bunnlinje or Topplinje can not be 0 for it to be a square");
        return "Not square"
    }
    else if (((bunnlinje === topplinje) && (topplinje === hoyde)) && forskyvning === 0) {
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

function setInputs(bunn, topp, hoyde, forskyvning) {
    divArray[0].value = bunn + "";
    divArray[1].value = topp + "";
    divArray[2].value = hoyde + "";
    divArray[3].value = forskyvning + "";

}

function drawRect(bunnlinje, topplinje, hoyde, forskyvning) {
    c.clearRect(0, 0, 4000, 4000)
    c.beginPath();
    c.moveTo(forskyvning * cmPixel, 0)
    c.lineTo((topplinje + forskyvning) * cmPixel, 0);
    c.lineTo(bunnlinje * cmPixel, hoyde * cmPixel);
    c.lineTo(0, hoyde * cmPixel);
    c.lineTo(forskyvning * cmPixel, 0);
    c.stroke();
}




