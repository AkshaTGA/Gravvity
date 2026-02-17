import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { registerChandelierModel } from './lighting.js';

export const loadDecor = (scene, paintings) => {
    const loader = new GLTFLoader();
    const wallLampOffset = new THREE.Vector3(0, -0.1, 0.19);

    const createGlowTexture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;

        const context = canvas.getContext('2d');
        if (!context) {
            return null;
        }

        const gradient = context.createRadialGradient(128, 128, 0, 128, 128, 128);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.35, 'rgba(255, 200, 120, 0.9)');
        gradient.addColorStop(0.7, 'rgba(255, 140, 0, 0.35)');
        gradient.addColorStop(1, 'rgba(255, 140, 0, 0)');

        context.clearRect(0, 0, 256, 256);
        context.fillStyle = gradient;
        context.fillRect(0, 0, 256, 256);

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    };

    const createGlowSprite = (glowTexture) => {
        if (!glowTexture) {
            return null;
        }

        const material = new THREE.SpriteMaterial({
            map: glowTexture,
            color: 0xffaa00,
            transparent: true,
            depthWrite: false
        });

        return new THREE.Sprite(material);
    };

    const addChandelierLights = (centerPosition) => {
        const lightCount = 6;
        const radius = 2.2;
        const yOffset = -3;
        const angleOffset = Math.PI / 6;

        const glowTexture = createGlowTexture();

        for (let i = 0; i < lightCount; i += 1) {
            const angle = (i / lightCount) * Math.PI * 2 + angleOffset;
            const x = centerPosition.x + Math.cos(angle) * radius;
            const z = centerPosition.z + Math.sin(angle) * radius;
            const y = centerPosition.y + yOffset;

            const light = new THREE.PointLight(0xffaa00, 1.5, 10);
            light.position.set(x, y, z);
            light.castShadow = false;
            scene.add(light);

            const glowSprite = createGlowSprite(glowTexture);
            if (glowSprite) {
                glowSprite.position.copy(light.position);
                glowSprite.scale.set(0.6, 0.6, 0.6);
                scene.add(glowSprite);
            }
        }
    };

    const applyEmissiveToGlass = (child) => {
        const setEmissive = (material) => {
            if (!material) {
                return;
            }
            material.emissive = new THREE.Color(0xffaa00);
            material.emissiveIntensity = 2.0;
            material.toneMapped = false;
        };

        if (Array.isArray(child.material)) {
            child.material.forEach(setEmissive);
            return;
        }

        setEmissive(child.material);
    };


    const attachWallLampLights = (model) => {
        const lampTargets = [];
        const glowTexture = createGlowTexture();

        model.traverse((child) => {
            if (!child || typeof child.name !== 'string') {
                return;
            }

            const name = child.name.toLowerCase();
            if (name !== 'industrial_wall_sconce') {
                return;
            }

            // --- Primary PointLight: subtle warm fill from bulb ---
            const glow = new THREE.PointLight(0xfff8f0, 1.1, 16, 1.2);
            glow.position.copy(wallLampOffset);
            glow.castShadow = false;
            child.add(glow);

            // --- Tiny glow point at the bulb (just a bright dot, not a blob) ---
            const glowSprite = createGlowSprite(glowTexture);
            if (glowSprite) {
                glowSprite.material.color.set(0xfff8e0);
                glowSprite.position.copy(wallLampOffset);
                glowSprite.scale.set(0.12, 0.12, 0.12);
                child.add(glowSprite);
            }

            // Apply subtle emissive to lamp glass bulb meshes
            child.traverse((subChild) => {
                if (!subChild.isMesh || !subChild.material) {
                    return;
                }

                const subName = subChild.name.toLowerCase();
                if (subName.includes('glass') || subName.includes('bulb') || subName.includes('lamp')) {
                    const setEmissive = (material) => {
                        if (!material) return;
                        material.emissive = new THREE.Color(0xfff8f0);
                        material.emissiveIntensity = 0.4;
                        material.toneMapped = false;
                    };
                    if (Array.isArray(subChild.material)) {
                        subChild.material.forEach(setEmissive);
                    } else {
                        setEmissive(subChild.material);
                    }
                }
            });

            lampTargets.push(child);
        });

        return lampTargets;
    };

    const loadModel = (path, position, rotation, scale, onLoaded = null) => {
        loader.load(path, (gltf) => {
            const model = gltf.scene;
            model.position.set(...position);
            model.rotation.set(...rotation);
            model.scale.set(...scale);

            model.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            scene.add(model);

            attachWallLampLights(model);

            if (onLoaded) {
                onLoaded(model);
            }
        }, undefined, (error) => {
            console.error('Error loading model:', path, error);
        });
    };

    // Helper for creating individual sconces dynamically
    const createWallSconce = (pos, rot) => {
        loadModel('/models/wall-sconce/industrial_wall_sconce_2k.gltf',
            [pos.x, pos.y, pos.z],
            [rot.x, rot.y, rot.z],
            [8, 8, 8]
        );
    };

    // 1. Chandelier - Center ceiling
    loadModel('/models/chandelier/Chandelier_01_4k.gltf',
        [0, 10, 0],
        [0, 0, 0],
        [7, 7, 7],
        (model) => {
            registerChandelierModel(model);

            // Temporary: inspect chandelier parts for bulb/glass names.
            model.traverse((child) => {
                if (child && typeof child.name === 'string') {
                    console.log('[chandelier] child name:', child.name);
                }
                if (child && child.name === 'Line008000_1') {
                    applyEmissiveToGlass(child);
                }
            });

            addChandelierLights(model.position.clone());
        }
    );

    // 2. Wooden Table - Center of the room
    loadModel('/models/wooden-table/WoodenTable_02_2k.gltf',
        [0, -3.14, 0],
        [0, 0, 0],
        [8, 8, 8]
    );
    // Put a plant on the table
    loadModel('/models/floor-plant/potted_plant_04_2k.gltf',
        [0, 0.2, 0],
        [0, Math.random() * Math.PI, 0],
        [4, 4, 4]
    );

    // 3. (Old Wall Sconces - Removed in favor of dynamic painting lighting)
    // Dynamic sconces are handled below based on painting positions.


    // 4. Bull Head - Back Wall
    loadModel('/models/bull-head/bull_head_2k.gltf',
        [0, 10, 19.8],
        [0, Math.PI, 0],
        [60, 60, 60]
    );
    // Spotlight for Bull Head
    const spot = new THREE.SpotLight(0xffffff, 3.0);
    spot.position.set(0, 15, 12);
    spot.target.position.set(0, 10, 19.8);
    spot.angle = Math.PI / 6;
    spot.penumbra = 0.5;
    spot.decay = 1;
    spot.distance = 30;
    spot.castShadow = true;
    spot.shadow.mapSize.width = 512;
    spot.shadow.mapSize.height = 512;
    scene.add(spot);
    scene.add(spot.target);

    // 5. Floor Plants - Corners
    const corners = [
        [-18, -3.14, -18],
        [18, -3.14, -18],
        [-18, -3.14, 18],
        [18, -3.14, 18]
    ];
    corners.forEach(pos => {
        loadModel('/models/floor-plant/potted_plant_04_2k.gltf',
            pos,
            [0, Math.random() * Math.PI, 0],
            [15, 15, 15]
        );
    });

    // 6. Wall Lamps - Dynamically for each painting
    if (paintings) {
        paintings.forEach(painting => {
            const height = 4; // Standard height
            const pos = painting.position.clone();
            const normal = new THREE.Vector3(0, 0, 1)
                .applyEuler(new THREE.Euler(0, painting.rotation.y, 0))
                .normalize();

            // Adjust position: above the painting
            pos.y += height / 2 + 1.0;
            // Push slightly away from the wall so the lamp is not clipping
            pos.add(normal.multiplyScalar(0.65));

            // Create sconce with same rotation as painting
            createWallSconce(pos, {
                x: painting.rotation.x,
                y: painting.rotation.y,
                z: painting.rotation.z
            });
        });
    }
};
