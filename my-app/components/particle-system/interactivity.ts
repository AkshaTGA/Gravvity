import { useFrame } from "@react-three/fiber";
import { Texture } from "three";

const size = 64;
const maxAge = 60;

interface TrailPoint {
    x: number;
    y: number;
    age: number;
    force: number;
}

// Global trail array state
const trail: TrailPoint[] = [];

const easeOutSine = (currentTime: number, startValue: number, changeInValue: number, duration: number) => {
    return changeInValue * Math.sin((currentTime / duration) * (Math.PI / 2)) + startValue;
};

// Create a hidden canvas for the ripple texture
const canvas = typeof document !== 'undefined' ? document.createElement("canvas") : null;
const ctx = canvas?.getContext("2d");

if (canvas && ctx) {
    canvas.width = size;
    canvas.height = size;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, size, size);
}

// Global texture instance bound to the canvas
export const interactivityTexture = canvas ? new Texture(canvas) : new Texture();

export const useInteractivity = () => {
    const drawTouch = (point: TrailPoint) => {
        if (!ctx) return;
        const pos = {
            x: point.x * size,
            y: (1 - point.y) * size,
        };

        let intensity = 1;
        if (point.age < maxAge * 0.3) {
            intensity = easeOutSine(point.age / (maxAge * 0.3), 0, 1, 1);
        } else {
            intensity = easeOutSine(1 - (point.age - maxAge * 0.3) / (maxAge * 0.7), 0, 1, 1);
        }

        intensity *= point.force;

        const radius = size * 0.15 * intensity;
        const grd = ctx.createRadialGradient(pos.x, pos.y, radius * 0.25, pos.x, pos.y, radius);

        grd.addColorStop(0, `rgba(255, 255, 255, 0.2)`);
        grd.addColorStop(1, "rgba(0, 0, 0, 0.0)");

        ctx.beginPath();
        ctx.fillStyle = grd;
        ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
        ctx.fill();
    };

    const addTouch = (point: { x: number; y: number }) => {
        let force = 0;
        const last = trail[trail.length - 1];

        if (last) {
            const dx = last.x - point.x;
            const dy = last.y - point.y;
            const dd = dx * dx + dy * dy;

            force = Math.min(dd * 10000, 1);
        }

        trail.push({ x: point.x, y: point.y, age: 0, force });
    };

    useFrame(() => {
        if (!ctx) return;
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, size, size);

        trail.forEach((point, index, array) => {
            point.age++;

            if (point.age > maxAge) {
                array.splice(index, 1);
            } else {
                drawTouch(point);
            }
        });

        interactivityTexture.needsUpdate = true;
    });

    return { addTouch };
};
