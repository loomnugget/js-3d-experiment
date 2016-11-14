'use strict';

const Vector3D = module.exports = function(x,y,z) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
};

Vector3D.prototype.add = function (v2) {
  this.x = this.x + v2.x;
  this.y = this.y + v2.y;
  this.z = this.z + v2.z;
  return new Vector3D(this.x, this.y, this.z);
};

Vector3D.prototype.subtract = function (v2) {
  this.x = this.x/v2;
  this.y = this.y/v2;
  this.z = this.z/v2;
  return new Vector3D(this.x, this.y, this.z);
};

Vector3D.prototype.divide = function(v2) {
  return new Vector3D(this.x, this.y, this.z);
};

Vector3D.prototype.cross = function(v2) {
  this.x = this.y * v2.z - this.z * v2.y;
  this.y = this.z * v2.x - this.x * v2.z;
  this.z = this.x * v2.y - this.y * v2.x;
  return new Vector3D(this.x, this.y, this.z);
};

Vector3D.prototype.dot = function(v2) {
  return (this.x * v2.x + this.y * v2.y + this.z * v2.z);
};

Vector3D.prototype.length = function() {
  return Math.sqrt(this.dot(this));
},

Vector3D.transformCoordinates = function(transform) {
  this.x = (this.x * transform.matrix[0]) + (this.y * transform.matrix[4]) + (this.z * transform.matrix[8]) + transform.matrix[12];
  this.y = (this.x * transform.matrix[1]) + (this.y * transform.matrix[5]) + (this.z * transform.matrix[9]) + transform.matrix[13];
  this.z = (this.x * transform.matrix[2]) + (this.y * transform.matrix[6]) + (this.z * transform.matrix[10]) + transform.matrix[14];
  this.w = (this.x * transform.matrix[3]) + (this.y * transform.matrix[7]) + (this.z * transform.matrix[11]) + transform.matrix[15];
  return new Vector3D(this.x / this.w, this.y / this.w, this.z / this.w);
};

// Normalizing vectors makes their values be between -1 and 1
Vector3D.prototype.normalize = function() {
  return this.divide(this.length());
};
