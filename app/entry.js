'use strict';

require('./scss/main.scss');

const requestAnimationFrame = require('raf');
const $ = require('jquery');

const Matrix = require('./particles/matrix.js');
const Vector3D = require('./particles/vector3d.js');
const Vector2D = require('./particles/vector2d.js');
const Cube = require('./particles/cube.js');

let meshes = [], camera, device, mesh;

const Mesh = function(shape) {
  this.vertices = shape.vertices;
  this.rotation = new Vector3D(45,45,45);
  this.position = new Vector3D(0,0,0);
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
  this.canvas.height = 500;
  // Translate the surface's origin to the center of the canvas
  this.ctx.translate(100, 70);
};

Device.prototype.Clear = function(){
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Device.prototype.Project = function(point, transformMatrix){
  let projected = Vector3D.transformCoordinates(point, transformMatrix);
  let x = projected.x * 100;
  let y = -projected.y * 100;
  return new Vector2D(x, y);
};

Device.prototype.drawPoint = function(vertex) {
  this.ctx.fillStyle = 'rgba(255,255,255,.7)';
  this.ctx.fillRect(vertex.x, vertex.y, 1, 1);
};

Device.prototype.Render = function(camera, meshes) {
  let viewMatrix = Matrix.LookAtLH(camera.position, camera.target, camera.up);
  let projectionMatrix = Matrix.PerspectiveFovLH(0.78, this.canvas.width / this.canvas.height, .01, 1.0);
  console.log('view', viewMatrix);
  console.log('projection', projectionMatrix);
  // Loop through meshes
  for (let i = 0; i < meshes.length; i++) {
    let currentMesh = meshes[i];
    // let rotationMatrix = Matrix.rotationYPR(currentMesh.rotation.y, currentMesh.rotation.x, currentMesh.rotation.z);
    // let translationMatrix = Matrix.Translation(currentMesh.position.y, currentMesh.position.x, currentMesh.position.z);
    let worldMatrix = Matrix.rotationYPR(currentMesh.rotation.y, currentMesh.rotation.x, currentMesh.rotation.z).multiply(Matrix.Translation(currentMesh.position.y, currentMesh.position.x, currentMesh.position.z));
    console.log('world', worldMatrix);
    // Final matrix to be applied to each vertex
    let transformMatrix = worldMatrix.multiply(viewMatrix).multiply(projectionMatrix);
    console.log('transform', transformMatrix);
    // Loop through vertices in each mesh
    for(let i = 0; i < currentMesh.vertices.length; i++) {
      let projectedPoint = this.Project(currentMesh.vertices[i], transformMatrix);
      console.log('projected points', projectedPoint);
      this.drawPoint(projectedPoint);
    }
  }
};
Device.prototype.Rotate = function(camera, meshes) {
  for (let i = 0; i < meshes.length; i++) {
    let currentMesh = meshes[i];
    let rotationMatrix = Matrix.rotationYPR(currentMesh.rotation.y, currentMesh.rotation.x, currentMesh.rotation.z);
    for(let i = 0; i < currentMesh.vertices.length; i++) {
      this.drawPoint(currentMesh.vertices[i]);
    }
  }
};


function init() {
  camera = new Camera();
  device = new Device();
  let testShape = new Cube();
  mesh = new Mesh(testShape);
  meshes.push(mesh);
  requestAnimationFrame(drawingLoop);
}
init();

//Rendering loop handler
function drawingLoop() {
  device.Clear();
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  device.Render(camera, meshes);
  //requestAnimationFrame(drawingLoop);
}
