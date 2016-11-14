## Matrix CALCULATIONS

TransformedVector = TranslationMatrix * RotationMatrix * ScaleMatrix * OriginalVector
(matrix multiplication causes this to be in the order scaling, rotating, translating)

- Model, View, and projection

##Model Matrix
- the model is defined by set of vertices relative to the center of the object (0,0,0)
- to move, apply trans*rot*scale matrices to the vertices in each frame!
- this causes them to be put into 'world space'
- Model space - vertices defined relative to center of MODEL
- World space - vertices defined relative to center of WORLD
- Camera space - vertices defined relatively to camera

##Where does the camera come in?
- we move the camera around the objects
- camera initially is at the origin of WORLD space
- if you want to move the camera left, it is equivalent to moving the ENTIRE WORLD right!

##Z- value
- depth- Distance to the camera
- vertex with larger z value will be more towards the center of the screen

#FOV
- Horizontal field of View (FoV) - needs to be converted to radians
- the zoom, like a camera lens (between 90 and 30)
- 4f/3f = aspect ratio (800/600 or 1280/960)
- 0.1f - near clipping plane - keep as large as possible
- 100f far clipping plane - keep as small as possible (due to precision)
- display range is near to far

#Projection Matrix
- now we are in camera space, a vertex with x,y = 0  should be at the center of this space -
- taking into account z values for a final transform will give you perspective!
- Represented by 4x4 matrix [foV, aspectRatio, Near, Far]
- after this multiplication, we will be in HOMOGONEOUS SPACE (all vertices are within a small cube (the screen))

model coordinates -> [model matrix] -> world coordinates -> [view matrix] -> camera coordinates -> [projection matrix] -> homogenous coordinates

- Homogenous coordinates are vector(x,y,z,w), where w=1 represents a position in space and w=0 represents a direction
- after being multiplied by the projection matrix, homogenous coordinates are divided by their own W (-Z) - causes points that are far away from the origin are divided by a larger Z value, and their x and y coordinates become smaller and points become closer to each other, making objects seem smaller which gives them perspective.
- Normalized coordinates are when clip coordinates are divided by w (perspective), which makes them all from -1 to 1 on each axis --> these are then projected onto the 2D canvas

#Doing calulations for Camera Matrix
Matrix.lookAt [
  vector3D(4,3,3), - camera position in world space
  vector3D(0,0,0), - looking at the origin
  vector3D(0,1,0), - head is up (-1 would be down)
]
MVP = Projection * View * Model *****Always backwards!

#Yaw, Pitch and RotationYawPitchRoll
- rotation terms using Euclidean coordinate system (euler angles)
- Pitch - rotation in the x axis
- Yaw - rotation in the y axis
- Roll - rotation in the z axis
