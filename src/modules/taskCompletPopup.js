import displayTasks from "./displayTasks";
import { handleTodayClick, handleWeekClick } from "./sidebarHandleClicks";

const createPopUpDiv = (taskCompleted,type) => {
  document.querySelector("main-content");
  const popUpDiv = document.createElement("div");
  popUpDiv.id = "pop-up";
  popUpDiv.textContent = `1 task completed!   `;

  const span = document.createElement("span");
  span.textContent = "undo";
  span.addEventListener("click", () => handleUndo(taskCompleted, popUpDiv, type));
  popUpDiv.append(span);

  setTimeout(() => {
    popUpDiv.remove();
  }, 2000);
  document.body.append(popUpDiv);
};

const handleUndo = (taskCompleted, popUpDiv,type) => {
  const taskToRestore = JSON.parse(taskCompleted);
  localStorage.setItem(taskToRestore.title, taskCompleted);


  if (!type){
    displayTasks();
  } else if(type=='today'){
    handleTodayClick()
  } else if(type == 'week'){
    handleWeekClick()
  }
  popUpDiv.remove();
};

export default createPopUpDiv;
