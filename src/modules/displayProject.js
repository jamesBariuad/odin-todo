const displayProjectTasks = () => {

    const projectContainer = document.createElement('div')
    projects = JSON.parse(localStorage.getItem('projects'))
    for (let i=0;i<projects.length;i++){
        if(projects[i].projectName==titleWeLookFor){
            displayTasksInProject(projects[i])
        }
    }

}
//key: "projecst"   [{title:'project title', tasks:[{name:task1, description:'task description',due date:123123, priority: '', date created}] }]
const displayTasksInProject = (project)=>{
    for (let i = 0; i < array.length; i++) {
        project.tasks[i]
        
    }
}