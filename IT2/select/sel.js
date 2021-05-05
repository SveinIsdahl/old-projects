//@ts-check

window.onload = () => {
    const t = document.getElementById("t");
    t.append(makeSelect("test1,test2,test3"));
    
}

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
