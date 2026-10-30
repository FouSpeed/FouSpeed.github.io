// Labyrinthe de l'accueil : généré par exploration en profondeur (DFS),
// résolu par parcours en largeur (BFS), puis dessiné sur un canvas.

(function () {
  const canvas = document.getElementById("maze");
  const button = document.getElementById("maze-new");
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Murs de chaque case : haut, droite, bas, gauche
  const N = 0, E = 1, S = 2, W = 3;
  const DIRS = [
    { d: N, dx: 0, dy: -1, opp: S },
    { d: E, dx: 1, dy: 0, opp: W },
    { d: S, dx: 0, dy: 1, opp: N },
    { d: W, dx: -1, dy: 0, opp: E },
  ];

  let size, cells, carveOrder, path, frame;

  function color(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function generate() {
    size = canvas.clientWidth < 340 ? 11 : 15;
    cells = [];
    for (let y = 0; y < size; y++) {
      cells.push([]);
      for (let x = 0; x < size; x++) {
        cells[y].push({ walls: [true, true, true, true], seen: false });
      }
    }

    // DFS itératif : on avance tant qu'il reste un voisin non visité, sinon on recule
    carveOrder = [];
    const stack = [[0, 0]];
    cells[0][0].seen = true;
    while (stack.length) {
      const [x, y] = stack[stack.length - 1];
      const next = shuffle(DIRS.slice()).find(({ dx, dy }) => {
        const nx = x + dx, ny = y + dy;
        return nx >= 0 && ny >= 0 && nx < size && ny < size && !cells[ny][nx].seen;
      });
      if (!next) { stack.pop(); continue; }
      const nx = x + next.dx, ny = y + next.dy;
      cells[y][x].walls[next.d] = false;
      cells[ny][nx].walls[next.opp] = false;
      cells[ny][nx].seen = true;
      carveOrder.push([nx, ny]);
      stack.push([nx, ny]);
    }

    // entrée en haut à gauche, sortie en bas à droite
    cells[0][0].walls[W] = false;
    cells[size - 1][size - 1].walls[E] = false;

    path = solve();
  }

  // BFS : le premier chemin qui atteint la sortie est le plus court
  function solve() {
    const prev = new Map();
    const key = (x, y) => y * size + x;
    const queue = [[0, 0]];
    prev.set(key(0, 0), null);
    while (queue.length) {
      const [x, y] = queue.shift();
      if (x === size - 1 && y === size - 1) break;
      for (const { d, dx, dy } of DIRS) {
        const nx = x + dx, ny = y + dy;
        if (cells[y][x].walls[d]) continue;
        if (nx < 0 || ny < 0 || nx >= size || ny >= size) continue;
        if (prev.has(key(nx, ny))) continue;
        prev.set(key(nx, ny), [x, y]);
        queue.push([nx, ny]);
      }
    }
    const result = [];
    let cur = [size - 1, size - 1];
    while (cur) {
      result.unshift(cur);
      cur = prev.get(key(cur[0], cur[1]));
    }
    return result;
  }

  function setupCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(w * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return w;
  }

  function draw(carvedCount, pathCount) {
    const w = setupCanvas();
    const pad = w * 0.05;
    const cell = (w - 2 * pad) / size;
    const ink = color("--ink");
    const red = color("--margin-red");

    ctx.clearRect(0, 0, w, w);

    // cases déjà creusées (pendant l'animation)
    const visible = new Set([0]);
    for (let i = 0; i < carvedCount; i++) {
      const [x, y] = carveOrder[i];
      visible.add(y * size + x);
    }

    // murs
    ctx.strokeStyle = ink;
    ctx.lineWidth = Math.max(1.5, cell * 0.11);
    ctx.lineCap = "round";
    ctx.beginPath();
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const px = pad + x * cell, py = pad + y * cell;
        const open = visible.has(y * size + x);
        const walls = open ? cells[y][x].walls : [true, true, true, true];
        if (walls[N]) { ctx.moveTo(px, py); ctx.lineTo(px + cell, py); }
        if (walls[E]) { ctx.moveTo(px + cell, py); ctx.lineTo(px + cell, py + cell); }
        if (walls[S]) { ctx.moveTo(px, py + cell); ctx.lineTo(px + cell, py + cell); }
        if (walls[W]) { ctx.moveTo(px, py); ctx.lineTo(px, py + cell); }
      }
    }
    ctx.stroke();

    // chemin solution, en rouge comme une correction
    if (pathCount > 0) {
      ctx.strokeStyle = red;
      ctx.lineWidth = Math.max(2, cell * 0.22);
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(pad - cell * 0.5, pad + cell * 0.5);
      for (let i = 0; i < pathCount; i++) {
        const [x, y] = path[i];
        ctx.lineTo(pad + (x + 0.5) * cell, pad + (y + 0.5) * cell);
      }
      if (pathCount === path.length) {
        ctx.lineTo(pad + (size + 0.5) * cell, pad + (size - 0.5) * cell);
      }
      ctx.stroke();
    }
  }

  function run() {
    cancelAnimationFrame(frame);
    generate();

    if (reduceMotion) {
      draw(carveOrder.length, path.length);
      return;
    }

    // une seule animation : on creuse, puis on trace le chemin
    let carved = 0, traced = 0;
    const carveStep = Math.max(2, Math.ceil(carveOrder.length / 90));
    function tick() {
      if (carved < carveOrder.length) {
        carved = Math.min(carveOrder.length, carved + carveStep);
      } else if (traced < path.length) {
        traced++;
      } else {
        return;
      }
      draw(carved, traced);
      frame = requestAnimationFrame(tick);
    }
    tick();
  }

  button && button.addEventListener("click", run);

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (carveOrder) draw(carveOrder.length, path.length);
    }, 150);
  });

  // ne lance l'animation que quand le labyrinthe est visible
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { io.disconnect(); run(); }
    });
    io.observe(canvas);
  } else {
    run();
  }
})();
