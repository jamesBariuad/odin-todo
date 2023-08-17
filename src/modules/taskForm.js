import { createAddtaskDiv } from "./layout";
import taskFactory from "./taskFactory";
import displayTasks from "./displayTasks";

export default function createTaskForm() {
  const addTaskDiv = document.querySelector(".add-task");
  const taskForm = document.createElement("div");
  taskForm.id = "task-form";

  taskForm.append(
    createTasknameField(),
    createDescriptionField(),
    createDeadlineField(),
    createPriorityField(),
    createSubmitButton(),
    createCancelButton()
  );
  addTaskDiv.replaceWith(taskForm);

  return addTaskDiv;
}

export const createTasknameField = () => {
  const taskName = document.createElement("div");
  taskName.setAttribute("contentEditable", "true");
  taskName.setAttribute("data-text", "Task Name");
  return taskName;
};

export const createDescriptionField = () => {
  const taskDescription = document.createElement("div");
  taskDescription.setAttribute("contentEditable", "true");
  taskDescription.setAttribute("data-text", "Task Description");
  return taskDescription;
};

export const createDeadlineField = () => {
  let date = "";
  const dueDateDiv = document.createElement("div");
  dueDateDiv.textContent = "Due Date:";
  const dueDate = document.createElement("input");
  dueDate.setAttribute("type", "date");
  const handleDateChange = (e) => {
    date = e.target.value;
  };
  dueDate.addEventListener("change", (e) => handleDateChange(e));
  dueDateDiv.append(dueDate);
  return dueDateDiv;
};

export const createPriorityField = () => {
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
    if (e.target.innerText == "low") {
      low.classList.add("active-button");
    } else if (e.target.innerText == "medium") {
      medium.classList.add("active-button");
    } else {
      high.classList.add("active-button");
    }
    priority = e.target.innerText;
    return priority;
  };

  low.addEventListener("click", (e) => handlePriorityClick(e));
  medium.addEventListener("click", (e) => handlePriorityClick(e));
  high.addEventListener("click", (e) => handlePriorityClick(e));
  priorityDiv.append(low, medium, high);
  return priorityDiv;
};

const handleSubmit = () => {
  const mainContent = document.querySelector("#main-content");
  const taskName = document.querySelector(`[data-text="Task Name"]`);
  const taskDescription = document.querySelector(
    `[data-text="Task Description"]`
  );
  const dueDate = document.querySelector('input[type="date"]');
  const priority = document.querySelector('button[class="active-button"]');
  let dueDateText = "";
  let priorityText = "";

  if (!taskName.innerHTML) {
    return alert("please fill Task Name field");
  }

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

  if (localStorage.getItem(`${taskName.innerHTML}`) !== null) {
    return alert(`Task ${taskName.innerHTML} already exist!`);
  }

  const dateAdded = new Date().toISOString();

  const newTask = taskFactory(
    `${taskName.textContent}`,
    `${taskDescription.textContent}`,
    `${dueDateText}`,
    `${priorityText}`,
    dateAdded
  );

  localStorage.setItem(`${taskName.textContent}`, JSON.stringify(newTask));

  mainContent.replaceChildren();
  displayTasks();
};

const createSubmitButton = () => {
  const submit = document.createElement("button");
  submit.textContent = "add";
  submit.addEventListener("click", handleSubmit);
  return submit;
};

export const createCancelButton = () => {
  const cancel = document.createElement("button");
  cancel.textContent = "cancel";
  cancel.addEventListener("click", () => {
    const newAddTaskDiv = createAddtaskDiv();
    const taskForm = document.querySelector("#task-form");
    taskForm.replaceWith(newAddTaskDiv);
  });
  return cancel;
};
