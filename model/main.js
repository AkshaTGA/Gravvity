import * as THREE from "three";
import { scene, setupScene } from "./modules/scene.js";
import { createPaintings } from "./modules/paintings.js";
import { createWalls } from "./modules/walls.js";
import { setupLighting } from "./modules/lighting.js";
import { setupFloor } from "./modules/floor.js";
import { createCeiling } from "./modules/ceiling.js";
import { createBoundingBoxes } from "./modules/boundingBox.js";
import { setupRendering } from "./modules/rendering.js";
import { setupEventListeners } from "./modules/eventListeners.js";
import { addObjectsToScene } from "./modules/sceneHelpers.js";
import { setupPlayButton, setupLoadingScreen, THREE_LOADING_MANAGER_HOOK } from "./modules/menu.js";
import { setupAudio } from "./modules/audioGuide.js";
import { clickHandling } from "./modules/clickHandling.js";
import { loadBenchModel } from "./modules/bench.js";
import { setupFppHand } from "./modules/fppHand.js";
import { loadDecor } from "./modules/decor.js";


const baseUrl = import.meta.env.BASE_URL || "/";
const simulationAssetPrefixes = [
  "/textures/",
  "/models/",
  "/artworks/",
  "/OfficeCeiling005_4K-JPG/",
  "/WoodFloor040_4K-JPG/",
  "/sounds/",
  "/img/",
];

THREE.DefaultLoadingManager.setURLModifier((url) => {
  if (/^(https?:)?\/\//.test(url) || url.startsWith("data:") || url.startsWith("blob:")) return url;
  if (
    url.startsWith("/") &&
    simulationAssetPrefixes.some((prefix) => url.startsWith(prefix))
  ) {
    return `${baseUrl}${url.slice(1)}`;
  }
  return `${baseUrl}${url}`;
});

/* Wire up loading progress */
THREE.DefaultLoadingManager.onProgress = (url, loaded, total) => {
  if (THREE_LOADING_MANAGER_HOOK.onProgress) {
    THREE_LOADING_MANAGER_HOOK.onProgress(url, loaded, total);
  }
};

const loadingScreen = setupLoadingScreen();

const { camera, controls, renderer } = setupScene();

setupFppHand(camera);

setupAudio(camera);

const textureLoader = new THREE.TextureLoader();

const walls = createWalls(scene, textureLoader);
setupFloor(scene);
createCeiling(scene, textureLoader);

async function initMetaverseGallery() {
  try {
    const paintings = await createPaintings(scene, textureLoader);

    setupLighting(scene, paintings, renderer);

    createBoundingBoxes(walls);
    createBoundingBoxes(paintings);

    addObjectsToScene(scene, paintings);

    setupPlayButton(controls);
    setupEventListeners(controls);

    clickHandling(renderer, camera, paintings);
    setupRendering(scene, camera, renderer, paintings, controls, walls);

    loadBenchModel(scene);
    loadDecor(scene, paintings);
  } catch (error) {
    console.error("Metaverse gallery initialization failed:", error);
  } finally {
    /* Hide loading screen once everything is ready */
    loadingScreen.finish();
  }
}

void initMetaverseGallery();
