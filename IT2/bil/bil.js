//@ts-check

window.onload = () => {
    const divMain = document.getElementById("main");
    const btnSpill = document.querySelector("button");
    const bil = document.getElementById("bil");
    const bil2 = document.getElementById("bil2");


    let lydfil = document.getElementById("lyd");
    let krasj = document.getElementById("krasj")

    btnSpill.addEventListener("click", () => {
        //void btnSpill.offsetWidth;
        lydfil.play();
        setTimeout(() => { lydfil.play() }, 1000)
        bil.classList.add("aktiv");
        bil2.classList.add("aktiv");
        setTimeout(() => {
            //bil.classList.remove("aktiv");
            //bil2.classList.remove("aktiv");
            krasj.play();
            bil2.classList.remove("aktiv");

            bil2.classList.add("krasj");

        }, 2600)
    })

}

/*
divBil.classList.remove("aktiv")
void divBil.offsetWidth;
lydfil.play
*/