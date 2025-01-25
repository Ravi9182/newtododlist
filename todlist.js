let todoItemContainer = document.getElementById("todoItemContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");

function getTodoListFromLocalStorage() {
    let strigifyTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(strigifyTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

let todoList = getTodoListFromLocalStorage();


saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
};


function onTodoStatusChange(checkboxId, labelId) {
    let checkboxElement = document.getElementById(checkboxId);
    console.log(checkboxElement.checked);
    let labelIdElement = document.getElementById(labelId);
    labelIdElement.classList.toggle("checked");
}

function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemContainer.removeChild(todoElement);
}


function createAndAppendTodo(todo) {
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;


    let todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoItemContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.classList.add("checkbox-input");
    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId);
    };
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);


    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.classList.add("checkbox-label");
    labelElement.id = labelId;
    labelElement.textContent = todo.text;
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    };
    deleteIconContainer.appendChild(deleteIcon);
}

function onAddTodo() {
    let todosCount = todoList.length;
    todosCount = todosCount + 1;

    let todoUserElement = document.getElementById("todoUserInput");
    let todoUserElementValue = todoUserElement.value;
    if (todoUserElementValue === "") {
        alert("Enter Valid Text");
        return;
    }

    let newTodo = {
        text: todoUserElementValue,
        uniqueNo: todosCount
    };
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    todoUserElement.value = "";
}

addTodoButton.onclick = function() {
    onAddTodo();
};


for (let todo of todoList) {
    createAndAppendTodo(todo);
}