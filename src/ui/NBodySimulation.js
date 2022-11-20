import Body from '../core/Body';

import { randomRange, scaleMass } from '../helpers';

class NBodySimulation extends HTMLElement {
  constructor() {
    super();

    const container = document.createElement('div');
    container.setAttribute('class', 'border border-slate-300 rounded p-4 m-5 max-w-md mx-auto');

    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('class', 'border mx-auto');
    this.canvas.width = 350;
    this.canvas.height = 350;

    this.ctx = this.canvas.getContext('2d');
    container.appendChild(this.canvas);

    this.appendChild(container);

    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;

    this.bodies = [];

    for(let i=0; i < 300; i++) {
      const body = new Body();
      body.position.x = randomRange(0, this.canvasWidth);
      body.position.y = randomRange(0, this.canvasHeight);

      body.mass = randomRange(scaleMass(7.347e22), scaleMass(5.972e24));

      this.bodies.push(body);
    }
  }

  connectedCallback() {
    this.draw();
  }

  draw() {
    requestAnimationFrame(() => this.draw());
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

    for (const body of this.bodies) {
      this.drawBody(body);
      body.move(this.bodies);
    }
  }

  drawBody(body) {
    this.ctx.fillStyle = '#ffffff';
    this.ctx.beginPath();
    this.ctx.arc(body.position.x, body.position.y, 2, 0, 2 * Math.PI);
    this.ctx.fill();
  }
}

customElements.define('n-body-simulation', NBodySimulation);
