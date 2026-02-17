import * as THREE from "three";

// create a function that takes a scene and a textureLoader as arguments that will be passed in from main.js where the createCeiling is called
export const createCeiling = (scene, textureLoader) => {
  // Load the textures
  const colorTexture = textureLoader.load(
    "/OfficeCeiling005_4K-JPG/OfficeCeiling005_2K-PNG_Color.png"
  );
  colorTexture.colorSpace = THREE.SRGBColorSpace;

  const displacementTexture = textureLoader.load(
    "/OfficeCeiling005_4K-JPG/OfficeCeiling005_2K-PNG_Displacement.png"
  );
  const aoTexture = textureLoader.load(
    "/OfficeCeiling005_4K-JPG/OfficeCeiling005_2K-PNG_AmbientOcclusion.png"
  );
  const emissionTexture = textureLoader.load(
    "/OfficeCeiling005_4K-JPG/OfficeCeiling005_2K-PNG_Emission.png"
  );
  const metalnessTexture = textureLoader.load(
    "/OfficeCeiling005_4K-JPG/OfficeCeiling005_2K-PNG_Metalness.png"
  );
  const normalGLTexture = textureLoader.load(
    "/OfficeCeiling005_4K-JPG/OfficeCeiling005_2K-PNG_NormalGL.png"
  );
  const roughnessTexture = textureLoader.load(
    "/OfficeCeiling005_4K-JPG/OfficeCeiling005_2K-PNG_Roughness.png"
  );

  // Set texture parameters
  colorTexture.wrapS = colorTexture.wrapT = THREE.RepeatWrapping;
  displacementTexture.wrapS = displacementTexture.wrapT = THREE.RepeatWrapping;
  aoTexture.wrapS = aoTexture.wrapT = THREE.RepeatWrapping;
  emissionTexture.wrapS = emissionTexture.wrapT = THREE.RepeatWrapping;
  metalnessTexture.wrapS = metalnessTexture.wrapT = THREE.RepeatWrapping;
  normalGLTexture.wrapS = normalGLTexture.wrapT = THREE.RepeatWrapping;
  roughnessTexture.wrapS = roughnessTexture.wrapT = THREE.RepeatWrapping;

  const ceilingGeometry = new THREE.PlaneGeometry(45, 40);
  const ceilingMaterial = new THREE.MeshLambertMaterial({
    map: colorTexture,
    displacementMap: displacementTexture,
    aoMap: aoTexture,
    emissiveMap: emissionTexture,
    metalnessMap: metalnessTexture,
    normalMap: normalGLTexture,
    roughnessMap: roughnessTexture,
    displacementScale: 0.1,
    side: THREE.DoubleSide,
  });
  const ceilingPlane = new THREE.Mesh(ceilingGeometry, ceilingMaterial);

  ceilingPlane.rotation.x = Math.PI / 2;

  ceilingPlane.position.y = 10;

  scene.add(ceilingPlane);
};
