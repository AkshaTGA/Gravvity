import * as THREE from 'three';

const playerGroundY = 2;
const gravity = 45;
const jumpVelocity = 15;
const sprintFovBoost = 8;
const fovTransitionSpeed = 10;
const landingKickScale = 0.018;
const maxLandingKick = 0.22;
const landingRecoverSpeed = 20;

let verticalVelocity = 0;
let isOnGround = true;
let baseFov = null;
let landingCameraOffset = 0;

// object to hold the keys pressed
export const keysPressed = {
  Shift: false,
  w: false,
  a: false,
  s: false,
  d: false,
  c: false,
};

export const requestJump = () => {
  if (isOnGround) {
    verticalVelocity = jumpVelocity;
    isOnGround = false;
  }
};

// parameters we get from setupRendering where updateMovement is called. setupRendering gets the parameters from main.jsss
export const updateMovement = (delta, controls, camera, walls) => {
  const walkSpeed = 10;
  const runSpeed = 15;
  const isSprinting = keysPressed.w && keysPressed.Shift;

  const strafeStep = walkSpeed * delta;
  const backwardStep = walkSpeed * delta;
  const forwardStep =
    (isSprinting ? runSpeed : walkSpeed) * delta;

  if (baseFov === null) {
    baseFov = camera.fov;
  }

  // optifine zoom
  let targetFov = isSprinting ? baseFov + sprintFovBoost : baseFov;
  if(keysPressed.c) {
    targetFov = baseFov / 4;
  }

  const smoothedFov = THREE.MathUtils.lerp(
    camera.fov,
    targetFov,
    Math.min(1, delta * fovTransitionSpeed)
  );

  if (Math.abs(smoothedFov - camera.fov) > 0.001) {
    camera.fov = smoothedFov;
    camera.updateProjectionMatrix();
  }

  const previousPosition = camera.position.clone(); // clone the camera position and store it in previousPosition. We will use this to reset the camera position if there is a collision

  // cose self-explanatory
  if (keysPressed.d) {
    controls.moveRight(strafeStep);
  }
  if (keysPressed.a) {
    controls.moveRight(-strafeStep);
  }
  if (keysPressed.w) {
    controls.moveForward(forwardStep);
  }
  if (keysPressed.s) {
    controls.moveForward(-backwardStep);
  }

  // After the movement is applied, we check for collisions by calling the checkCollision function. If a collision is detected, we revert the camera's position to its previous position, effectively preventing the player from moving through walls.
  if (checkCollision(camera, walls)) {
    camera.position.copy(previousPosition); // reset the camera position to the previous position. The `previousPosition` variable is a clone of the camera position before the movement. We use `copy` instead of `set` because `set` will set the position to the same object, so if we change the previousPosition, the camera position will also change. `copy` creates a new object with the same values as the previousPosition.
  }

  verticalVelocity -= gravity * delta;
  camera.position.y += verticalVelocity * delta;

  if (camera.position.y <= playerGroundY) {
    const impactSpeed = Math.abs(verticalVelocity);

    camera.position.y = playerGroundY;

    if (!isOnGround) {
      landingCameraOffset = Math.min(
        maxLandingKick,
        impactSpeed * landingKickScale
      );
    }

    verticalVelocity = 0;
    isOnGround = true;
  } else {
    isOnGround = false;
  }

  if (landingCameraOffset > 0.0005) {
    camera.position.y -= landingCameraOffset;
    landingCameraOffset = THREE.MathUtils.lerp(
      landingCameraOffset,
      0,
      Math.min(1, delta * landingRecoverSpeed)
    );
  }
};

// checkCollision takes the camera and the walls as parameters and returns true if there is a collision and false if there isn't. the camera parameter is the camera object and the walls parameter is the walls group. The paramaters are passed from updateMovement function where checkCollision is called. updateMovement gets the parameters from setupRendering where it is called. setupRendering gets the parameters from main.js where setupRendering is called.
export const checkCollision = (camera, walls) => {
  const playerBoundingBox = new THREE.Box3(); // create a bounding box for the player
  const cameraWorldPosition = new THREE.Vector3(); // create a vector to hold the camera's world position
  camera.getWorldPosition(cameraWorldPosition); // get the camera's world position and store it in cameraWorldPosition. Note: The camera represents the player's position in our case.
  playerBoundingBox.setFromCenterAndSize(
    // set the playerBoundingBox to the camera's world position and size. The size is 1, 1, 1 because the camera is a single point.
    // setFromCenterAndSize takes two parameters: center and size. The center is a Vector3 that represents the center of the bounding box. The size is a Vector3 that represents the size of the bounding box. The size is the distance from the center to the edge of the bounding box in each direction. So, if the size is 1, 1, 1, the bounding box will be 2 units wide, 2 units tall, and 2 units deep. If the size is 2, 2, 2, the bounding box will be 4 units wide, 4 units tall, and 4 units deep.
    cameraWorldPosition, // center
    new THREE.Vector3(1, 1, 1) // size
  );

  for (let i = 0; i < walls.children.length; i++) {
    // loop through each wall
    const wall = walls.children[i]; // get the wall
    if (playerBoundingBox.intersectsBox(wall.BoundingBox)) {
      // check if the playerBoundingBox intersects with the wall's bounding box. If it does, return true.
      return true;
    }
  }

  return false; // if the playerBoundingBox doesn't intersect with any of the walls, return false.
};
