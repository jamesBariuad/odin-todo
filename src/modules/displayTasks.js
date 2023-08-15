import { createAddtaskDiv } from "./layout";
import createPopUpDiv from "./taskCompletPopup";

export default function displayTasks() {
  const mainContent = document.querySelector("#main-content");
  let tasks = [];
  mainContent.replaceChildren()

  createAndSortTaskArray(tasks);
  createDivsPerTask(tasks, mainContent);
  mainContent.append(createAddtaskDiv());
  return mainContent;
}

const createDivsPerTask = (tasks, mainContent) => {
  for (let i = 0; i < tasks.length; i++) {
    const taskDiv = createTaskDiv(tasks[i]);
    mainContent.append(taskDiv);
  }
  return mainContent;
};

const createAndSortTaskArray = (tasks) => {
  for (let i = 0; i <= localStorage.length - 1; i++) {
    const task = JSON.parse(localStorage.getItem(localStorage.key(i)));
    tasks.push(task);
  }

  tasks.sort(function (a, b) {
    return a.dateAdded < b.dateAdded ? -1 : a.dateAdded > b.dateAdded ? 1 : 0;
  });
  return tasks;
};

const handleCheckboxClick = (e) => {
  const mainContent = document.querySelector("#main-content");
  const taskCompleted = localStorage.getItem(e.target.parentElement.id)
  localStorage.removeItem(e.target.parentElement.id);

  createPopUpDiv(taskCompleted)
  mainContent.replaceChildren();
  displayTasks();
};

const createTaskDiv = (task) => {
  const taskDiv = document.createElement("div");
  taskDiv.id = task.title;
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
