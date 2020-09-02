// @ts-check

let canvas = document.getElementById("canvas", { alpha: false });
let c = canvas.getContext("2d");
canvas.style.background = "grey"

let width = canvas.width;
let height = canvas.height

const theta_spacing = 0.07;
const phi_spacing = 0.02;

const R1 = 1;
const R2 = 2;
const K2 = 5;
const K1 = width * K2 * 3 / (8 * (R1 + R2));

// Calculate K1 based on screen size: the maximum x-distance occurs
// roughly at the edge of the torus, which is at x=R1+R2, z=0.  we
// want that to be displaced 3/8ths of the width of the screen, which
// is 3/4th of the way from the center to the side of the screen.
// screen_width*3/8 = K1*(R1+R2)/(K2+0)
// screen_width*K2*3/(8*(R1+R2)) = K1

// Theta spacing
const A = 0.07;
//Phi spacing
const B = 0.03;

function cos(x) {
    return Math.cos(x);
}

function sin(x) {
    return Math.sin(x);
}



function draw() {
    c.fillStyle = "rgba(0, 0, 0, 0)";
    c.beginPath();
    c.clearRect(0, 0, width, height);
    c.stroke();


    let cA = Math.cos(A),
        sA = Math.sin(A),
        cB = Math.cos(B),
        sB = Math.sin(B);
    // i = theta
    for (let i = 0; i < Math.PI * 2; i += 0.3) {
        let ct = Math.cos(i),
            st = Math.sin(i);
        for (let j = 0; j < Math.PI * 2; j += 0.1) {
            var ox = R2 + R1 * ct, // object x, y = (R2,0,0) + (R1 cos theta, R1 sin theta, 0)
                oy = R1 * st;

            var sp = Math.sin(i),
                cp = Math.cos(i),
                h = ct + 2, // R1 + R2*cos(theta)
                D = 1 / (sp * h * sA + st * cA + 5), // this is 1/z
                t = sp * h * cA - st * sA; // this is a clever factoring of some of the terms in x' and y'


            var x = ox * (cB * cp + sA * sB * sp) - oy * cA * sB; // final 3D x coordinate
            var y = ox * (sB * cp - sA * cB * sp) + oy * cA * cB; // final 3D y
            var ooz = 1 / (K2 + cA * ox * sp + sA * oy); // one over z
            var xp = (150 + K1 * ooz * x); // x' = screen space coordinate, translated and scaled to fit our 320x240 canvas element
            var yp = (120 - K1 * ooz * y); // y' (it's negative here because in our output, positive y goes down but in our 3D space, positive y goes up)
            // luminance, scaled back to 0 to 1
            var L = 0.7 * (cp * ct * sB - cA * ct * sp - sA * st + cB * (cA * st - ct * sA * sp));
            if (L > 0) {
                c.fillStyle = 'rgba(255,255,255,' + L + ')';
                c.fillRect(xp, yp, 1.5, 1.5);
            }
        }
    }
    requestAnimationFrame(draw);
}
requestAnimationFrame(draw);

/*
https://www.a1k0n.net/2011/07/20/donut-math.html
Circle of radius R1 centered at point (R2,0,0),
drawn on the xy-plane.
We can draw this by sweeping an angle — let’s call it θ — from 0 to 2π:

(x,y,z)=(R2,0,0)+(R1cosθ,R1sinθ,0)


*/