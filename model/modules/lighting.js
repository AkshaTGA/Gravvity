import * as THREE from "three";

let cameraFollowLight = null;
let cameraFollowTarget = null;

export const setupLighting = (scene, paintings) => {
  // Ambient light
  const ambientLight = new THREE.AmbientLight(0xfff7ea, 0.22);
  scene.add(ambientLight);

  // Hemisphere light
  const hemisphereLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 0.5);
  scene.add(hemisphereLight);

  const frontFill = new THREE.PointLight(0xffefcc, 0.28, 60);
  frontFill.position.set(0, 6, -8);
  scene.add(frontFill);

  const backFill = new THREE.PointLight(0xdde8ff, 0.2, 60);
  backFill.position.set(0, 6, 8);
  scene.add(backFill);

  const overheadFill = new THREE.PointLight(0xfff6e8, 0.2, 90);
  overheadFill.position.set(0, 8.5, 0);
  scene.add(overheadFill);

  function createSpotlight(x, y, z, intensity, targetPosition) {
    const spotlight = new THREE.SpotLight(0xfff6df, intensity);
    spotlight.position.set(x, y, z);
    spotlight.target.position.copy(targetPosition);
    spotlight.castShadow = true;
    spotlight.angle = 1.57079;
    spotlight.penumbra = 0.48;
    spotlight.decay = 1;
    spotlight.distance = 42;
    spotlight.shadow.mapSize.width = 512;
    spotlight.shadow.mapSize.height = 512;
    spotlight.shadow.bias = -0.00008;
    spotlight.shadow.normalBias = 0.03;
    spotlight.shadow.radius = 2;
    spotlight.shadow.focus = 0.9;
    spotlight.shadow.camera.near = 0.5;
    spotlight.shadow.camera.far = 35;

    // Add spotlight and its target to the scene
    scene.add(spotlight);
    scene.add(spotlight.target);

    return spotlight;
  }

  createSpotlight(
    0,
    6.7,
    -13,
    0.88,
    new THREE.Vector3(0, 0, -20)
  );

  createSpotlight(
    0,
    6.7,
    13,
    0.84,
    new THREE.Vector3(0, 0, 20)
  );

  createSpotlight(
    -13,
    6.7,
    0,
    0.84,
    new THREE.Vector3(-20, 0, 0)
  );

  createSpotlight(
    13,
    6.7,
    0,
    0.84,
    new THREE.Vector3(20, 0, 0)
  );

  cameraFollowTarget = new THREE.Object3D();
  scene.add(cameraFollowTarget);

  cameraFollowLight = new THREE.SpotLight(0xfff9f0, 0.26);
  cameraFollowLight.angle = 0.62;
  cameraFollowLight.penumbra = 0.72;
  cameraFollowLight.decay = 1.2;
  cameraFollowLight.distance = 24;
  cameraFollowLight.castShadow = false;
  cameraFollowLight.shadow.mapSize.width = 1024;
  cameraFollowLight.shadow.mapSize.height = 1024;
  cameraFollowLight.shadow.bias = -0.0001;
  cameraFollowLight.shadow.normalBias = 0.02;
  cameraFollowLight.shadow.radius = 3;
  cameraFollowLight.shadow.camera.near = 0.2;
  cameraFollowLight.shadow.camera.far = 35;
  cameraFollowLight.target = cameraFollowTarget;

  scene.add(cameraFollowLight);
};

const worldDirection = new THREE.Vector3();
const eyeOffset = new THREE.Vector3(0, 1.1, 0);

export const syncCameraLight = (camera) => {
  if (!cameraFollowLight || !cameraFollowTarget) {
    return;
  }

  camera.getWorldDirection(worldDirection);

  cameraFollowLight.position.copy(camera.position).add(eyeOffset);
  cameraFollowTarget.position
    .copy(cameraFollowLight.position)
    .add(worldDirection.multiplyScalar(8));

  cameraFollowTarget.updateMatrixWorld();
};

export const registerChandelierModel = (model) => {
  if (!model) {
    return;
  }

  // Add a soft point light to the chandelier model to simulate glow.
  const chandelierLight = new THREE.PointLight(0xfff2d6, 0.6, 18, 1.5);
  chandelierLight.position.set(0, 0.6, 0);
  chandelierLight.castShadow = false;
  model.add(chandelierLight);
};
