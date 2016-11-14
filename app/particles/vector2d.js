'use strict';

const Vector2D = module.exports = function (x,y) {
  this.x = x || 0;
  this.y = y || 0;
};

Vector2D.prototype.add = function(vector) {
  this.x += vector.x;
  this.y += vector.y;
};

Vector2D.prototype.getMagnitude = function () {
  return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vector2D.prototype.getAngle = function () {
  return Math.atan2(this.y,this.x);
};

Vector2D.fromAngle = function (angle, magnitude) {
  return new Vector2D(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
};
