function setup() {
    let canvas = document.getElementById("tegning");
    let ctx = canvas.getContext("2d");
    let xpos = 0;
    let vx = 2;
    //tegner en figur
    //@param {context} ctx - tegneområdet
    //@param {number} dx - avstand fra v.kant
    
    function figur(ctx,dx) {
        ctx.beginPath();
        ctx.fillStyle = "rgb(200,0,200)";
        ctx.arc(dx + 100, 375, 20, 0, 2 * Math.PI);
        ctx.stroke();
    }
    function tegn() {
        ctx.clearRect(0,0,500,500)
        figur(ctx, xpos);
        xpos += vx;
        if (xpos > 300){
            vx = -2;
        }
        
    }
    setInterval(tegn, 10);
}