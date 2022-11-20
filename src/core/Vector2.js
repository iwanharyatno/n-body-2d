export default class Vector2 {
  constructor(x=0, y=0) {
    this.x = x;
    this.y = y;
  }

  get magnitude() {
    return Math.sqrt(this.x*this.x + this.y*this.y);
  }

  get normalized() {
    return new Vector2(
      this.x / this.magnitude,
      this.y / this.magnitude
    );
  }

  equals(otherVector) {
    return this.x == otherVector.x && this.y == otherVector.y;
  }

  add(otherVector) {
    this.x += otherVector.x;
    this.y += otherVector.y;
  }

  distanceTo(otherVector) {
    const distance = new Vector2();

    distance.x = Math.abs(otherVector.x - this.x);
    distance.y = Math.abs(otherVector.y - this.y);

    return distance.magnitude;
  }

  multiplyScalar(scalar) {
    this.x *= scalar;
    this.y *= scalar;
  }
}
