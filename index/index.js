//@ts-check
/*
let imageArray = ["/index/sorting.png", "/index/paint.png"];
let imageNumber = 0;
let imageElement = document.getElementById("image");
imageElement.src = imageArray[0];

setInterval(switchImage, 3000);

function switchImage() {
    
    if (imageNumber >= imageArray.length) {
        imageNumber = 0;
    }
    imageElement.src = imageArray[imageNumber];
    imageNumber++
}

*/

let image = new class {
    constructor(link, imageName, id) {
        this.link = link;
        this.image = "/index/" + imageName + ".png";
        this.element = document.getElementById(String(id));
    }
    makeImage() {

    }

}