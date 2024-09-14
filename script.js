const textbox = document.querySelector('#textbox');
const todoCountElement = document.getElementById('todoCount');
let todoTaskCount = 0;
let todos = [];
let filter = 'all';

let counter = 0;
const updateCount = (todos)=>{
    todoTaskCount = 0;

    const todoCountUpdate = (todo) =>{
           if(todo.isCompleted===false){
              todoTaskCount++;
            }
          
    }
     todos.forEach(todoCountUpdate);
     todoCountElement.innerText = `${todoTaskCount} items left`;


}




const filterTodos = () => {
    // Define functions to determine if a todo should be included in the filtered list
    const complete = (todo) => todo.isCompleted === true;
    const notComplete = (todo) => todo.isCompleted === false;

    let filteredTodos;
    switch (filter) {
        case 'completed':
            filteredTodos = todos.filter(complete); // Use `complete` function to filter todos
            break;
        case 'active':
            filteredTodos = todos.filter(notComplete); // Use `notComplete` function to filter todos
            break;
        case 'all':
        default:
            filteredTodos = todos; // No filtering for 'all'
            break;
    }
    renderTodo(filteredTodos); // Render the filtered list of todos
};
const onFilterChange = (event) => {
    event.preventDefault(); // Prevent the default anchor behavior (page scroll)

    let filterLinks = document.querySelectorAll('.filterLinks');
    filter = event.target.getAttribute('href').replace('#/', ''); // Extract filter value
    filterTodos();
    filterLinks.forEach(link => link.classList.remove('selected'));
    event.target.classList.add('selected');

}




const createTodo = (todo)=>{
    counter++
    todos.push({id : counter,
        task:todo,
        isCompleted : false
    })}


const renderTodo = (todos) => {
    const container = document.querySelector('.todo-list');
    container.innerHTML = ''; // Clear existing item
    todos.forEach(element => {
        const view = document.createElement('li');
        view.classList.add('view')
        const CheckElement =  document.createElement('input');
        CheckElement.type = 'checkbox';
        if(element.isCompleted===true){
            CheckElement.checked = true;
        }
        CheckElement.classList.add('toggle');
        const label =  document.createElement('label');
        label.textContent = element.task;
        label.classList.add('label');
        const destroyButton =  document.createElement('button');
        destroyButton.classList.add('destroy');
        view.append(CheckElement,label,destroyButton);
        let container = document.querySelector('.todo-list');
        container.append(view);
        
    });



    
}

const onclickEnter = (event) =>{
   
    if (event.key === 'Enter') {


        const todo = textbox.value;
         
        if (todo.trim() !== '') { // Checking if the input is not empty
            
            createTodo(todo);
            renderTodo(todos);
            
            updateCount(todos);

            textbox.value = ''; // Clear the textbox after adding the to-do
 }
}
}






textbox.addEventListener('keypress',onclickEnter );
