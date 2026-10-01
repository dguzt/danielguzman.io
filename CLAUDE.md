# CLAUDE.md — danielguzman.io

Personal site for Daniel Guzman, built with Astro (static output, deployed on Cloudflare). Read @docs/DESIGN.md for every product and design decision, and @docs/MANUAL.md for architecture and conventions.

## Commands

- `pnpm dev`: local dev server
- `pnpm build`: production build to `dist/`
- `pnpm check`: type check (`astro check`)
- `pnpm lint` / `pnpm format`: ESLint and Prettier

Run `pnpm check`, `pnpm lint` and `pnpm build` before calling a change done.

## Project context

- `design-reference/` is the approved prototype. **Read-only.** Use it as the visual and content source of truth:
  - `prototype/*.dc.html`: one file per page (One Dark theme). The markup and inline styles show layout and tokens; ignore the `<script>` runtime and `{{ }}` bindings.
  - `content/copy.en.json` and `copy.es.json`: all UI copy, per page. Text in `[BRACKETS]` is a placeholder Daniel must fill.
  - `assets/profile.jpeg`: current profile photo.
- The roadmap is in `docs/MANUAL.md` → "Roadmap".
- **Always verify Astro APIs against the current official docs** (docs.astro.build). Astro changes between versions; if unsure, say so and check.
