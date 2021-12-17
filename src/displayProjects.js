const todoClickHandler = (e) => {
  const p = e.target.parentElement;
  p.classList.toggle('complete-todo');
};

export default function displayProjects(content, DATA) {
  for(const proj of DATA.projects) {
    const project = document.createElement('div');
    project.classList.add('project');
  
    const title = document.createElement('h2');
    title.classList.add('expand-toggle', 'expand-toggle-expanded');
    title.innerText = proj.title;
    project.appendChild(title);
  
    const expandContainer = document.createElement('div');
    expandContainer.classList.add('expand-container');
    project.appendChild(expandContainer);
  
    const list = document.createElement('ul');
    list.classList.add('expand-contract', 'expanded');
    expandContainer.appendChild(list);
  
    for(const todo of proj.todos) {
      const li = document.createElement('li');
      li.innerHTML = `<input type="checkbox" class="todo-checkbox">${todo.text}`;
      li.addEventListener('click', (e) => {
        e.target.classList.toggle('completed-todo');
        const fc = e.target.firstChild;
        fc.checked = !fc.checked;
      });
      li.firstChild.addEventListener('click', (e) => {
        const p = e.target.parentElement;
        p.classList.toggle('completed-todo');
        e.stopPropagation();
      });
  
      if(todo.date) {
        //Do something with the date
        console.log();
      }
  
      if(todo.completed) {
        li.classList.add('completed-todo');
      }
  
      list.appendChild(li);
    }
    content.appendChild(project);
    title.addEventListener('click', () => {
      list.classList.toggle('expanded');
      title.classList.toggle('expand-toggle-collapsed');
      title.classList.toggle('expand-toggle-expanded');
    })
  }
}