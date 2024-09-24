const getTodosButton = document.getElementById("get-todos");
const deleteButton = document.getElementById("get-todos");
const todoDataSection = document.getElementById('todo-data');
const saveButton = document.getElementById("save-todo");
const todoInputBar = document.getElementById("todo-input-bar");

// Function to save a new todo
const saveTodo = () => {
    let todotext = todoInputBar.value;
    if (todotext.length === 0) return; // Do nothing if input is empty
    addTodo(todotext);
    todoInputBar.value = ''; // Clear input after saving
    toggleSaveButton(); // Update button state
}





// Function to toggle the save button's enabled/disabled state
const toggleSaveButton = () => {
    let todotext = todoInputBar.value;
    if (todotext.length === 0) {
        if (!saveButton.classList.contains("disabled")) {
            saveButton.classList.add("disabled");
        }
    } else {
        if (saveButton.classList.contains("disabled")) {
            saveButton.classList.remove("disabled");
        }
    }
}

// Event listeners
todoInputBar.addEventListener("keyup", toggleSaveButton);
saveButton.addEventListener("click", saveTodo);

// Function to add a new todo to the list
const addTodo = (todo) => { 
    let rowDiv = document.createElement("div");
    let todoItem = document.createElement("div");
    let todoNumber = document.createElement("div");
    let todoDetail = document.createElement("div");
    let todoStatus = document.createElement("div");
    let todoActions = document.createElement("div");
    let deleteButton = document.createElement("button");
    let finishedButton = document.createElement("button");

    deleteButton.innerText = "Delete";
    finishedButton.innerText = "Finished";

    deleteButton.classList.add("btn", "btn-danger");
    finishedButton.classList.add("btn", "btn-success");

    todoActions.appendChild(deleteButton);
    todoActions.appendChild(finishedButton);

    rowDiv.classList.add("row");
    todoItem.classList.add("todo-item", "d-flex", "flex-row", "justify-content-between", "align-items-center");
    todoNumber.classList.add("todo-no");
    todoDetail.classList.add("todo-detail", "text-muted");
    todoStatus.classList.add("todo-status", "text-muted");
    todoActions.classList.add("todo-actions", "d-flex", "justify-content-start", "gap-2");

    todoDetail.innerText = todo;

    todoItem.appendChild(todoNumber);
    todoItem.appendChild(todoDetail);
    todoItem.appendChild(todoStatus);
    todoItem.appendChild(todoActions);
    
    rowDiv.appendChild(todoItem);
    todoDataSection.appendChild(rowDiv);
}
