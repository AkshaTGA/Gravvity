import * as THREE from "three";
import { EXRLoader } from 'three-stdlib';

export function createWalls(scene, textureLoader) {
  let wallGroup = new THREE.Group();
  scene.add(wallGroup);

  const diffuseTexture = textureLoader.load(
    "/textures/leather_white_diff_4k.jpg"
  );
  diffuseTexture.colorSpace = THREE.SRGBColorSpace;
  diffuseTexture.wrapS = diffuseTexture.wrapT = THREE.RepeatWrapping;

  const exrLoader = new EXRLoader();
  const normalMap = exrLoader.load("/textures/leather_white_nor_gl_4k.exr");
  // const roughnessMap = exrLoader.load("/textures/leather_white_rough_4k.exr");
  
  normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
  // roughnessMap.wrapS = roughnessMap.wrapT = THREE.RepeatWrapping;

  const wallMaterial = new THREE.MeshStandardMaterial({
    map: diffuseTexture,
    normalMap: normalMap,
    roughness: 0.2, 
    side: THREE.DoubleSide,
  });
  // Front Wall
  const frontWall = new THREE.Mesh( 
    new THREE.BoxGeometry(80, 20, 0.001), 
    wallMaterial 
  );
  frontWall.receiveShadow = true;
  frontWall.castShadow = false;

  frontWall.position.z = -20; 

  // Left Wall
  const leftWall = new THREE.Mesh(
    new THREE.BoxGeometry(80, 20, 0.001), 
    wallMaterial
  );
  leftWall.receiveShadow = true;
  leftWall.castShadow = false;

  leftWall.rotation.y = Math.PI / 2; 
  leftWall.position.x = -20; 

  // Right Wall
  const rightWall = new THREE.Mesh( 
    new THREE.BoxGeometry(80, 20, 0.001), 
    wallMaterial
  );
  rightWall.receiveShadow = true;
  rightWall.castShadow = false;

  rightWall.position.x = 20;
  rightWall.rotation.y = Math.PI / 2; 

  // Back Wall
  const backWall = new THREE.Mesh(
    new THREE.BoxGeometry(80, 20, 0.001),
    wallMaterial 
  );
  backWall.receiveShadow = true;
  backWall.castShadow = false;
  backWall.position.z = 20;

  wallGroup.add(frontWall, backWall, leftWall, rightWall);

  return wallGroup;
}
