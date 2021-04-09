//@ts-check


const divSkjema = document.getElementById("skjema");
const divBrukere = document.getElementById("brukere");

main();

/**
 * @param {Object} data
 * @param {HTMLElement} form
 */
function userForm(data, form) {
    form.info = data;
    
    return new Promise(resolve =>
        form.addEventListener("useraccount", e => {
            if (e.detail === "ok") {
                resolve(form.info);
                return;
            }
            resolve({});
        })
    )
};

async function main() {
    let skjemaArray = [document.createElement("input-form"), document.createElement("input-form"), document.createElement("input-form"), document.createElement("input-form")]
  
    divSkjema.append(skjemaArray[0]);
    const bruker = await userForm({ epost: "", username: "" }, skjemaArray[0]);

    divSkjema.append(skjemaArray[1]);
    const pris = await userForm({ price: "" }, skjemaArray[1]);

    divSkjema.append(skjemaArray[2]);
    const visa = await userForm({ payment: "" }, skjemaArray[2]);

    divSkjema.append(skjemaArray[3]);
    const confirmation = await userForm({ confirmation: "" }, skjemaArray[3]);


}

function showUsers() {
    for (let i = 0; i < localStorage.length; i++) {
        console.log(localStorage.getItem(localStorage.key(i)))
    }
}
