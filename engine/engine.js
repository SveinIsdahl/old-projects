let canvas = document.getElementById('canvas');
let c = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;
let ef = 2;
let ball = [];
let mouseState;
let x, y;


function log(message) {
    console.log(message);
}


class Ball {
    constructor(radius, x, y, id) {
        //Alle varabler i objektet:
        this.id = id;
        this.r = radius;
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;
    }
    //Funkjson i objektet som legger til akselerasjon i fart og fart i posisjon.
    apply() {
        this.x += this.vx;
        this.y += this.vy;

        this.vx += this.ax;
        this.vy += this.ay;
    }

}

//sjekker om to baller overlapper hverandre ved å sjekke om lendgen til vektoren mellom dem eller kortere enn radiusene kombinert
function doBallsOverlap(ball, target) {
    //sjekker om ball og target er samme objekt i arrayet
    if (ball.id == target.id) {
        return false;
    }
    if (
        //Her kan man opphøye på begge sider for å slippe sqrt
        avstandPunkt(ball, target) < (ball.r + target.r)
    ) {
        return true;
    }
    else {
        return false;
        log("false");
    }
}

//finner 
function avstandPunkt(p1, p2) {
    return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow(p1.y - p2.y, 2));
}

//Loop som lager x antall objekter i arrayet
for (let i = 0; i < 20; i++) {
    ball[i] = new Ball(20, 760 * Math.random() + 20, 760 * Math.random() + 20, i);
}

//setupfunkjson, for ting som bare skal skje en gang
function setup() {
    for (let i = 0; i < ball.length; i++) {

       //ball[i].vx = (Math.random() * 2 - 1)*0.1;
       //ball[i].vy = (Math.random() * 2 - 1)*0.1;
    }
}



//draw loop
function draw() {
    c.clearRect(0, 0, width, height);

    //Loop gjennom alle objekter i arrayet
    for (let i = 0; i < ball.length; i++) {
        ball[i].apply();
        //Om farten til en ball er for lav settes den til null
        if (ball[i].vx + ball[i].vy > 0.01) {
            ball[i].x = 0;
            ball[i].y = 0;
        }



        //Looper gjennom for å sjekke hver ball mot alle andre baller om de overlapper
        for (let j = 0; j < ball.length; j++) {
            if (doBallsOverlap(ball[i], ball[j])) {
                let avstand = avstandPunkt(ball[i], ball[j]);

                let overlap = (avstand - ball[i].r - ball[j].r) / 2;

                //FLytter ball1
                ball[i].x -= overlap * (ball[i].x - ball[j].x) / avstand;
                ball[i].y -= overlap * (ball[i].y - ball[j].y) / avstand;

                //Flytter target-ball i motsatt retning
                ball[j].x += overlap * (ball[i].x - ball[j].x) / avstand;
                ball[j].y += overlap * (ball[i].y - ball[j].y) / avstand;

            }
        }


        //Om museknapp er trykket ned, sjekker om posisjonen til musepekeren ligger inni ball[i], setter da posisjon til ball[] = posisions til musepeker
        if (mouseState == 1) {
            if (isPointInCircle(ball[i], x, y)) {
                ball[i].x = x;
                ball[i].y = y;
            }
        }

        c.beginPath();
        c.arc(ball[i].x, ball[i].y, ball[i].r, 0, 2 * Math.PI);
        c.stroke();
    }





}
setup();
setInterval(draw, fps(500));
//Fps til ms/frame
function fps(fps) {
    return (1/fps)*1000;
}

//sjekker om musepeker ligger på ball
function isPointInCircle(ball, x, y) {
    return Math.abs(Math.pow(ball.x - x, 2) + (Math.pow(ball.y - y, 2))) < (Math.pow(ball.r, 2));
}

function getMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}


function mouseDown(evt) {
    mouseState = 1;
    x = getMousePos(evt).x;
    y = getMousePos(evt).y;
}

function mouseUp(evt) {
    mouseState = 0;
    x = getMousePos(evt).x;
    y = getMousePos(evt).y;
}


function mouseMove(evt) {
    x = getMousePos(evt).x;
    y = getMousePos(evt).y;
}



/*
Optimalisering:
Bruke Math. objekter kan noen ganger være krevende, bruk løsninger rundt dette
f.eks sqrt kan bli unngått ved å opphøye på begge sider av en likning
dersom det begynner å lagge, prøv å bytte ut alle matematiske operasjoner med bedre metoder.
Når jeg sjekkeer om musepeker ligger på en ball og om man trykker, sjekker jeg alle ballene om og om igjen, selv om en ball et selected.


Bedre kolisjoner (detection): kjør på høyere framerate, men kanskje ikke animer alle frames, (loop gjennom hele drawloopen uten å animere hver gang, ved å ha en ekstra for loop inni draw)

*/