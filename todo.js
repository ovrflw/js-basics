const todo__form = document.querySelector(".content__todo__form"),
    todo__input = todo__form.querySelector(".content__todo__input"),
    list = document.querySelector(".todo-items"),
    listBtn = document.querySelector(".footer__text");

const PENDING_LS = "pendingList";
const FINISHED_LS = "finishedList";

let pendingList = [];
let finishedList = [];

function handleTransClick(event) {
    if (event.target.classList.contains("type--todo")) {
        event.target.classList.remove("type--todo");
        event.target.classList.add("type--done");
        loadTodo_finished();
    }
    else {
        event.target.classList.remove("type--done");
        event.target.classList.add("type--todo");
        loadTodo_pending();
    }
}

function handleType(event) {
    const divItem = event.target.parentNode.parentNode;
    if (divItem.classList.contains("pending")) {
        handleDelete(event);
        todoItemObj = {
            text: event.target.parentNode.innerText,
            id: finishedList.length + 1,
        }
        finishedList.push(todoItemObj);
        localStorage.setItem(FINISHED_LS, JSON.stringify(finishedList));
        loadTodo_pending();
    }
    if (divItem.classList.contains("finished")) {
        handleDelete(event);
        todoItemObj = {
            text: event.target.parentNode.innerText,
            id: pendingList.length + 1,
        }
        pendingList.push(todoItemObj);
        localStorage.setItem(PENDING_LS, JSON.stringify(pendingList));
        loadTodo_finished();
    }
}

function handleDelete(event) {
    const divItem = event.target.parentNode.parentNode;
    if (divItem.classList.contains("pending")) {
        pendingList.splice(divItem.id - 1, 1);
        localStorage.setItem(PENDING_LS, JSON.stringify(pendingList));
        loadTodo_pending();
    }
    else {
        finishedList.splice(divItem.id - 1, 1);
        localStorage.setItem(FINISHED_LS, JSON.stringify(finishedList));
        loadTodo_finished();
    }

}

function paintTodo_pending(todoValue) {
    //Make todo-item and add this to pendingList, list and localstorage

    /* Make Elements for todo-item*/
    const div_item = document.createElement("div");
    const div_left = document.createElement("div");
    const div_right = document.createElement("div");
    const span = document.createElement("span");
    const icon_check = document.createElement("i");
    const icon_delete = document.createElement("i");
    const id = pendingList.length + 1;

    /* Add necessary classes to elements */
    div_item.classList.add("todo-item", "pending");
    div_left.classList.add("todo-item__left");
    div_right.classList.add("todo-item__right");
    icon_check.classList.add("far", "fa-square");
    icon_delete.classList.add("fas", "fa-times", "delete__hidden", "todo-item__delete");
    span.classList.add("todo-item__text");

    /* Set proper value */
    span.innerText = todoValue;
    icon_check.id = "check";

    /* Add EventListener */
    div_item.addEventListener("mouseenter", function () {
        icon_delete.classList.remove("delete__hidden");
    });
    div_item.addEventListener("mouseleave", function () {
        icon_delete.classList.add("delete__hidden");
    });
    icon_check.addEventListener("click", handleType);
    icon_delete.addEventListener("click", handleDelete);

    div_left.appendChild(icon_check);
    div_left.appendChild(span);
    div_right.appendChild(icon_delete);
    div_item.appendChild(div_left);
    div_item.appendChild(div_right);
    div_item.id = id;

    todoItemObj = {
        text: todoValue,
        id: id,
    }

    pendingList.push(todoItemObj);
    localStorage.setItem(PENDING_LS, JSON.stringify(pendingList));
    list.appendChild(div_item);
    list.scrollTop = list.scrollWidth;
    listBtn.innerText = `Todo: ${pendingList.length}`;
}

function paintTodo_finished(todoValue) {
    //Make todo-item and add this to pendingList, list and localstorage

    /* Make Elements for todo-item*/
    const div_item = document.createElement("div");
    const div_left = document.createElement("div");
    const div_right = document.createElement("div");
    const span = document.createElement("span");
    const icon_check = document.createElement("i");
    const icon_delete = document.createElement("i");
    const id = finishedList.length + 1;

    /* Add necessary classes to elements */
    div_item.classList.add("todo-item", "finished");
    div_left.classList.add("todo-item__left");
    div_right.classList.add("todo-item__right");
    icon_check.classList.add("far", "fa-check-square");
    icon_delete.classList.add("fas", "fa-times", "delete__hidden", "todo-item__delete");
    span.classList.add("todo-item__text");

    /* Set proper value */
    span.innerText = todoValue;
    icon_check.id = "check";

    /* Add EventListener */
    div_item.addEventListener("mouseenter", function () {
        icon_delete.classList.remove("delete__hidden");
    });
    div_item.addEventListener("mouseleave", function () {
        icon_delete.classList.add("delete__hidden");
    });
    icon_check.addEventListener("click", handleType);
    icon_delete.addEventListener("click", handleDelete);

    div_left.appendChild(icon_check);
    div_left.appendChild(span);
    div_right.appendChild(icon_delete);
    div_item.appendChild(div_left);
    div_item.appendChild(div_right);
    div_item.id = id;

    todoItemObj = {
        text: todoValue,
        id: id,
    }

    finishedList.push(todoItemObj);
    localStorage.setItem(FINISHED_LS, JSON.stringify(finishedList));
    list.appendChild(div_item);
    list.scrollTop = list.scrollWidth;
    listBtn.innerText = `Todo: ${finishedList.length}`;
}

function loadTodo_pending() {
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
    pendingList = [];
    const loaded_pending = localStorage.getItem(PENDING_LS);
    if (loaded_pending !== null) {
        const parsePending = JSON.parse(loaded_pending);
        parsePending.forEach(function (todo) {
            paintTodo_pending(todo.text);
        });
    }
    list.scrollTop = list.scrollWidth;
    listBtn.innerText = `Todo: ${pendingList.length}`;
}

function loadTodo_finished() {
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
    finishedList = [];
    const loaded_finished = localStorage.getItem(FINISHED_LS);
    if (loaded_finished !== null) {
        const parseFinished = JSON.parse(loaded_finished);
        parseFinished.forEach(function (todo) {
            paintTodo_finished(todo.text);
        });
    }
    list.scrollTop = list.scrollWidth;
    listBtn.innerText = `Done: ${finishedList.length}`;
}

function handleTodoSubmit(event) {
    event.preventDefault();
    const todoValue = todo__input.value;
    paintTodo_pending(todoValue);
    todo__input.value = '';
}

function init() {
    loadTodo_pending();
    todo__form.addEventListener("submit", handleTodoSubmit);
    listBtn.addEventListener("click", handleTransClick);
}

init();