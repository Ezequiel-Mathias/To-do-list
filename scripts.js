
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const selectFilter = document.querySelector("#filter-select");
let todos = todoList.getElementsByClassName('todo');
let oldInputValue;

const updateTodo = (text) => {

    const alltodos = document.querySelectorAll(".todo");

    alltodos.forEach((todo) => {

        let todoTitle = todo.querySelector("h3");

        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;
        }

    })
}

const toggleForms = () => {

    editForm.classList.toggle("hide");

    todoForm.classList.toggle("hide");

}

todoForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const InputValue = todoInput.value;

    const saveTodo = (text) => {

        const todo = document.createElement("div");

        todo.classList.add("todo");

        todo.innerHTML = `
        
            <div class="container-subject">
                <h3>${text}</h3>
            </div>

            
            <button class="finish-todo"> <i class="fa-solid fa-check"> </i></button>

            <button class="edit-todo"> <i class="fa-solid fa-pen"> </i></button>

            <button class="remove-todo"> <i class="fa-solid fa-xmark"></i></button>
        `;

        todoList.appendChild(todo);

        todoInput.value = null;

        todoInput.focus();

    }

    if (InputValue) {

        saveTodo(InputValue);

    }

});

document.addEventListener("click", (e) => {

    const targetElement = e.target;

    const parentElement = targetElement.closest("div");

    let todoTitle;

    if (parentElement && parentElement.querySelector('h3')) {

        todoTitle = parentElement.querySelector("h3").innerText;

    }

    if (targetElement.classList.contains("finish-todo")) {

        parentElement.classList.toggle("done");

    }

    if (targetElement.classList.contains("remove-todo")) {

        parentElement.remove();

    }

    if (targetElement.classList.contains("edit-todo")) {

        toggleForms();

        editInput.value = todoTitle;

        oldInputValue = todoTitle;

    }

});

cancelEditBtn.addEventListener("click", (e) => {

    e.preventDefault();

    toggleForms();

})

editForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const editInputValue = editInput.value;

    if (editInputValue) {
        updateTodo(editInputValue);
    }

    toggleForms();

})

searchInput.addEventListener("keyup", () => {

    let expression = searchInput.value.toLowerCase();

    if (expression.length === 1) {
        return;
    }

    for (let position in todos) {

        if (isNaN(position)) {
            continue;
        }

        let conteudoDaLinha = todos[position].children[0].outerText.toLowerCase();


        if (conteudoDaLinha.includes(expression)) {
            todos[position].style.display = "";
        }
        else {
            todos[position].style.display = "none";
        }
    }

})

selectFilter.addEventListener('change', function () {

    if (selectFilter.value === 'done') {

        for (let position in todos) {

            if (isNaN(position))

                continue;

            if (todos[position].className.includes('done'))

                continue;

            else

                todos[position].style.display = 'none';

        }

    }

    if (selectFilter.value === 'all') {

        for (let position in todos) {

            if (isNaN(position))

                continue;

            if (todos[position].className.includes('todo'))

                todos[position].style.display = ""

        }

    }

})