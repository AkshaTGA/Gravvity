import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

export const loadBenchModel = (scene) => {
  const loader = new GLTFLoader();

  loader.load(
    "/models/bench_2/scene.gltf",
    (gltf) => {
      const bench = gltf.scene;

      bench.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      bench.position.set(0, -3.12, -8);
      bench.rotation.set(0, 0, 0);
      bench.scale.set(3, 3, 3);

      scene.add(bench);
    },
    undefined,
    (error) => {
      console.error("An error occurred while loading the bench model.", error);
    }
  );
};
