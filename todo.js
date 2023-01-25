let form = document.querySelector('#todoform');
let edit = document.querySelector('#edit')
let toDoCard = document.querySelector('.todo-card');
let emptyHeading = document.querySelector('h2');
let completeHeading = document.querySelector('h4')
let selectedDate = document.querySelector(".date").value;
let completed = document.querySelector(".complete")
let deletee = document.querySelector("#delete")
let todolist = [];
let taskid;



if (todolist.length > 0) {
    toDoCard.style.display = 'block';
    emptyHeading.style.display = 'none';
} else {
    toDoCard.style.display = 'none';
    emptyHeading.style.display = 'block';
}


// generate a uniqueid
const uniqueId = () => {
    return Math.floor(Math.random() * 1000);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = form.title.value;
    const description = form.description.value;
    const date = form.date.value;
    // create a to do array of objects
    const todo = {
        id: uniqueId(),
        title,
        description,
        date,
        complete: false,
        CompletedDate: null,
    }

    console.log(todo);
    todolist.push(todo);
    displayTodos();
    form.reset()
})

// function to validate dates
const TDate = () => {
    if (selectedDate < Date.now()) {
        alert("The Date must be Bigger or Equal to today date")
    }
    return;
}

// function to allow editing

const editData = (id) => {
    form.style.display = 'none';
    edit.style.display = 'block';
    taskid = id;
    todo = todolist.find(todo => todo.id === id)
    edit.titleid.value = todo.title
    edit.describeid.value = todo.description
    edit.dateid.value = todo.date
    edit.id.value = todo.id

}

edit.addEventListener('submit', (e) => {
    e.preventDefault();
    let titleData = document.querySelector("#titleid")
    titleData = edit.titleid.value
    let descriptionData = document.querySelector("#describeid")
    descriptionData = edit.describeid.value
    let dateData = document.querySelector("#dateid")
    dateData = edit.dateid.value

    let todo = todolist.find(todo => todo.id === taskid);
    todo.title = titleData
    todo.description = descriptionData
    todo.date = dateData

    edit.style.display = 'none';
    form.style.display = "block"
    displayTodos();
})

// function to move completed items
const complete = (id) => {
    console.log(id);
    let todo = todolist.find(todo => todo.id === id);
    todo.complete = true;
    console.log(todo);
    displayTodos();
    showComplete()
    
}


// function to delete a single todo
const deleteTodo = (id) => {
    // console.log(id);
    todolist = todolist.filter(todo => todo.id !== id);
    showComplete()
    displayTodos();

}

// function to delete all todos
const deleteAll = () => {
    todolist = [];
    toDoCard.style.display = 'none';
    completed.innerHTML = ''
    emptyHeading.style.display = 'block';
}

deletee.onclick = function () {
    deleteAll();
}

// display all todo items
const displayTodos = () => {
    if (todolist.length > 0) {
        emptyHeading.style.display = 'none';
        const todolistContainer = document.querySelector('.todo-card');
        let todos = todolist.filter(a => a.complete === false)
        todolistContainer.innerHTML = '';
        todos.forEach(todo => {
            let date_1 = new Date(todo.date);
            let date_2 = new Date();
            const days = (date_1, date_2) => {
                let difference = date_1.getTime() - date_2.getTime();
                let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
                return TotalDays;
            }
            const todoHTML = `
        <div class="todo">
            <h3> <h2>Title</h2> ${todo.title}</h3>
            <p> <h2>Description</h2> ${todo.description}</p>
            <p> <h2>Due Date </h2>  ${todo.date}</p>
            <div class="status">
                    <h2>Mark as: </h2> 
            <button onclick="complete(${todo.id})">Complete</button>
            </div>
            ${days(date_1, date_2) - 1 >= 0 ? `<p id="due" style ="display:block"> <b>Due in:</b> ${Math.abs(days(date_1, date_2))} day(s)</p>` : `<p id="overdue" style ="display:block"> <b>Late by:</b> ${Math.abs(days(date_1, date_2))} day(s)</p>`}
            <button onclick="editData(${todo.id})">Edit</button>
            <button onclick="deleteTodo(${todo.id})">Delete</button>
            
        </div>
        `
            todolistContainer.innerHTML += todoHTML;
            toDoCard.style.display = 'flex';
        })
    } else {
        toDoCard.style.display = 'none';
        emptyHeading.style.display = 'block';
    }

}

const showComplete = () => {
    
        let todos = todolist.filter(a => a.complete === true)
        completed.innerHTML = ''

        todos.forEach(todo => {
            let date_1 = new Date(todo.date);
            let date_2 = new Date();
            const days = (date_1, date_2) => {
                let difference = date_1.getTime() - date_2.getTime();
                let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
                return TotalDays;
            }
            const todoHTML = `
                    <div class="todo" style= "background-color: #e69a8dff">    
            <h3> <h2>Title</h2> ${todo.title}</h3>
            <p> <h2>Description</h2> ${todo.description}</p>
            <p> <h2>Due Date</h2> ${todo.date}</p>
            ${days(date_1, date_2) - 1 >= 0 ? `<p id="due" style ="display:block"> <b>Completed:</b> ${Math.abs(days(date_1, date_2))} day(s) earlier</p>` : `<p id="overdue" style ="display:block"> <b>Completed:</b> ${Math.abs(days(date_1, date_2))} day(s) late</p>`}
            <button onclick="deleteTodo(${todo.id})">Delete</button>
        </div>
        `
            completed.innerHTML += todoHTML;
            completeHeading.textContent= "COMPLETED TASKS"

        })
    } 

