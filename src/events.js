import {database} from './database.js';
import {view} from './view.js';

export const events = (() => {
  const _getCurrentProjectUID = () => {
    return Number(document.getElementById('todoItems').dataset.uid);
  };

  const newProjectEvent = () => {

  };

  const changeProjectEvent = (e) => {
    const index = e.target.selectedIndex;
    const uid = Number(e.target.children[index].dataset.uid);
    view.switchProject(database.data, uid);
    attachTodoEvents();
  };

  const deleteProjectEvent = () => {
    const uid = _getCurrentProjectUID();
    console.log(uid);
    database.deleteProject(uid);
    const nextUID = database.getFirstProjectUID();
    view.showPage(database.data, nextUID);
    attachPageEvents();
    attachTodoEvents();
  };

  const _checkboxClickEvent = (e) => {
    const p = e.target.parentNode;
    const uid = _getCurrentProjectUID();
    const index = Number(p.dataset.index);
    const checked = database.checkTodo(uid, index);
    if(checked) {
      p.firstElementChild.classList.add('checked');
      p.lastElementChild.classList.add('checked');
    } else {
      p.firstElementChild.classList.remove('checked');
      p.lastElementChild.classList.remove('checked');
    }
  };

  const _todoClickEvent = (e) => {
    const p = e.target.parentNode;
  
  };

  const attachTodoEvents = () => {
    const [...todos] = document.querySelectorAll('.todoItem');
    for(const todo of todos) {
      todo.firstElementChild.addEventListener('click', _checkboxClickEvent);
      todo.lastElementChild.addEventListener('click', _todoClickEvent);
    }
  };

  const attachPageEvents = () => {
    document.getElementById('projectSelector').addEventListener('change', changeProjectEvent);
    document.getElementById('newProjectButton').addEventListener('click', newProjectEvent);
    document.getElementById('deleteProjectButton').addEventListener('click', deleteProjectEvent);
    document.getElementById('addTodoButton').addEventListener('click', addTodoClickEvent);
  };

  const _closeOverlayEvent = (e) => {
    if(e.target.id !== 'overlay') return;
    view.closeOverlay();
  };

  const _acceptNewTodoEvent = () => {
    const title = document.querySelector('.newTodoInput').value;
    if(!title) {
      view.closeOverlay();
      return;
    }
    const uid = _getCurrentProjectUID();
    database.addNewTodo(uid, title);
    view.closeOverlay();
    view.switchProject(database.data, uid);
    attachTodoEvents();
  };

  const _cancelNewTodoEvent = () => {
    view.closeOverlay();
  };

  const addTodoClickEvent = (e) => {
    view.newTodoDialogue();
    document.getElementById('overlay').addEventListener('click', _closeOverlayEvent);

    const input = document.querySelector('.newTodoInput');
    input.addEventListener('keyup', (e) => {
      if(e.key === 'Enter') _acceptNewTodoEvent();
      if(e.key === 'Escape') _cancelNewTodoEvent();
    });
    input.focus();

    document.getElementById('newTodoAcceptButton').addEventListener('click', _acceptNewTodoEvent);
    document.getElementById('newTodoCancelButton').addEventListener('click', _cancelNewTodoEvent);
  };

  return {
    newProjectEvent,
    changeProjectEvent,
    deleteProjectEvent,
    attachTodoEvents,
    attachPageEvents,
    addTodoClickEvent,
  };
})();