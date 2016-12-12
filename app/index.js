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

class App extends React.Component {
  propTypes: {
    color: React.PropTypes.string.isRequired,
  }
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

    function sortByZIndex(a, b){
      return a.z - b.z;
    }

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
      let x = projected.x * 2 * canvas.width + canvas.width/2;
      let y = -projected.y * 2 * canvas.height + canvas.height/2;
      let z = point.z;
      return new Vector3D(x, y, z);
    };

    Engine.prototype.drawPoint = function(vertex) {
      ctx.fillStyle = 'rgba(255,255,255,.7)';
      ctx.fillRect(vertex.x, vertex.y, 1, 1);
    };

    Engine.prototype.drawLines = function(vertex1, vertex2, vertex3, vertex4, vertex5) {
      ctx.beginPath();
      ctx.strokeStyle = '#131313';
      ctx.moveTo(vertex1.x, vertex1.y); // pick up "pen," reposition
      ctx.lineTo(vertex2.x, vertex2.y); // draw line from vertex1 to vertex2
      ctx.lineTo(vertex3.x, vertex3.y); // draw line from vertex2 to vertex3
      ctx.lineTo(vertex4.x, vertex4.y);
      ctx.lineTo(vertex5.x, vertex5.y);
      ctx.closePath(); // connect end to start
      ctx.stroke(); // outline the shape
    };

    Engine.prototype.Render = function(camera, meshes) {
      let viewMatrix = Matrix.LookAtLH(camera.position, camera.target, camera.up);
      let projectionMatrix = Matrix.PerspectiveFovLH(0.78, canvas.width/canvas.height, .01, 1.0);
      // Loop through meshes
      for (let i = 0; i < meshes.length; i++) {
        let currentMesh = meshes[i];

        let worldMatrix = Matrix.rotationYPR(currentMesh.rotation.y, currentMesh.rotation.x, currentMesh.rotation.z).multiply(Matrix.Translation(currentMesh.position.y, currentMesh.position.x, currentMesh.position.z));
        // Final matrix to be applied to each vertex
        let transformMatrix = worldMatrix.multiply(viewMatrix).multiply(projectionMatrix);
        // Loop through faces in each mesh
        for(let i = 0; i < currentMesh.faces.length; i++) {
          let face = currentMesh.faces[i];
          // Create each triangular face using indexes from faces array
          let vertexA = currentMesh.vertices[face.A];
          let vertexB = currentMesh.vertices[face.B];
          let vertexC = currentMesh.vertices[face.C];
          let vertexD = currentMesh.vertices[face.D];
          let vertexE = currentMesh.vertices[face.E];

          // Project each vertex in the face by applying transformation matrix to all points
          let projectedVertexA = this.Project(vertexA, transformMatrix);
          let projectedVertexB = this.Project(vertexB, transformMatrix);
          let projectedVertexC = this.Project(vertexC, transformMatrix);
          let projectedVertexD = this.Project(vertexD, transformMatrix);
          let projectedVertexE = this.Project(vertexE, transformMatrix);

          //face.getAvgZ(projectedVertexA, projectedVertexB, projectedVertexC, projectedVertexD, projectedVertexE);
          //console.log(currentMesh.avgZ);
          //Draw Triangles
          this.drawLines(projectedVertexA, projectedVertexB, projectedVertexC, projectedVertexD, projectedVertexE);
        }
      }
    };

    let meshes = [], camera, engine, mesh, avgZ = [];
    function init() {
      camera = new Camera();
      engine = new Engine();
      let testShape = new stellation1();
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
      requestAnimationFrame(drawingLoop);
    }
  }

  render() {
    return <div>
      <Hello title="Claudia" />
      <canvas ref="canvas" onClick =""></canvas>
    </div>;
  }
}

var Hello = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
  },
  render: function() {
    return(
      <h1> Hello, {this.props.title}</h1>
    );
  },
});
//2 arguments - first element you want to render, and where you render it to
ReactDOM.render(<App />, document.getElementById('app'));
