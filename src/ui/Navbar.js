class AppBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <nav class="shadow-md bg-blue-500 p-4 text-white d-flex justify-content-between font-bold ${this.getAttribute('class')}">
      <h1 class="text-2xl">N Body 2D</h1>
    </nav>
    `;
  }
}

customElements.define('app-bar', AppBar);
