// @ts-check
window.onload = () => {
    setup()
}
let width = 500;
let height = 500;

class Ball {
    x = 0;
    y = 0;
    w = 0;
    h = 0;
    vx = 0;
    vy = 0;

    div;
    tegn() {
        this.div.style.left = this.x + "px";
        this.div.style.top = this.y + "px";

    }

}


function setup() {

    document.addEventListener("mousemove", (e) => {
        let mx = e.clientX;
        let my = e.clientY;

        let vektor = {
            x: (mx - b.x) / (Math.sqrt(mx * mx + b.x * b.x)),
            y: (my - b.y) / (Math.sqrt(my * my + b.y * b.y))
        }

        if ((Math.abs(b.vx) || Math.abs(b.vy)) > 10) {
            if (b.vx > 0) {
                b.vx--;
            }
            if (b.vx < 0) {
                b.vx++;
            }
            if (b.vy > 0) {
                b.vy--;
            }
            if (b.vy < 0) {
                b.vy++;
            }

        }

        console.log(b.vx + " " + b.vy)

        b.vx += vektor.x;
        b.vy += vektor.y;


    })
    document.addEventListener("click", (e) => {
        b.x = e.clientX - 20;
        b.y = e.clientY - 20;
        b.vx = 0;
        b.vy = 0;
    })

    let divBrett = document.getElementById("brett");
    let divStatus = document.getElementById("status");
    const b = new Ball();


    b.x = 100;
    b.y = 100;
    b.w = 20;
    b.h = 20;
    b.vx = 0;
    b.vy = 0;



    b.div = document.createElement("div");
    divBrett.append(b.div);
    b.div.className = "ball";
    b.tegn();

    function animer() {
        b.div.style.background = '#' + Math.floor(Math.random() * 16777215).toString(16);

        b.x += b.vx;
        b.y += b.vy;

        //BALLEN ER EN FIRKANT, x.y er øvre vesntre hjørne
        if (b.x > width - b.w) {
            b.vx *= -1;
        }
        if (b.x < 0) {
            b.vx *= -1;
        }
        if (b.y > height - b.h) {
            b.vy *= -1;
        }
        if (b.y < 0) {
            b.vy *= -1;
        }


        b.tegn();
        requestAnimationFrame(animer);
    }
    requestAnimationFrame(animer);
    animer();

}