let defaultData = {
  projects: [
    {
      uniqueID: 1,
      title: 'Default Project'
    }
  ],
  todos: [
    {
      parentID: 1,
      uniqueID: 1,
      title: 'Default todo',
      content: 'Learn to do Todo'
    },
    {
      parentID: 1,
      uniqueID: 2,
      title: 'Secret todo',
      content: 'Learn to do Todo'
    }
  ]
}

export const database = (() => {
  let database = defaultData;

  const getAppViewData = () => {
    //If not saved data, send back default
    //  Save the default project to localstorage
    let returnData = [];
    for(let project of database.projects) {
      const todoCount = defaultData.todos.reduce((prev, next)=>{
        if(next.parentID === project.uniqueID) prev++;
        return prev;
      }, 0)
      returnData.push([project.uniqueID, project.title, todoCount])
    }
    return returnData;
  };

  const getProjectViewData = (id) => {
    let projectData;
    for(let project of database.projects) {
      if(project.uniqueID === id) projectData = project;
    }
    let todoData = database.todos.filter((todo) => {
      if(todo.parentID === id) return true;
    });
    return [projectData, todoData];
  };

  const getTodoViewData = (id) => {
    for(let todo of database.todos) {
      if(todo.uniqueID === id) return todo;
    }
  };

  return {
    getAppViewData,
    getProjectViewData,
    getTodoViewData,
  }
})();