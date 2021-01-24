const askname = document.querySelector(".ask-name"),
    header = document.querySelector(".header"),
    footer = document.querySelector(".footer"),
    content = document.querySelector(".content"),
    askname_form = document.querySelector(".ask-name__form"),
    askname_input = document.querySelector(".ask-name__input"),
    greeting_div = document.querySelector(".content__greeting"),
    greeting = document.querySelector(".content__greeting__text"),
    greeting_btn = document.querySelector(".content__greeting__btn"),
    center_above = document.querySelector(".center-above");

const USER_LS = "currentUser",
    SHOW_HIDDEN_CN = "show--hidden",
    CENTER_ABOVE = "center-above--ask";

function printGreeting(userName) {
    greeting.innerText = `Hello, ${userName}.`;
}

function showAsk() {
    content.classList.add(SHOW_HIDDEN_CN);
    center_above.classList.add(CENTER_ABOVE);
    askname.classList.remove(SHOW_HIDDEN_CN);
    header.classList.add(SHOW_HIDDEN_CN);
    footer.classList.add(SHOW_HIDDEN_CN);
}

function showMain() {
    content.classList.remove(SHOW_HIDDEN_CN);
    center_above.classList.remove(CENTER_ABOVE);
    askname.classList.add(SHOW_HIDDEN_CN);
    header.classList.remove(SHOW_HIDDEN_CN);
    footer.classList.remove(SHOW_HIDDEN_CN);
}

function selectScreen() {
    const userName = localStorage.getItem(USER_LS);
    if (userName === null) {
        showAsk();
    }
    else {
        showMain();
        printGreeting(userName);
    }
}

function handleAskSubmit(event) {
    event.preventDefault();
    const userName = askname_input.value;
    localStorage.setItem(USER_LS, userName);
    showMain();
    printGreeting(userName);
}

function init() {
    selectScreen();
    askname_form.addEventListener("submit", handleAskSubmit);
}

init();
