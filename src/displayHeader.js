export default function displayHeader(parent) {
  parent.innerHTML = `
  <header>
    <h1>YATTA</h1>
    <nav>
      <div class="nav-buttons">
        <button id="add-project-button">Add Project</button>
        <button id="delete-project-button">Delete Project</button>
      </div>
    </nav>
  </header>
  `;
}