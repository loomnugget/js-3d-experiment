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

Vector3D.prototype.length = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
};

Vector3D.prototype.normalize = function() {
  let len = this.length();
  let ilen = 1/len;
  return new Vector3D(this.x*ilen, this.y*ilen, this.z*ilen);
};

Vector3D.Cross = function(v1, v2) {
  let x = v1.y * v2.z - v1.z * v2.y;
  let y = v1.z * v2.x - v1.x * v2.z;
  let z = v1.x * v2.y - v1.y * v2.x;
  return new Vector3D(x, y, z);
};

Vector3D.Dot = function(v1, v2) {
  return (v1.x * v2.x + v1.y * v2.y + v1.z * v2.z);
};

Vector3D.transformCoordinates = function(point, transform) {
  let x = point.x * transform.m[0] + point.y * transform.m[4] + point.z * transform.m[8] + transform.m[12];
  let y = point.x * transform.m[1] + point.y * transform.m[5] + point.z * transform.m[9] + transform.m[13];
  let z = point.x * transform.m[2] + point.y * transform.m[6] + point.z * transform.m[10] + transform.m[14];
  let w = point.x * transform.m[3] + point.y * transform.m[7] + point.z * transform.m[11] + transform.m[15];
  return new Vector3D(x/w, y/w, z/w);
};
