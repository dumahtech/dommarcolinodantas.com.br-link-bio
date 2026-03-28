// ═══════════════════════════════════════════════════
//  Animação de partículas no header
//  Cruzes (símbolo católico) + pontos flutuando
// ═══════════════════════════════════════════════════
(function () {
  const canvas = document.getElementById('particles');
  const ctx    = canvas.getContext('2d');
  const header = canvas.parentElement;

  function resize() {
    canvas.width  = header.offsetWidth;
    canvas.height = header.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Cores da identidade visual
  const COLORS = [
    [69,  91,  207], // azul
    [191, 13,  37 ], // vermelho
    [255, 255, 255], // branco
  ];

  function rnd(a, b) { return a + Math.random() * (b - a); }

  function mkParticle() {
    const c = COLORS[Math.floor(Math.random() * COLORS.length)];
    return {
      x:       rnd(0, canvas.width),
      y:       rnd(0, canvas.height), // posição inicial espalhada
      vx:      rnd(-0.3, 0.3),
      vy:      rnd(-1.0, -0.25),
      size:    rnd(1.5, 4),
      alpha:   rnd(0.06, 0.22),
      color:   c,
      isCross: Math.random() < 0.35,
      rot:     rnd(0, Math.PI * 2),
      rotV:    rnd(-0.015, 0.015),
    };
  }

  const particles = Array.from({ length: 45 }, mkParticle);

  function drawCross(size) {
    const arm = size * 2.8;
    const w   = size * 0.9;
    ctx.fillRect(-arm, -w / 2, arm * 2, w);
    ctx.fillRect(-w / 2, -arm, w, arm * 2);
  }

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of particles) {
      p.x   += p.vx;
      p.y   += p.vy;
      p.rot += p.rotV;

      // Reinicia quando sai pelo topo
      if (p.y < -20) {
        p.x    = rnd(0, canvas.width);
        p.y    = canvas.height + 10;
        p.alpha = rnd(0.06, 0.22);
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle   = `rgb(${p.color[0]},${p.color[1]},${p.color[2]})`;

      if (p.isCross) {
        drawCross(p.size);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    requestAnimationFrame(tick);
  }

  tick();
})();
