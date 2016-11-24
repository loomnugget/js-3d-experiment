'use strict';

const Vector3D = require('./vector3d.js');

const Matrix = module.exports = function() {
  this.m = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
};

//THANK YOU BABYLON.js FOR THIS EQUATION THAT I DIDNT WANT TO TYPE MYSELF
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

Matrix.LookAtLH = function(camPosition, camTarget, upVector) {
  let result = new Matrix();
  let zAxis = (camTarget.subtract(camPosition)).normalize();
  let xAxis = (Vector3D.Cross(upVector, zAxis)).normalize();
  let yAxis = (Vector3D.Cross(zAxis, xAxis)).normalize();
  // console.log('zAxis', zAxis);
  // console.log('yAxis', yAxis);
  // console.log('xAxis', xAxis);

  let px = -Vector3D.Dot(xAxis, camPosition);
  let py = -Vector3D.Dot(yAxis, camPosition);
  let pz = -Vector3D.Dot(zAxis, camPosition);
  // console.log('px', px);
  // console.log('py', py);
  // console.log('pz', pz);
  result.m[0] = xAxis.x, result.m[1] = yAxis.x, result.m[2] = zAxis.x, result.m[3] = 0;
  result.m[4] = xAxis.y, result.m[5] = yAxis.y, result.m[6] = zAxis.y, result.m[7] = 0;
  result.m[8] = xAxis.z, result.m[9] = yAxis.z, result.m[10] = zAxis.z, result.m[11] = 0;
  result.m[12] = px; result.m[13] = py; result.m[14] = pz; result.m[15] = 1;
  return result;
};

Matrix.PerspectiveLH = function (width, height, znear, zfar) {
  let result = new Matrix();
  result.m[0] = (2.0 * znear) / width;
  result.m[5] = (2.0 * znear) / height;
  result.m[10] = -zfar / (znear - zfar);
  result.m[11] = 1;
  result.m[1] = result.m[2] = result.m[3] = result.m[4] = result.m[6] = result.m[7] = result.m[12] = result.m[13] = result.m[15] = 0;
  result.m[14] = (znear * zfar) / (znear - zfar);
  return result;
};

//left handed perspective matrix
Matrix.PerspectiveFovLH = function (fov, aspect, znear, zfar) {
  let result = new Matrix();
  let tan = 1 / (Math.tan(fov * 0.5));
  result.m[0] = tan/aspect;
  result.m[5] = tan;
  result.m[10] = -zfar / (znear - zfar);
  result.m[11] = 1;
  result.m[14] = (znear * zfar) / (znear - zfar);
  result.m[1] = result.m[2] = result.m[3] = result.m[4] = result.m[6] = result.m[7] = result.m[12] = result.m[13] = result.m[15] = 0;
  return result;
};

Matrix.Translation = function (x,y,z){
  let result = new Matrix();
  result.m[0] = result.m[5] = result.m[10] = result.m[15] = 1;
  result.m[1] = result.m[2] = result.m[3] = result.m[4] = result.m[6] = result.m[7] = result.m[8] = result.m[9] = result.m[11] = 0;
  result.m[12] = x; result.m[13] = y; result.m[14] = z;
  return result;
};

Matrix.rotationYPR = function(yaw, pitch, roll) {
  return Matrix.rotateZ(roll).multiply(Matrix.rotateX(pitch)).multiply(Matrix.rotateY(yaw));
};

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
