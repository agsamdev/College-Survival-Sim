# College Survival Sim 2.0 Edition

<img width="1815" height="840" alt="image" src="https://github.com/user-attachments/assets/ef1201a4-3b0d-4b35-b2a1-bae2f039cb44" />


## Overview

**College Survival Sim** is a retro-styled, browser-based simulation game where you navigate the challenges of college life over 4 weeks. Manage your stats like stamina, stress, focus, and social life while engaging in minigames, romance, and various activities to survive and succeed in your final exams.

This project is built with React and Vite, featuring pixel-art style UI and multiple interactive components including minigames like basketball, chess, FPS shooting, and F1 racing.

---

## Key Features

- **Dynamic Game Phases:** Intro, major selection, gameplay, and game over screens managed by the main `App` component.
- **Rich Gameplay:** Manage stats, attend classes, study, work part-time, and engage in social and romantic interactions.
- **Minigames:** Play basketball, FPS shooting range, chess, and F1 racing to boost your stats.
- **Romance System:** Build relationships with NPCs through flirting and dates.
- **Interactive UI Components:** Includes player and NPC avatars, dialog boxes with typing effects, stat bars, notifications, and more.
- **In-game Economy:** Manage your in-game currency (₱) for subscriptions, items, and activities.
- **Weekly Events:** Random events, exams, and Netflix subscription billing integrated into gameplay.

---

## Installation

### Prerequisites

- **Node.js** (recommended version 18.x or later)
- **npm** (comes with Node.js) or any compatible package manager like yarn or pnpm

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/college-survival-sim.git
   cd college-survival-sim
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

---

## Usage

The project uses Vite for development and build:

- **Development mode:** `npm run dev` — starts a hot-reloading dev server.
- **Build for production:** `npm run build` — bundles the app for deployment.
- **Preview production build:** `npm run preview` — serves the built app locally.

---

## Project Structure

```
src/
├── App.jsx               # Main app component managing game phases and state
├── components/           # React components for UI and minigames
│   ├── GameScreen.jsx    # Main gameplay UI and logic
│   ├── PlayerAvatar.jsx  # Player avatar SVG component
│   ├── NpcAvatar.jsx     # NPC avatar SVG component
│   ├── DialogBox.jsx     # Dialog UI with typing effect
│   ├── RomancePanel.jsx  # Romance UI panel
│   ├── BattleFlash.jsx   # Battle flash effect UI
│   ├── NetflixScreen.jsx # Netflix subscription and watching UI
│   └── minigames/        # Minigame components (Basketball, Chess, FPS, F1 Racing)
├── hooks/
│   └── useTypingText.js  # Custom hook for typing text effect (used by DialogBox)
├── data/
│   ├── gameData.js       # Game constants, helpers, and event data
│   └── majors.js         # Major options and related data
package.json              # Project metadata, dependencies, and scripts
README.md                 # Project documentation (this file)
```

---

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes with clear commit messages.
4. Submit a pull request describing your changes.

### Reporting Issues

Please use the GitHub Issues tab to report bugs or request features. Include detailed steps to reproduce and screenshots if applicable.

### Coding Standards

- Use React functional components and hooks.
- Follow existing code style and formatting.
- Write clear, maintainable code with comments where necessary.

---

## License

This project currently does not include a license file. Please contact the maintainers or add an appropriate open-source license (e.g., MIT) to clarify usage and contribution rights.

---

# Summary

- The project is a React-based college life simulation game with multiple minigames and interactive systems.
- Key components include `App.jsx` (game phases), `GameScreen.jsx` (gameplay UI), and several minigames.
- No README or documentation existed; this README addresses that gap with purpose, features, install, usage, structure, and contribution info.
- Installation and usage instructions are missing in the repo but are critical for onboarding.
- Contribution guidelines and license information are missing and should be added to encourage community involvement and clarify legal terms.

---

You might also want to ask:

- Should we add automated tests or CI/CD instructions to the README?
- Are there environment variables or configuration options that need documenting?
- Would you like me to help draft a CONTRIBUTING.md and LICENSE file?
