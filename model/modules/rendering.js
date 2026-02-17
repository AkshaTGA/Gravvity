import * as THREE from "three";
import { displayPaintingInfo, hidePaintingInfo } from "./paintingInfo.js";
import { updateMovement } from "./movement.js";
import { animateFppHand } from "./fppHand.js";
import { syncCameraLight } from "./lighting.js";

export const setupRendering = (
  scene,
  camera,
  renderer,
  paintings,
  controls,
  walls
) => {
  const clock = new THREE.Clock();
  const raycaster = new THREE.Raycaster();
  raycaster.far = 12;
  const screenCenter = new THREE.Vector2(0, 0);
  const infoDistanceThreshold = 9;
  let currentTargetedInfo = null;
  let frameCount = 0;
  let fpsFrameCounter = 0;
  let fpsTimeAccumulator = 0;

  /* Label fade distance thresholds */
  const labelFadeNear = 5;   // fully invisible when closer than this
  const labelFadeFar = 8;    // fully visible when farther than this

  const fpsHud = document.createElement("div");
  fpsHud.id = "fps-counter";
  fpsHud.textContent = "FPS: --";
  fpsHud.style.position = "fixed";
  fpsHud.style.top = "12px";
  fpsHud.style.right = "12px";
  fpsHud.style.zIndex = "120";
  fpsHud.style.padding = "6px 10px";
  fpsHud.style.borderRadius = "8px";
  fpsHud.style.fontFamily = "monospace";
  fpsHud.style.fontSize = "12px";
  fpsHud.style.color = "#f4f8ff";
  fpsHud.style.background = "rgba(8, 10, 24, 0.72)";
  fpsHud.style.border = "1px solid rgba(255, 255, 255, 0.2)";
  fpsHud.style.pointerEvents = "none";
  document.body.appendChild(fpsHud);

  const resolvePaintingInfo = (object) => {
    let current = object;

    while (current) {
      if (current.userData?.type === "painting" && current.userData?.info) {
        return current.userData.info;
      }
      current = current.parent;
    }

    return null;
  };

  /* Pre-collect label meshes from each painting group (last child is the label) */
  const paintingLabels = paintings.map((group) => {
    const children = group.children;
    const last = children[children.length - 1];
    // Labels are PlaneGeometry meshes added at the end in createPaintings
    if (last && last.isMesh && last.material && last.material.transparent) {
      return last;
    }
    return null;
  });

  const _paintingWorldPos = new THREE.Vector3();

  let render = function () {
    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();
    frameCount += 1;
    fpsFrameCounter += 1;
    fpsTimeAccumulator += delta;

    if (fpsTimeAccumulator >= 0.25) {
      const fps = Math.round(fpsFrameCounter / fpsTimeAccumulator);
      fpsHud.textContent = `FPS: ${fps}`;
      fpsFrameCounter = 0;
      fpsTimeAccumulator = 0;
    }

    updateMovement(delta, controls, camera, walls);
    animateFppHand(elapsedTime);
    syncCameraLight(camera);

    /* ── Fade 3D labels based on camera distance ── */
    if (frameCount % 10 === 0) {
      for (let i = 0; i < paintings.length; i++) {
        const label = paintingLabels[i];
        if (!label) continue;
        paintings[i].getWorldPosition(_paintingWorldPos);
        const dist = camera.position.distanceTo(_paintingWorldPos);
        const t = Math.min(1, Math.max(0, (dist - labelFadeNear) / (labelFadeFar - labelFadeNear)));
        label.material.opacity = t;
        label.visible = t > 0.01;
      }
    }

    const shouldRaycast = controls.isLocked && frameCount % 4 === 0;

    if (shouldRaycast) {
      raycaster.setFromCamera(screenCenter, camera);
      const intersections = raycaster.intersectObjects(paintings, true);
      let nextTargetedInfo = null;

      for (const intersection of intersections) {
        if (intersection.distance > infoDistanceThreshold) {
          continue;
        }

        const info = resolvePaintingInfo(intersection.object);
        if (info) {
          nextTargetedInfo = info;
          break;
        }
      }

      currentTargetedInfo = nextTargetedInfo;
    }

    /* ── Show / hide the HTML info panel ──
       The panel stays visible even when pointer is unlocked (ESC pressed)
       so users can interact with social links. The lock-ui menu
       (bottom-center) and info panel (top-left) don't overlap. */
    if (currentTargetedInfo) {
      displayPaintingInfo(currentTargetedInfo);
    } else {
      hidePaintingInfo();
    }

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };

  render();
};
