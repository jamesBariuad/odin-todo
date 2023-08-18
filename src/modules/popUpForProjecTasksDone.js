import { displayTasksInProject } from "./displayProject";

const createPopUpDiv = (taskToRestore, indexOfCompletedTask) => {
  document.querySelector("main-content");
  const popUpDiv = document.createElement("div");
  popUpDiv.id = "pop-up";
  popUpDiv.textContent = `1 task completed!   `;

  const span = document.createElement("span");
  span.textContent = "undo";
  span.addEventListener("click", () =>
    handleUndo(taskToRestore, popUpDiv, indexOfCompletedTask)
  );
  popUpDiv.append(span);

  setTimeout(() => {
    popUpDiv.remove();
  }, 2000);
  document.body.append(popUpDiv);
};

const handleUndo = (taskToRestore, popUpDiv, indexOfCompletedTask) => {
  const selectedProject = document.querySelector("#project-title").textContent;
  const projects = JSON.parse(localStorage.getItem("Projects"));
  const indexofSelectedProject = projects.findIndex(
    (project) => project.title == selectedProject
  );
  const project = projects[indexofSelectedProject];
  project.tasks.splice(indexOfCompletedTask, 0, taskToRestore);
  localStorage.setItem("Projects", JSON.stringify(projects));

  popUpDiv.remove();
  displayTasksInProject(selectedProject);
};

export default createPopUpDiv;
