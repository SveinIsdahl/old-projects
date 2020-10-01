// @ts-check


function setup() {
    const divMain = document.getElementById("main");
    const divGraf = document.getElementById("graf");

    function f(x) {
        return x ** 2 - 2;
    }

    /**
     * Returns array filled with values increasing from start to stop
     * The step - dx - between values is given as (stop-start)/size
     * @param {number} start
     * @param {number} stop
     * @param {number} size
     * @returns {number[]}  [ start, start+dx, ..., start+n*dx, ...,stop-dx, stop]
     */
    function linspace(start, stop, size) {
        const step = (stop - start) / size;
        return new Array(Math.abs(Math.trunc(size))).fill(0).map((_, i) => start + i * step)

    }

    function linspace1(start, stop, size) {
        //Liste av x-verdier
        const X = [];
        const step = (stop - start) / size;
        for (let x = start; x < stop; x += step) {
            X.push(x)
        }
        return X;
    }

    const X = linspace(-2, 2, 400);
    const Y = X.map(f);
    for (let i = 0; i < 399; i++) {
        const d = document.createElement("div");
        d.className = "point";
        d.style.left = `${i}px`;
        d.style.top = `${200 - 40*Y[i]}px`;
        divGraf.append(d);
        if (Y[i] * Y[i + 1] <= 0) {
            divMain.innerHTML += `<br>Nullpunkt mellom ${X[i].toFixed(3)} og ${X[i+1].toFixed(3)}`;
            d.classList.add("crossing");
        }

    }

}