'use strict';

require('./scss/main.scss');

const requestAnimationFrame = require('raf');
const $ = require('jquery');

const Matrix = require('./math/matrix.js');
const Vector3D = require('./math/vector3d.js');
const Icosahedron = require('./polyhedra/platonic-solid-mesh.js');

const colorMap = ['#FFCCCC', '#FFCC99', '#CCFFCC', '#99FFCC', '#99CCFF', '#CCCCFF', '#FFCCFF' ];

let meshes = [], camera, engine, mesh, avgZ = [];

const Mesh = function(shape) {
  this.vertices = shape.vertices;
  this.rotation = new Vector3D(45,45,45);
  this.position = new Vector3D(0,0,0);
  this.velocity = new Vector3D(0,0,0);
  this.acceleration = new Vector3D(0,0,0);
};

Mesh.prototype.Move = function() {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
};

Mesh.prototype.getAvgZ = function(v1, v2, v3){
  let sum = v1.z + v2.z + v3.z;
  avgZ.push(sum/3);
  return avgZ;
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
const Engine = function() {
  this.canvas = $('canvas');
  this.ctx = this.canvas[0].getContext('2d');
  this.width = this.canvas[0].width;
  this.height = this.canvas[0].height;
};

Engine.prototype.Clear = function(){
  this.ctx.clearRect(0, 0, 1000, 1000);
};

Engine.prototype.Project = function(point, transformMatrix){
  let projected = Vector3D.transformCoordinates(point, transformMatrix);
  let x = projected.x * 50 + 100;
  let y = -projected.y * 50 + 100;
  let z = point.z;
  return new Vector3D(x, y, z);
};

Engine.prototype.drawPoint = function(vertex) {
  this.ctx.fillStyle = 'rgba(255,255,255,.7)';
  this.ctx.fillRect(vertex.x, vertex.y, 1, 1);
};

Engine.prototype.drawTriangle = function(vertex1, vertex2, vertex3) {
  this.ctx.beginPath();
  this.ctx.strokeStyle = '#096';
  this.ctx.moveTo(vertex1.x, vertex1.y); // pick up "pen," reposition
  this.ctx.lineTo(vertex2.x, vertex2.y); // draw line from vertex1 to vertex2
  this.ctx.lineTo(vertex3.x, vertex3.y); // draw line from vertex2 to vertex3
  this.ctx.closePath(); // connect end to start
  this.ctx.stroke(); // outline the triangle
};

Engine.prototype.Render = function(camera, meshes) {
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
      let face = currentMesh.faces[i];
      // Create each triangular face using indexes from faces array
      let vertexA = currentMesh.vertices[face.A];
      let vertexB = currentMesh.vertices[face.B];
      let vertexC = currentMesh.vertices[face.C];
      // Project each vertex in the face by applying transformation matrix to all points
      let projectedVertexA = this.Project(vertexA, transformMatrix);
      let projectedVertexB = this.Project(vertexB, transformMatrix);
      let projectedVertexC = this.Project(vertexC, transformMatrix);

      // Draw Triangles
      this.drawTriangle(projectedVertexA, projectedVertexB, projectedVertexC);
      // Draw Points
      this.drawPoint(projectedVertexA);
    }
  }
};

function init() {
  camera = new Camera();
  engine = new Engine();
  let testShape = new Icosahedron();
  mesh = new Mesh(testShape);
  meshes.push(mesh);
  requestAnimationFrame(drawingLoop);
}
init();

//Rendering loop handler
function drawingLoop() {
  engine.Clear();
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  engine.Render(camera, meshes);
  //requestAnimationFrame(drawingLoop);
}
