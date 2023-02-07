const formElement = document.querySelector('.form');
const inputElement = document.querySelector('.input');
const ulElement = document.querySelector('.list');

let list = localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];
// JSoN.parse() is used to convert the string into an object

list.forEach((task)=>{
    todoList(task);
})

formElement.addEventListener('submit', (event) => {
    // Prevent the default behavior of the form
    event.preventDefault();
    // i.e. prevent the page from reloading

    todoList();
    // const formData = new FormData(event.target);
    // const data = Object.fromEntries(formData);
    // console.log(data);
});

function todoList(task) {
    let newTask = inputElement.value;
    // for local storage
    if(task) {
        newTask = task.name;
    }

    const liElement = document.createElement('li');
    if(task && task.checked) {
        liElement.classList.add('checked');
    }
    liElement.innerHTML = newTask;
    ulElement.appendChild(liElement);

    // clear input after submit
    inputElement.value = '';

    // adding delete and check buttons
    const checkButtonElement = document.createElement('div');
    checkButtonElement.innerHTML = `<i class="fa-solid fa-check-square"></i>`;
    liElement.appendChild(checkButtonElement);

    const deleteButtonElement = document.createElement('div');
    deleteButtonElement.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    liElement.appendChild(deleteButtonElement);

    // adding event listeners to check and delete buttons
    checkButtonElement.addEventListener('click', () => {
        liElement.classList.toggle('checked');
        updateLocalStorage();
    });
    
    deleteButtonElement.addEventListener('click', () => {
        liElement.remove();
        updateLocalStorage();
    });

    // saving notes to local storage
    updateLocalStorage();
}

// saving notes to local storage
function updateLocalStorage() {
    const liElements = document.querySelectorAll('li');
    list = [];
    liElements.forEach((li) => {
        list.push({
            name: li.innerText,
            checked: li.classList.contains('checked')
            // here checked is a boolean value
            // if the li has the class checked, then it will be true else false
        });
    });

    localStorage.setItem('list', JSON.stringify(list));
}