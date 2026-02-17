import { existsSync, mkdirSync, rmSync, cpSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const appRoot = resolve(__dirname, "..");
const modelRoot = resolve(appRoot, "..", "model");
const modelNodeModules = join(modelRoot, "node_modules");
const modelDist = join(modelRoot, "dist");
const targetDir = join(appRoot, "public", "metaverse-sim");

function run(command, args, cwd) {
  const result = spawnSync(command, args, {
    cwd,
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

if (!existsSync(modelRoot)) {
  console.error("[metaverse-sync] Missing sibling model folder at ../model");
  process.exit(1);
}

if (!existsSync(modelNodeModules)) {
  console.log("[metaverse-sync] Installing model dependencies...");
  run("npm", ["install"], modelRoot);
}

console.log("[metaverse-sync] Building model simulation...");
run("npm", ["run", "build"], modelRoot);

if (!existsSync(modelDist)) {
  console.error("[metaverse-sync] Model build did not produce dist/");
  process.exit(1);
}

console.log("[metaverse-sync] Syncing model dist to public/metaverse-sim...");
rmSync(targetDir, { recursive: true, force: true });
mkdirSync(targetDir, { recursive: true });
cpSync(modelDist, targetDir, { recursive: true });

console.log("[metaverse-sync] Metaverse assets ready.");
