import { displayTasksInProject } from "./displayProject";
import createPopUpDiv from "./popUpForProjecTasksDone";

const createCheckbox = () => {
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";

  checkBox.addEventListener("click", (e) => handleCheckboxClick(e));
  return checkBox;
};

const handleCheckboxClick = (e) => {
  const projectTitle = document.querySelector("#project-title").textContent;
  const taskCompletedTitle = e.target.parentElement.id;

  const projects = JSON.parse(localStorage.getItem("Projects"));

  const indexofSelectedProject = projects.findIndex(
    (project) => project.title == projectTitle
  );

  const project = projects[indexofSelectedProject];

  const indexofSelectedTask = project.tasks.findIndex(
    (task) => task.title == taskCompletedTitle
  );
  const taskToRestore = project.tasks[indexofSelectedTask];

  project.tasks.splice(indexofSelectedTask, 1);
  localStorage.setItem("Projects", JSON.stringify(projects));

  displayTasksInProject(projectTitle);
  createPopUpDiv(taskToRestore, indexofSelectedTask);
};

export default createCheckbox;
