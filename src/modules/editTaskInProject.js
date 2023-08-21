import { displayTasksInProject } from "./displayProject";
import { createTasknameField, createDescriptionField } from "./taskForm";

const editTask = (e) => {
  const taskName = e.target.parentElement.id.toString();
  const taskToEdit = document.querySelector(`[id='${taskName}']`);
  if(!taskToEdit){
    return
  }
  if (taskName == "") {
    return;
  }
  const task = findTaskFromProject(taskName);
  //   findindexOfTaskFromProject(taskName);
  taskToEdit.replaceWith(createFields(task));
  // console.log(e.target.parentElement.id)
};

const createFields = (task) => {
  const editFields = document.createElement("div");
  const taksNameField = createTasknameField();
  const descriptionField = createDescriptionField();
  const deadlineField = createDeadlineField(task);
  const priorityField = createPriorityField(task);
  const cancelButton = createCancelButton();
  const addButton = createSubmitButton(task);

  taksNameField.textContent = task.title;
  descriptionField.textContent = task.description;

  editFields.append(
    taksNameField,
    descriptionField,
    deadlineField,
    priorityField,
    cancelButton,
    addButton
  );
  return editFields;
};

const createDeadlineField = (task) => {
  const div = document.createElement("div");
  const input = document.createElement("input");
  input.type = "date";
  input.value = task.dueDate;
  div.textContent = "Due date:";
  div.append(input);
  return div;
};

const createPriorityField = (task) => {
  const priorityDiv = document.createElement("div");
  priorityDiv.textContent = "Priority:";

  const low = document.createElement("button");
  const medium = document.createElement("button");
  const high = document.createElement("button");
  low.textContent = "low";
  medium.textContent = "medium";
  high.textContent = "high";

  const handlePriorityClick = (e) => {
    let priority = "";
    low.classList.remove("active-button");
    medium.classList.remove("active-button");
    high.classList.remove("active-button");
    if (e.target.innerText == "low" ) {
      low.classList.add("active-button");
    } else if (e.target.innerText == "medium" ) {
      medium.classList.add("active-button");
    } else if (e.target.innerText == "high" ) {
      high.classList.add("active-button");
    }
    priority = e.target.innerText;
    return priority;
  };

  if (task.priority == "low") {
    low.classList.add("active-button");
  } else if (task.priority == "medium") {
    medium.classList.add("active-button");
  } else if (task.priority == "high") {
    high.classList.add("active-button");
  }

  low.addEventListener("click", (e) => handlePriorityClick(e));
  medium.addEventListener("click", (e) => handlePriorityClick(e));
  high.addEventListener("click", (e) => handlePriorityClick(e));
  priorityDiv.append(low, medium, high);
  return priorityDiv;
};

const findTaskFromProject = (taskName) => {
  const projects = JSON.parse(localStorage.getItem("Projects"));
  const projectTitle = document.querySelector("#project-title").textContent;
  const tasksFromProject = projects.find(
    (project) => project.title == projectTitle
  ).tasks;
  const task = tasksFromProject.find((task) => task.title === taskName);
  return task;
  // const indexOfTask = tasksFromProject.findIndex(task=>task.title==taskName)
  // console.log(task)
};

const createCancelButton = () => {
  const projectName = document.querySelector("#project-title").textContent;
  const button = document.createElement("button");
  button.type = "button";
  button.addEventListener("click", () => displayTasksInProject(projectName));
  button.textContent = "Cancel";

  return button;
};

const handleSubmitButtonClick = (task, index) => {
  const projectName = document.querySelector("#project-title").textContent;
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

  addEditedTaskToProject(task, index);
  displayTasksInProject(projectName);
};

const addEditedTaskToProject = (task, index) => {
  const projects = JSON.parse(localStorage.getItem("Projects"));
  const projectTitle = document.querySelector("#project-title").textContent;

  const project = projects.find((project) => project.title == projectTitle);
  project.tasks[index] = task;
  localStorage.setItem("Projects", JSON.stringify(projects));
};

const createSubmitButton = (task) => {
  const addButton = document.createElement("button");
  addButton.type = "button";
  addButton.textContent = "Submit";
  const index = findIndexOfTaskFromProject(task.title);

  addButton.addEventListener("click", () =>
    handleSubmitButtonClick(task, index)
  );
  return addButton;
};
const findIndexOfTaskFromProject = (taskName) => {
  const projects = JSON.parse(localStorage.getItem("Projects"));
  const projectTitle = document.querySelector("#project-title").textContent;

  const project = projects.find((project) => project.title == projectTitle);
  const indexOfTask = project.tasks.findIndex((task) => task.title == taskName);
  return indexOfTask;
};

export default editTask;
export {createPriorityField}
