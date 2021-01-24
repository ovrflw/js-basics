const body = document.querySelector("body");
const IMG_NUMBER = 5;

function paintImg(imgNumber) {
    const img = new Image();
    img.src = `images/${imgNumber}.jpg`;
    body.appendChild(img);
}

function getRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER) + 1;
    return number;
}

function init() {
    const imgNumber = getRandom();
    paintImg(imgNumber);
}

init();