'use strict';

const Vector3D = require('../math/vector3d.js');

let maxParticles = 5, particles = {}, particleIndex = 0, maxLife = 250;
let centerX, centerY = 100;

function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min - 1)) + min;
}

const Bounds = function() {
  this.left = new Vector3D(centerX + 500, centerY, 0);
  this.right = new Vector3D(centerX - 500, centerY, 0);
  this.top = new Vector3D(centerX, centerY + 500, 0);
  this.bottom = new Vector3D(centerX, centerY- 500, 0);
};

const Particle = function(position, velocity) {
  this.position = new Vector3D(randomRange(-10,10), randomRange(-10,10), randomRange(0,10));
  this.velocity = new Vector3D(0, 0, -1);
  this.acceleration = new Vector3D(0, 0, 0);
  this.bounce = -0.7;
  this.radius = 2;
  particleIndex ++;
  particles[particleIndex] = this;
  this.id = particleIndex;
  this.life = 0;
  this.angle = .05;
};

Particle.prototype.move = function() {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
};
