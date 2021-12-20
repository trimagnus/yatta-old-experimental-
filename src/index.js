import './main.css';
import {database} from './database.js';

const content = document.getElementById('content');

//Initial load - check for existing saved data or load default
let data = database.getAppViewData();

// On any create, update, or delete save data to localstorage

//App view - On initial load
//  shows all projects, number of todos in each
//    request all projects by title, number of todos, and unique id
//  can delete projects
//  can create projects
//    get a name for the project and add (if no name, dont add)
//    then open the project

//Project view - When clicking on a project
//  shows all todos for the project in simple form
//    requests all todos by project id, gets todo description, due date, and unique id
//  can edit project name
//  can delete todos
//    sets flag in the click handler
//  can create todos
//    get a name for the todo and add (if no name, dont add)
//    todo to project and open the todo

//TODO view - When clicking on a todo
//  shows all todo data
//    requests all todo data by unique id
//  can edit the todo data

//Click handler - Route all click requests through the handler
//  Can set edit and delete modes in the handler