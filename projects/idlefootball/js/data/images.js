//images used for canvas
function loadImage(src){
    let img = new Image();
    img.src = src;
    return img;
}

let images = {
    ball: loadImage("images/icons/football.png"),
    goalL: loadImage("images/goalL.png"),
    goalR: loadImage("images/goalR.png"),
    background: loadImage("images/background.png")
};