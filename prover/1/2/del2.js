//@ts-check

window.onload = () => {
    const input = document.getElementById("farge");
    const btn = document.getElementById("button");

    const fargeSpan = document.getElementById("fargeSpan")
    const hexSpan = document.getElementById("hex")

    //Div som inneholde begge span, blir synelig etter knapp et trykket
    const tekstDiv = document.getElementById("tekst");

    btn.addEventListener("click", () => {
        //@ts-ignore
        let farge = input.value;
        let hex = "ikke støttet farge";

        tekstDiv.style.opacity = "1";

        switch (farge) {
            case "rød":
                hex = "#ff0000"
                break;
            case "grønn":
                hex = "#00ff00"
                break;
            case "blå":
                hex = "#0000ff"
                break;
            case "gul":
                hex = "#ffff00"
                break;
            case "svart":
                hex = "#000000"
                break;
            case "hvit":
                hex = "#ffffff"
                break;
            default:
                alert("ikke støttet farge");
                tekstDiv.style.opacity = "0";
                hex = "ffffff"
                farge = ""
                break;
        }
        hexSpan.innerHTML = hex.toUpperCase();
        fargeSpan.innerHTML = farge;

    })
}