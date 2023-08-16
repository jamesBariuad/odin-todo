import displayTasks from "./displayTasks";
import taskForm from "./taskForm";
import addProject from "./addProject";

function createHeader() {
  const header = document.createElement("header");
  const headerDiv = document.createElement("div");
  headerDiv.textContent = " To-do List";
  header.append(headerDiv);
  return header;
}

function createSidebar() {
  const sidebar = document.createElement("div");
  sidebar.id = "sidebar";
  const sidebarHome = document.createElement("div");
  sidebarHome.textContent = "Home";
  const sidebarToday = document.createElement("div");
  sidebarToday.textContent = "Today";
  const sidebarWeek = document.createElement("div");
  sidebarWeek.textContent = "Week";

  const sidebarProjects = document.createElement("div");
  sidebarProjects.textContent = "Projects";

  sidebarProjects.append(createAddProjectDiv());

  sidebar.append(sidebarHome, sidebarToday, sidebarWeek, sidebarProjects);
  return sidebar;
}


const handleAddProjectButtonClick = (inputProject, inputDiv, addProjectDiv) => {
  const currentProjects = localStorage.getItem("Projects");
  if (!currentProjects) {
    console.log("alaws");
    localStorage.setItem(
      "Projects",
      JSON.stringify([{ title: inputProject.value, tasks: [] }])
    );
  } else {
    const currentProjectsParsed = JSON.parse(currentProjects);
    const projectToAdd = { title: inputProject.value, tasks: [] };
    localStorage.setItem(
      "Projects",
      JSON.stringify([...currentProjectsParsed, projectToAdd])
    );
  }

  inputDiv.replaceWith(addProjectDiv);
};

const handleCancelClick = (inputDiv, addProjectDiv) => {
  inputDiv.replaceWith(addProjectDiv);
};

const handleAddProjectDivClick = (e, addProjectDiv) => {
  const projectsDiv = e.target.parentElement;

  const inputDiv = document.createElement("div");
  inputDiv.id = "add-project-input";
  const inputProject = document.createElement("input");
  inputProject.id = "input-project-name";
  const add = document.createElement("button");

  add.addEventListener("click", () =>
    handleAddProjectButtonClick(inputProject, inputDiv, addProjectDiv)
  );

  add.textContent = "add";
  const cancel = document.createElement("button");
  cancel.textContent = "cancel";
  cancel.addEventListener("click", () =>
    handleCancelClick(inputDiv, addProjectDiv)
  );
  inputDiv.textContent = "Project Name:";
  inputDiv.append(inputProject, add, cancel);
  e.target.replaceWith(inputDiv);
};

function createAddProjectDiv() {
  const addProjectDiv = document.createElement("div");
  addProjectDiv.textContent = "Add Project";
  addProjectDiv.id = "add-project";
  addProjectDiv.addEventListener("click", (e) =>
    handleAddProjectDivClick(e, addProjectDiv)
  );
  return addProjectDiv;
}

export function createAddtaskDiv() {
  const addTaskDiv = document.createElement("div");
  addTaskDiv.textContent = "Add a Task";
  addTaskDiv.classList.add("add-task");
  addTaskDiv.addEventListener("click", taskForm);
  return addTaskDiv;
}

function createMainContent() {
  const mainContent = document.createElement("div");
  mainContent.id = "main-content";
  mainContent.replaceChildren();
  return mainContent;
}

function createFooter() {
  const footer = document.createElement("footer");
  footer.textContent = "copyright 2023";
  return footer;
}

export default function template() {
  document.body.replaceChildren();
  const body = document.querySelector("body");
  const main = document.createElement("main");
  main.append(createSidebar(), createMainContent());
  body.append(createHeader(), main, createFooter());
  displayTasks();

  return body;
}
