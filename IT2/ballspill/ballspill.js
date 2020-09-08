// @ts-check
window.onload = () => {
    setup()
}
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
    console.log("grg")
    let divBrett = document.getElementById("brett");
    let divStatus = document.getElementById("status");
    const b = new Ball();
    b.x = 100;
    b.y = 100;
    b.w = 20;
    b.w = 20;
    b.vx = 0.1;
    b.vy = 0.1;

    b.div = document.createElement("div");
    divBrett.append(b.div);
    b.div.className = "ball";

    b.tegn();

    function animer() {
        b.x += 1;
        b.tegn();
        requestAnimationFrame(animer);
    }
    requestAnimationFrame(animer);
    animer();

}