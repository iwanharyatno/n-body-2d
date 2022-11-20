import Vector2 from './Vector2';
import Constants from '../constants';

import { scaleMass } from '../helpers';

export default class Body {
  constructor(position) {
    this.position = position ?? new Vector2();
    this.velocity = new Vector2();
    this.mass = scaleMass(5.972e24);
  }

  move(bodies=[]) {
    this.position.add(this.velocity);

    this.potentialEnergy = 0;
    bodies.forEach(otherBody => {
      if (this.position.equals(otherBody.position)) return;
      if (this.position.distanceTo(otherBody.position) < 5) return;

      const r = this.position.distanceTo(otherBody.position);
      const accelerationDirection = new Vector2(
        otherBody.position.x - this.position.x,
        otherBody.position.y - this.position.y
      ).normalized;

      const acceleration = (Constants.G * otherBody.mass) / (r*r);
      accelerationDirection.multiplyScalar(acceleration);

      this.velocity.add(accelerationDirection);
    });
  }
}
