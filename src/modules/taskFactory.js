const taskFactory = (title, description, dueDate, priority,dateAdded ) => {
    return {title, description, dueDate, priority, dateAdded}
}

export default taskFactory