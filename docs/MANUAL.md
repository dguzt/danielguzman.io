# Maintenance Manual — danielguzman.io

How the site is built, and how to keep it alive. This is a **living document**: update it at the end of every milestone. Sections marked _(confirm while building)_ describe the plan; replace them with what you actually built.

---

## 1. Architecture at a glance

- **Framework:** Astro, static output (no server).
- **Content:** Markdown/MDX in content collections, validated with schemas.
- **Styling:** plain CSS with design tokens (CSS custom properties). No UI framework.
- **JavaScript:** none by default. Add an island only when interaction truly needs it.
- **i18n:** Astro's built-in i18n routing. English at `/`, Spanish at `/es/`.
- **Hosting:** Cloudflare (static), with Cloudflare Web Analytics (no cookies).

### Folder structure _(confirm while building)_

```
src/
├── components/        # Small, single-purpose UI pieces (Header, Footer, Row, StatusLoop…)
├── layouts/           # Page shells (BaseLayout, ProjectLayout, PostLayout)
├── pages/             # Routes only: compose layouts + components, fetch via lib/
│   └── es/            # Spanish routes (or dynamic [lang] routing — decide in M2)
├── content/           # Markdown/MDX entries: projects/, posts/, videos/, talks/
├── content.config.ts  # Collection schemas (path may differ by Astro version)
├── i18n/              # ui.ts (UI strings per language) + helpers (getLang, t())
├── lib/               # Pure functions: sorting, filtering by tag, reading time, dates
├── styles/            # tokens.css, global.css
└── assets/            # Images processed by astro:assets
docs/                  # DESIGN.md, MANUAL.md
design-reference/      # Approved prototype (read-only)
```

### Dependency rules

- `pages/` may import from `layouts/`, `components/`, `lib/`, `i18n/`.
- `components/` receive data through props. They **never** fetch collections themselves.
- `lib/` has no Astro imports when possible: pure TypeScript, easy to test.
- Styles use tokens only. A raw hex value outside `tokens.css` is a bug.

---

## 2. Conventions

- **Components:** PascalCase (`StatusLoop.astro`). Every component declares a typed `Props` interface.
- **Files and slugs:** kebab-case (`shipping-with-agents.md`).
- **Commits:** Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`, `style:`, `chore:`).
- **Branches:** `main` is always deployable. Work on `feat/...` branches for anything bigger than a typo.
- **Formatting:** Prettier with `prettier-plugin-astro`, Airbnb-like options (single quotes, semicolons, trailing commas, width 100). `pnpm format` writes, `pnpm format:check` verifies.
- **Linting:** ESLint 10 flat config: `@eslint/js` recommended, `typescript-eslint` strict + stylistic, `eslint-plugin-astro` recommended, plus a few Airbnb rules (`eqeqeq`, `curly`, `prefer-const`, `prefer-template`, `object-shorthand`, `no-var`, `no-param-reassign`). The official Airbnb config doesn't support ESLint 9+.
- **Type checking:** `pnpm check` runs `astro check`. TypeScript is pinned to 6.0 because `typescript-eslint` and `@astrojs/check` don't support 7 yet.
- **Node:** version pinned in `.nvmrc`; package manager is pnpm.
- **TypeScript:** strict mode.

---

## 3. How to…

### Publish a post

1. Create `src/content/posts/<slug>.md` (or `.mdx`).
2. Fill the frontmatter: `title`, `description`, `date`, `tag` (engineering | learning | notes), `lang`, optional `relatedProject`. _(confirm fields in M5)_
3. Run the site locally and check: title, tag page, reading time, related project link.
4. Spanish version? Only if you wrote it. Create it with the same slug under the Spanish folder _(confirm structure in M5)_.
5. Commit: `feat(posts): add <slug>`.

### Add or update a project

1. Create or edit `src/content/projects/<slug>.md`.
2. Set `group` (learning | other), `status` (live | building | archived), `summary`, `role`, `stack`, `links`, and whether it has a detail page.
3. **Rule:** a project only gets a link when its README or demo is presentable.
4. Never describe features that don't exist yet.

### Change Admitidos' status loop

- The words live in `src/i18n/ui.ts`. The animation lives in `StatusLoop.astro`. Change words there; don't touch the CSS unless the timing changes.
- Four words, 2s each. If you change the count, update the cycle duration and delays.

### Add a video

1. Create an entry in `src/content/videos/` with `title`, `date`, `youtubeUrl`, `project`, `thumbnail`.
2. Thumbnails go in `src/assets/` so `astro:assets` optimizes them.

### Add or change UI text

1. Edit both languages in `src/i18n/ui.ts`. A missing key should fail the type check.
2. Check `/` and `/es/` pages.

### Update the profile photo

1. Replace the file in `src/assets/`. Keep it square, face well lit, simple background.
2. It appears on Home (circle) and About (rounded square).

---

## 4. Before publishing (checklist)

- [ ] `npm run build` passes with no warnings.
- [ ] Type check passes.
- [ ] Both `/` and `/es/` render; no missing translations.
- [ ] Keyboard navigation works; focus is visible.
- [ ] Text contrast is fine on `--color-bg`.
- [ ] Images have `alt` text; decorative ones are `alt=""`.
- [ ] No `[PLACEHOLDER]` text left on published pages.
- [ ] No student data, secrets, or private info anywhere.
- [ ] Lighthouse: performance, accessibility, SEO ≥ 95 _(target)_.

---

## 5. Deployment _(confirm in M9)_

- Push to `main` → Cloudflare builds and deploys.
- Build command and output folder: document here once configured.
- Analytics: Cloudflare Web Analytics.
- Domain: `danielguzman.io`.

---

## 6. Routine maintenance

- **Monthly:** publish the monthly post; check broken links; update "now" on About if it changed.
- **Every 3 months:** update dependencies (`npm outdated`), read Astro's release notes before upgrading major versions, rerun the checklist.
- **When a project changes:** update its status and page the same day. Stale "building" labels hurt credibility.

---

## 7. Roadmap

Each milestone ends with: a working build, a commit, and an update to this manual. M9 (deploy) runs right after M0, so every later milestone ships to the live site.

| #   | Milestone                                                               | You'll learn                                 |
| --- | ----------------------------------------------------------------------- | -------------------------------------------- |
| M0  | Project setup: scaffold Astro, TypeScript strict, Prettier, ESLint, git | Astro project structure, tooling             |
| M1  | Tokens, global styles, BaseLayout, Header, Footer                       | Layouts, components, props, slots            |
| M2  | i18n routing + UI dictionary + language switch                          | Astro i18n, typed dictionaries               |
| M3  | Home page (static data first) + StatusLoop                              | Composition, CSS-only animation, a11y        |
| M4  | Projects collection + Projects page + `[slug]` pages                    | Content collections, schemas, dynamic routes |
| M5  | Posts collection + Writing page + tag pages + Post layout + RSS         | Markdown, `getStaticPaths`, feeds            |
| M6  | Videos + About                                                          | Reusing components, `astro:assets`           |
| M7  | SEO: meta tags, Open Graph, sitemap                                     | Head management, integrations                |
| M8  | Accessibility and performance audit                                     | Lighthouse, reduced motion, focus            |
| M9  | Deploy to Cloudflare + analytics                                        | Static hosting, CI basics                    |

---

## 8. Troubleshooting

Add entries here as you hit problems: symptom → cause → fix.
