## Purpose

This file gives short, actionable guidance for AI coding agents working on this repo (a small Vite + React + TypeScript site).

Keep responses focused and make minimal, safe changes that match the project's conventions.

## Quick project snapshot

- Framework: React 19 + TypeScript, built with Vite (see `vite.config.ts`).
- Entry points: `src/main.tsx` -> `src/App.tsx`.
- Build scripts (see `package.json`):
  - `npm run dev` — start dev server (Vite, HMR).
  - `npm run build` — runs `tsc -b` then `vite build` (TypeScript project refs + Vite).
  - `npm run preview` — preview the built app.
  - `npm run lint` — run ESLint.

## Important repo patterns & conventions

- TypeScript + TSX files often import with extensions (example: `import App from './App.tsx'` in `src/main.tsx`). Preserve extensions when editing imports unless refactoring consistently across files.
- Static assets: project uses both relative imports (`./assets/react.svg`) and absolute public-root imports (`/vite.svg`). Use `/`-root imports when referencing files placed in `public/`.
- CSS: component/global styles live in `src/App.css` and `src/index.css`. Keep class names and structure as-is to avoid style regressions.
- Linting: ESLint is configured via `eslint.config.js`. Run `npm run lint` before proposing stylistic changes.

## Build & developer workflows to reference

- Run the dev server: `npm run dev` (fast feedback via HMR). Use this to validate UI and HMR-related edits.
- Production build runs TypeScript build first (`tsc -b`) — changes that affect project references or tsconfig may require updating `tsconfig.app.json`/`tsconfig.node.json`.
- Vite is overridden in `package.json` to use `rolldown-vite` via an `overrides` entry. Be cautious when suggesting deep Vite plugin changes; verify compatibility with `rolldown-vite`.

## Common touchpoints for typical edits

- Small UI / component changes: edit `src/*.tsx`, `src/*.css`. Run `npm run dev` to verify.
- Add assets: put public static files in `public/` for `/`-root imports, or `src/assets/` for module imports.
- New dependencies: update `package.json` and avoid modifying the `vite` override unless you understand `rolldown-vite` implications.

## Examples the agent can use in pull requests

- Fix (example): "Update button to use accessible label — changed JSX in `src/App.tsx`, added test-friendly data-testid." Keep changes limited to a single concern.
- Feature (example): "Add new component `src/components/Header.tsx` and register it in `src/App.tsx`. Update `src/App.css` with scoped styles." Include visual verification steps (open http://localhost:5173).

## What NOT to change without verification

- Do not change TypeScript project references or `tsconfig.*.json` without running `npm run build` locally — the build step runs `tsc -b` and will catch issues.
- Avoid swapping Vite plugins or editing `package.json` overrides without testing a build; the repo pins `vite` to `rolldown-vite` for a reason.

## Files to consult for deeper context

- `package.json` — scripts, dependencies, and `vite` override.
- `vite.config.ts` — Vite plugin usage (`@vitejs/plugin-react`).
- `src/main.tsx`, `src/App.tsx` — app entry and UI example patterns.
- `README.md` — project template notes and ESLint/TypeScript tips.
- `eslint.config.js` — stylistic and lint rules.

If anything in this file is unclear or you'd like a different level of detail (e.g., more examples or a checklist for PRs), tell me which sections to expand.
