class Ground {
    constructor(x, y, w, h) {
        const options = {
            restitution: 1
        }       
        this.body = Bodies.rectangle(x, y, w, h, options);
        World.add(world, this.body);
        this.w = w;
        this.h = h;
        this.body.isStatic = true;
    }


    show() {
        const pos = this.body.position;
        const angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        fill(205);
        rectMode(CENTER);
        rect(0, 0, this.w, this.h);
        pop();
    }

}