
function setup() {


    function createDiv(id, x) {
        let div = document.createElement("div");
        div.id = id;
        div.width = x*10;        
        div.height = 10;
        div.offsetTop = id*10;
        div.style.top = id*10;
        div.style.position = "absolute";
        div.style.background = "red";
        let node = document.createTextNode(id);
        div.appendChild(node);
        //div.innerHTML = id;
        
        document.getElementById("a").appendChild(div);
        
        return div
    }

    let arrA = [];
    let arrB = [];
    let arrC = [];
    let size = 5;

    for (let i = 0; i < size; i++) {
        arrA.push(createDiv(i, 20 + i * 20));
        //let y = document.getElementById(i);
        //document.getElementById(i).appendChild(id)
    }


    function flytt(f, t) {
        console.log("Flytt disk " + f + " til disk " + t);
        let x = f.pop();
        console.log(x);
        console.log(f,t);
        t.push(x);
        let id
        let arr = t;
        switch (arr) {
            case arrA:
                id = "a";
                break;

            case arrB:
                id = "b";
                break;

            case arrC:
                id = "c"
                break;
        }
        /*console.log(document.getElementById(id));
        let div = document.getElementById(f[f.length])
        document.getElementById(id).appendChild(div);*/
        //Bytte switch til create div eller for loop?
        //switch for å vite hvilken div t er

    }

    function rec(n, a, b, c) {
        if (n !== 0) {
            rec(n - 1, a, c, b);
            flytt(a, c);
            rec(n - 1, b, a, c);
        }
    }
    rec(size, arrA, arrB, arrC);
    console.log(arrA, arrB, arrC);
}   
