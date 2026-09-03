# 🐍 Snake Arcade

A lightweight browser arcade game that reimagines the classic Snake experience with responsive controls, progressive difficulty, persistent scoring, and mobile-friendly interaction. It is intentionally built without frameworks or a build pipeline.

## 🎯 Gameplay

The objective is simple: guide the snake toward food, grow the body, and survive as movement becomes faster. The board wraps at the edges, while running into the snake itself ends the round.

### Features

- Classic grid-based Snake gameplay
- Edge wrapping
- Food-driven snake growth
- Progressive speed based on score
- Persistent best score via `localStorage`
- Pause/resume and replay flow
- Arrow-key and WASD controls
- On-screen mobile controls
- Swipe input on touch devices
- Responsive arcade-style interface
- Zero framework and zero build dependency

## 🎮 Controls

| Action | Desktop | Mobile |
| --- | --- | --- |
| Move | Arrow keys / WASD | Direction buttons / swipe |
| Pause | `P` / `Space` | Pause button |
| Restart | Replay control | Replay control |

## ⚙️ How it works

```text
Input
  ↓
Direction update
  ↓
Next grid position
  ↓
Wrap + collision checks
  ↓
Food check
  ↓
Snake state update
  ↓
Render + schedule next tick
```

The game maintains the snake as coordinate-based state. Each update calculates the next head position, applies edge wrapping, validates self-collision, handles food consumption, updates the score, and schedules the next movement using the current difficulty.

## 🧱 Technology

- **HTML5** — game shell, HUD, controls, and overlays
- **CSS3** — responsive layout, arcade styling, and interaction states
- **Vanilla JavaScript** — game loop, state management, input, collision, scoring
- **Web Storage API** — local best-score persistence

## ▶️ Run locally

No package installation is required.

```bash
git clone https://github.com/Harsh0675/snake-game.git
cd snake-game
```

Open `index.html` directly in a browser, or serve the directory with a static HTTP server.

## 📁 Project layout

```text
snake-game/
├── index.html      # Game markup, HUD, overlays and controls
├── main.css        # Responsive arcade interface
├── jscript.js      # Game engine and input handling
└── README.md       # Project documentation
```

## 🌐 Deployment

Snake Arcade is a static web application, so it can be deployed to GitHub Pages or another static hosting service without a backend.

For GitHub Pages, publish the repository's static files and use `index.html` as the site entry point.

## 🔒 Browser data

The game stores the player's best score locally using browser storage. No account or database is required for gameplay.

## 💼 Portfolio focus

This project demonstrates practical browser-game fundamentals: deterministic game state, real-time input handling, collision detection, responsive controls, difficulty scaling, persistence, and a framework-free frontend architecture.

## 📄 License

MIT License.
