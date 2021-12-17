import './main.css';
import displayProjects from './displayProjects';
import displayHeader from './displayHeader';
import data from './data.js';

const content = document.getElementById('content');
displayHeader(content);

const projects = document.createElement('div');
projects.classList.add('projects-container');
content.appendChild(projects);
displayProjects(projects, data);

document.getElementById('add-project-button').addEventListener('click', ()=>{
  const p = prompt('Enter the project name:');
  if(p) {
    projects.innerHTML = '';
    data.projects.push({
      title: p,
      todos: []
    });
    displayProjects(projects, data);
  }
})