// 六角格子と粉雪を描く（毎回同じ結果になるよう固定の乱数）
(function () {
  let seed = 7;
  const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const ns = 'http://www.w3.org/2000/svg';

  document.querySelectorAll('.hexes').forEach((el) => {
    const r = Number(el.dataset.r || 34);
    const color = el.dataset.color || 'rgba(255,255,255,0.18)';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('width', '1200');
    svg.setAttribute('height', '480');
    const w = Math.sqrt(3) * r;
    let d = '';
    for (let row = -1; row < 480 / (r * 1.5) + 1; row++) {
      for (let col = -1; col < 1200 / w + 1; col++) {
        const cx = col * w + (row % 2 ? w / 2 : 0);
        const cy = row * r * 1.5;
        for (let i = 0; i < 6; i++) {
          const a = (Math.PI / 3) * i - Math.PI / 6;
          d += (i ? 'L' : 'M') + (cx + r * Math.cos(a)).toFixed(1) + ' ' + (cy + r * Math.sin(a)).toFixed(1);
        }
        d += 'Z';
      }
    }
    const p = document.createElementNS(ns, 'path');
    p.setAttribute('d', d);
    p.setAttribute('fill', 'none');
    p.setAttribute('stroke', color);
    p.setAttribute('stroke-width', '1.2');
    svg.appendChild(p);
    el.appendChild(svg);
  });

  document.querySelectorAll('.snow').forEach((el) => {
    const n = Number(el.dataset.n || 60);
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('width', '1200');
    svg.setAttribute('height', '480');
    for (let i = 0; i < n; i++) {
      const c = document.createElementNS(ns, 'circle');
      const big = rand() < 0.15;
      c.setAttribute('cx', (rand() * 1200).toFixed(1));
      c.setAttribute('cy', (rand() * 480).toFixed(1));
      c.setAttribute('r', (big ? 2.5 + rand() * 2.5 : 0.8 + rand() * 1.4).toFixed(1));
      c.setAttribute('fill', '#fff');
      c.setAttribute('opacity', (big ? 0.35 + rand() * 0.3 : 0.5 + rand() * 0.5).toFixed(2));
      if (big) c.setAttribute('filter', 'blur(1px)');
      svg.appendChild(c);
    }
    el.appendChild(svg);
  });
})();
