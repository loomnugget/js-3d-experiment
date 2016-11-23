'use strict';

require('./scss/main.scss');

const requestAnimationFrame = require('raf');
const $ = require('jquery');

const Matrix = require('./particles/matrix.js');
const Vector3D = require('./particles/vector3d.js');
const Vector2D = require('./particles/vector2d.js');
const Cube = require('./particles/cube.js');

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
  this.canvas = $('#canvas');
  this.ctx = this.canvas[0].getContext('2d');
  this.canvas.width = 1000;
  this.canvas.height = 1000;
  this.centerX = this.canvas.width/2;
  this.centerY = this.canvas.height/2;
  // Translate the surface's origin to the center of the canvas
  this.ctx.translate(this.centerX, this.centerY);
};

Device.prototype.Clear = function(){
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Device.prototype.Project = function(point, transformMatrix){
  let projected = Vector3D.transformCoordinates(point, transformMatrix);
  this.x = projected.x * this.canvas.width + this.canvas.width / 2;
  this.y = -projected.y * this.canvas.height + this.canvas.height / 2;
  return new Vector2D(this.x, this.y);
};

Device.prototype.drawPoint = function(vertex) {
  this.ctx.fillStyle = 'rgba(255,255,255,.7)';
  this.ctx.beginPath();
  this.ctx.arc(vertex.x, vertex.y, 2, 0, Math.PI * 2, false);
  this.ctx.fill();
};

Device.prototype.Render = function(camera, meshes) {
  let viewMatrix = Matrix.LookAtLH(camera.position, camera.target, camera.up);
  let projectionMatrix = Matrix.PerspectiveFovLH(0.78, 4/3, .01, 1.0);
  // Loop through meshes
  for (let i = 0; i < meshes.length; i++) {
    let currentMesh = meshes[i];
    let rotationMatrix = Matrix.rotationYPR(currentMesh.rotation.y, currentMesh.rotation.x, currentMesh.rotation.z);
    let translationMatrix = Matrix.Translation(currentMesh.rotation.y, currentMesh.rotation.x, currentMesh.rotation.z);
    let worldMatrix = rotationMatrix.multiply(translationMatrix);
    let transformMatrix = worldMatrix.multiply(viewMatrix).multiply(projectionMatrix);
    // Loop through vertices in each mesh
    for(let i = 0; i < currentMesh.vertices.length; i++) {
      let projectedPoint = this.Project(currentMesh.vertices[i], transformMatrix);
      this.drawPoint(projectedPoint);
    }
  }
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

// Rendering loop handler
function drawingLoop() {
  device.Clear();
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  device.Render(camera, meshes);
  requestAnimationFrame(drawingLoop);
}
