import template from "./modules/layout";
import "./assets/css/layout.css";
import "./assets/css/handleAddTask.css";
import './assets/css/taskCompletePopup.css'
import displayTasks from "./modules/displayTasks";
import { displayProjectNamesInSidebar } from "./modules/displayProject";
import handleHomeClick from "./modules/sidebarHandleClicks";


template()
// handleHomeClick()
displayTasks()
displayProjectNamesInSidebar()