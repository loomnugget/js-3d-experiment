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
  this.x = this.x - v2.x;
  this.y = this.y - v2.y;
  this.z = this.z - v2.z;
  return new Vector3D(this.x, this.y, this.z);
};

Vector3D.prototype.divide = function(v2) {
  this.x = this.x/v2.x;
  this.y = this.y/v2.y;
  this.z = this.z/v2.z;
  return new Vector3D(this.x, this.y, this.z);
};

Vector3D.prototype.cross = function(v2) {
  this.x = this.y * v2.z - this.z * v2.y;
  this.y = this.z * v2.x - this.x * v2.z;
  this.z = this.x * v2.y - this.y * v2.x;
  return new Vector3D(this.x, this.y, this.z);
};

Vector3D.prototype.dot = function(v2) {
  return (this.x * v2.x) + (this.y * v2.y) + (this.z * v2.z);
};

Vector3D.prototype.length = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
},

Vector3D.prototype.normalize = function() {
  let len = this.length();
  let ilen = 1/len;
  return new Vector3D(this.x*ilen, this.y*ilen, this.z*ilen);
};

Vector3D.transformCoordinates = function(point, transform) {
  point.x = (point.x * transform.m[0]) + (point.y * transform.m[4]) + (point.z * transform.m[8]) + transform.m[12];
  point.y = (point.x * transform.m[1]) + (point.y * transform.m[5]) + (point.z * transform.m[9]) + transform.m[13];
  point.z = (point.x * transform.m[2]) + (point.y * transform.m[6]) + (point.z * transform.m[10]) + transform.m[14];
  point.w = (point.x * transform.m[3]) + (point.y * transform.m[7]) + (point.z * transform.m[11]) + transform.m[15];
  return new Vector3D(point.x / point.w, point.y / point.w, point.z / point.w);
};
