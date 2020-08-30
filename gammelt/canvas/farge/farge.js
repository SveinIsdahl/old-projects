let canvas = document.getElementById("c");
let ctx = canvas.getContext("2d");
ctx.translate(canvas.width / 2, canvas.height / 2);
//export

function degToRad(angle) {
    return angle / (2 * Math.PI) * 360
}

function degToRad(angle) {
    return angle / (2 * Math.PI) * 360
}

class Vector {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.magnitude = Math.sqrt(this.x**2 + this.y**2);
    }
    dotProduct(vector2) {
        return (this.x * vector2.x + this.y * vector2.y);
    }
    unitvector() {
        return {
            x: this.x / this.magnitude,
            y: this.y / this.magnitude

        }
    }
    angleBetween(vector2) {
        return Math.acos(this.dotProduct(vector2) / (this.magnitude * vector2.magnitude)) // I radianer
    }
    rotate(theta) {
        let x = Math.cos(theta) * this.x - Math.sin(theta) * this.y;
        let y = Math.cos(theta) * this.y + Math.sin(theta) * this.x;
        this.x = x;
        this.y = y;
    }

    setMagnitude(magnitude) {
        this.x = (this.x / this.magnitude) * magnitude
        this.y = (this.y / this.magnitude) * magnitude
        this.magnitude = Math.sqrt(this.x * this.x + this.y * this.y);
    }

    add(vector2) {
        return new Vector(this.x + vector2.x, this.y + vector2.y);
    }
    sub(vector1, vector2) {
        return new Vector(vector1.x - vector2.x, vector1.y - vector2.y);
    }
    mult(scalar) {
        this.x = this.x * scalar;
        this.y = this.y * scalar;
    }
    div(scalar) {
        this.x = this.x / scalar;
        this.y = this.y / scalar;
    }
}

let accumilatedTheta = 0;
let vektor = new Vector(100, 0);
let vektor2 = new Vector(1000, 220);
ctx.strokeStyle = "hsl(" + Math.floor(Math.random() * 360) + ", 100%, 50%)";
function draw() {

    //ctx.clearRect(-200, -200, 400, 400)
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo(0, 0);
    ctx.lineTo(vektor.x, vektor.y);
    ctx.stroke();
    vektor.setMagnitude(vektor.magnitude * Math.random() * 5);
    if (vektor.magnitude > canvas.height) {
        vektor.setMagnitude(vektor.magnitude / 100);
    }
    let theta = 0.01;
    vektor.rotate(theta);
    accumilatedTheta += theta;
    if (accumilatedTheta >= Math.PI * 2) {
        accumilatedTheta = accumilatedTheta - Math.PI * 2;
        ctx.strokeStyle = "hsl(" + Math.floor(Math.random() * 360) + ", 100%, 50%)";
    }

}

setInterval(draw, 0.1);


