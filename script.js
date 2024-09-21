const textbox = document.querySelector("#textbox");
const container = document.querySelector(".todo-list");
const footerList = document.querySelector(".footer");
const counter = document.getElementById("todoCount");
const clearCompletedButton = document.querySelector(".clear-completed");
const toggleAll = document.querySelector(".toggle-all");
const filterLinks = document.querySelectorAll(".filterLinks");
let todos = JSON.parse(localStorage.getItem('todos')) || []; 
let id = Date.now(); 

// Filter todos based on the active filter
const filterTodos = (filter) => {
  const complete = (todo) => todo.isCompleted === true;
  const notComplete = (todo) => todo.isCompleted === false;




  let filteredTodos;
  switch (filter) {
    case "completed":
      filteredTodos = todos.filter(complete);
      break;
    case "active":
      filteredTodos = todos.filter(notComplete);
      break;
    case "":
    default:
      filteredTodos = todos;
      break;
  }
  renderTodo(filteredTodos);
};
const saveTodosToLocalStorage = () => {
  localStorage.setItem('todos', JSON.stringify(todos)); // Save todos to local storage
};
// Handle filter change when a link is clicked
const onFilterChange = (event) => {
  const filter = event.target.getAttribute("href").replace("#/", "");
  filterTodos(filter);
  filterLinks.forEach((link) => link.classList.remove("selected"));
  event.target.classList.add("selected");
};

// Clear completed todos
const clearCompleted = () => {
  todos = todos.filter(todo => !todo.isCompleted);
  saveTodosToLocalStorage();
   renderTodo(todos);
};

// Count remaining todos
const itemCount = () => {
  return todos.filter(todo => !todo.isCompleted).length;
};

// Create a new todo
const createTodo = (todo) => {
  saveTodosToLocalStorage(); 

  todos.push(todo);
};

// Edit an existing todo
const EditTodo = (event) => {
  if (event.target.tagName === "LABEL") {
    const currentLabel = event.target;
    const editInput = document.createElement("input");
    editInput.classList.add("edit_input");
    editInput.value = currentLabel.textContent;
    currentLabel.parentElement.replaceChild(editInput, currentLabel);
    
    editInput.addEventListener("keydown", (eve) => {
      if (eve.key === "Enter" && editInput.value.trim() !== "") {
        finishEdit(currentLabel, editInput);
      }
    });
  }
};

// Finish editing a todo
const finishEdit = (currentLabel, editInput) => {
  currentLabel.textContent = editInput.value;
  editInput.parentElement.replaceChild(currentLabel, editInput);
  updateTodoName(currentLabel);
  saveTodosToLocalStorage(); 

  renderTodo(todos);
};

// Toggle completion of all todos
const toggleAllInput = () => {
  const allDone = todos.every(todo => todo.isCompleted);
  todos.forEach(todo => {
    todo.isCompleted = !allDone;
  });
  saveTodosToLocalStorage(); 
  renderTodo(todos);
};

// Delete a todo
const deleteTodo = (event) => {
  const target = event.target;
  todos = todos.filter(todo => todo.id !== parseInt(target.parentElement.dataset.id));
  saveTodosToLocalStorage();

  renderTodo(todos);
};

// Update todo name after editing
const updateTodoName = (currentLabel) => {
  const todoId = parseInt(currentLabel.parentElement.dataset.id);
  todos.forEach(todo => {
    if (todo.id === todoId) {
      todo.name = currentLabel.textContent;
    }
  });
};

// Render todos in the UI
const renderTodo = (todos) => {
  container.innerHTML = ""; // Clear existing items
  todos.forEach((todo) => {
    const view = document.createElement("li");
    view.setAttribute("data-id", todo.id);
    view.classList.add("view");
    if (todo.isCompleted) {
      view.classList.add("completed");
    }

    const checkElement = document.createElement("input");
    checkElement.type = "checkbox";
    checkElement.checked = todo.isCompleted;
    checkElement.classList.add("toggle")
    checkElement.addEventListener("click", completeIndividualTask);
    
    const label = document.createElement("label");
    label.textContent = todo.name;
    label.classList.add("label")
    label.addEventListener("dblclick", EditTodo);
    
    const destroyButton = document.createElement("button");
    destroyButton.classList.add("destroy");
    destroyButton.addEventListener("click", deleteTodo);

    view.append(checkElement, label, destroyButton);
    container.append(view);
  });

  // Update the item count
  counter.textContent = `${itemCount()} items left`;
};

// Handle pressing "Enter" to add a new todo
const onclickEnter = (event) => {
  if (event.key === "Enter" && event.target.value.trim() !== "") {
    const todo = {
      name: event.target.value,
      isCompleted: false,
      id: ++id,
    };
    createTodo(todo);
    event.target.value = "";
    renderTodo(todos);
  }
};

// Event listeners
textbox.addEventListener("keypress", onclickEnter);
toggleAll.addEventListener("change", toggleAllInput);
clearCompletedButton.addEventListener("click", clearCompleted);
filterLinks.forEach(link => link.addEventListener("click", onFilterChange));

// Handle individual task completion
const completeIndividualTask = (event) => {
  const liTodos = event.target.closest("li");
  const todoId = parseInt(liTodos.dataset.id);
  const todo = todos.find(todo => todo.id === todoId);
  todo.isCompleted = event.target.checked;
  saveTodosToLocalStorage();

  renderTodo(todos);
};

renderTodo(todos);