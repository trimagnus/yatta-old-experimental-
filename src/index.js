import './main.css';
import {database} from './database.js';
import {view} from './view.js';

//Initial load - check for existing saved data or load default
// NOTE: On any create, update, or delete action save data to localstorage
database.init();

//App view - On initial load
//  shows all projects, number of todos in each
//    request all projects by title, number of todos, and unique id
//  can delete projects
//  can create projects
//    get a name for the project and add (if no name, dont add)
//    then open the project
const loadAppView = () => {
  view.drawAppView(database.getAppViewData());

  document.getElementById('newProjectButton').addEventListener('click', () => {
    let name = prompt("Name for the list?", "Unnamed List");
    //Check for valid name and sanitize the input!
    if(name) {
      database.createNewProject(name);
      loadAppView();
    }
  })

  const items = document.getElementsByClassName('project-title-link');
  [...items].forEach(item => {
    item.addEventListener('click', () => {
      loadProjectView(item.dataset.parentid)
    });
  });
};

//Project view - When clicking on a project
//  shows all todos for the project in simple form
//    requests all todos by project id, gets todo description, due date, and unique id
//  can edit project name
//  can delete todos
//    sets flag in the click handler
//  can create todos
//    get a name for the todo and add (if no name, dont add)
//    todo to project and open the todo
const renameProjectEvent = (e) => {
  const uid = e.target.dataset.parentid;
  let name = prompt("Name for the list?", database.getProjectName(uid));
  if(name) {
    database.renameProject(uid, name);
    loadProjectView(uid);
  }
};

const cleanupProjectEvent = (e) => {
  const okay = confirm('Remove completed todos from this project?');
  if(!okay) return;
  database.cleanupTodos(e.target.dataset.parentid);
  loadProjectView(e.target.dataset.parentid);
};

const deleteProjectEvent = (e) => {
  const uid = e.target.dataset.parentid;
  const okay = confirm('Are you sure you want to delete this list?');
  if(!okay) return;
  database.deleteProject(uid);
  loadAppView();
};

const toggleTodoEvent = (e) => {
  let checked = e.currentTarget.dataset.checked;
  if(checked === "false") {
    checked = "true";
  } else {
    checked = "false";
  }
  e.currentTarget.dataset.checked = checked;
  database.updateTodo(e.currentTarget.dataset.uid, 'checked', checked);
};

const loadProjectView = (uid) => {
  view.drawProjectView(database.getProjectViewData(uid));
  document.getElementById('project-back-button').addEventListener('click', (e)=>{
    loadAppView();
  });
  document.getElementById('project-rename-button').addEventListener('click', renameProjectEvent);
  document.getElementById('project-cleanup-button').addEventListener('click', cleanupProjectEvent);
  document.getElementById('project-delete-button').addEventListener('click', deleteProjectEvent);
  const todos = document.querySelectorAll('[data-checked]');
  [...todos].forEach(todo => {
    todo.addEventListener('click', toggleTodoEvent);
  });
  document.getElementById('newTodoButton').addEventListener('click', () => {
    let name = prompt("Name for the todo?", "Unnamed Todo");
    //Check for valid name and sanitize the input!
    if(name) {
      database.createNewTodo(uid, name);
      loadProjectView(uid);
    }
  });
};


//TODO view - When clicking on a todo
//  shows all todo data
//    requests all todo data by unique id
//  can edit the todo data

//Click handler - Route all click requests through the handler
//  Can set edit and delete modes in the handler

loadAppView();