import * as THREE from "three";
import { keysPressed } from "./movement.js";

let handGroup;

const basePosition = { x: 0.5, y: -0.5, z: -0.7 };
const baseRotation = { x: -0.45, y: -0.32, z: -0.08 };

export const setupFppHand = (camera) => {
  handGroup = new THREE.Group();

  const skinMaterial = new THREE.MeshStandardMaterial({
    color: 0xe0b28a,
    roughness: 0.84,
    metalness: 0.02,
    flatShading: true,
  });

  const sleeveMaterial = new THREE.MeshStandardMaterial({
    color: 0x1e40af,
    roughness: 0.82,
    metalness: 0,
    flatShading: true,
  });

  const arm = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.4, 0.17), sleeveMaterial);
  arm.position.set(0, -0.06, 0.02);
  handGroup.add(arm);

  const hand = new THREE.Mesh(new THREE.BoxGeometry(0.145, 0.145, 0.145), skinMaterial);
  hand.position.set(0, 0.195, 0.03);
  handGroup.add(hand);

  handGroup.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = false;
      child.receiveShadow = false;
      child.renderOrder = 999;
      child.material.depthTest = false;
      child.material.depthWrite = true;
    }
  });

  handGroup.position.set(basePosition.x, basePosition.y, basePosition.z);
  handGroup.rotation.set(baseRotation.x, baseRotation.y, baseRotation.z);

  camera.add(handGroup);

  return handGroup;
};

export const animateFppHand = (elapsedTime) => {
  if (!handGroup) {
    return;
  }

  const isMoving =
    keysPressed.w ||
    keysPressed.a ||
    keysPressed.s ||
    keysPressed.d ||
    keysPressed.ArrowUp ||
    keysPressed.ArrowLeft ||
    keysPressed.ArrowDown ||
    keysPressed.ArrowRight;

  const bobAmount = isMoving ? 0.03 : 0.012;
  const bobSpeed = isMoving ? 11 : 3;

  handGroup.position.y = basePosition.y + Math.sin(elapsedTime * bobSpeed) * bobAmount;
  handGroup.rotation.x = baseRotation.x + Math.sin(elapsedTime * bobSpeed) * 0.06;
  handGroup.rotation.z = baseRotation.z + Math.cos(elapsedTime * bobSpeed * 0.5) * 0.018;
};
