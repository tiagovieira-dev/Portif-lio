const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

let particles = [];
let scrollTarget = 0;
let scrollCurrent = 0;

function getParticleCount() {
  const width = window.innerWidth;
  const dpr = window.devicePixelRatio || 1;

  if (width <= 768) return 70;

  if (width <= 1024) return 100;

  if (width >= 2560) return 90;

  if (dpr > 1.5) return 140;

  return 200;
}

const CONFIG = {
  count: getParticleCount(),
  color: "#17D1B2",
  maxDistance: 120,
};

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resize();

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);

  resizeTimeout = setTimeout(() => {
    resize();
    CONFIG.count = getParticleCount();
    init();
  }, 200);
});

window.addEventListener("scroll", () => {
  scrollTarget = window.scrollY;
});

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.size = Math.random() * 2 + 0.5;

    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;

    this.depth = Math.random();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
  }

  draw() {
    const y =
      (this.y + scrollCurrent * (0.05 + this.depth * 0.15)) %
      canvas.height;

    this.renderY = y;

    ctx.beginPath();
    ctx.arc(this.x, y, this.size, 0, Math.PI * 2);

    ctx.fillStyle = `rgba(23, 209, 178, ${0.15 + this.depth * 0.3})`;
    ctx.fill();
  }
}

function drawLines() {
  const maxDistSq = CONFIG.maxDistance * CONFIG.maxDistance;

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].renderY - particles[j].renderY;

      const distSq = dx * dx + dy * dy;

      if (distSq < maxDistSq) {
        const opacity = 1 - distSq / maxDistSq;

        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].renderY);
        ctx.lineTo(particles[j].x, particles[j].renderY);

        ctx.strokeStyle = `rgba(23, 209, 178, ${opacity * 0.2})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }
}


function init() {
  particles = [];

  for (let i = 0; i < CONFIG.count; i++) {
    particles.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // suaviza scroll (parallax)
  scrollCurrent += (scrollTarget - scrollCurrent) * 0.08;

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  }

  drawLines();

  requestAnimationFrame(animate);
}

init();
animate();