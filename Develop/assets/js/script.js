
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
var localThing = localStorage.getItem("randomKey")

const taskForm = $("#task-form")
const titleInput = $("#task-input")
const dateInput = $("#datepicker")
const descriptionInput = $("#description-input")

function readProjectsFromStorage() {
  let tasks = JSON.parse(localStorage.getItem("tasks"));

  if (!tasks) {
    tasks = [];
  }
  return tasks;
}

function saveTasksToStorage(newTask) {
  taskList.push(newTask)
  localStorage.setItem("tasks", JSON.stringify(taskList))
  renderTaskList()
}

function createTaskCard(task) {
  
  var dynamicClass = ""
  var cardHTML = `<div class="card ${dynamicClass}"> 
  <h1>${task.title}</h1>
  <h2>Due on ${task.dueDate}</h2>
  </div>`
  return cardHTML
}

function renderTaskList() {
  
  if (taskList === null) {
    console.log("TaskList didn't exist!!")
    taskList = []
    localStorage.setItem("tasks", JSON.stringify(taskList))
    return
  }

  for (let i = 0; i < taskList.length; i++) {
    const task = taskList[i];

  }
}

function handleAddTask(event) {
  event.preventDefault()
  // When a User Submits a Form

  // 1. Validate the form

  // 2. If invalid {alert("error")  return}

  // 3. It's valid -> newTask = {title, description, due-date, progress: "to-do"}
  // saveTasksToStorage(newTask)
  // clear my inputs again -> new form
  // element.empty()
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



