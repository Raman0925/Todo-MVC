const textbox = document.querySelector('#textbox');

let todoCount = 0;

const UpdateCount = ()=>{
    todoCount++
}

const createTodo = (todo) => {
    const view = document.createElement('li');
    view.classList.add('view')
    const inputElement =  document.createElement('input');
    inputElement.type = 'checkbox';
    inputElement.classList.add('toggle');
    const label =  document.createElement('label');
    label.textContent = todo;
    label.classList.add('label');
    const destroyButton =  document.createElement('button');
    destroyButton.classList.add('destroy');
    view.append(inputElement,label,destroyButton);
    let container = document.querySelector('.todo-list');
    container.append(view);
}


const onclickEnter = (event) =>{
   
    if (event.key === 'Enter') {

        const todo = textbox.value;
        if (todo.trim() !== '') { // Checking if the input is not empty
            createTodo(todo);
            UpdateCount();
            textbox.value = ''; // Clear the textbox after adding the to-do
        }

}
}






textbox.addEventListener('keypress',onclickEnter );