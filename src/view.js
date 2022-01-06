export const view = (() => {
  const content = document.getElementById('content');

  const _headerTemplate = () => {
    return `<header>
              <h1 class="site-logo">Yatta</h1>
              <h3 class="site-subheader">(Yet Another Todo Tracking App)</h3>
            </header>`;
  };

  const _projectListItemTemplate = (data) => {
    const [pData, count, complete] = data;
    return `
    <li class="project-li ${complete?'project-complete':''}" data-uid=${pData.uid}>
      <div class="project-title-link" data-parentid="${pData.uid}">
        <span style="background-color:${pData.color}" class="project-circle-indicator"></span>
        <span class="project-title">${pData.title}</span>
        <span class="project-item-count">(${count})</span>
      </div>
    </li>`;
  };

  const drawAppView = (data) => {
    content.innerHTML = `
    ${_headerTemplate()}
    <div class="projects-container">
      <ul class="projects">
        ${data.map(pData => _projectListItemTemplate(pData)).join('')}
        <li class="project-li" id="newProjectButton">+ Add List</li>
      </ul>
    </div>`;
  };

  const drawProjectView = (data) => {
    const [projectData, todoData] = data;
    content.innerHTML = `
      ${_headerTemplate()}
      <nav class="project-nav">
        <button id="project-back-button"></button>
        <button data-parentid=${projectData.uid} id="project-rename-button">Rename</button>
        <button data-parentid=${projectData.uid} id="project-cleanup-button">Clean-up</button>
        <button data-parentid=${projectData.uid} id="project-delete-button">Delete</button>
      </nav>
      <div class="todo-list-container">
        <h2>${projectData.title}</h2>
        <ul data-uid=${projectData.uid} class="todo-list">
          ${todoData.map(todo => `
            <li data-checked=${todo.checked} data-uid=${todo.uid} class="todo-item">
              <span class="todo-checkbox"></span>
              <span class="checkable-item">${todo.content}</span>
            </li>`
          ).join('')}
          <li class="todo-item" id="newTodoButton">+ Add Item</li>
        </ul>
      </div>
    `;
  };

  return {
    drawAppView,
    drawProjectView
  };
})();