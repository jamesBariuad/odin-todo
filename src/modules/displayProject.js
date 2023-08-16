import { createAddProjectDiv } from "./layout";
import { createAddtaskDiv } from "./layout";

const disPlayProjectTitleInMainContent = (projectName) => {
  const mainContent = document.querySelector("#main-content");
  const projectTitleDiv = document.createElement("div");
  projectTitleDiv.textContent = projectName;
  mainContent.replaceChildren();
  mainContent.append(projectTitleDiv);
  return mainContent;
};

const displayTasksInProject = (projectName) => {
  const mainContent = document.querySelector("#main-content");
  mainContent.replaceChildren();
  disPlayProjectTitleInMainContent(projectName);
  const projectContainer = document.createElement("div");
  const tasksInProject = JSON.parse(localStorage.getItem(projectName));
  if (!tasksInProject) {
    return mainContent.append(createAddtaskDiv());
  }

//   for (let i = 0; i < projects.length; i++) {
//     if (projects[i].projectName == titleWeLookFor) {
//       displayTasksInProject(projects[i]);
//     }
//   }
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
  for (let i = 0; i < projects.length; i++) {
    console.log(projects[i].title);
    const projectNameDiv = document.createElement("div");
    projectNameDiv.textContent = projects[i].title;
    sideBarProjectsDiv.append(projectNameDiv);
  }
  sideBarProjectsDiv.append(createAddProjectDiv());
};

export { displayProjectNamesInSidebar, disPlayProjectTitleInMainContent, displayTasksInProject };
