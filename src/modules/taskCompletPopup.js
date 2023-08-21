import displayTasks from "./displayTasks";

const createPopUpDiv = (taskCompleted) => {
  document.querySelector("main-content");
  const popUpDiv = document.createElement("div");
  popUpDiv.id = "pop-up";
  popUpDiv.textContent = `1 task completed!   `;

  const span = document.createElement("span");
  span.textContent = "undo";
  span.addEventListener("click", () => handleUndo(taskCompleted, popUpDiv));
  popUpDiv.append(span);

  setTimeout(() => {
    popUpDiv.remove();
  }, 2000);
  document.body.append(popUpDiv);
};

const handleUndo = (taskCompleted, popUpDiv) => {
  const taskToRestore = JSON.parse(taskCompleted);
  localStorage.setItem(taskToRestore.title, taskCompleted);
  displayTasks();
  popUpDiv.remove();
};

export default createPopUpDiv;
