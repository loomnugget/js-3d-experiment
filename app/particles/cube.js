'use strict';

const Vector3D = require('./vector3d.js');

const Cube = module.exports =function() {
  this.vertices = [
    new Vector3D(-1, 1, 1),
    new Vector3D(1, 1, 1),
    new Vector3D(-1, -1, 1),
    new Vector3D(-1, -1, -1),
    new Vector3D(-1, 1, -1),
    new Vector3D(1, 1, -1),
    new Vector3D(1, -1, 1),
    new Vector3D(1, -1, -1),
  ];
  this.faces = [
    { A:0, B:1, C:2 },
    { A:1, B:2, C:3 },
    { A:1, B:3, C:6 },
    { A:1, B:5, C:6 },
    { A:0, B:1, C:4 },
    { A:1, B:4, C:5 },

    { A:2, B:3, C:7 },
    { A:3, B:6, C:7 },
    { A:0, B:2, C:7 },
    { A:0, B:4, C:7 },
    { A:4, B:5, C:6 },
    { A:4, B:6, C:7 },
  ];
};
