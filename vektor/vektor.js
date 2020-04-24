
//export

function radToDeg(angle) {
    return angle/(2*Math.PI)*360
}

class Vector {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.magnitude = Math.sqrt(this.x*this.x+this.y*this.y);
    }
    dotProduct(vector2) {
        return (this.x*vector2.x+this.y*vector2.y);
    }
    unitvector() {
        return{
            x: this.x/this.magnitude,
            y: this.y/this.magnitude

        } 
    }
    angleBetween(vector2) {
        return Math.acos(this.dotProduct(vector2)/(this.magnitude*vector2.magnitude)) // I radianer
    }
    rotate(radians) {
        
    }

}

let vektor1 = new Vector(3, 0);
let vektor2 = new Vector(0, 3);

console.log(radToDeg(vektor1.angleBetween(vektor2)));


