const data = {
  todos: [
    {
      uid: '1',
      title: 'I am a todo item',
    },
    {
      uid: '2',
      title: 'I am another todo item',
    },
    {
      uid: '3',
      title: 'I am a banana',
    },
  ],
};

export default (function() {
  function getData() {
    return data;
  }

  function deleteTodo(uid) {
    const index = data.todos.findIndex(todo => todo.uid === uid);
    data.todos.splice(index, 1);
  }

  function addTodo(todoData) {
    data.todos.push(todoData);
  }
  return {getData, addTodo, deleteTodo};
})();