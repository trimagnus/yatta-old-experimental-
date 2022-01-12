export const view = (() => {
  const content = document.getElementById('content');

  const _showHeader = () => {
    const h = `
    <header>
      <div class="headerContainer">
        <div class="logoContainer">
          <h1>Yatta</h1>
          <h2>Yet another todo tracking app</h2>
        </div>
        <div class="mainMenuContainer" id="mainMenu">☰</div>
      </div>
    </header>
    `;
    return h;
  };

  const _makeProjectSelectorOption = (project) => {
    return `<option data-uid="${project.uid}" value="$project.title">${project.title}</option>`;
  };

  const _showProjectSelector = (data) => {
    return `
      <div class="projectControls">
        <select class="projectSelector" id="projectSelector">
          ${data.projects.map(project => _makeProjectSelectorOption(project)).join('')}
        </select>
        <button title="Add New Project" id="newProjectButton">+</button>
        <button title="Delete Project" id="deleteProjectButton">-</button>
      </div>`;
  };

  const _makeTodo = (data, index) => {
    return `
    <li data-index="${index}" class="todoItem">
      <div class="todoCheckbox ${data.checked ? 'checked':''}"></div>
      <div class="todoTitle ${data.checked ? 'checked':''}">${data.title}</div>
    </li>`
  };

  const _showTodos = (data, uid) => {
    const currentProject = data.projects.find(p => p.uid === uid);
    if(!currentProject) return;
    return `${currentProject.todos.map((todoData,index) => _makeTodo(todoData, index)).join('')}`;
  };

  const _showContent = (data, uid) => {
    return `
    ${_showHeader()}
    <main>
      ${_showProjectSelector(data)}
      <ul class="todoItemsContainer ${data.projects.length === 0 ? 'hide' : ''}" id="todoItems" data-uid="${uid}}">
        ${_showTodos(data, uid)}
      </ul>
      <div id="addTodoButton" class="addItemButton ${data.projects.length === 0 ? 'hide' : ''}">+ Add Item</div>
    </main>
    `;
  };

  const switchProject = (data, uid) => {
    document.getElementById('todoItems').dataset.uid = uid;
    document.getElementById('todoItems').innerHTML = _showTodos(data, uid);
  };

  const showPage = (data, uid) => {
    content.innerHTML = _showContent(data, uid);
  };

  const _overlay = (contents) => {
    const ov = document.createElement('div');
    ov.classList.add('overlay');
    ov.id = 'overlay';
    ov.innerHTML = `
    <div class="overlayFormContainer">
      ${contents}
    </div>
    `;
    content.appendChild(ov);
  };

  const closeOverlay = () => {
    content.removeChild(document.getElementById('overlay'));
  };

  const newProjectDialogue = () => {
    let content = `
    <div>New Project Dialogue</div>
    `;
    _overlay(content);
  };

  const newTodoDialogue = () => {
    let dialogue = `
    <h2 class="newTodoHeader">New Todo</h2>
    <input class="newTodoInput" type="text">
    <div class="newTodoControls">
      <button id="newTodoAcceptButton">Ok</button>
      <button id="newTodoCancelButton">Cancel</button>
    </div>
    `;
    _overlay(dialogue);
  };
  
  const todoDialogue = (data) => {
  };

  return {
    showPage,
    todoDialogue,
    newProjectDialogue,
    newTodoDialogue,
    switchProject,
    closeOverlay
  };
})();