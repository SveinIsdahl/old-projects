class Ball {
    constructor(x, y, r) {
        const options = {
            restitution: bounce
            
        }
        this.body = Bodies.circle(x, y, r, options);
        Matter.Body.setMass(this.body, this.body.mass*mass);
        World.add(world, this.body);
        this.r = r;
    }


    show() {
        const pos = this.body.position;
        push();
        translate(pos.x, pos.y);
        circle(0, 0, this.r);
        pop();
    }

}