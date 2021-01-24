const clock = document.querySelector(".content__clock__time");

function getTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    clock.innerText = `${hours < 10 ? `0${hours}` : `${hours}`}:${minutes < 10 ? `0${minutes}` : `${minutes}`}`;
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();