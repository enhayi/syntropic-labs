/**
 * Syntropic Labs — Symplectic Manifold & Phase-Space Orbit Visualizer
 * Simulates a continuous Hamiltonian dynamical system with chaotic limit attractors,
 * representing financial market phase space trajectories converging from entropy to syntropy.
 */

(function () {
  const canvas = document.getElementById('manifoldCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = canvas.parentElement.offsetWidth);
  let height = (canvas.height = canvas.parentElement.offsetHeight);

  window.addEventListener('resize', () => {
    if (!canvas.parentElement) return;
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
    initParticles();
  });

  // Mouse interaction state
  let mouse = {
    x: width / 2,
    y: height / 2,
    active: false,
  };

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  // Particle configuration
  const PARTICLE_COUNT = 85;
  let particles = [];

  class PhaseParticle {
    constructor() {
      this.reset();
    }

    reset() {
      // Phase space coordinates (p: momentum/drift, q: position/price)
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.radius = Math.random() * 1.8 + 0.8;
      this.alpha = Math.random() * 0.6 + 0.2;
      this.phase = Math.random() * Math.PI * 2;
      this.orbitSpeed = (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1);
      this.color = Math.random() > 0.3 ? '#0df2c8' : '#38bdf8';
    }

    update() {
      this.phase += this.orbitSpeed;

      // Hamiltonian flow field vectors
      const dx = this.x - width / 2;
      const dy = this.y - height / 2;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;

      // Non-linear symplectic rotation + drift towards syntropic equilibrium
      const fx = -dy * 0.0015 + (Math.sin(this.phase) * 0.4);
      const fy = dx * 0.0015 + (Math.cos(this.phase) * 0.4);

      this.vx += fx * 0.15;
      this.vy += fy * 0.15;

      // Damping
      this.vx *= 0.985;
      this.vy *= 0.985;

      // Mouse field attraction/repulsion
      if (mouse.active) {
        const mdx = mouse.x - this.x;
        const mdy = mouse.y - this.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy) || 1;
        if (mdist < 220) {
          const force = (1 - mdist / 220) * 0.35;
          this.vx += (mdx / mdist) * force;
          this.vy += (mdy / mdist) * force;
        }
      }

      this.x += this.vx;
      this.y += this.vy;

      // Boundary wraps
      if (this.x < -20) this.x = width + 20;
      if (this.x > width + 20) this.x = -20;
      if (this.y < -20) this.y = height + 20;
      if (this.y > height + 20) this.y = -20;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new PhaseParticle());
    }
  }

  // Draw topological geodesics (connections)
  function drawGeodesics() {
    ctx.lineWidth = 0.5;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 115) {
          const alpha = (1 - dist / 115) * 0.22;
          ctx.strokeStyle = '#0df2c8';
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  // Render loop
  function animate() {
    ctx.clearRect(0, 0, width, height);

    drawGeodesics();

    for (let p of particles) {
      p.update();
      p.draw();
    }

    requestAnimationFrame(animate);
  }

  initParticles();
  animate();
})();
