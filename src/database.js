export const database = (() => {
  let data = {
    projects: [
      {
        title: 'Project 1',
        uid: 111,
        todos: [
          {
            title: 'Apples',
            checked: true,
            date: '0',
          },
          {
            title: 'Bananas',
            checked: false,
            date: '0',
          },
          {
            title: 'Cookies',
            checked: false,
            date: '0',
          },
        ]
      },
      {
        title: 'Project Zero',
        uid: 666,
        todos: [
          {
            title: 'Lorem Ipsum Mofo',
            checked: false,
            date: '0',
          },
          {
            title: 'Fake Data',
            checked: false,
            date: '0',
          },
          {
            title: 'Fake Data',
            checked: false,
            date: '0',
          },
        ]
      }
    ],
  };

  const _getProjectByUID = (uid) => {
    return data.projects.find(p => p.uid === uid);
  };

  const checkTodo = (uid, index) => {
    const todo = _getProjectByUID(uid).todos[index];
    if(todo.checked) {
      todo.checked = false;
      return false;
    } else {
      todo.checked = true;
      return true;
    }
  };

  const addNewTodo = (uid, title) => {
    const todo = {
      title: title,
      checked: false,
      date: '0'
    }
    _getProjectByUID(uid).todos.push(todo);
  };

  const deleteProject = (uid) => {
    const index = data.projects.findIndex(p => p.uid === uid);
    data.projects.splice(index, 1);
  };

  const getFirstProjectUID = () => {
    if(data.projects.length === 0) return -1;
    return data.projects[0].uid;
  };

  return {
    data,
    checkTodo,
    addNewTodo,
    deleteProject,
    getFirstProjectUID,
  }
})();