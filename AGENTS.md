# AGENTS.md — portfolio-rodolfo

## Dev commands

| Command | What it does |
|---------|-------------|
| `npm run dev` | Vite dev server on `http://0.0.0.0:3000` |
| `npm run build` | Production build |
| `npm run lint` | TypeScript check only (`tsc --noEmit`) — no ESLint |
| `npm run preview` | Preview production build |
| `npm run clean` | Removes `dist/` and `server.js` (Unix `rm`, fails on Windows) |

No test framework or test scripts exist.

## Env

- **GEMINI_API_KEY** — required (set in `.env.local`, gitignored). Injected by AI Studio at runtime.
- **DISABLE_HMR** — set to `true` to disable HMR + file watching (AI Studio agent mode). See `vite.config.ts:12-19`.
- **APP_URL** — auto-injected by AI Studio for self-referential links/callbacks.

## Project structure

```
src/
  main.tsx              → entrypoint (index.html → /src/main.tsx)
  App.tsx               → root component, 9 sections from hero to footer
  AppContext.tsx         → global state (language, auth, transmissions, theme)
  translations.ts       → EN/ES strings (TranslationDict interface)
  types.ts              → Project, Skill, TerminalLine, ContactMessage
  index.css             → Tailwind v4 (@import "tailwindcss"), custom theme tokens, animations
  components/
    InteractiveBackground.tsx  → fullscreen WebGL canvas with custom GLSL shaders
    TerminalMock.tsx           → interactive terminal emulator
    ConnectModal.tsx           → contact form with localStorage persistence
    ...
```

## Architecture notes

- **Path alias**: `@` → project root (tsconfig + vite resolve).
- **Tailwind v4**: uses `@import "tailwindcss"` in CSS, not `tailwind.config` files.
- **Theme**: locked to dark; `toggleTheme` is a no-op (`AppContext.tsx:77-79`).
- **Auth**: fake local-only "Guest Architect" auto-login on first load. All data (user, transmissions, language) stored in `localStorage` under keys prefixed `architect_`.
- **Server**: Express dependency present (server-side Gemini API proxy). Built output includes `server.js` alongside `dist/`.
- **i18n**: EN/ES via context provider. Language persisted in `localStorage` key `architect_language`.
- **No CI/CD**, no pre-commit hooks, no Docker config.

## Key gotchas

- `index.html` title is still `My Google AI Studio App` (default placeholder).
- `clean` script uses `rm -rf` (Unix) — will fail on Windows/PowerShell.
- No ESLint/Prettier/Rome — only TypeScript `--noEmit` for quality checks.
