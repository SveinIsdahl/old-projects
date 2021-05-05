//@ts-check

const l = (x) => { console.log(x) }
const utleie = {
    "Hytte": [

    ],
    "Granstua": [
        "påske"
    ],
    "Grantoppen": [
        "vinterferie"
    ],
    "Granhaug": [
        "vinterferie"
    ]
}
const select = makeSelect(Object.keys(utleie).join(","))
const main = document.getElementById("main")
const select2Div = document.getElementById("select2");

main.append(select);

select.addEventListener("change", () => {
    select2Div.innerHTML = "";
    if (select.value !== "Hytte") {
        const select2 = makeSelect(utleie[select.value].join(","));
        select2Div.append(select2);
    }
})
const submitbtn = document.getElementById("submit");
submitbtn.addEventListener("click", () => {
    const arr = utleie[select.value];
    l(document.querySelector("#select2 > select").value)
    for( var i = 0; i < arr.length; i++){    
        if ( arr[i] == (document.querySelector("#select2 > select").value)) { 
            arr.splice(i, 1); 
            i--; 
        }
    }
    select2Div.innerHTML = "";
    if ((select.value !== "Hytte")) {
        const select2 = makeSelect(utleie[select.value].join(","));
        select2Div.append(select2);
    }
    
})
/**
 * @param {string} liste
 * @returns {HTMLSelectElement} select
 */
function makeSelect(liste) {
    const listeArr = liste.split(",");
    const sel = document.createElement("select");

    listeArr.forEach((e) => {
        const option = document.createElement("option");
        option.innerHTML = e;
        option.value = e;
        sel.append(option);
    })
    return sel;
}
