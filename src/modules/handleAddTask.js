import { createMainContent } from "./layout";

export default function handleAddTask() {
  const addTaskDiv = document.querySelector(".add-task");
  let priority = "";
  let date = "";

  const createTaskForm = () => {
    const taskForm = document.createElement("div");
    taskForm.id = "task-form";

    const createTasknameField = () => {
      const taskName = document.createElement("div");
      taskName.setAttribute("contentEditable", "true");
      taskName.setAttribute("data-text", "Task Name");
      return taskName;
    };

    const createDescriptionField = () => {
      const taskDescription = document.createElement("div");
      taskDescription.setAttribute("contentEditable", "true");
      taskDescription.setAttribute("data-text", "Task Description");
      return taskDescription;
    };

    const createDeadlineField = () => {
      const dueDateDiv = document.createElement("div");
      dueDateDiv.textContent = "Due Date:";
      const dueDate = document.createElement("input");
      dueDate.setAttribute("type", "date");
      const handleDateChange = (e) => {
        console.log(e.target.value);
        date = e.target.value;
      };
      dueDate.addEventListener("change", (e) => handleDateChange(e));
      dueDateDiv.append(dueDate);
      return dueDateDiv;
    };

    const createPriorityField = () => {
      const priorityDiv = document.createElement("div");
      priorityDiv.textContent = "Priority:";

      const low = document.createElement("button");
      const medium = document.createElement("button");
      const high = document.createElement("button");
      low.textContent = "low";
      medium.textContent = "medium";
      high.textContent = "high";

      const handlePriorityClick = (e) => {
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
      const taskName = document.querySelector(`[data-text="Task Name"]`);
      const taskDescription = document.querySelector(
        `[data-text="Task Description"]`
      );
      console.log(
        taskName.textContent,
        taskDescription.textContent,
        date,
        priority
      );
    };

    const createSubmitButton = () => {
      const submit = document.createElement("button");
      submit.textContent = "submit";
      submit.addEventListener("click", handleSubmit);
      return submit;
    };

    const createCancelButton = () => {
      const cancel = document.createElement("button");
      const mainContent = document.querySelector('#main-content')
      const newContent = createMainContent()
      cancel.textContent = "cancel";
      cancel.addEventListener("click", ()=>mainContent.replaceWith(newContent));
      return cancel;
    };

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
  };

  return createTaskForm();
}
