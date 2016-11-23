## **Experimental 3D engine using vanilla javascript and HTML5 canvas**
I wrote my own matrix and vector libraries to better understand how it all works with the idea that eventually I will be able to make really cool, complex animations. Simply writing functions that remove the matrix calculations would be more efficient, but for now, learning wins! This is set up with the goal of being able to easily integrate an interactive front end.

To get started:
`npm install raf jquery`

## **Modules**
#### Vector Operations (vector3d.js + vector2d.js)
Small library for simple vector operations for 2d and 3d coordinates.
`Vector3D.transformCoordinates` multiplies a vector by the transformation matrix. This is needed for the final step of the matrix calculations needed to rotate an object.

#### Matrix Calculations - matrix.js
Matrix constructor starts with a matrix filled with zeros. To do calculations, new matrices are generated by resetting the indexes in the initial array.

-`Matrix.LookatLH` generates a new matrix resulting from the camera object 'looking at' the mesh
-`Matrix.PerspectiveLH` generates a new matrix to show perspective
-`Matrix.PerspectiveFovLH` generates a new matrix taking parameters (field of view, aspect ratio, closest distance from the camera and furthest distance from the camera (represented by z value))
-`Matrix.Translation` generates a new matrix that moves all points by specified values
-`Matrix.rotationYPR` generates the final rotation matrix, which is the result of multiplying rotational matrices about the x, y and z axis. (yaw, pitch and roll are just aeronautical terms to denote rotation about x, y and z axes).

#### Meshes (iso.js + cube.js)
Outlines coordinates in 3d space.

#### Main Program - entry.js
-`Mesh` has properties vertices, rotation and center
-`Camera` has initial properties position (camera location), target(what the camera is looking at) and up(where the top of the camera is pointing)
-`Device` sets up canvas

-`Device.prototype.Clear` clears canvas between each frame.
-`Device.prototype.Project` takes 3d coordinates, applies all matrix operations, and projects them on to the 2D canvas.
-`Device.prototype.drawPoint` draws each vertex of each mesh.
-`Device.prototype.Render` sets up all 3d operations.
  1. Get View Matrix using camera position, target and up vectors
  2. Get Projection Matrix by calculating perspective using the f-value, aspect ratio, and near and far
  3. Loop through all meshes in the mesh array
  4. Get World Matrix by multiplying the Final Rotation Matrix by the Translation Matrix
  5. Get Transform matrix by multiplying the View Matrix by the Projection Matrix
  6. For each vertex in the current mesh project 3D coordinates into the 2D space
  7. Draw each projected vertex on the 2D canvas
