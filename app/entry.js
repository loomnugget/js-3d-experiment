'use strict';

require('./scss/main.scss');

const requestAnimationFrame = require('raf');
const $ = require('jquery');

const Matrix = require('./particles/matrix.js');
const Vector3D = require('./particles/vectors.js');
const Cube = require('./particles/cube.js');

const Vector2D = function (x,y) {
  this.x = x || 0;
  this.y = y || 0;
};

let meshes = [];

const Mesh = function(shape) {
  this.vertices = shape.vertices;
  this.rotation = new Vector3D(0,0,0);
  this.center = new Vector3D(0,0,0); // coordinate system begins at center of mesh
};

Mesh.prototype.sortByZIndex = function(a, b){
  return a.z - b.z;
};

const Camera = function() {
  // Set up initial positions of the camera, the target, and up direction of the camera
  this.position = new Vector3D(0, 0, 10);
  this.target = new Vector3D(0, 0, 0);
  this.up = new Vector3D(0, 1, 0);
};

// 3D core - Takes 3D mesh coordinates and projects into 2D world
const Device = function() {
  this.canvas = $('#frontBuffer');
  this.ctx = this.canvas[0].getContext('2d');
  this.canvas.width = 700;
  this.canvas.height = 700;
  this.centerX = this.canvas.width/2;
  this.centerY = this.canvas.height/2;
  // Translate the surface's origin to the center of the canvas
  this.ctx.translate(this.centerX, this.centerY);
};

Device.prototype.Clear = function(){
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Device.prototype.Project = function(point, transMatrix){
  point.TransformCoordinates(point, transMatrix);
  this.x = this.point.x * this.canvas.width + this.canvas.width / 2;
  this.y = -this.point.y * this.canvas.height + this.canvas.height / 2;
  return new Vector2D(this.x, this.y);
};

Device.prototype.drawPoint = function(vertex) {
  this.ctx.fillStyle = 'rgba(255,255,255,.7)';
  this.ctx.beginPath();
  this.ctx.arc(vertex.x, vertex.y, 2, 0, Math.PI * 2, false);
  this.ctx.fill();
};

Device.prototype.Render = function(camera, meshes) {

};

let camera = new Camera();
let device = new Device();
let testShape = new Cube();
let mesh = new Mesh(testShape);

function init() {
  meshes.push(mesh);
  requestAnimationFrame(drawingLoop);
}
init();

function drawingLoop() {
  device.Clear();
  device.Render(camera, meshes);
  requestAnimationFrame(drawingLoop);
}
