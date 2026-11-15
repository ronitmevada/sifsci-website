const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector("#primary-nav");

if (menuButton && menu) {
  function setMenu(open) {
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    menu.toggleAttribute("data-open", open);
  }

  document.documentElement.classList.add("menu-ready");
  menuButton.hidden = false;
  menuButton.addEventListener("click", () => setMenu(!menu.hasAttribute("data-open")));

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenu(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.hasAttribute("data-open")) {
      setMenu(false);
      menuButton.focus();
    }
  });

  window.matchMedia("(max-width: 720px)").addEventListener("change", () => setMenu(false));
}

const editor = document.querySelector("[data-editor]");

if (editor) {
  const controls = editor.querySelector("[data-controls]");
  const timeline = editor.querySelector("[data-timeline]");
  const play = editor.querySelector("[data-play]");
  const timeLabel = editor.querySelector("[data-time]");
  const track = timeline.querySelector("input");
  const duration = Number(track.max);
  let position = 0;
  let frameId = 0;
  let lastFrame = null;

  function draw(time) {
    position = Math.min(Math.max(time, 0), duration);
    const progress = position / duration;
    const roundedTime = position.toFixed(1);
    track.value = roundedTime;
    track.setAttribute("aria-valuetext", roundedTime + " seconds of " + duration);
    timeLabel.textContent = "00:" + roundedTime.padStart(4, "0");
    editor.style.setProperty("--demo-progress", (progress * 100) + "%");
    editor.style.setProperty("--frame-zoom", 1.015 + progress * 0.22);
    editor.style.setProperty("--frame-offset", (-progress * 4) + "%");
  }

  function pause() {
    cancelAnimationFrame(frameId);
    frameId = 0;
    lastFrame = null;
    play.removeAttribute("data-playing");
    play.setAttribute("aria-label", position >= duration ? "Replay demo" : "Play demo");
  }

  function tick(now) {
    if (lastFrame !== null) draw(position + (now - lastFrame) / 1000);
    if (position >= duration) {
      pause();
      return;
    }
    lastFrame = now;
    frameId = requestAnimationFrame(tick);
  }

  play.addEventListener("click", () => {
    if (frameId) {
      pause();
      return;
    }
    if (position >= duration) draw(0);
    play.setAttribute("data-playing", "");
    play.setAttribute("aria-label", "Pause demo");
    frameId = requestAnimationFrame(tick);
  });

  track.addEventListener("input", () => {
    draw(Number(track.value));
    lastFrame = null;
    if (!frameId || position >= duration) pause();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && frameId) pause();
  });

  draw(0);
  controls.hidden = false;
  timeline.hidden = false;
}
