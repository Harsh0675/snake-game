(() => {
  'use strict';

  const SIZE = 20;
  const gameContainer = document.getElementById('gameContainer');
  const scoreEl = document.getElementById('pointsEarned');
  const bestEl = document.getElementById('bestScore');
  const speedEl = document.getElementById('speedLevel');
  const distanceEl = document.getElementById('blocksTravelled');
  const statusEl = document.getElementById('gameStatus');
  const startPanel = document.getElementById('startPanel');
  const gameOverPanel = document.getElementById('gameOverPanel');
  const finalScoreEl = document.getElementById('finalScore');
  const finalBestEl = document.getElementById('finalBest');
  const pauseButton = document.getElementById('pauseButton');

  const pixels = [];
  for (let i = 0; i < SIZE * SIZE; i++) {
    const cell = document.createElement('div');
    cell.className = 'gameBoardPixel';
    gameContainer.appendChild(cell);
    pixels.push(cell);
  }

  const dirs = {
    ArrowLeft: [-1, 0], ArrowUp: [0, -1], ArrowRight: [1, 0], ArrowDown: [0, 1],
    a: [-1, 0], w: [0, -1], d: [1, 0], s: [0, 1]
  };

  let snake, direction, queuedDirection, food, score, distance, timer, running = false, paused = false;
  let best = Number(localStorage.getItem('snake-arcade-best') || 0);
  bestEl.textContent = best;

  const index = (x, y) => y * SIZE + x;
  const same = (a, b) => a.x === b.x && a.y === b.y;
  const speed = () => Math.min(180, 125 - Math.min(55, Math.floor(score / 5) * 5));

  function randomFood() {
    const free = [];
    for (let y = 0; y < SIZE; y++) for (let x = 0; x < SIZE; x++) {
      if (!snake.some(part => part.x === x && part.y === y)) free.push({ x, y });
    }
    return free[Math.floor(Math.random() * free.length)];
  }

  function draw() {
    pixels.forEach(p => p.className = 'gameBoardPixel');
    snake.forEach((part, i) => pixels[index(part.x, part.y)].classList.add(i === 0 ? 'snakeHead' : 'snakeBodyPixel'));
    if (food) pixels[index(food.x, food.y)].classList.add('food');
    scoreEl.textContent = score;
    bestEl.textContent = Math.max(best, score);
    speedEl.textContent = Math.min(10, 1 + Math.floor(score / 5));
    distanceEl.textContent = `${distance} BLOCKS`;
  }

  function reset() {
    clearTimeout(timer);
    snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
    direction = [1, 0];
    queuedDirection = [1, 0];
    food = randomFood();
    score = 0;
    distance = 0;
    paused = false;
    pauseButton.textContent = 'Ⅱ';
    statusEl.textContent = 'RUNNING';
    draw();
  }

  function start() {
    startPanel.classList.add('hidden');
    gameOverPanel.classList.add('hidden');
    reset();
    running = true;
    tick();
  }

  function tick() {
    if (!running || paused) return;
    direction = queuedDirection;
    const head = snake[0];
    const next = { x: (head.x + direction[0] + SIZE) % SIZE, y: (head.y + direction[1] + SIZE) % SIZE };
    const eating = same(next, food);
    const bodyToCheck = eating ? snake : snake.slice(0, -1);

    if (bodyToCheck.some(part => same(part, next))) return endGame();

    snake.unshift(next);
    distance++;
    if (eating) {
      score++;
      food = randomFood();
      if (!food) return endGame(true);
    } else {
      snake.pop();
    }
    draw();
    timer = setTimeout(tick, speed());
  }

  function endGame(won = false) {
    running = false;
    clearTimeout(timer);
    best = Math.max(best, score);
    localStorage.setItem('snake-arcade-best', best);
    statusEl.textContent = won ? 'BOARD CLEARED' : 'GAME OVER';
    finalScoreEl.textContent = score;
    finalBestEl.textContent = best;
    gameOverPanel.classList.remove('hidden');
    draw();
  }

  function changeDirection(next) {
    if (!running || paused) return;
    if (next[0] === -direction[0] && next[1] === -direction[1]) return;
    queuedDirection = next;
  }

  function togglePause() {
    if (!running) return;
    paused = !paused;
    pauseButton.textContent = paused ? '▶' : 'Ⅱ';
    statusEl.textContent = paused ? 'PAUSED' : 'RUNNING';
    if (!paused) tick();
  }

  document.addEventListener('keydown', event => {
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
    if (key === ' ' || key === 'p') { event.preventDefault(); togglePause(); return; }
    if (dirs[key]) { event.preventDefault(); changeDirection(dirs[key]); }
  });

  const bind = (id, dir) => document.getElementById(id).addEventListener('pointerdown', e => { e.preventDefault(); changeDirection(dir); });
  bind('leftButton', [-1, 0]); bind('upButton', [0, -1]); bind('rightButton', [1, 0]); bind('downButton', [0, 1]);
  document.getElementById('startButton').onclick = start;
  document.getElementById('restartButton').onclick = start;
  pauseButton.onclick = togglePause;

  let touchStart = null;
  gameContainer.addEventListener('touchstart', e => {
    const t = e.changedTouches[0];
    touchStart = { x: t.clientX, y: t.clientY };
  }, { passive: true });
  gameContainer.addEventListener('touchend', e => {
    if (!touchStart) return;
    const t = e.changedTouches[0], dx = t.clientX - touchStart.x, dy = t.clientY - touchStart.y;
    touchStart = null;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return;
    changeDirection(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? [1, 0] : [-1, 0]) : (dy > 0 ? [0, 1] : [0, -1]));
  }, { passive: true });

  reset();
  running = false;
  statusEl.textContent = 'READY';
})();
