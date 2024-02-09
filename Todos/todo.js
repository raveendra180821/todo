let users = localStorage.getItem("users");
let parsedUsers = JSON.parse(users);

if (users === null){
    window.location.href = 'login.html'
}

console.log(users)

let loggedUser = parsedUsers.find((user) => {
    if (user.isLogin === true){
        return user
    }
})
console.log(loggedUser)


document.querySelector('.wishes').textContent = `Hi ${loggedUser.name} manage your daily tasks here !!`


function getTodoList() {
    let todoList = loggedUser.todoList
    console.log(todoList)


    if (todoList.length === 0) {
        return [];
    } else {
        return todoList;
    }
}

let todos = getTodoList();

let saveButton = document.getElementById("saveButton");

saveButton.onclick = function() {
    users = parsedUsers.map((user) => {
        if (user.isLogin === true){
            return {...user, todoList: todos}
        }else{
            return user
        }
    })
    localStorage.setItem("users", JSON.stringify(users));
};

let todosCount = todos.length;

function isCheckBoxChecked(checkBoxId, labelId, taskElementId) {
    let checkBoxElement = document.getElementById(checkBoxId);
    let labelElement = document.getElementById(labelId);

    //labelElement.classList.toggle("completed");

    if (checkBoxElement.checked === true) {
        labelElement.classList.add("completed");
    } else {
        labelElement.classList.remove("completed");
    }

    let objectIndex = todos.findIndex(function(eachTask) {
        let eachTaskId = "task" + eachTask.unqNumber;
        if (eachTaskId === taskElementId) {
            return true;
        } else {
            return false;
        }
    });
    let object = todos[objectIndex];
    if (object.isChecked === true) {
        object.isChecked = false;
    } else {
        object.isChecked = true;
    }
}

function onDeleteTask(taskElementId) {
    let taskElement = document.getElementById(taskElementId);
    ItemsContainer.removeChild(taskElement);
    let taskElementIndex = todos.findIndex(function(eachTask) {
        let eachTaskId = "task" + eachTask.unqNumber;
        if (eachTaskId === taskElementId) {
            return true;
        } else {
            return false;
        }
    });

    todos.splice(taskElementIndex, 1);
}

let ItemsContainer = document.getElementById("taskItemsContainer");

function createAndAppend(todos) {
    let checkBoxId = "checkBox" + todos.unqNumber;
    let labelId = "label" + todos.unqNumber;
    let taskElementId = "task" + todos.unqNumber;

    let taskElement = document.createElement("li");
    taskElement.classList.add("task-item-container", "d-flex", "flex-row");
    taskElement.id = taskElementId;
    ItemsContainer.appendChild(taskElement);

    let checkBoxElement = document.createElement("input");
    checkBoxElement.setAttribute("type", "checkbox");
    checkBoxElement.setAttribute("id", checkBoxId);
    checkBoxElement.checked = todos.isChecked;
    checkBoxElement.classList.add("check-box-input");
    checkBoxElement.onclick = function() {
        isCheckBoxChecked(checkBoxId, labelId, taskElementId);
    };
    taskElement.appendChild(checkBoxElement);

    let labelBgContainer = document.createElement("div");
    labelBgContainer.classList.add("label-container", "d-flex", "flex-row");
    taskElement.appendChild(labelBgContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkBoxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todos.text;
    if (todos.isChecked === true) {
        labelElement.classList.add("completed")
    }
    labelBgContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelBgContainer.appendChild(deleteIconContainer);

    let deleteIconElement = document.createElement("i");
    deleteIconElement.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIconElement.onclick = function() {
        onDeleteTask(taskElementId);
    };
    deleteIconContainer.appendChild(deleteIconElement);
}

for (let eachItem of todos) {
    createAndAppend(eachItem);
}


let addButtonEl = document.getElementById("addButton");
addButtonEl.onclick = function() {
    let userInputElement = document.getElementById("userInput");
    let userInputValue = userInputElement.value;
    if (userInputValue === "") {
        alert("Enter a Valid input");
        return;
    }

    todosCount = todosCount + 1;

    let newTodo = {
        text: userInputValue,
        unqNumber: todosCount,
        isChecked: false
    };
    todos.push(newTodo);

    createAndAppend(newTodo);
    userInputElement.value = "";
};

let logOutBtn = document.getElementById("logout");
logOutBtn.onclick = function(){
    users = parsedUsers.map((user) => ({...user,isLogin: false}))

    localStorage.setItem('users', JSON.stringify(users))
    window.location.href = "login.html"
}