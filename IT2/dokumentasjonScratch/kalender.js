//@ts-check

let year = 2021;
let month = 2;

const mNavn = "Januar,Februar,Mars,April,Mai,Juni,Juli,August,September,Oktober,November,Desember".split(",");

window.onload = () => {
    const yearDiv = document.getElementById("year");
    const monthDiv = document.getElementById("month");
    const py = document.getElementById("py");
    const ny = document.getElementById("ny");
    const pm = document.getElementById("pm");
    const nm = document.getElementById("nm");

    py.addEventListener("click", prevYear);
    ny.addEventListener("click", nextYear);
    pm.addEventListener("click", prevMonth);
    nm.addEventListener("click", nextMonth);

    monthDiv.innerHTML = mNavn[month];
    function prevYear() {
        year--
        yearDiv.innerHTML = year + "";
    }
    function nextYear() {
        year++
        yearDiv.innerHTML = year + "";
    }
    function prevMonth() {
        month--
        if (month <= -1) {
            month = 11;
            prevYear();
        }
        monthDiv.innerHTML = mNavn[month];
    }
    function nextMonth() {
        month++
        if (month >= 12) {
            month = 0;
            nextYear()
        }
        monthDiv.innerHTML = mNavn[month];
    }
}
