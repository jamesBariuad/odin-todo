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

    if (
      new Date(task.dueDate).toDateString() == new Date().toDateString() ||
      task.dueDate == "no due date"
    ) {
      tasksForToday.push(task);
      continue;
    } else if (dateNow > new Date(task.dueDate).toISOString()) {
      overdueTasks.push(task);
    }
  }

  const origin = "today";
  displayOverdueAndTodayTasks(overdueTasks, tasksForToday, origin);
};

const areDatesInSameWeek = (date1, date2) =>
  Math.abs(new Date(date2) - new Date(date1)) / (24 * 60 * 60 * 1000) < 7 &&
  new Date(date1).getUTCDay() <= new Date(date2).getUTCDay();

const handleWeekClick = () => {
  const dateNow = new Date().toISOString();
  const overdueTasks = [];
  const tasksThisWeek = [];
  const origin = "week";

  for (let i = 0; i < localStorage.length; i++) {
    const storageKey = localStorage.key(i);
    const task = JSON.parse(localStorage.getItem(storageKey));

    if (storageKey === "Projects") {
      continue;
    }

    if (task.dueDate === "no due date") {
      tasksThisWeek.push(task);
      continue;
    }

    const taskDueDate = new Date(task.dueDate).toISOString();

    if (areDatesInSameWeek(dateNow, taskDueDate)) {
      tasksThisWeek.push(task);
      continue;
    }
    if (
      dateNow > taskDueDate &&
      new Date(taskDueDate).toDateString() !== new Date().toDateString()
    ) {
      overdueTasks.push(task);
    }
  }

  displayOverdueAndTasksThisWeek(overdueTasks, tasksThisWeek, origin);
};

const displayOverdueAndTasksThisWeek = (
  overdueTasks,
  tasksThisWeek,
  origin
) => {
  const mainContent = document.querySelector("#main-content");
  mainContent.replaceChildren();
  const overDueDiv = document.createElement("div");

  if (overdueTasks.length == 0) {
    overDueDiv.textContent = "";
  } else {
    overDueDiv.textContent = "OverDue";
  }

  const todayDiv = document.createElement("div");
  if (tasksThisWeek.length == 0 && overdueTasks.length == 0) {
    todayDiv.textContent = "No tasks for this week";
  } else {
    todayDiv.textContent = "This Week";
  }

  const content = document.createElement("div");
  content.id = "content";

  createDivsPerTask(overdueTasks, overDueDiv, origin);
  createDivsPerTask(tasksThisWeek, todayDiv, origin);
  content.append(overDueDiv, todayDiv);

  mainContent.append(content, createAddtaskDiv());
};

const displayOverdueAndTodayTasks = (overdueTasks, tasksForToday, origin) => {
  const mainContent = document.querySelector("#main-content");
  mainContent.replaceChildren();
  const overDueDiv = document.createElement("div");

  if (overdueTasks.length == 0) {
    overDueDiv.textContent = "";
  } else {
    overDueDiv.textContent = "OverDue";
  }

  const todayDiv = document.createElement("div");
  if (tasksForToday.length == 0 && overdueTasks.length == 0) {
    todayDiv.textContent = "No tasks for today";
  } else {
    todayDiv.textContent = "Today";
  }

  const content = document.createElement("div");
  content.id = "content";

  createDivsPerTask(overdueTasks, overDueDiv, origin);
  createDivsPerTask(tasksForToday, todayDiv, origin);
  content.append(overDueDiv, todayDiv);

  mainContent.append(content, createAddtaskDiv());
};

const createDivsPerTask = (tasks, tasksDiv, origin) => {
  for (let i = 0; i < tasks.length; i++) {
    const taskDiv = createTaskDiv(tasks[i], origin);
    tasksDiv.append(taskDiv);
  }
  return tasksDiv;
};

const handleCheckboxClick = (e, origin) => {
  const mainContent = document.querySelector("#main-content");
  const taskCompleted = localStorage.getItem(e.target.parentElement.id);
  localStorage.removeItem(e.target.parentElement.id);

  createPopUpDiv(taskCompleted, "Today");
  mainContent.replaceChildren();

  if (origin == "today") {
    handleTodayClick();
  }else if (origin =='week'){
    handleWeekClick()
  }
};

const createTaskDiv = (task, origin) => {
  const taskDiv = document.createElement("div");
  taskDiv.id = task.title;
  taskDiv.addEventListener("click", (task) => editTask(task, origin));
  const taskNameDiv = document.createElement("div");

  const taskDetailsDiv = document.createElement("div");
  const dueDateDiv = document.createElement("div");
  const priorityDiv = document.createElement("div");

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";

  checkBox.addEventListener("click", (e) => handleCheckboxClick(e, origin));

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

const editTask = (e, origin) => {
  const taskName = e.target.parentElement.id;
  const task = JSON.parse(localStorage.getItem(taskName));
  if (!task) {
    return;
  }
  const taskDivToEdit = e.target.parentElement;
  const editFields = createEditFields(task, origin);
  taskDivToEdit.replaceWith(editFields);
};

const createEditFields = (task, origin) => {
  const editFieldsDiv = document.createElement("div");

  const taskField = createTasknameField(task);
  taskField.textContent = task?.title;
  const taskDescriptionField = createDescriptionField(task);
  taskDescriptionField.textContent = task?.description;
  const deadlineField = createDeadlineField(task);
  const dateInsideDateField = deadlineField.querySelector("input");
  dateInsideDateField.value = task?.dueDate;
  const priorityField = createPriorityField(task);
  const cancelButton = createCancelButton(origin);
  const submitButton = createSubmitButton(task, origin);

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

const createCancelButton = (origin) => {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "Cancel";
  button.addEventListener("click", () => {
    if (origin == "today") {
      return handleTodayClick();
    } else if (origin == "week") {
      return handleWeekClick();
    }
  });
  return button;
};

const createSubmitButton = (task, origin) => {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "Submit";
  button.addEventListener("click", () => handleSubmitClick(task, origin));
  return button;
};

const handleSubmitClick = (task, origin) => {
  if (!task) {
    return addNewTask(origin);
  }
  const oldTitle = task.title;
  const newTaskName = document.querySelector(
    '[data-text="Task Name"]'
  ).textContent;
  const newDescription = document.querySelector(
    '[data-text="Task Description"]'
  ).textContent;
  const newDate = document.querySelector('input[type="date"]').value;
  const newPriority = document.querySelector(".active-button");

  task.title = newTaskName;
  task.description = newDescription;

  if (!task.title) {
    return alert("please fill Task Name field");
  }

  if (!newDate) {
    task.dueDate = "no due date";
  } else {
    task.dueDate = newDate;
  }

  if (!newPriority) {
    task.priority = "no priority set";
  } else {
    task.priority = newPriority.textContent;
  }

  updateValuesOnLocalStorage(task, oldTitle);

  if (origin == "today") {
    return handleTodayClick();
  } else if (origin == "week") {
    return handleWeekClick();
  }
};

const addNewTask = (origin) => {
  const newTaskName = document.querySelector(
    '[data-text="Task Name"]'
  ).textContent;
  const newDescription = document.querySelector(
    '[data-text="Task Description"]'
  ).textContent;
  const inputDate = document.querySelector('input[type="date"]').value;
  const buttonPriority = document.querySelector(".active-button");

  let newDate = inputDate;
  let prio;
  if (!newTaskName) {
    return alert("please fill Task Name field");
  }
  if (!newDate) {
    newDate = "no due date";
  }

  if (!buttonPriority) {
    prio = "no priority set";
  } else {
    prio = buttonPriority.textContent;
  }

  const newTask = taskFactory(
    newTaskName,
    newDescription,
    newDate,
    prio,
    new Date().toISOString
  );
  updateValuesOnLocalStorage(newTask);
  if (origin == "today") {
    displayOverdueAndTodayTasks();
  } else if (origin == "week") {
    displayOverdueAndTasksThisWeek();
  }
};

const updateValuesOnLocalStorage = (task, oldTitle) => {
  localStorage.removeItem(oldTitle);
  localStorage.setItem(task.title, JSON.stringify(task));
};

export { handleHomeClick, handleTodayClick, handleWeekClick };
