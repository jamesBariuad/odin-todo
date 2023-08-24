import displayTasks, {
  editTaskDescriptionField,
  editTaskNameField,
} from "./displayTasks";
import {
  createDeadlineField,
  createDescriptionField,
  createTasknameField,
} from "./taskForm";
import { createPriorityField } from "./editTaskInProject";
import createPopUpDiv from "./taskCompletPopup";
import taskFactory from "./taskFactory";

const handleHomeClick = () => {
  const allTasks = [];
  displayTasks(allTasks);
};

const handleTodayClick = () => {
  const dateNow = new Date().toISOString();
  const overdueTasks = [];
  const tasksForToday = [];
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i) == "Projects") {
      continue;
    }
    const task = JSON.parse(localStorage.getItem(localStorage.key(i)));

    if (new Date(task.dueDate).toDateString() == new Date().toDateString()) {
      tasksForToday.push(task);
      continue;
    }
    if (task.dueDate == "no due date") {
      tasksForToday.push(task);
      continue;
    }
    if (dateNow > new Date(task.dueDate).toISOString()) {
      overdueTasks.push(task);
    }
  }

  displayOverdueAndTodayTasks(overdueTasks, tasksForToday);
};

const displayOverdueAndTodayTasks = (overdueTasks, tasksForToday) => {
  const mainContent = document.querySelector("#main-content");
  mainContent.replaceChildren();
  const overDueDiv = document.createElement("div");

  if (overdueTasks.length == 0) {
    overDueDiv.textContent = "";
  } else {
    overDueDiv.textContent = "OverDue";
  }

  const todayDiv = document.createElement("div");
  if (tasksForToday.length == 0) {
    todayDiv.textContent = "No tasks for today";
  } else {
    todayDiv.textContent = "Today";
  }

  const content = document.createElement("div");
  content.id = "content";

  createDivsPerTask(overdueTasks, overDueDiv);
  createDivsPerTask(tasksForToday, todayDiv);
  content.append(overDueDiv, todayDiv);

  mainContent.append(content, createAddtaskDiv());
};

const createDivsPerTask = (tasks, tasksDiv) => {
  for (let i = 0; i < tasks.length; i++) {
    const taskDiv = createTaskDiv(tasks[i]);
    tasksDiv.append(taskDiv);
  }
  return tasksDiv;
};

const handleCheckboxClick = (e) => {
  const mainContent = document.querySelector("#main-content");
  const taskCompleted = localStorage.getItem(e.target.parentElement.id);
  localStorage.removeItem(e.target.parentElement.id);

  createPopUpDiv(taskCompleted, "Today");
  mainContent.replaceChildren();
  // displayOverdueAndTodayTasks();
  handleTodayClick();
};

const createTaskDiv = (task) => {
  const taskDiv = document.createElement("div");
  taskDiv.id = task.title;
  taskDiv.addEventListener("click", (task) => editTask(task));
  const taskNameDiv = document.createElement("div");

  const taskDetailsDiv = document.createElement("div");
  const dueDateDiv = document.createElement("div");
  const priorityDiv = document.createElement("div");

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";

  checkBox.addEventListener("click", (e) => handleCheckboxClick(e));

  taskNameDiv.innerHTML = `Task:${task.title}`;
  taskDetailsDiv.innerHTML = `details:${task.description}`;
  dueDateDiv.textContent = `Due date:${task.dueDate}`;
  priorityDiv.textContent = `Priority:${task.priority}`;

  taskDiv.append(
    checkBox,
    taskNameDiv,
    taskDetailsDiv,
    dueDateDiv,
    priorityDiv
  );
  return taskDiv;
};

const editTask = (e) => {
  const taskName = e.target.parentElement.id;
  const task = JSON.parse(localStorage.getItem(taskName));
  if (!task) {
    return;
  }
  const taskDivToEdit = e.target.parentElement;
  const editFields = createEditFields(task);
  taskDivToEdit.replaceWith(editFields);
};

const createEditFields = (task) => {
  const editFieldsDiv = document.createElement("div");

  const taskField = createTasknameField(task);
  taskField.textContent = task?.title;
  const taskDescriptionField = createDescriptionField(task);
  taskDescriptionField.textContent = task?.description;
  const deadlineField = createDeadlineField(task);
  const dateInsideDateField = deadlineField.querySelector("input");
  dateInsideDateField.value = task?.dueDate;
  const priorityField = createPriorityField(task);
  const cancelButton = createCancelButton();
  const submitButton = createSubmitButton(task);

  editFieldsDiv.append(
    taskField,
    taskDescriptionField,
    deadlineField,
    priorityField,
    cancelButton,
    submitButton
  );

  return editFieldsDiv;
};

const createEmptyFields = (addTaskDiv) => {
  const editFieldsDiv = document.createElement("div");
  const taskField = createTasknameField();
  const taskDescriptionField = createDescriptionField();
  const deadlineField = createDeadlineField();
  const priorityField = createPriorityField();
  const cancelButton = createCancelButton();
  const submitButton = createSubmitButton();
  editFieldsDiv.append(
    taskField,
    taskDescriptionField,
    deadlineField,
    priorityField,
    cancelButton,
    submitButton
  );

  addTaskDiv.replaceWith(editFieldsDiv);

  return addTaskDiv;
};

const createAddtaskDiv = () => {
  const addTaskDiv = document.createElement("div");
  addTaskDiv.textContent = "Add a Task";
  addTaskDiv.classList.add("add-task");
  addTaskDiv.addEventListener("click", () => createEmptyFields(addTaskDiv));
  return addTaskDiv;
};

const createCancelButton = () => {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "Cancel";
  button.addEventListener("click", () => handleTodayClick());
  return button;
};

const createSubmitButton = (task) => {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "Submit";
  button.addEventListener("click", () => handleSubmitClick(task));
  return button;
};

const handleSubmitClick = (task) => {
  if (!task) {
    return addNewTask();
  }
  const oldTitle = task.title;
  const newTaskName = document.querySelector(
    '[data-text="Task Name"]'
  ).textContent;
  const newDescription = document.querySelector(
    '[data-text="Task Description"]'
  ).textContent;
  const newDate = document.querySelector('input[type="date"]').value;
  const newPriority = document.querySelector(".active-button").textContent;

  task.title = newTaskName;
  task.description = newDescription;

  if (!task.dueDate) {
    task.dueDate = "no due date";
  } else {
    task.dueDate = newDate;
  }

  if (!newPriority) {
    task.priority = "no priority set";
  } else {
    task.priority = newPriority;
  }

  updateValuesOnLocalStorage(task, oldTitle);
  handleTodayClick();
};

const addNewTask = () => {
  const newTaskName = document.querySelector(
    '[data-text="Task Name"]'
  ).textContent;
  const newDescription = document.querySelector(
    '[data-text="Task Description"]'
  ).textContent;
  let newDate = document.querySelector('input[type="date"]').value;
  let newPriority = document.querySelector(".active-button").textContent;

  if (!newDate) {
    newDate = "no due date";
  }

  if (!newPriority) {
    newPriority = "no priority set";
  }
  const newTask = taskFactory(
    newTaskName,
    newDescription,
    newDate,
    newPriority,
    new Date().toISOString
  );
  updateValuesOnLocalStorage(newTask);
  handleTodayClick();
};

const updateValuesOnLocalStorage = (task, oldTitle) => {
  localStorage.removeItem(oldTitle);
  localStorage.setItem(task.title, JSON.stringify(task));
};

export { handleHomeClick, handleTodayClick };
