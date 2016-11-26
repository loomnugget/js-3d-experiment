'use strict';

const Vector3D = require('./vector3d.js');

const Face = function(vertex1, vertex2, vertex3) {
  this.vertex1 = vertex1;
  this.vertex2 = vertex2;
  this.vertex3 = vertex3;
};

const Isosahedron = module.exports = function() {
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
    { A:0, B:1, C:2 },
    { A:0, B:2, C:3 },
    { A:0, B:3, C:4 },
    { A:0, B:4, C:5 },
    { A:0, B:5, C:1 },

    { A:11, B:10, C:6 },
    { A:11, B:6, C:7 },
    { A:11, B:7, C:8 },
    { A:11, B:8, C:9 },
    { A:11, B:9, C:10 },

    { A:6, B:5, C:1 },
    { A:7, B:1, C:2 },
    { A:8, B:2, C:3 },
    { A:9, B:3, C:4 },
    { A:10, B:4, C:5 },

    { A:5, B:6, C:10 },
    { A:1, B:6, C:7 },
    { A:2, B:7, C:8 },
    { A:3, B:8, C:9 },
    { A:4, B:9, C:10 },
  ];
};
