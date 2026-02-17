import * as THREE from "three";

export const setupFloor = (scene) => {
  const textureLoader = new THREE.TextureLoader();

  // Load the textures
  const colorTexture = textureLoader.load(
    "/WoodFloor040_4K-JPG/WoodFloor040_2K-PNG_Color.png"
  );
  colorTexture.colorSpace = THREE.SRGBColorSpace;

  const displacementTexture = textureLoader.load(
    "/WoodFloor040_4K-JPG/WoodFloor040_2K-PNG_Displacement.png"
  );
  const normalTexture = textureLoader.load(
    "/WoodFloor040_4K-JPG/WoodFloor040_2K-PNG_NormalGL.png"
  );
  const roughnessTexture = textureLoader.load(
    "/WoodFloor040_4K-JPG/WoodFloor040_2K-PNG_Roughness.png"
  );
  const aoTexture = textureLoader.load(
    "/WoodFloor040_4K-JPG/WoodFloor040_2K-PNG_AmbientOcclusion.png"
  );

  // Set texture parameters
  colorTexture.wrapS = colorTexture.wrapT = THREE.RepeatWrapping;
  displacementTexture.wrapS = displacementTexture.wrapT = THREE.RepeatWrapping;
  normalTexture.wrapS = normalTexture.wrapT = THREE.RepeatWrapping;
  roughnessTexture.wrapS = roughnessTexture.wrapT = THREE.RepeatWrapping;
  aoTexture.wrapS = aoTexture.wrapT = THREE.RepeatWrapping;

  const planeGeometry = new THREE.PlaneGeometry(45, 45);
  const planeMaterial = new THREE.MeshPhysicalMaterial({
    map: colorTexture,
    normalMap: normalTexture,
    roughnessMap: roughnessTexture,
    aoMap: aoTexture,
    roughness: 0.34,
    metalness: 0.08,
    clearcoat: 0.45,
    clearcoatRoughness: 0.32,
    normalScale: new THREE.Vector2(0.75, 0.75),
    aoMapIntensity: 0.45,
    side: THREE.DoubleSide,
  });

  const floorPlane = new THREE.Mesh(planeGeometry, planeMaterial);

  floorPlane.rotation.x = Math.PI / 2;
  floorPlane.position.y = -Math.PI;
  floorPlane.receiveShadow = true;

  scene.add(floorPlane);
};
