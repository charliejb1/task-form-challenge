
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
var localThing = localStorage.getItem("randomKey")

const taskForm = $("#task-form")
const titleInput = $("#task-input")
const dateInput = $("#datepicker")
const descriptionInput = $("#description-input")
const doneCards = $("#done-cards")
const inProgressCards = $("#in-progress-cards")
const toDoCards = $("#todo-cards")

function readTasksFromStorage() {
  let tasks = JSON.parse(localStorage.getItem("tasks"));

  if (!tasks) {
    tasks = [];
  }
  return tasks;
}

function saveTasksToStorage(newTask) {
  const taskList = readTasksFromStorage()
  taskList.push(newTask)
  localStorage.setItem("tasks", JSON.stringify(taskList))
  renderTaskList()
}

function createTaskCard(task) {
  const taskCard = $('<div>')
    .addClass('card project-card draggable my-3')
    .attr('data-project-id', task.id);
  const cardHeader = $('<div>').addClass('card-header h4').text(task.name);
  const cardBody = $('<div>').addClass('card-body');
  const cardDescription = $('<p>').addClass('card-text').text(task.type);
  const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
  const cardDeleteBtn = $('<button>')
    .addClass('btn btn-danger delete')
    .text('Delete')
    .attr('data-project-id', task.id);
  cardDeleteBtn.on('click', handleDeleteTask);

  if (task.dueDate && task.status !== 'done') {
    const now = dayjs();
    const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');

    // ? If the task is due today, make the card yellow. If it is overdue, make it red.
    if (now.isSame(taskDueDate, 'day')) {
      taskCard.addClass('bg-warning text-white');
    } else if (now.isAfter(taskDueDate)) {
      taskCard.addClass('bg-danger text-white');
      cardDeleteBtn.addClass('border-light');
    }
  }

  // ? Gather all the elements created above and append them to the correct elements.
  cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
  taskCard.append(cardHeader, cardBody);

  return taskCard;
}


function renderTaskList() {

  const taskList = readTasksFromStorage()
   
    const todoList = $('#todo-cards');
    todoList.empty();
  
    const inProgressList = $('#in-progress-cards');
    inProgressList.empty();
  
    const doneList = $('#done-cards');
    doneList.empty();

  for (let i = 0; i < taskList.length; i++) {
    const task = taskList[i];


    if (task.status === "done" && task.dueDate === "done") {
      doneCards.append(task)
    } else if (task.status === "to-do") {
      toDoCards.append(createTaskCard(task))
    } else if (task.status === 'in-progress') {
      inProgressCards.append(createProjectCard(project));
    }
  }
}

function handleAddTask(event) {
  event.preventDefault()
  console.log("hello")
  const taskType = taskForm.val().trim();
  const taskName = titleInput.val(); // don't need to trim select input
  const taskDate = dateInput.val(); // yyyy-mm-dd format

  const newTask = {
    // ? Here we use a Web API called `crypto` to generate a random id for our project. This is a unique identifier that we can use to find the project in the array. `crypto` is a built-in module that we can use in the browser and Nodejs.    id: crypto.randomUUID(),
    name: taskName,
    type: taskType,
    dueDate: taskDate,
    status: 'to-do',
  };

  // ? Pull the projects from localStorage and push the new project to the array

  // ? Save the updated projects array to localStorage
  saveTasksToStorage(newTask);

  // ? Print project data back to the screen
  renderTaskList();

  // ? Clear the form inputs
  taskForm.val('');
  titleInput.val('');
  dateInput.val('');
}

function handleDeleteTask(event) {

}

// drag and drop functionality
function handleDrop(event, ui) {

}

$(document).ready(function () {
  renderTaskList()
  // $( function() {
  //   $( "#datepicker" ).datepicker();
  // } );
  $("#task-form").on("submit", handleAddTask)

});



