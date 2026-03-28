export const fragment = `
precision highp float;

uniform sampler2D uTexture;
varying vec2 vPUv;
varying vec2 vUv;

void main() {
	vec2 puv = vPUv;
    vec4 text = texture2D(uTexture, puv);

    if(text.a < 0.05) discard;

    // --- Global Image Rounded Corners ---
    // Clip the 400x400 particle grid to a rounded rectangle with ~20px radius
    vec2 centerPuv = puv - 0.5;
    vec2 size = vec2(0.5);
    float cornerRadius = 0.05; // 0.05 * 400px = 20px radius
    vec2 d = abs(centerPuv) - size + vec2(cornerRadius);
    float boxDist = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - cornerRadius;
    if (boxDist > 0.0) discard;

    // Sharp-edged circular disk — crisp photo when fully formed
    vec2 uv = vUv - 0.5;
    float dist = length(uv);
    float sharpDisk = 1.0 - smoothstep(0.44, 0.5, dist);
    if (sharpDisk < 0.01) discard;

    // Subtle brightness/contrast lift so the photo looks vivid
    vec3 color = text.rgb;
    color = color * 1.06 + vec3(0.008, 0.006, 0.012);

    gl_FragColor = vec4(color, text.a * sharpDisk);
}
`

export const vertex = `
precision highp float;
const float PI = 3.1415926535897932384626433832795;

attribute vec3 offset; 
attribute float index;

varying vec2 vUv;
varying vec2 vPUv;

uniform float uTime;
uniform float uSize;
uniform float uDepth;
uniform float uScatter;

uniform vec2 uTextureSize;
uniform sampler2D uRayTexture;
uniform sampler2D uTexture;

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// GPU-safe 2D hash — works perfectly for ALL input ranges (no sin() precision issue)
// The old random(float) used sin() which breaks for indices > ~65536
float hash21(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
}

// Convenience: 2 random values from one 2D seed
vec2 hash22(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.xx + p3.yz) * p3.zy);
}

void main() {
	vUv = uv;

    vec2 puv = offset.xy / uTextureSize; 
    vPUv = puv;

    // Use offset.xy (grid coords 0-399) as hash seed — never large, always precise
    vec2 cell = offset.xy;
    float r0 = hash21(cell);
    float r1 = hash21(cell + 127.1);
    float r2 = hash21(cell + 269.5);
    float r3 = hash21(cell + 419.2);
    float r4 = hash21(cell + 631.7);
    float r5 = hash21(cell + 853.3);
    vec2  r67 = hash22(cell + 71.0);

    vec4 text = texture2D(uTexture, puv);
	float colorIntensity = text.r * 0.27 + text.g * 0.52 + text.b * 0.31;
    
    vec3 displaced = offset;

    // Sub-pixel jitter — breaks visible grid seams when formed
    displaced.x += (r0 - 0.5) * 0.5;
    displaced.y += (r1 - 0.5) * 0.5;
    
	float rndz = r2 + snoise(vec2(cell.x * 0.1, uTime * 0.1));

    // XY drift only during scatter — rock-steady when formed
    displaced.xy += (r67 - 0.5) * uScatter * 8.0;

	// Depth gated by uScatter — zero z shift when fully formed
    displaced.z -= abs(rndz) * r3 * 2.0 * uDepth * uScatter;
	
    // Every particle scatters to a unique far-away position
    vec3 scatterPos = vec3(
        (r0 - 0.5) * 2400.0,
        (r4 - 0.5) * 2400.0,
        -(r5 * 2000.0 + 600.0)
    );
    displaced += scatterPos * uScatter;

	displaced.xy -= uTextureSize * 0.5;

    float t = texture2D(uRayTexture, puv).r;
	// Mouse ripple — only when formed
	displaced.x += t * 14.0 * rndz * (r0 - 0.5) * (1.0 - uScatter);
	displaced.y += t * 14.0 * rndz * (r1 - 0.5) * (1.0 - uScatter);
    
    // Formed: slight overlap to seal grid gaps; scattering: shrink to dots
    float noiseVar = snoise(vec2(uTime * 0.06, cell.y * 0.03 + cell.x * 0.01)) * 0.06 + 1.0;
    float colorBoost = mix(0.88, 1.0, colorIntensity);
    float formedSize = uSize * noiseVar * colorBoost;
    float psize = mix(formedSize, 0.02, uScatter);

    vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
	mvPosition.xyz += position * psize;
	vec4 finalPosition = projectionMatrix * mvPosition;

    gl_Position = finalPosition;
}
`
