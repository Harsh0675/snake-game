# 🐍 Snake Arcade

A polished, responsive take on the classic Snake game built with **HTML, CSS, and vanilla JavaScript**. The game is designed for quick browser play on both desktop and mobile.

## ✨ Features

- Classic grid-based Snake gameplay
- Edge wrapping for continuous movement
- Food collection and growing snake
- Progressive speed as your score increases
- Persistent best score with `localStorage`
- Game over and replay flow
- Pause/resume support
- Keyboard controls: Arrow keys + WASD
- Mobile directional controls
- Mobile swipe gestures
- Responsive arcade-style interface
- Lightweight — no framework or build step required

## 🎮 Controls

| Platform | Controls |
| --- | --- |
| Desktop | Arrow keys or WASD |
| Mobile | On-screen arrows or swipe on the board |
| Pause | `P` or `Space`, or the pause button |

## 🧱 Stack

- **HTML5** — semantic game shell and controls
- **CSS3** — responsive layout, arcade UI, animations
- **Vanilla JavaScript** — game state, movement, collision, scoring and persistence
- **Web Storage API** — best-score persistence

## ▶️ Run locally

No installation is required.

```bash
git clone https://github.com/Harsh0675/snake-game.git
cd snake-game
```

Open `index.html` in a browser, or serve the folder with any static web server.

## 🗂️ Project structure

```text
snake-game/
├── index.html      # Game shell, HUD, overlays and controls
├── main.css        # Responsive visual system
└── jscript.js      # Game engine and input handling
```

## 🧠 Implementation notes

The game uses a compact coordinate-based state model rather than timing the snake body with DOM removal. Each tick calculates the next wrapped position, checks self-collision, grows only when food is collected, and schedules the next tick from the current difficulty level.

Food is selected only from free cells, preventing impossible-to-reach spawns on the snake body. The best score is persisted locally so a browser refresh does not erase the player's record.

## 🌐 Deployment

Because this is a static frontend, it can be hosted directly with **GitHub Pages** or any static hosting provider.

## 📄 License

MIT License.
