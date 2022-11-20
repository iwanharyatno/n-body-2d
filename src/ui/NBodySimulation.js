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

    const controls = document.createElement('div');
    controls.setAttribute('class', 'flex justify-evenly items-center w-full mt-4');
    controls.innerHTML = `
    <button type="button" class="py-2 px-4 rounded border-none bg-blue-500 text-white focus:bg-blue-700 w-1/3" id="replay-button">Run With</button>
    <input type="number" id="bodies-count" name="Bodies Count" aria-labelledby="replay-button" class="p-2 rounded border focus:outline focus:outline-blue-700 w-1/3" value="100">
    <span class="w-16">Bodies</span>
    `;
    container.appendChild(controls);

    this.energyDisplay = document.createElement('div');
    this.energyDisplay.setAttribute('class', 'grid grid-cols-2 gap-3 place-items-center p-4 mt-4');

    container.appendChild(this.energyDisplay);

    const replayButton = controls.querySelector('#replay-button');
    const bodiesCountInput = controls.querySelector('#bodies-count');

    replayButton.addEventListener('click', () => this.generateBodies(bodiesCountInput.value));
    bodiesCountInput.addEventListener('change', () => this.generateBodies(bodiesCountInput.value));

    this.appendChild(container);

    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;

    this.generateBodies();
  }

  generateBodies(count=100) {
    this.bodies = [];

    for(let i=0; i < count; i++) {
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

    let PE = 0;
    let KE = 0;

    for (const body of this.bodies) {
      this.drawBody(body);
      body.move(this.bodies);

      PE += body.potentialEnergy;
      KE += body.kineticEnergy;
    }

    KE = Math.round(KE / 1e9);
    PE = Math.round(PE);

    this.energyDisplay.innerHTML = `
    <div class="font-bold">KE</div>
    <div>${KE}</div>
    <div class="font-bold">PE</div>
    <div>${PE}</div>
    <div class="font-bold">Total</div>
    <div>${KE + PE}</div>
    `;
  }

  drawBody(body) {
    this.ctx.fillStyle = '#ffffff';
    this.ctx.beginPath();
    this.ctx.arc(body.position.x, body.position.y, 2, 0, 2 * Math.PI);
    this.ctx.fill();
  }
}

customElements.define('n-body-simulation', NBodySimulation);
