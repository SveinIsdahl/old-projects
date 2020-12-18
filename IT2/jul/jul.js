//@ts-check

class Nisse {
    x = 700;
    y = 100;
    w = 200;
    h = 200;
    vx = -5;
    div;
    render() {
        if (this.vx < 0) {
            this.div.style.transform = "scaleX(1)";
        }
        else {
            this.div.style.transform = "scaleX(-1)";
        }
        this.div.style.left = this.x + "px";
        this.div.style.top = `${this.y}px`
    }
    constructor() {

    }
}

class Gran extends Nisse {
    vy = 0;
    status = "klar"
    constructor() {
        //Contructor gran må kjøre nisse constructor
        super();
        this.y = 600;
        this.x = Math.random() * 900 + 50;
        this.w = 40;
        this.h = 80;
        this.div = document.createElement("div");
        document.getElementById("sky").appendChild(this.div);
        this.div.className = "tre";
    }
    skyt() {
        this.status = "aktiv";
        this.vy = -15;


    }
}

const skog = [];
function setup() {
    const FART = 20;
    addEventListener("keydown", styrSpillet);
    const nisse = new Nisse();
    const gryla = new Nisse();

    nisse.div = document.getElementById("santa");
    gryla.div = document.getElementById("gryla");
    gryla.x = 10;
    gryla.y = 650;

    function styrSpillet (e){
        switch(e.key) {
            case "ArrowLeft" : {
                gryla.x -= FART;
            } break;
            case "ArrowRight" : {
                gryla.x += FART;
            } break;
            case " " : {

                for (let i = 0; i < skog.length; i++) {
                    const tre = skog[i];
                    if(tre.status !== "klar") {continue}

                    let avstand = gryla.x - tre.x;
                    console.log(tre.x)

                    if(Math.abs(avstand) < 40) {

                        tre.skyt();
                        break;
                    }
                    
                }
            } break;
            
        }
        gryla.render();
    }

    for (let i = 0; i < 10; i++) {
        const gran = new Gran();
        //let div = document.createElement("div");
        skog.push(gran);
        gran.render();
    }

    setInterval(() => {
        nisse.x += nisse.vx;
        if (nisse.x < 0) {
            nisse.vx = 5;
        }
        if (nisse.x > 800) {
            nisse.vx = -5;
        }
        nisse.render();
        for(let tre of skog) {
            
            if(tre.status === "aktiv") {
                console.log(tre.y)
                tre.y += tre.vy;
                tre.render();
                if(collision(tre, nisse)){
                    nisse.y += Math.ceil(45*Math.random());
    
                    tre.y = -1000;
                    tre.render();
                    if (nisse.y > 300) {
                        nisse.y = 100;
                        alert("You won");
                        location.reload();
                    }
                }
                if(tre.y < -200) {
                    tre.status = "ferdig";
                }
            }
        }
    }, 30)
}
/**
 * 
 * @param {{x:number, y:number, w:number, h:number}} a 
 * @param {{x:number, y:number, w:number, h:number}} b 
 */
function collision(a, b) {
    return a.x > b.x - a.w &&
            a.x < b.x + b.w &&
            a.y > b.y -a.h &&
            a.y < b.y + b.h

}