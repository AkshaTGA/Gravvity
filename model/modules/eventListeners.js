import { keysPressed, requestJump } from "./movement.js";

/* ── ESC handling ──
   Browsers auto-exit pointer lock on ESC (security).
   We don't need to do anything extra — the unlock event
   in setupPlayButton already shows the menu. */
let _justUnlocked = false;

export const setupEventListeners = (controls) => {
  document.addEventListener(
    "keydown",
    (event) => onKeyDown(event, controls),
    false
  );
  document.addEventListener(
    "keyup",
    (event) => onKeyUp(event, controls),
    false
  );

  controls.addEventListener("unlock", () => {
    _justUnlocked = true;
    requestAnimationFrame(() => { _justUnlocked = false; });
    resetMovementKeys();
  });

  window.addEventListener("blur", resetMovementKeys);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      resetMovementKeys();
    }
  });
};

function onKeyDown(event, controls) {
  if (event.code === "Space") {
    event.preventDefault();
    requestJump();
  }

  setMovementKeyState(event, true);
}

function onKeyUp(event, controls) {
  setMovementKeyState(event, false);
}

function setMovementKeyState(event, state) {
  if (event.key === "Shift" || event.code === "ShiftLeft" || event.code === "ShiftRight") {
    keysPressed.Shift = state;
    return;
  }

  const normalizedKey = event.key.length === 1 ? event.key.toLowerCase() : event.key;

  if (normalizedKey in keysPressed) {
    keysPressed[normalizedKey] = state;
  }
}

function resetMovementKeys() {
  Object.keys(keysPressed).forEach((key) => {
    keysPressed[key] = false;
  });
}
