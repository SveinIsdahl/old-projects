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
        ctx.arc(dx + 100, 375, 30, 0, 2 * Math.PI);
        ctx.stroke();


    
    }
}