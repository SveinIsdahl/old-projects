//@ts-check

class Rocket {
    constructor(div) {
        this.div = div;
    }
    x = 600;
    y = 0;
    vx = 0;
    vy = 5;
    masse = 1;

    render() {
        const { div } = this;
        this.div.style.bottom = this.y + "px";
        this.div.style.left = this.x + "px";
        div.style.transform = `translate(${x}px, ${y}px)`
    }
    move() {
        this.x += this.vx;
        this.y += this.vy;
    }

}

window.onload = () => {
    const rakett = new Rocket(document.getElementById("rocket"));

    setInterval(() => {
        rakett.move();
        rakett.render();
    }, 200);
}