# How does all of this work?
Notes on calculating 3D coordinates

## Matrix Calculations

TransformedVector = TranslationMatrix * RotationMatrix * ScaleMatrix * OriginalVector
(matrix multiplication causes this to be in the order scaling, rotating, translating)

## Model Matrix
- The model is defined by set of vertices relative to the center of the object (0,0,0)
- To move, apply trans*rot*scale matrices to the vertices in each frame
- This causes the coordinates to be put into 'world space'
- Model space - vertices defined relative to center of the object
- World space - vertices defined relative to center of scene
- Camera space - vertices defined relative to the camera

## Where does the camera come in?
- The camera is located initially at the origin of world space
- We move the camera around the objects
- If you want to move the camera left, it is equivalent to moving the world right

## Z - value
- Depth - distance to the camera
- A vertex with a larger z value will be closer to the center of the screen

# Field of View (FOV)
- Horizontal FOV needs to be converted to radians
- This value represents the zoom, like a camera lens (between 90 and 30)
- 4f/3f = aspect ratio (800/600 or 1280/960)
- 0.1f - near clipping plane - keep as large as possible
- 100f far clipping plane - keep as small as possible (due to precision)
- Display range is near to far

# Projection Matrix
- Once we are in camera space, a vertex with x,y = 0  should be at the center of this space
- To get perspective, take into account z values for a final transform
- This is represented by 4x4 matrix [FOV, aspectRatio, near, far]
- After this multiplication, we will be in homogenous space (all vertices are within a small cube (the screen))

## Matrix Transformation Summary
model coordinates -> [model matrix] -> world coordinates -> [view matrix] -> camera coordinates -> [projection matrix] -> homogenous coordinates

- Homogenous coordinates are vector (x, y, z, w), where w = 1 represents a position in space and w = 0 represents a direction
- After being multiplied by the projection matrix, homogenous coordinates are divided by their own w (-z)
- Points that are far away from the origin are divided by a larger z value, and as their x and y coordinates become smaller and points become closer to each other the objects seem smaller, giving them perspective
- Normalized coordinates are when clip coordinates are divided by w (perspective), which makes them all from -1 to 1 on each axis --> these are then projected onto the 2D canvas

# Doing calulations for Camera Matrix
Matrix.lookAt [
  vector3D(4,3,3), - camera position in world space
  vector3D(0,0,0), - looking at the origin
  vector3D(0,1,0), - head is up (-1 would be down)
]

MVP = Projection * View * Model **Always backwards! **

# Yaw, Pitch and RotationYawPitchRoll
- Rotation terms using Euclidean coordinate system (euler angles)
- Pitch - rotation in the x axis
- Yaw - rotation in the y axis
- Roll - rotation in the z axis
