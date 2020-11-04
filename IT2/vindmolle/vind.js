//@ts-check

window.onload = () => {
    let select = document.getElementById("styrke");
    let blad = document.getElementById("blad");
    let tre = document.getElementById("tre")
    let hus = document.getElementById("hus")

    select.addEventListener("change", () => {
        blad.style.animationDuration = select.value;

        if (select.value === "1s") {
            tre.classList.remove("vind");
            void tre.offsetWidth;
            tre.classList.add("vind");
        } else {
            tre.classList.remove("vind");
        }

        /**
         * @param {number} x
         */
        function map(x) {
            let arr = [0, 255, 155, 55];
            return arr[x];
        }
        let col = map(Number(select.value.slice(0, 1)));

        hus.style.backgroundColor = `rgb(${col}, ${col}, 0)`


    })
}