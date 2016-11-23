'use strict';

const Matrix = require('./particles/matrix.js');
const Vector3D = require('./particles/vector3d.js');

const Face = function(vertex1, vertex2, vertex3) {
  this.vertex1 = vertex1;
  this.vertex2 = vertex2;
  this.vertex3 = vertex3;
};

const Isosahedron = function() {
  let r = 1;
  let f = (1 + Math.sqrt(5))/2;
  this.vertices = [
    new Vector3D(r,0,f*r),
    new Vector3D(f*r,r,0),
    new Vector3D(0,f*r,r),
    new Vector3D(-r,0,f*r),
    new Vector3D(0,-f*r,r),
    new Vector3D(f*r,-r,0),
    new Vector3D(r,0,-f*r),
    new Vector3D(0,f*r,-r),
    new Vector3D(-f*r,r,0),
    new Vector3D(-f*r,-r,0),
    new Vector3D(0,-f*r,-r),
    new Vector3D(-r,0,-f*r),
  ];
  this.faces = [
    //top
    new Face(this.vertices[0], this.vertices[1], this.vertices[2]),
    new Face(this.vertices[0], this.vertices[2], this.vertices[3]),
    new Face(this.vertices[0], this.vertices[3], this.vertices[4]),
    new Face(this.vertices[0], this.vertices[4], this.vertices[5]),
    new Face(this.vertices[0], this.vertices[5], this.vertices[1]),
    //bottom
    new Face(this.vertices[11], this.vertices[10], this.vertices[6]),
    new Face(this.vertices[11], this.vertices[6], this.vertices[7]),
    new Face(this.vertices[11], this.vertices[7], this.vertices[8]),
    new Face(this.vertices[11], this.vertices[8], this.vertices[9]),
    new Face(this.vertices[11], this.vertices[9], this.vertices[10]),
    //middle - triangle up
    new Face(this.vertices[6], this.vertices[5], this.vertices[1]),
    new Face(this.vertices[7], this.vertices[1], this.vertices[2]),
    new Face(this.vertices[8], this.vertices[2], this.vertices[3]),
    new Face(this.vertices[9], this.vertices[3], this.vertices[4]),
    new Face(this.vertices[10], this.vertices[4], this.vertices[5]),
    //middle- triangle down
    new Face(this.vertices[5], this.vertices[6], this.vertices[10]),
    new Face(this.vertices[1], this.vertices[6], this.vertices[7]),
    new Face(this.vertices[2], this.vertices[7], this.vertices[8]),
    new Face(this.vertices[3], this.vertices[8], this.vertices[9]),
    new Face(this.vertices[4], this.vertices[9], this.vertices[10]),
  ];
};
