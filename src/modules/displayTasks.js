import { createAddtaskDiv } from "./layout";
import createPopUpDiv from "./taskCompletPopup";
import {
  createDeadlineField,
  createDescriptionField,
  createTasknameField,
} from "./taskForm";
import { createPriorityField } from "./editTaskInProject";

export default function displayTasks(tasksToDisplay) {
  const mainContent = document.querySelector("#main-content");
  const tasksDiv = document.createElement("div");
  tasksDiv.id = 'tasks'
  mainContent.replaceChildren();

  
  if (!tasksToDisplay) {
    tasksToDisplay = [];
  }

  const tasks = tasksToDisplay;

  createAndSortTaskArray(tasks);
  createDivsPerTask(tasks, tasksDiv);
  tasksDiv.append(createAddtaskDiv());
  mainContent.append(tasksDiv);
  return mainContent;
}

const createAndSortTaskArray = (tasks) => {
  for (let i = 0; i <= localStorage.length - 1; i++) {
    const task = JSON.parse(localStorage.getItem(localStorage.key(i)));
    if (!task.title) {
      continue;
    } else {
      tasks.push(task);
    }
  }

  tasks.sort(function (a, b) {
    return a.dateAdded < b.dateAdded ? -1 : a.dateAdded > b.dateAdded ? 1 : 0;
  });
  return tasks;
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

  createPopUpDiv(taskCompleted);
  mainContent.replaceChildren();
  displayTasks();
};

const createTaskDiv = (task) => {
  const taskDiv = document.createElement("div");
  taskDiv.id = task.title;
  taskDiv.addEventListener("click", (e) => editTask(e));
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
  const editDiv = document.createElement("div");

  editDiv.append(
    editTaskNameField(task),
    editTaskDescriptionField(task),
    editDateField(task),
    editPriorityField(task),
    createSubmitButton(task),
    createCancelButton()
  );
  return editDiv;
};

const editTaskNameField = (task) => {
  const taskNameField = createTasknameField();
  taskNameField.textContent = task.title;
  return taskNameField;
};

const editTaskDescriptionField = (task) => {
  const taskDescriptionField = createDescriptionField();
  taskDescriptionField.textContent = task.description;
  return taskDescriptionField;
};

const editDateField = (task) => {
  const dateField = createDeadlineField();
  const dateInsideDateField = dateField.querySelector("input");
  dateInsideDateField.value = task.dueDate;
  return dateField;
};

const editPriorityField = (task) => {
  const priorityField = createPriorityField(task);
  return priorityField;
};

const createCancelButton = () => {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "Cancel";
  button.addEventListener("click", () => displayTasks());
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
  const oldTitle = task.title
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

  if (!newTaskName) {
    displayTasksInProject(projectName);
    return alert("Input a task name");
  }

  if (!task.dueDate) {
    task.dueDate = "no due date";
  } else {
    task.dueDate = newDate;
  }

  if (!newPriority) {
    task.priority = "no priority set";
  } else {
    task.priority = newPriority.textContent;
  }

  updateValuesOnLocalStorage(task,oldTitle);
  displayTasks();
};

const updateValuesOnLocalStorage = (task,oldTitle) => {
  localStorage.removeItem(oldTitle)
  localStorage.setItem(task.title, JSON.stringify(task));

};

export { createDivsPerTask,editTaskNameField,editTaskDescriptionField, };
