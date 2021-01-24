const greeting__form = document.querySelector(".js-form"),
    greeting__input = greeting__form.querySelector("input"),
    greetings = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = greeting__input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    greeting__form.classList.add(SHOWING_CN);
    greeting__form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    greeting__form.classList.remove(SHOWING_CN);
    greetings.classList.add(SHOWING_CN);
    greetings.innerText = `Hello ${text}`;
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}


function init() {
    loadName();
}

init();