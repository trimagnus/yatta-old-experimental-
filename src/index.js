import './main.css';
import {database} from './database.js';
import {view} from './view.js';
import {events} from './events.js';

// let uid = Number(database.data.lastOpenProjectId);
// if(uid === 0) uid = database.data.projects[0].uid;

view.showPage(database.data, 111);
events.attachPageEvents();
events.attachTodoEvents();