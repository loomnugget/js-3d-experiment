'use strict';

require('./scss/main.scss');
// NPM modules
const React = require('react');
const ReactDOM = require('react-dom');
const requestAnimationFrame = require('raf');

//App modules
const Matrix = require('./math/matrix.js');
const Vector3D = require('./math/vector3d.js');
const stellation1 = require('./polyhedra/kepler-poinsot-mesh.js');
const triakisIcosahedron = require('./polyhedra/catalan-mesh.js');


class App extends React.Component {
  componentDidMount(){
    this.updateCanvas();
  }
  updateCanvas() {
    const canvas = this.refs.canvas;
    const ctx = this.refs.canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 1000;

    const Mesh = function(shape) {
      this.vertices = shape.vertices;
      this.faces = shape.faces;
      this.avgZ = [];
      this.rotation = new Vector3D(45,45,45);
      this.position = new Vector3D(0,0,0);
      this.velocity = new Vector3D(0,0,0);
      this.acceleration = new Vector3D(0,0,0);
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

    Engine.prototype.Project = function(vertex, transformMatrix){
      let projected = Vector3D.transformCoordinates(vertex, transformMatrix);
      vertex.x = projected.x * canvas.width/2 + canvas.width/2;
      vertex.y = -projected.y * canvas.height/2 + canvas.height/2;
      vertex.z = vertex.z;
    };

    Engine.prototype.drawPoint = function(vertex) {
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fillRect(vertex.x, vertex.y, 3, 3);
    };

    Engine.prototype.drawLines = function(vertex1, vertex2, vertex3) {
      ctx.beginPath();
      ctx.strokeStyle = this.strokeStyle;
      ctx.moveTo(vertex1.x, vertex1.y); // pick up "pen," reposition
      ctx.lineTo(vertex2.x, vertex2.y); // draw line from vertex1 to vertex2
      ctx.lineTo(vertex3.x, vertex3.y); // draw line from vertex2 to vertex3
      ctx.closePath(); // connect end to start
      ctx.stroke(); // outline the shape
      ctx.fillStyle = '#ffaafa';
      ctx.fill();
    };

    Engine.prototype.getDepths = function(verticesArray) {
      for(var i = 0; i < verticesArray.length; i++){
        depths[i] = verticesArray[i].z;
      }
    };

    // Calculate Painter's Algorithm
    Engine.prototype.avgDepth = function(faceArray) {
      for(var i = 0; i < faceArray.length; i++){
        // Find average of depths for each face by using z-value for each vertex
        faceArray[i]['avgZ'] = (depths[faceArray[i].A] + depths[faceArray[i].B] + depths[faceArray[i].C])/3;
        //console.log(faceArray[i]);
      }
    };

    Engine.prototype.sortByDepths = function(faceArray) {
      for(var i = 0; i < faceArray.length; i++){
        faceArray.sort(function(a, b){
          return b.avgZ - a.avgZ;
        });
        //console.log(faceArray[i]);
      }
    };

    var depths = [], avgFaceDepth = [];

    Engine.prototype.Render = function(camera, meshes) {
      let viewMatrix = Matrix.LookAtLH(camera.position, camera.target, camera.up);
      let projectionMatrix = Matrix.PerspectiveFovLH(.78, canvas.width/canvas.height, .01, 1.0);
      // Loop through meshes
      for (let i = 0; i < meshes.length; i++) {
        let currentMesh = meshes[i];
        let worldMatrix = Matrix.rotationYPR(currentMesh.rotation.y, currentMesh.rotation.x, currentMesh.rotation.z).multiply(Matrix.Translation(currentMesh.position.y, currentMesh.position.x, currentMesh.position.z));
        // Final matrix to be applied to each vertex
        let transformMatrix = worldMatrix.multiply(viewMatrix).multiply(projectionMatrix);
        this.getDepths(currentMesh.vertices);
        this.avgDepth(currentMesh.faces);
        this.sortByDepths(currentMesh.faces);
        this.drawProjection(currentMesh, transformMatrix);
      }
    };

    Engine.prototype.drawProjection = function(currentMesh, transformMatrix) {
      for(var i = 0; i < currentMesh.faces.length; i++) {
        let face = currentMesh.faces[i];
        // Create each triangular face using indices from faces array
        let vertexA = currentMesh.vertices[face.A];
        let vertexB = currentMesh.vertices[face.B];
        let vertexC = currentMesh.vertices[face.C];

        //Project each vertex in the face by applying transformation matrix to all points
        let projectedVertexA = this.Project(vertexA, transformMatrix);
        let projectedVertexB = this.Project(vertexB, transformMatrix);
        let projectedVertexC = this.Project(vertexC, transformMatrix);

        //Draw Triangles
        this.drawLines(projectedVertexA, projectedVertexB, projectedVertexC);
      }
    };

    let meshes = [], camera, engine, mesh;
    function init() {
      camera = new Camera();
      engine = new Engine();
      let testShape = new triakisIcosahedron();
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
    //  requestAnimationFrame(drawingLoop);
    }
  }
  constructor() {
    super();
    this.state = {
      style: divStyle,
    };
    this.strokeStyle = '#ffaafa';

  }
  render() {
    return <div>
      <Hello />
      <canvas ref="canvas" style={this.state.style}></canvas>
    </div>;
  }
}

const divStyle =  {
  color: '#131313',
  background:'#fff',
};

var Hello = React.createClass({
  render: function() {
    return (
      <h1 style={divStyle} >Hello</h1>
    );
  },
});
//2 arguments - first element you want to render, and where you render it to
ReactDOM.render(<App />, document.getElementById('app'));
