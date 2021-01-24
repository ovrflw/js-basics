const askname = document.askForName(".ask-name"),
    content = document.querySelector(".content"),
    askname_form = document.querySelector(".ask-name__form"),
    askname_input = greeting__form.querySelector("ask-name__input"),

const USER_LS = "currentUser",
    SHOW_HIDDEN_CN = "show--hidden";

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = askname_input.value;
    saveName(currentValue);
}

function askForName() {
    askname_form.classList.add(SHOWING_CN);
    askname_form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    askname_form.classList.remove(SHOWING_CN);
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