// @ts-check



/**
 * @file Et ballspill.<br>
 * Denne kommentaren vises på første side
 * av dokumentasjonen - pga @ f i l e
 * <p>
 * Dette spillet har en ball
 * </p>
 */

/**
 * Enkel klasse for å plassere en ball
 * på skjermen. (x,y) er posisjon
 * (vx,vy) er fart, w,h er width,height
 */
class Ball {
    x = 0;
    y = 0;
    w = 20;
    h = 20;
    vx = 0;
    vy = 0;
    div = undefined;

    /**
     * Oppdaterer posisjon til div på skjermen
     */
    tegnPaaSkjerm() {
        this.div.style.left = this.x + "px";
        this.div.style.top = this.y + "px";


    }
}

/**
 * ballTabell inneholder alle ballene i spillet
 */
let ballTabell = [];
let antall;

/**
 * Oppstartsfunksjonen
 * Lager en ball og starter en timer
 */
function setup() {
    const divBrett = document.getElementById("brett");
    const inpAntall = /** @type {HTMLInputElement} */ (document.getElementById("antall"));
    const btnStart = document.getElementById("start");
    const maxX = Math.random() * 7 + 4;
    const maxY = Math.random() * 7 + 4;

    btnStart.addEventListener("click", startSpill);

    function startSpill() {
        ballTabell = [];
        antall = Number(inpAntall.value);
        for (let i = 0; i < antall; i += 1) {
            const b = new Ball();
            b.x = Math.random() * 460 + 20;
            b.y = Math.random() * 460 + 20;
            b.w = Math.random() * 100 + 2;
            b.h = b.w;
            b.vx = 5;
            b.vy = -4;

            b.div = document.createElement("div");
            divBrett.append(b.div);
            b.div.className = "ball";
            b.div.style.width = b.w + "px";
            b.div.style.height = b.h + "px";

            b.tegnPaaSkjerm();
            ballTabell.push(b);
        }
        setInterval(flyttPaaBallen, 20);
    }


    function flyttPaaBallen() {
        for (let i = 0; i < antall; i += 1) {
            const b = ballTabell[i];
            b.div.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

            b.x += b.vx;
            b.y += b.vy;
            if (b.x > 500 - b.w) {
                b.vx = -maxX;
            }
            if (b.x < 0) {
                b.vx = maxX;
            }
            if (b.y > 500 - b.h) {
                b.vy = -maxY;
            }
            if (b.y < 0) {
                b.vy = maxY;
            }
            b.tegnPaaSkjerm();
        }

    }

}