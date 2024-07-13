
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
var localThing = localStorage.getItem("randomKey")

const taskForm = $("#task-form")
const titleInput = $("#title-input")
const dateInput = $("#datepicker")
const descriptionInput = $("#description-input")
const doneCards = $("#done-cards")
const inProgressCards = $("#in-progress-cards")
const toDoCards = $("#todo-cards")

function generateTaskId() {
  if (nextId === null) {
    nextId = 1
  } else {
    nextId++ 
  }
  return nextId
}

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


  
// function for creating task cards of header, body, description, duedate and delete button.
function createTaskCard(task) {
  console.log(task.type)
  const taskCard = $('<div>')
    .addClass('card project-card draggable my-3')
    .attr('data-task-id', task.id);
  const cardHeader = $('<div>').addClass('card-header h4').text(task.name);
  const cardBody = $('<div>').addClass('card-body');
  const cardDescription = $('<p>').addClass('card-text').text(task.description);
  const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
  const cardDeleteBtn = $('<button>')
    .addClass('btn btn-danger delete')
    .text('Delete')
    .attr('data-task-id', task.id);
  cardDeleteBtn.on('click', handleDeleteTask);

  // dayjs allows for the styling of the cards based on their due date
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
  //  clears existing cards from lanes
    const todoList = $('#todo-cards');
    todoList.empty();
  
    const inProgressList = $('#in-progress-cards');
    inProgressList.empty();
  
    const doneList = $('#done-cards');
    doneList.empty();

  for (let i = 0; i < taskList.length; i++) {
    const task = taskList[i];

// based on status of the cards, appned them to the correct lanes
    if (task.status === "done" && task.dueDate === "done") {
      doneCards.append(task)
    } else if (task.status === "to-do") {
      toDoCards.append(createTaskCard(task))
    } else if (task.status === 'in-progress') {
      inProgressCards.append(createTaskCard(task));
    }
  }

  // draggable function for cards
  $('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,
    
    helper: function (e) {4
      const original = $(e.target).hasClass('ui-draggable')
        ? $(e.target)
        : $(e.target).closest('.ui-draggable');
      return original.clone().css({
        width: original.outerWidth(),
      });
    },
  });
}

function handleDrop(event, ui) {
  // ? Read tasks from localStorage
  const tasks = readTasksFromStorage();
  console.log(ui.draggable[0])
  const taskId = ui.draggable[0].dataset.taskId
  console.log(taskId)

}
// handles taking the inputs from the form/modal and making a newTask
function handleAddTask(event) {
  event.preventDefault()
  console.log("hello")
  const taskType = taskForm.val().trim();
  const taskTitle = titleInput.val(); 
  const taskDate = dateInput.val(); 
  const taskDescription = descriptionInput.val();
  const newTask = {
   
    name: taskTitle,
    id: generateTaskId(),
    type: taskType,
    description: taskDescription,
    dueDate: taskDate,
    status: 'to-do',

    
  };

  //

  // Save the updated projects array to localStorage
  saveTasksToStorage(newTask);

  // Print project data back to the screen
  renderTaskList();

  // Clear the form inputs
  taskForm.val('');
  titleInput.val('');
  dateInput.val('');
}
 
  function handleDeleteTask() {
    const taskId = $(this).attr('data-task-id');
    let tasks = readTasksFromStorage();

    tasks = tasks.filter((task)=> {
      task.id !== parseInt(taskId)
    })

    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTaskList();
  }

$(document).ready(function () {
  renderTaskList()

 
  $("#task-form").on("submit", handleAddTask)
   // Make lanes droppable
  $('.lane').droppable({
    accept: '.draggable',
    drop: handleDrop,
  });



});

