const addProject= () => {
    const projectName = document.querySelector('#input-project-name').value
    console.log(projectName)
    if(!projectName){
        return alert('please input project name')
        
    }
}

export default addProject