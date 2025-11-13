// Burger menu
const burger = document.getElementById("burger");
const navMenu = document.getElementById("navMenu")?.querySelector("ul");
burger?.addEventListener("click", () => navMenu?.classList.toggle("active"));

// Timeline
const steps = document.querySelectorAll(".timeline-step");
const contents = document.querySelectorAll(".step-content");

steps.forEach(step => {
  step.addEventListener("click", () => {
    const target = step.dataset.step;
    steps.forEach(s => s.classList.remove("active"));
    step.classList.add("active");
    contents.forEach(c => c.classList.remove("active"));
    document.querySelector(`.step-content[data-step="${target}"]`)?.classList.add("active");
  });
});

// Orbital Awards
const orbitImgs = document.querySelectorAll('.orbit img');
let angle = 0;

function rotateOrbit() {
  const centerX = 200; // половина контейнера
  const centerY = 200;
  const radius = 150; // расстояние от центра

  orbitImgs.forEach((img, index) => {
    const total = orbitImgs.length;
    const theta = (360 / total) * index + angle;
    const rad = theta * (Math.PI / 180);
    img.style.left = `${centerX + radius * Math.cos(rad) - img.offsetWidth/2}px`;
    img.style.top = `${centerY + radius * Math.sin(rad) - img.offsetHeight/2}px`;
  });

  angle += 0.5; // скорость вращения
  requestAnimationFrame(rotateOrbit);
}

rotateOrbit();
