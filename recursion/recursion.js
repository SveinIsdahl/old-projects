
function setup() {


    function createDiv(id, x) {
        let div = document.createElement("div");
        div.id = id;
        div.width = x;
        div.style.background = "red";
        div.innerHTML = id;
        document.getElementById("a").appendChild(div);
        return div
    }

    let arrA = [];
    let arrB = [];
    let arrC = [];
    let size = 5;

    for (let i = 0; i < size; i++) {
        arrA.push(createDiv(i+1,10+i*100));
    }


    function flytt(f, t){
        console.log("Flytt disk "+ f + " til disk " + t);
        let x = f.pop();
        console.log(x);
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
        let y = document.getElementById
        document.getElementById(id).appendChild()
        //Bytte switch til create div eller for loop?
        //switch for å vite hvilken div t er

    }
  
    function rec(n, a, b, c) {
        if (n==0){

        }
        else {
        rec(n-1, a, c, b);
        flytt(a, c);
        rec(n-1, b, a, c);
        }
    }
    rec(size, arrA, arrB, arrC);        
    console.log(arrA,arrB,arrC);
}   
