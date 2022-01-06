let defaultData = {
  maxProjectUID: '2',
  maxTodoUID: '7',
  projects: [
    {
      uid: '1',
      title: 'Default Project',
      color: '#ffffff'
    },
    {
      uid: '2',
      title: 'Groceries',
      color: '#ffffff'
    }
  ],
  todos: [
    {
      parentID: '1',
      uid: '1',
      content: 'Learn to do Todo',
      checked: 'true'
    },
    {
      parentID: '1',
      uid: '2',
      content: 'Learn to do other things too',
      checked: 'true'
    },
    {
      parentID: '2',
      uid: '3',
      content: 'Apples',
      checked: 'false'
    },
    {
      parentID: '2',
      uid: '4',
      content: 'Bananas',
      checked: 'false'
    },
    {
      parentID: '2',
      uid: '5',
      content: 'Cake',
      checked: 'false'
    },
    {
      parentID: '2',
      uid: '6',
      content: 'Donuts',
      checked: 'true'
    },
    {
      parentID: '2',
      uid: '7',
      content: 'Eggs',
      checked: 'true'
    }
  ]
}

export const database = (() => {
  const DEFAULT_COLOR = '#ffffff';
  let database;

  const init = () => {
    //If not saved data, use default
    //  Save the default project to localstorage
    database = defaultData;
  };

  const _generateProjectUID = () => {
    const newUID = Number(database.maxProjectUID) + 1;
    database.maxProjectUID = String(newUID);
    return newUID;
  };

  const _generateTodoUID = () => {
    const newUID = Number(database.maxTodoUID) + 1;
    database.maxTodoUID = String(newUID);
    return newUID;
  };

  const getAppViewData = () => {
    let returnData = [];
    for(let project of database.projects) {
      let completed = database.todos.filter(todo => todo.parentID === project.uid)
                        .every(todo => todo.checked === "true");
      const todoCount = defaultData.todos.reduce((prev, next) => {
        if(next.parentID === project.uid ) prev++;
        return prev;
      }, 0);
      if(todoCount === 0) completed = false;
      returnData.push([project, todoCount, completed])
    }
    return returnData;
  };

  const getProjectViewData = (uid) => {
    const projectData = database.projects.find(project => project.uid === uid);
    const todoData = database.todos.filter(todo => todo.parentID === uid);
    return [projectData, todoData];
  };

  const getTodoViewData = (uid) => {
    return database.todos.find(todo => todo.uid === uid);
  };

  const _findProjectIndex = (uid) => {
    return database.projects.findIndex(project => project.uid === uid);
  };

  const createNewProject = (name) => {
    //Need way to create new UID numbers
    let newList = {
      title: name,
      color: DEFAULT_COLOR,
      uid: _generateProjectUID()
    }
    database.projects.push(newList);
    //Save this new data to local storage!!!
  };

  const getProjectName = (uid) => {
    const index = _findProjectIndex(uid);
    return database.projects[index].title;
  };

  const renameProject = (uid, name) => {
    const index = _findProjectIndex(uid);
    database.projects[index].title = name;
    //SAVE THIS DATA, ETC...
  };

  const deleteProject = (uid) => {
    const index = _findProjectIndex(uid);
    //SAVE THIS DATA TO LOCAL STORAGE!!!
    database.projects.splice(index, 1);
  };

  const createNewTodo = (parentID, content) => {
    let newTodo = {
      parentID: parentID,
      content: content,
      uid: _generateTodoUID(),
      checked: false
    };
    database.todos.push(newTodo);
  };

  const getTodo = (uid) => {
    return database.todos.find(todo => todo.uid === uid);
  };

  const cleanupTodos = (uid) => {
    let dirty = database.todos
      .filter(todo => todo.parentID === uid)
      .filter(todo => todo.checked === "true");
    for(const todo of dirty) {
      const index = database.todos.findIndex(_todo => _todo.uid === todo.uid);
      database.todos.splice(index, 1);
    }
  }

  const updateTodo = (uid, field, value) => {
    let index = database.todos.findIndex(todo => todo.uid === uid);
    database.todos[index][field] = value;
  }

  const deleteTodo = (uid) => {
    let index = database.todos.findIndex(todo => todo.uid === uid);
    database.todos.splice(index, 1);
  };

  return {
    init,
    getAppViewData,
    getProjectViewData,
    getTodoViewData,
    createNewProject,
    getProjectName,
    renameProject,
    deleteProject,
    createNewTodo,
    updateTodo,
    getTodo,
    cleanupTodos,
    deleteTodo,
  }
})();