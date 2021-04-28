//@ts-check
const l = (x) => console.log(x);
import { dotProduct, distancePoints, length, normalize } from "./vectors.js";
const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

const w = 1200;
const h = 700;
canvas.width = w;
canvas.height = h;
canvas.style.width = w + "px";
canvas.style.height = h + "px";

class Boid {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 7;
        this.vx = 0;
        this.vy = 0;
    }
    updatePos() {
        this.x += this.vx;
        this.y += this.vy;
    }
}
const boidArr = [];
for (let i = 0; i < 300; i++) {
    boidArr[i] = new Boid(Math.round(Math.random() * w), Math.round(Math.random() * h));

}
function draw() {
    c.clearRect(0, 0, w, h)
    c.beginPath();
    c.lineWidth = 3
    boidArr.forEach((b1, i) => {
        // DIstance uten å ta kvadratrot for optimization
        let distance = Infinity;
        let indexOfShortestDist = -1;
        boidArr.forEach((b2, j) => {
            if (i !== j) {
                let distTest = Math.pow((b1.x - b2.x), 2) + Math.pow(b1.y - b2.y, 2);
                if (distTest < distance) {
                    distance = distTest;
                    indexOfShortestDist = j;
                }
            }
        })
        const b2 = boidArr[indexOfShortestDist];
        const vel = normalize(b2.x - b1.x, b2.y - b1.y);



        b1.vx -= vel.x * (100 / distance);
        b1.vy -= vel.y * (100 / distance);

        if (b1.x < 0) { b1.x = w };
        if (b1.x > w) { b1.x = 0 };
        if (b1.y < 0) { b1.y = h };
        if (b1.y > h) { b1.y = 0 };

        const maxVel = 5;
        if (Math.abs(b1.vx) > maxVel) {
            b1.vx = maxVel * Math.sign(b1.vx);

        }
        if (Math.abs(b1.vy) > maxVel) {
            b1.vy = maxVel * Math.sign(b1.vy);
        }
        
        b1.updatePos();
        c.beginPath();
        c.arc(b1.x, b1.y, b1.r, 0, 2 * Math.PI);
        c.moveTo(b1.x,b1.y);
        c.lineTo(b1.vx*15+b1.x, b1.vy*15+b1.y)
        c.stroke();
    })
    c.stroke();

    requestAnimationFrame(draw);



}
requestAnimationFrame(draw);

