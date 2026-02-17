let hasEnteredSimulation = false;

function setButtonLabel() {
  const playButton = document.getElementById('lock_pointer_button');
  if (!playButton) return;

  const span = playButton.querySelector('span');
  const target = span || playButton;
  target.textContent = hasEnteredSimulation
    ? 'Continue Exploring'
    : 'Start Exploring';
}

export const hideMenu = () => {
  const menu = document.getElementById('lock-ui');
  const crosshair = document.getElementById('crosshair');
  if (menu) {
    menu.style.display = 'none';
  }
  if (crosshair) crosshair.style.display = 'block';
  document.body.classList.add('is-pointer-locked');
};

export const showMenu = () => {
  const menu = document.getElementById('lock-ui');
  const crosshair = document.getElementById('crosshair');
  setButtonLabel();
  if (menu) {
    menu.style.display = 'block';
  }
  if (crosshair) crosshair.style.display = 'none';
  document.body.classList.remove('is-pointer-locked');
};

export const isMenuVisible = () => {
  const menu = document.getElementById('lock-ui');
  return menu && menu.style.display !== 'none';
};

export const toggleMenu = (controls) => {
  if (controls.isLocked) {
    controls.unlock();
  } else {
    controls.lock();
  }
};

export const startExperience = (controls) => {
  hasEnteredSimulation = true;
  controls.lock();
};

/* ─── Loading screen management ─── */
function spawnParticles() {
  const container = document.getElementById('loading-particles');
  if (!container) return;
  // Reduce particle count slightly for lower end devices but keep visual effect
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'loading-particle';
    p.style.contentVisibility = 'auto'; // Browser optimization
    p.style.willChange = 'transform, opacity'; // Hint for compositor
    p.style.left = `${Math.random() * 100}%`;
    p.style.bottom = `-${Math.random() * 40}px`;
    p.style.animationDuration = `${3 + Math.random() * 5}s`;
    p.style.animationDelay = `${Math.random() * 4}s`;
    p.style.width = p.style.height = `${1.5 + Math.random() * 2.5}px`;
    p.style.opacity = `${0.3 + Math.random() * 0.5}`;
    container.appendChild(p);
  }
}

export function setupLoadingScreen() {
  spawnParticles();

  const loadingScreen = document.getElementById('loading-screen');
  const barFill = document.getElementById('loading-bar-fill');
  const percentText = document.getElementById('loading-percent');
  let targetProgress = 8;
  let visualProgress = 0;
  let isFinished = false;
  let rafId = null;

  const tick = () => {
    const clamped = Math.max(0, Math.min(100, visualProgress));
    // Use transform scaleX for smoother bar animation instead of width, if CSS allows. 
    // Assuming standard width animation for now but optimizing updates.
    if (barFill) barFill.style.width = `${clamped}%`;
    if (percentText) percentText.textContent = `${Math.round(clamped)}%`;
  };

  const animateProgress = () => {
    // Smoother interpolation
    visualProgress += (targetProgress - visualProgress) * 0.08;

    if (Math.abs(targetProgress - visualProgress) < 0.1) {
      visualProgress = targetProgress;
    }

    tick();

    if (!isFinished || visualProgress < 99.9) {
      rafId = requestAnimationFrame(animateProgress);
    }
  };

  animateProgress();

  // More frequent but smaller updates for smoother perceived progress
  const trickleTimer = setInterval(() => {
    if (isFinished) return;
    const step = 0.2 + Math.random() * 0.5;
    targetProgress = Math.min(95, targetProgress + step);
  }, 100);

  const closeLoadingScreen = () => {
    // Force final completion animation
    isFinished = true;
    clearInterval(trickleTimer);
    targetProgress = 100;

    // Quick ramp up to 100%
    const completeAnimation = () => {
      visualProgress += (100 - visualProgress) * 0.2;
      tick();

      if (100 - visualProgress > 0.5) {
        requestAnimationFrame(completeAnimation);
      } else {
        visualProgress = 100;
        tick();
        // Add slight delay before hiding to show 100%
        setTimeout(() => {
          if (loadingScreen && !loadingScreen.classList.contains('done')) {
            loadingScreen.classList.add('done');
            // Clean up particles to free memory
            const container = document.getElementById('loading-particles');
            if (container) container.innerHTML = '';
          }
        }, 300);

        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      }
    };

    // Replace the main loop with the completion loop
    if (rafId) cancelAnimationFrame(rafId);
    completeAnimation();

    // Clear fail-safes
    clearInterval(trickleTimer);
    if (typeof forceFinishTimer !== 'undefined') clearTimeout(forceFinishTimer);
    if (typeof forceHideTimer !== 'undefined') clearTimeout(forceHideTimer);
    if (typeof finishWatchdogTimer !== 'undefined') clearTimeout(finishWatchdogTimer);
  };

  THREE_LOADING_MANAGER_HOOK.onProgress = (_, itemsLoaded, itemsTotal) => {
    if (isFinished) return;

    if (itemsTotal > 0) {
      const managerProgress = (itemsLoaded / itemsTotal) * 100;
      targetProgress = Math.max(targetProgress, Math.min(managerProgress, 96));
    }
  };

  const forceFinishTimer = setTimeout(() => {
    if (!isFinished) {
      targetProgress = Math.max(targetProgress, 99);
      isFinished = true;
      setTimeout(closeLoadingScreen, 550);
    }
  }, 18000);

  const forceHideTimer = setTimeout(() => {
    closeLoadingScreen();
  }, 22000);

  let finishWatchdogTimer = null;

  return {
    finish() {
      if (isFinished) {
        return;
      }

      isFinished = true;
      targetProgress = 100;

      finishWatchdogTimer = setTimeout(() => {
        closeLoadingScreen();
      }, 1400);

      const waitForCompletion = () => {
        if (visualProgress >= 99.4) {
          setTimeout(closeLoadingScreen, 260);
          return;
        }

        requestAnimationFrame(waitForCompletion);
      };

      waitForCompletion();
    }
  };
}

// Mutable hook — main.js will attach the real THREE.DefaultLoadingManager
export const THREE_LOADING_MANAGER_HOOK = { onProgress: null };

export const setupPlayButton = (controls) => {
  const playButton = document.getElementById('lock_pointer_button');
  if (playButton) {
    playButton.addEventListener('click', () => startExperience(controls));
  }

  controls.addEventListener('lock', hideMenu);
  controls.addEventListener('unlock', showMenu);
  setButtonLabel();
  showMenu();
};
