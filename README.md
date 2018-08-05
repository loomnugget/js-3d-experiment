# 3D Physics Engine

## Summary
This project is a 3D engine from scrach, inspired by a desire to undertand how beautiful UI elements and particle effects were created. My main goal was to gain a deeper understanding of how to create cool 3D experiences by learning the math behind it all. I began this project largely as a way to learn programming and plan to expand this into a larger library of 3D experiences and data visualizations.

The sample consists of a variety of different rotating polyhedra and starfields with some basic physics effects. To run the sample:
```npm install```

## Library Modules
Included are several modules that perform vector and matrix calculations in 2d and 3d for use in rendering differnt scenes. 

### Vector Operations
**Vector3D.transformCoordinates**: multiplies a vector by the transformation matrix. This is needed for the final step of the matrix calculations needed to rotate an object.

### Matrix Calculations
**Matrix.LookatLH**: Generates a new matrix resulting from the camera object looking at the mesh

**Matrix.PerspectiveLH**: Generates a new matrix to show perspective

**Matrix.PerspectiveFovLH**: Generates a new matrix taking parameters (field of view, aspect ratio, closest distance from the camera and furthest distance from the camera (represented by z value))

**Matrix.Translation**: Generates a new matrix that moves all points by specified values

**Matrix.rotationYPR**: Generates the final rotation matrix, which is the result of multiplying rotational matrices about the x, y and z axis. (yaw, pitch and roll are just aeronautical terms to denote rotation about x, y and z axes).

### Set up the main program
**Mesh**: The object we are working with - has properties vertices, rotation and center

**Camera**: Set up the view of the mesh - has initial properties position (camera location), target (what the camera is looking at) and up(where the top of the camera is pointing)

**Device**: Sets up the canvas

**Device.prototype.Clear**: Clears canvas between each frame

**Device.prototype.Project**: Takes 3d coordinates, applies all matrix operations, and projects them on to the 2D canvas

**Device.prototype.drawPoint**: Draws each vertex of each mesh

**Device.prototype.Render**: Sets up all 3d operations on every animation frame

### Animation Loop
1. Get View Matrix using camera position, target and up vectors
2. Get Projection Matrix by calculating perspective using the f-value, aspect ratio, and near and far
3. Loop through all meshes in the mesh array
4. Get World Matrix by multiplying the Final Rotation Matrix by the Translation Matrix
5. Get Transform matrix by multiplying the View Matrix by the Projection Matrix
6. For each vertex in the current mesh project 3D coordinates into the 2D space
7. Draw each projected vertex on the 2D canvas
