import Constants from './constants';

export function randomRange(min=0, max=1) {
  return Math.random() * (max - min) + min;
}

export function scaleLength(realLength) {
  return Constants.lengthScale * realLength;
}

export function scaleMass(realMass) {
  return Constants.massScale * realMass;
}
