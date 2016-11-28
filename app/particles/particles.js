'use strict';

const Vector3D = require('../math/vector3d.js');

const Particle = function(position, velocity) {
  this.position = position;
  this.velocity = velocity;
};

const Emitter = function(point, velocity, spread) {
  this.position = point;
  this.velocity = velocity;
  this.spread = spread || Math.PI / 32;
};

Emitter.prototype.emitParticle = function() {
  this.angle = this.velocity.getAngle() + this.spread - (Math.random() * this.spread * 2);
  this.magnitude = this.velocity.getMagnitude();
  this.position = new Vector3D(this.position.x, this.position.y, this.position.z);
  this.velocity = Vector3D.fromAngle(this.angle, this.magnitude);
  
  return new Particle(this.position, this.velocity);
};
