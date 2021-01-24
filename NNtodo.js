const todo__form = document.querySelector(".content__todo__form"),
    todo__input = todo__form.querySelector(".content__todo__input"),
    list = document.querySelector(".todo-items"),
    listBtn = document.querySelector(".footer__text");

const PENDING_LS = "pendingList";
const FINISHED_LS = "finishedList";

let pendingList = [];
let finishedList = [];

function saveToDoList() {
    localStorage.setItem(PENDING_LS, JSON.stringify(pendingList));
    localStorage.setItem(FINISHED_LS, JSON.stringify(finishedList));
}

function handleDelete(event) {
    console.log(event.target.parentNode);
    const divItem = event.target.parentNode;
    if (divItem.classList.contains("pending")) {
        list.removeChild(divItem);
        const cleanList = pendingList.filter(function (todo) {
            return todo.id !== parseInt(divItem.id);
        });
        console.log(cleanList);
        pendingList = cleanList;
        saveTodo_pending();
    }
}

function handleType(event) {
    console.dir(event.target.parentNode);
    const type = event.target.id;
    const btnIcon = event.target.parentNode.childNodes[0];
    const itemValue = event.target.parentNode.parentNode.childNodes[1].innerText;

    //handleDelete(event);

    if (type == "check") {
        const toDoObj = {
            text: itemValue,
            id: finishedList.length + 1
        };
        finishedList.push(toDoObj);
        saveTodo_finished();
    }
}

function loadTodo() {
    loadTodo_pending();
    loadTodo_finished();
}
function loadTodo_pending() {
    const loaded_pending = localStorage.getItem(PENDING_LS);
    if (loaded_pending !== null) {
        const parsePending = JSON.parse(loaded_pending);
        pendingList = [];
        parsePending.forEach(function (todo) {
            paintTodo_pending(todo.text);
        });
    }
    listBtn.innerText = `Todo: ${pendingList.length}`;
}
function loadTodo_finished() {
    const loaded_finished = localStorage.getItem(FINISHED_LS);
    if (loaded_finished !== null) {
        const parseFinished = JSON.parse(loaded_finished);
        parseFinished.forEach(function (todo) {
            paintTodo_finished(todo.text);
        });
    }
    listBtn.innerText = `Done: ${finishedList.length}`;
}


function saveTodo_pending() {
    localStorage.setItem(PENDING_LS, JSON.stringify(pendingList));
}
function saveTodo_finished() {
    localStorage.setItem(FINISHED_LS, JSON.stringify(finishedList));
}

function paintTodo_pending(todoValue) {
    const div_item = document.createElement("div");
    const div_left = document.createElement("div");
    const div_right = document.createElement("div");
    const span = document.createElement("span");
    const icon_check = document.createElement("i");
    const icon_delete = document.createElement("i");
    const id = pendingList.length + 1;

    div_item.classList.add("todo-item", "pending");
    div_left.classList.add("todo-item__left");
    div_right.classList.add("todo-item__right");
    icon_check.classList.add("far", "fa-square");
    icon_delete.classList.add("fas", "fa-times", "delete__hidden", "todo-item__delete");
    span.classList.add("todo-item__text");

    span.innerText = todoValue;
    icon_check.id = "check";

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
    list.appendChild(div_item);
    list.scrollTop = list.scrollWidth;
    pendingList.push(todoItemObj);
    saveTodo_pending();
    listBtn.innerText = `Todo: ${pendingList.length}`;
}

function handleTodoSubmit(event) {
    event.preventDefault();
    console.log("submit start");
    const todoValue = todo__input.value;
    paintTodo_pending(todoValue);
    todo__input.value = '';
}

function init() {
    loadTodo_pending();
    todo__form.addEventListener("submit", handleTodoSubmit);
}

init();