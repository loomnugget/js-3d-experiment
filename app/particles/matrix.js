'use strict';

const Vector3D = require('./vector3d.js');

const Matrix = module.exports = function() {
  this.m = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
};

//THANK YOU BABYLON FOR THIS EQUATION
Matrix.prototype.multiply = function (other) {
  var result = new Matrix();
  result.m[0] = this.m[0] * other.m[0] + this.m[1] * other.m[4] + this.m[2] * other.m[8] + this.m[3] * other.m[12];
  result.m[1] = this.m[0] * other.m[1] + this.m[1] * other.m[5] + this.m[2] * other.m[9] + this.m[3] * other.m[13];
  result.m[2] = this.m[0] * other.m[2] + this.m[1] * other.m[6] + this.m[2] * other.m[10] + this.m[3] * other.m[14];
  result.m[3] = this.m[0] * other.m[3] + this.m[1] * other.m[7] + this.m[2] * other.m[11] + this.m[3] * other.m[15];
  result.m[4] = this.m[4] * other.m[0] + this.m[5] * other.m[4] + this.m[6] * other.m[8] + this.m[7] * other.m[12];
  result.m[5] = this.m[4] * other.m[1] + this.m[5] * other.m[5] + this.m[6] * other.m[9] + this.m[7] * other.m[13];
  result.m[6] = this.m[4] * other.m[2] + this.m[5] * other.m[6] + this.m[6] * other.m[10] + this.m[7] * other.m[14];
  result.m[7] = this.m[4] * other.m[3] + this.m[5] * other.m[7] + this.m[6] * other.m[11] + this.m[7] * other.m[15];
  result.m[8] = this.m[8] * other.m[0] + this.m[9] * other.m[4] + this.m[10] * other.m[8] + this.m[11] * other.m[12];
  result.m[9] = this.m[8] * other.m[1] + this.m[9] * other.m[5] + this.m[10] * other.m[9] + this.m[11] * other.m[13];
  result.m[10] = this.m[8] * other.m[2] + this.m[9] * other.m[6] + this.m[10] * other.m[10] + this.m[11] * other.m[14];
  result.m[11] = this.m[8] * other.m[3] + this.m[9] * other.m[7] + this.m[10] * other.m[11] + this.m[11] * other.m[15];
  result.m[12] = this.m[12] * other.m[0] + this.m[13] * other.m[4] + this.m[14] * other.m[8] + this.m[15] * other.m[12];
  result.m[13] = this.m[12] * other.m[1] + this.m[13] * other.m[5] + this.m[14] * other.m[9] + this.m[15] * other.m[13];
  result.m[14] = this.m[12] * other.m[2] + this.m[13] * other.m[6] + this.m[14] * other.m[10] + this.m[15] * other.m[14];
  result.m[15] = this.m[12] * other.m[3] + this.m[13] * other.m[7] + this.m[14] * other.m[11] + this.m[15] * other.m[15];
  return result;
};

let mat = new Matrix();
mat.Translation(1,2,3);
console.log(mat);


Matrix.prototype.LookAtLH = function(camPos, camTar, up) {
  let camPosition = new Vector3D(camPos.x, camPos.y, camPos.z);
  let camTarget = new Vector3D(camTar.x, camTar.y, camTar.z);
  let upVector = new Vector3D(up.x, up.y , up.z);

  let zAxis = camPosition.subtract(camTarget).normalize();
  let xAxis = upVector.cross(zAxis).normalize();
  let yAxis = zAxis.cross(xAxis).normalize();

  var ex = -xAxis.dot(camPosition);
  var ey = -yAxis.dot(camPosition);
  var ez = -zAxis.dot(camPosition);

  this.m[0] = xAxis.x;
  this.m[1] = yAxis.x;
  this.m[2] = zAxis.x;
  this.m[3] = 0;
  this.m[5] = yAxis.y;
  this.m[4] = xAxis.y;
  this.m[6] = zAxis.y;
  this.m[7] = 0;
  this.m[8] = xAxis.z;
  this.m[9] = yAxis.z;
  this.m[10] = zAxis.z;
  this.m[11] = 0;
  this.m[12] = ex;
  this.m[13] = ey;
  this.m[14] = ez;
  this.m[15] = 1;
  return this.m;
};

Matrix.prototype.PerspectiveLH = function (width, height, znear, zfar) {
  this.m[0] = (2.0 * znear) / width;
  this.m[5] = (2.0 * znear) / height;
  this.m[10] = -zfar / (znear - zfar);
  this.m[11] = 1;
  this.m[1] = this.m[2] = this.m[3] = this.m[4] = this.m[6] = this.m[7] = this.m[12] = this.m[13] = this.m[15] = 0;
  this.m[14] = (znear * zfar) / (znear - zfar);
  return this.m;
};

//left handed perspective matrix
Matrix.prototype.PerspectiveFovLH = function (fov, aspect, znear, zfar) {
  let tan = 1.0 / (Math.tan(fov * 0.5));
  this.m[0] = tan/aspect;
  this.m[5] = tan;
  this.m[10] = -zfar / (znear - zfar);
  this.m[11] = 1;
  this.m[14] = (znear * zfar) / (znear - zfar);
  this.m[1] = this.m[2] = this.m[3] = this.m[4] = this.m[6] = this.m[7] = this.m[12] = this.m[13] = this.m[15] = 0;
  return this.m;
};

Matrix.prototype.Translation = function (x,y,z){
  this.m[0] = this.m[5] = this.m[10] = this.m[15] = 1;
  this.m[2] = this.m[3] = this.m[4] = this.m[6] = this.m[7] = this.m[8] = this.m[9] = this.m[11] = 0;
  this.m[12] = x; this.m[13] = y; this.m[14] = z;
  return this.m;
};

Matrix.rotationYPR = function(yaw, pitch, roll) {
  return Matrix.rotateZ(roll).multiply(Matrix.rotateX(pitch)).multiply(Matrix.rotateY(yaw));
};

//let theta = Math.PI * 0.3; //Rotation amount
Matrix.rotateX = function(theta) {
  let result = new Matrix();
  result.m[5] = result.m[9] = result.m[10] = Math.cos(theta);
  result.m[0] = result.m[15] = 1;
  result.m[6] = -Math.sin(theta);
  result.m[1] = result.m[2] = result.m[3] = result.m[4] = result.m[7] = result.m[8] = result.m[11] = result.m[12] = result.m[13] = result.m[14] = 0;
  return result;
};

Matrix.rotateY = function(theta) {
  let result = new Matrix();
  result.m[0] = result.m[10] = Math.cos(theta);
  result.m[2] = Math.sin(theta);
  result.m[8] = -Math.sin(theta);
  result.m[1] = result.m[3] = result.m[4] = result.m[6] = result.m[7] = result.m[9] = result.m[11] = result.m[12] = result.m[13] = result.m[14] = 0;
  result.m[5] = result.m[15] = 1;
  return result;
};

Matrix.rotateZ = function(theta) {
  let result = new Matrix();
  result.m[0] = result.m[5] = Math.cos(theta);
  result.m[4] = Math.sin(theta);
  result.m[1] = -Math.sin(theta);
  result.m[2] = result.m[3] = result.m[6] = result.m[7] = result.m[8] = result.m[9] = result.m[11] = result.m[12] = result.m[13] = result.m[14] = 0;
  result.m[10] = result.m[15] = 1;
  return result;
};
