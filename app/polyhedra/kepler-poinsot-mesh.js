'use strict';

const Vector3D = require('../math/vector3d.js');

const C0 = (3 - Math.sqrt(5)) / 4;
const C1 = (Math.sqrt(5) - 1) / 4;

const stellation1 = function() {
  this.vertices = [
    new Vector3D(0.0, -0.5, C0),
    new Vector3D( 0.0, -0.5,-C0),
    new Vector3D( 0.0, 0.5, C0),
    new Vector3D( 0.0, 0.5, -C0),
    new Vector3D(-0.5, C0, 0.0),
    new Vector3D( 0.5, C0, 0.0),
    new Vector3D(-0.5, -C0, 0.0),
    new Vector3D( 0.5, -C0, 0.0),
    new Vector3D(C0, 0.0, -0.5),
    new Vector3D(C0, 0.0, 0.5),
    new Vector3D(-C0, 0.0, -0.5),
    new Vector3D(-C0, 0.0, 0.5),
  ];

  this.faces = [
    { A:0, B:2, C:10 },
    { A:0, B:10, C:5 },
    { A:0, B:5, C:4 },
    { A:0, B:4, C:8 },
    { A:0, B:8, C:2 },
    { A:3, B:1, C:11 },
    { A:3, B:11, C:7 },
    { A:3, B:7, C:6 },
    { A:3, B:6, C:9 },
    { A:3, B:9, C:1 },
    { A:2, B:6, C:7 },
    { A:2, B:7, C:10 },
    { A:10, B:7, C:11 },
    { A:10, B:11, C:5 },
    { A:5, B:11, C:1 },
    { A:5, B:1, C:4 },
    { A:4, B:1, C:9 },
    { A:4, B:9, C:8 },
    { A:8, B:9, C:6 },
    { A:8, B:6, C:2 },
  ];
};

const stellation2 = function() {
  this.vertices = [
    new Vector3D(0.5, 0.0, C0),
    new Vector3D(0.5, 0.0, -C0),
    new Vector3D(-0.5, 0.0, C0),
    new Vector3D(-0.5, 0.0, -C0),

    new Vector3D(0.0, C0, 0.5),
    new Vector3D(0.0, C0, -0.5),
    new Vector3D(0.0, -C0, 0.5),
    new Vector3D(0.0, -C0, -0.5),

    new Vector3D(C0, 0.5, 0.0),
    new Vector3D(-C0, 0.5, 0.0),
    new Vector3D(C0, -0.5, 0.0),
    new Vector3D(-C0, -0.5, 0.0),

    new Vector3D(-C1, -C1, -C1),
    new Vector3D(-C1, -C1, C1),
    new Vector3D(C1, -C1, -C1),
    new Vector3D(C1, -C1, C1),

    new Vector3D(-C1, C1, -C1),
    new Vector3D(-C1, C1, C1),
    new Vector3D(C1, C1, -C1),
    new Vector3D(C1, C1, C1),
  ];

  this.faces = [
    { A:0, B:2, C:14, D:4, E:12 },
    { A:0, B:12, C:8, D:10, E:16 },
    { A:0, B:16, C:6, D:18, E:2 },
    { A:7, B:6, C:16, D:10, E:17 },
    { A:7, B:17, C:1, D:3, E:19 },
    { A:7, B:19, C:11, D:18, E:6 },
    { A:9, B:11, C:19, D:3, E:15 },
    { A:9, B:15, C:5, D:4, E:14 },
    { A:9, B:14, C:2, D:18, E:11 },
    { A:13, B:1, C:17, D:10, E:8 },
    { A:13, B:8, C:12, D:4, E:5 },
    { A:13, B:5, C:15, D:3, E:1 },
  ];
};
