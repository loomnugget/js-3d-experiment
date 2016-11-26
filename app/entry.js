'use strict';

require('./scss/main.scss');

const requestAnimationFrame = require('raf');
const $ = require('jquery');

const Matrix = require('./particles/matrix.js');
const Vector3D = require('./particles/vector3d.js');
const Vector2D = require('./particles/vector2d.js');
const Icosahedron = require('./particles/platonic-solid-mesh.js');

let meshes = [], camera, device, mesh, zValues = [];

const Mesh = function(shape) {
  this.vertices = shape.vertices;
  this.rotation = new Vector3D(45,45,45);
  this.position = new Vector3D(0,0,0);
};

Mesh.prototype.sortByZIndex = function(a, b){
  return a.z - b.z;
};

Mesh.prototype.calcDepth = function(facesArray) {
//Back ones are drawn first according to their average z-value
//The larger the z-value, the closer the faces are to the viewer
  let avgZ = 0;
  for(var i = 0; i < facesArray.length; i++) { //loop through vertices of each face
    avgZ += (facesArray[i].z); //add up z values for each vertex
  }
  avgZ/3; //divide by number of vertices in each face (3)
  zValues.push(avgZ); //push value to new array
};

const Camera = function() {
  // Set up initial positions of the camera, the target, and up direction of the camera
  this.position = new Vector3D(0, 0, 10);
  this.target = new Vector3D(0, 0, 0);
  this.up = new Vector3D(0, 1, 0);
};

// 3D core - Takes 3D mesh coordinates and projects into 2D world
const Device = function() {
  this.canvas = $('canvas');
  this.ctx = this.canvas[0].getContext('2d');
  this.width = this.canvas[0].width;
  this.height = this.canvas[0].height;
  console.log(this.width, this.height);
};

Device.prototype.Clear = function(){
  this.ctx.clearRect(0, 0, 1000, 1000);
};

Device.prototype.Project = function(point, transformMatrix){
  let projected = Vector3D.transformCoordinates(point, transformMatrix);
  let x = projected.x * 50 + 100;
  let y = -projected.y * 50 + 100;
  return new Vector2D(x, y);
};

Device.prototype.drawPoint = function(vertex) {
  this.ctx.fillStyle = 'rgba(255,255,255,.7)';
  this.ctx.fillRect(vertex.x, vertex.y, 1, 1);
};

Device.prototype.Render = function(camera, meshes) {
  let viewMatrix = Matrix.LookAtLH(camera.position, camera.target, camera.up);
  let projectionMatrix = Matrix.PerspectiveFovLH(0.78, 4/3, .01, 1.0);
  // Loop through meshes
  for (let i = 0; i < meshes.length; i++) {
    let currentMesh = meshes[i];
    let worldMatrix = Matrix.rotationYPR(currentMesh.rotation.y, currentMesh.rotation.x, currentMesh.rotation.z).multiply(Matrix.Translation(currentMesh.position.y, currentMesh.position.x, currentMesh.position.z));
    // Final matrix to be applied to each vertex
    let transformMatrix = worldMatrix.multiply(viewMatrix).multiply(projectionMatrix);
    // Loop through vertices in each mesh
    for(let i = 0; i < currentMesh.vertices.length; i++) {
      let projectedPoint = this.Project(currentMesh.vertices[i], transformMatrix);
      console.log('projected points', projectedPoint);
      this.drawPoint(projectedPoint);
    }
  }
};


function init() {
  camera = new Camera();
  device = new Device();
  let testShape = new Icosahedron();
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
