import handleAddTask from "./handleAddTask";

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
  const addProjectDiv = document.createElement("div");
  addProjectDiv.textContent = "Add Project";
  sidebarProjects.append(addProjectDiv);
  sidebar.append(sidebarHome, sidebarToday, sidebarWeek, sidebarProjects);
  return sidebar;
}

function createAddtaskDiv() {
  const addTaskDiv = document.createElement("div");
  addTaskDiv.textContent = "Add a Task";
  addTaskDiv.classList.add("add-task");
  addTaskDiv.addEventListener("click", handleAddTask);
  return addTaskDiv;
}

export function createMainContent() {
  const mainContent = document.createElement("div");
  mainContent.id = "main-content";
  mainContent.replaceChildren()
  mainContent.append(createAddtaskDiv());
  return mainContent;
}

function createFooter() {
  const footer = document.createElement("footer");
  footer.textContent = "copyright 2023";
  return footer;
}

export default function template() {
  const createTemplate = () => {
    const body = document.querySelector("body");
    const main = document.createElement("main");
    main.append(createSidebar(), createMainContent());
    body.append(createHeader(), main, createFooter());
  };

  return createTemplate();
}
