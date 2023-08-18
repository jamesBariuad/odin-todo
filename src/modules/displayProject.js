import { createAddProjectDiv } from "./layout";
import taskFactory from "./taskFactory";
import createCheckbox from "./checkBoxForProjectTasks";
// import {  } from "./layout";
import {
  createTasknameField,
  createDescriptionField,
  createDeadlineField,
  createPriorityField,
} from "./taskForm";

const disPlayProjectTitleInMainContent = (projectName) => {
  const mainContent = document.querySelector("#main-content");
  const projectTitleDiv = document.createElement("div");
  projectTitleDiv.id = "project-title";
  projectTitleDiv.textContent = projectName;
  mainContent.replaceChildren();
  mainContent.append(projectTitleDiv);
  return mainContent;
};

//key: "projecst"   [{title:'project title', tasks:[{name:task1, description:'task description',due date:123123, priority: '', date created}] }]
const displayProjectNamesInSidebar = () => {
  const sideBarProjectsDiv = document.querySelector("#sidebar-projects");
  const projects = JSON.parse(localStorage.getItem("Projects"));
  if (!projects) {
    return;
  }
  sideBarProjectsDiv.replaceChildren();
  sideBarProjectsDiv.textContent = "Projects";

  const handleProjectNameClick = (projectNameClicked) => {
    disPlayProjectTitleInMainContent(projectNameClicked);
    displayTasksInProject(projectNameClicked);
  };

  for (let i = 0; i < projects.length; i++) {
    const projectNameDiv = document.createElement("div");
    projectNameDiv.textContent = projects[i].title;
    sideBarProjectsDiv.append(projectNameDiv);
    projectNameDiv.addEventListener("click", (e) =>
      handleProjectNameClick(e.target.textContent)
    );
  }
  sideBarProjectsDiv.append(createAddProjectDiv());
};

const createCancelButton = (addTaskDiv, taskForm) => {
  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.textContent = "cancel";
  cancelButton.addEventListener("click", () =>
    handleCancelButtonClick(addTaskDiv, taskForm)
  );
  const handleCancelButtonClick = (addTaskDiv, taskForm) => {
    taskForm.replaceWith(addTaskDiv);
  };
  return cancelButton;
};

const createSubmitButton = () => {
  const submitButton = document.createElement("button");
  submitButton.type = "button";
  submitButton.textContent = "Add";
  submitButton.addEventListener("click", handleSubmitButtonClick);
  return submitButton;
};

const handleSubmitButtonClick = () => {
  const projectName = document.querySelector("#project-title");

  const taskName = document.querySelector(`[data-text="Task Name"]`);
  const taskDescription = document.querySelector(
    `[data-text="Task Description"]`
  );
  const dueDate = document.querySelector('input[type="date"]');
  const priority = document.querySelector('button[class="active-button"]');
  let dueDateText = "";
  let priorityText = "";

  // if (!taskName.innerHTML) {
  //   return alert("please fill Task Name field");
  // }

  if (!dueDate.value) {
    dueDateText = "no due date";
  } else {
    dueDateText = dueDate.value;
  }

  if (!priority) {
    priorityText = "no priority set";
  } else {
    priorityText = priority.innerHTML;
  }

  // if (localStorage.getItem(`${taskName.innerHTML}`) !== null) {
  //   return alert(`Task ${taskName.innerHTML} already exist!`);
  // }

  const dateAdded = new Date().toISOString();

  const newTask = taskFactory(
    `${taskName.textContent}`,
    `${taskDescription.textContent}`,
    `${dueDateText}`,
    `${priorityText}`,
    dateAdded
  );

  addTaskToProject(newTask);
  displayTasksInProject(projectName.textContent);
};

const addTaskToProject = (newTask) => {
  const projects = JSON.parse(localStorage.getItem("Projects"));
  const selectedProject = document.querySelector("#project-title").textContent;
  const indexofSelectedProject = projects.findIndex(
    (project) => project.title == selectedProject
  );
  const taskArray = projects[indexofSelectedProject].tasks;
  // const newTaskArray = previousTaskArray.push(newTask)
  taskArray.push(newTask);
  console.log(taskArray);
  projects[indexofSelectedProject].tasks = taskArray;
  localStorage.setItem("Projects", JSON.stringify(projects));
};

const displayTasksInProject = (projectName) => {
  const mainContent = document.querySelector("#main-content");
  mainContent.replaceChildren();
  disPlayProjectTitleInMainContent(projectName);
  const projectContainer = document.createElement("div");
  const projects = JSON.parse(localStorage.getItem("Projects"));

  if (!projects) {
    console.log(projects, createProjectTaskForm());
    return mainContent.append(createProjectTaskForm());
  }
  const indexOfProjectName = projects
    .map((object) => object.title)
    .indexOf(projectName);
  const project = projects[indexOfProjectName];

  for (let i = 0; i < project.tasks.length; i++) {
    projectContainer.append(createTaskDiv(project.tasks[i]));
  }
  mainContent.append(projectContainer, createProjectTaskForm());
};

const createTaskDiv = (task) => {
  const taskDiv = document.createElement("div");
  taskDiv.id = task.title;
  const taskNameDiv = document.createElement("div");

  const taskDetailsDiv = document.createElement("div");
  const dueDateDiv = document.createElement("div");
  const priorityDiv = document.createElement("div");

  // const checkBox = document.createElement("input");
  // checkBox.type = "checkbox";
  const checkBox = createCheckbox();

  // checkBox.addEventListener("click", (e) => handleCheckboxClick(e));

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

const createProjectTaskForm = () => {
  const addTaskDiv = document.createElement("div");
  addTaskDiv.textContent = "Add a task";
  addTaskDiv.id = "add-task";
  const taskForm = document.createElement("div");
  taskForm.id = "task-form";
  addTaskDiv.addEventListener("click", () => addTaskDiv.replaceWith(taskForm));

  taskForm.append(
    createTasknameField(),
    createDescriptionField(),
    createDeadlineField(),
    createPriorityField(),
    createSubmitButton(),
    createCancelButton(addTaskDiv, taskForm)
  );

  return addTaskDiv;
};

export {
  displayProjectNamesInSidebar,
  disPlayProjectTitleInMainContent,
  displayTasksInProject,
};
