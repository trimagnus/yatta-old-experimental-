import './main.css';
import database from './database.js';

const app = document.getElementById('content');

app.innerHTML = `
  <header></header>
  <main>
    <ul id="todos">
      ${database.getData().todos.map(todo => makeTodo(todo)).join('')}
    </ul>
    <div>
      <input type="text" id="addTodoInput" placeholder="Add a new todo!">
      <button data-action="addTodo">Submit</button>
    </div>
  </main>
`;

const eventController = (function() {
  const _listeners = {};

  const addListener = (actionName, callBack) => {
    _listeners[actionName] = callBack;
  };

  const handleClick = (event) => {
    const listeners = _listeners;
    const action = event.target.getAttribute('data-action');

    if (_listeners[action]) {
      _listeners[action](event);
    }
    console.log('hi')
  };

  return {
    addListener,
    handleClick
  };
})();

document.documentElement.addEventListener('click', eventController.handleClick, false);
eventController.addListener('deleteTodo', event_deleteTodo);
eventController.addListener('addTodo', event_addTodo)

function makeTodo(data) {
  return `
    <li data-todo-uid="${data.uid}" class="todo">
      <span class="checkbox" data-action="check"></span>
      <span class="todoTitle">${data.title}</span>
      <button id="deleteTodoButton" data-action="deleteTodo">X</button>
    </li>`;
}

function extractInputById(id) {
  const inp = document.getElementById(id);
  const val = inp.value;
  inp.value = '';
  return val;
}

function event_addTodo(e) {
  const val = extractInputById('addTodoInput');
  const todoData = {uid: val, title: val};

  database.addTodo(todoData);

  document.getElementById('todos').innerHTML += makeTodo(todoData);
}

function event_deleteTodo(e) {
  const todo = e.target.parentNode;
  database.deleteTodo(todo.dataset.todoUid);
  todo.remove();
}