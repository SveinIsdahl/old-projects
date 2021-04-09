//@ts-check

const skjema = document.getElementById("skjema");
// @ts-ignore
const user = { fornavn: "", etternavn: "", brukernavn: "",epost:"", tlf:"", adresse:"" };
//@ts-ignore
skjema.info = user;

// @ts-ignore
const divBrukere = document.getElementById("brukere");

skjema.addEventListener("useraccount", e => {
    //@ts-ignore
    if (e.detail === "ok") {
        //@ts-ignore
        const { fornavn, etternavn, brukernavn, epost, tlf, adresse} = skjema.info;
        if (brukernavn !== "") {
            localStorage.setItem(brukernavn, `Brukernavn: ${brukernavn} <br> Fornavn: ${fornavn}  <br> Etternavn: ${etternavn} <br> Epost: ${epost} <br>Tlf: ${tlf} <br>Adresse: ${adresse} <br>`);
            showUsers();
        }
    } else {

    }
})

if (confirm("Vil du slette alle brukere?")) {
    localStorage.clear();
} 

function showUsers() {
    for (let i = 0; i < localStorage.length; i++) {
        let bruker = document.createElement("div");
        bruker.innerHTML += localStorage.getItem(localStorage.key(i));
        divBrukere.append(bruker);
    }
}
showUsers();
