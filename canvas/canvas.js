function setup() {
    let canvas = document.getElementById("tegning");
    let ctx = canvas.getContext("2d");
    let xpos = 0;
    let vx = 4;
    
    function figur(ctx,dx) {
        ctx.beginPath();
        ctx.fillStyle = "rgb(200,0,200)";
        ctx.arc(dx + 100, 375, 25, 0, 2 * Math.PI);
        ctx.stroke();
    }
    function tegn() {
        ctx.clearRect(0,0,500,500)
        figur(ctx, xpos);
        xpos += vx;
        if (xpos > 500-125 || xpos < -75){
            vx *= -1.1;
        }
        if (xpos > 500 || xpos < -200){
            xpos = 100;
            vx = 20;
        }
    }
    setInterval(tegn, 10);
}