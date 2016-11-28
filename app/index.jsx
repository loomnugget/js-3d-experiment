'use strict';

// NPM modules
const React = require('react');
const render = require('react-dom').render;
const requestAnimationFrame = require('raf');

//App modules
const Matrix = require('./math/matrix.js');
const Vector3D = require('./math/vector3d.js');
const Icosahedron = require('./polyhedra/platonic-solid-mesh.js').Icosahedron;

class App extends React.Component {
  componentDidMount(){
    this.updateCanvas();
  }

  updateCanvas() {
    const canvas = this.refs.canvas;
    const ctx = this.refs.canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const Mesh = function(shape) {
      this.vertices = shape.vertices;
      this.faces = shape.faces;
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
      this.position = new Vector3D(0, 0, 10);
      this.target = new Vector3D(0, 0, 0);
      this.up = new Vector3D(0, 1, 0);
    };

    const Engine = function() {
      this.centerX = canvas.width/2;
      this.centerY = canvas.height/2;
    };

    Engine.prototype.Clear = function(){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    Engine.prototype.Project = function(point, transformMatrix){
      let projected = Vector3D.transformCoordinates(point, transformMatrix);
      let x = projected.x * 50 + 100;
      let y = -projected.y * 50 + 100;
      let z = point.z;
      return new Vector3D(x, y, z);
    };

    Engine.prototype.drawPoint = function(vertex) {
      ctx.fillStyle = 'rgba(255,255,255,.7)';
      ctx.fillRect(vertex.x, vertex.y, 1, 1);
    };

    Engine.prototype.drawTriangle = function(vertex1, vertex2, vertex3) {
      ctx.beginPath();
      ctx.strokeStyle = '#096';
      ctx.moveTo(vertex1.x, vertex1.y); // pick up "pen," reposition
      ctx.lineTo(vertex2.x, vertex2.y); // draw line from vertex1 to vertex2
      ctx.lineTo(vertex3.x, vertex3.y); // draw line from vertex2 to vertex3
      ctx.closePath(); // connect end to start
      ctx.stroke(); // outline the triangle
    };

    Engine.prototype.Render = function(camera, meshes) {
      let viewMatrix = Matrix.LookAtLH(camera.position, camera.target, camera.up);
      let projectionMatrix = Matrix.PerspectiveFovLH(0.78, canvas.width/canvas.height, .01, 1.0);
      // Loop through meshes
      for (let i = 0; i < meshes.length; i++) {
        let currentMesh = meshes[i];
        let worldMatrix = Matrix.rotationYPR(currentMesh.rotation.y, currentMesh.rotation.x, currentMesh.rotation.z).multiply(Matrix.Translation(currentMesh.position.y, currentMesh.position.x, currentMesh.position.z));
        // Final matrix to be applied to each vertex
        console.log(currentMesh);
        let transformMatrix = worldMatrix.multiply(viewMatrix).multiply(projectionMatrix);
        // Loop through faces in each mesh
        for(let i = 0; i < currentMesh.faces.length; i++) {
          let face = currentMesh.faces[i];
          // Create each triangular face using indexes from faces array
          let vertexA = currentMesh.vertices[face.A];
          let vertexB = currentMesh.vertices[face.B];
          let vertexC = currentMesh.vertices[face.C];

          // Project each vertex in the face by applying transformation matrix to all points
          let projectedVertexA = this.Project(vertexA, transformMatrix);
          let projectedVertexB = this.Project(vertexB, transformMatrix);
          let projectedVertexC = this.Project(vertexC, transformMatrix);

          //Draw Triangles
          this.drawTriangle(projectedVertexA, projectedVertexB, projectedVertexC);
        }
      }
    };

    let meshes = [], camera, engine, mesh, avgZ = [];
    function init() {
      camera = new Camera();
      engine = new Engine();
      let testShape = new Icosahedron();
      console.log(testShape);
      mesh = new Mesh(testShape);
      meshes.push(mesh);
<<<<<<< HEAD
      //requestAnimationFrame(drawingLoop);
=======
      requestAnimationFrame(drawingLoop);
>>>>>>> b19706a49a51bf037e864f754f8c347c152532c9
    }
    init();

    //Rendering loop handler
    function drawingLoop() {
      engine.Clear();
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.01;
      engine.Render(camera, meshes);
      requestAnimationFrame(drawingLoop);
    }
  }

  render() {
    return <canvas ref="canvas"/>;
  }
}
render(<App/>, document.getElementById('app'));
