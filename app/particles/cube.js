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
};
