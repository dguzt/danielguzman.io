# Maintenance Manual — danielguzman.io

How the site is built, and how to keep it alive. This is a **living document**: update it at the end of every milestone. Sections marked _(confirm while building)_ describe the plan; replace them with what you actually built.

---

## 1. Architecture at a glance

- **Framework:** Astro, static output (no server).
- **Content:** Markdown/MDX in content collections, validated with schemas.
- **Styling:** Tailwind CSS 4 through the official `@tailwindcss/vite` plugin. Design tokens live in Tailwind's `@theme`, so every token is both a CSS variable and a utility class (`bg-bg`, `text-green`, `text-sm`).
- **JavaScript:** none by default. Add an island only when interaction truly needs it.
- **i18n:** Astro's built-in i18n routing. English at `/`, Spanish at `/es/`.
- **Hosting:** Cloudflare (static), with Cloudflare Web Analytics (no cookies).
- **Fonts:** Geist and Geist Mono through Astro's Fonts API (`fonts` in `astro.config.mjs`, Fontsource provider). Astro downloads them at build time and serves them from the site, latin subset and upright styles only. `BaseLayout` renders `<Font>` for both; only Geist is preloaded. `tokens.css` maps `--font-sans` / `--font-mono` to the generated variables in `@theme inline`.
- **Images:** `astro:assets` with Sharp (dev dependency) converts and resizes at build time.

### Folder structure

Confirmed for M1 and the home page. `content/` and the Spanish routes arrive in M2–M5.

```
src/
├── components/        # Small, single-purpose UI pieces (Header, Footer, Row, StatusLoop…), flat
├── layouts/           # Page shells: BaseLayout (column, Header, Footer around a <slot />)
├── pages/             # Routes only: compose layouts + components, fetch via lib/
│   └── es/            # Spanish routes (or dynamic [lang] routing — decide in M2)
├── content/           # Markdown/MDX entries: projects/, posts/, videos/, talks/
├── content.config.ts  # Collection schemas (path may differ by Astro version)
├── i18n/              # ui.ts (UI strings, en + es) + utils.ts (useTranslations)
├── lib/               # site.ts (nav, social), routes.ts (isBuilt), paths.ts, home-content.ts (static until collections)
├── styles/            # tokens.css (@theme), global.css (Tailwind entry + base styles)
└── assets/            # Images processed by astro:assets
docs/                  # DESIGN.md, MANUAL.md, design/frontend-blueprint.html
design-reference/      # Approved prototype (read-only)
```

### Dependency rules

- `pages/` may import from `layouts/`, `components/`, `lib/`, `i18n/`.
- `components/` receive data through props. They **never** fetch collections themselves.
- `lib/` has no Astro imports when possible: pure TypeScript, easy to test.
- Styles use tokens only. A raw hex value outside `tokens.css` is a bug, and so is an arbitrary Tailwind value (`text-[#fff]`, `p-[13px]`). If the scale is missing a value, add a token.
- `tokens.css` resets Tailwind's default colors, fonts and type sizes (`--color-*: initial`), so only the One Dark palette and the site's type scale exist as utilities.
- `global.css` is imported once, in `BaseLayout.astro`. Pages never import it.

---

## 2. Conventions

- **Components:** PascalCase (`StatusLoop.astro`). Every component declares a typed `Props` interface.
- **Files and slugs:** kebab-case (`shipping-with-agents.md`).
- **Commits:** Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`, `style:`, `chore:`).
- **Branches:** `main` is always deployable. Work on `feat/...` branches for anything bigger than a typo.
- **Formatting:** Prettier with `prettier-plugin-astro`, Airbnb-like options (single quotes, semicolons, trailing commas, width 100). No trailing commas in `.jsonc`, so editors that validate it as JSON don't complain. `pnpm format` writes, `pnpm format:check` verifies.
- **Linting:** ESLint 10 flat config: `@eslint/js` recommended, `typescript-eslint` strict + stylistic, `eslint-plugin-astro` recommended, plus a few Airbnb rules (`eqeqeq`, `curly`, `prefer-const`, `prefer-template`, `object-shorthand`, `no-var`, `no-param-reassign`). The official Airbnb config doesn't support ESLint 9+.
- **Tailwind classes:** `eslint-plugin-better-tailwindcss` rejects unknown classes, conflicting classes and arbitrary values, and enforces Tailwind's official class order (`pnpm lint:fix` sorts them). Class order lives in ESLint only: `prettier-plugin-tailwindcss` doesn't sort `.astro` files (tailwindlabs/prettier-plugin-tailwindcss#451).
- **Type checking:** `pnpm check` runs `astro check`. TypeScript is pinned to 6.0 because `typescript-eslint` and `@astrojs/check` don't support 7 yet.
- **Node:** version pinned in `.nvmrc`; package manager is pnpm.
- **TypeScript:** strict mode.
- **Imports:** use `./` only for a file in the same folder. Everything else goes through the `@/` alias, which points to `src/` (`@/styles/global.css`, `@/components/Header.astro`). Never `../`; ESLint rejects it.

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

### Add a page to the nav

1. Create the page file in `src/pages/` (for example `about.astro`).
2. That's it: `Nav` only shows items from `lib/site.ts` whose page exists (`lib/routes.ts` → `isBuilt`). The EN/ES toggle works the same way and appears once `/es/` exists. Rows and links on the home page use `hrefIfBuilt`, so they become links when their page ships.

### Change Admitidos' status loop

- The words live in `src/i18n/ui.ts` (`status.*`). The animation lives in `StatusLoop.astro`. The shimmer shares the word cycle and delay, so it always finishes inside its word. Change words there; don't touch the CSS unless the timing changes.
- Four words, 2s each. If you change the count, update the cycle duration and delays.

### Add a video _(deferred: no videos section yet, see DESIGN.md §7)_

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

## 5. Deployment

- **Host:** Cloudflare Workers with static assets. No adapter and no server code: `wrangler.jsonc` only points Cloudflare at `dist/`, and Cloudflare serves those files from its edge.
- **Builds:** Workers Builds, connected to `dguzt/danielguzman.io` on GitHub. Push to `main` deploys production; other branches get a Preview at `https://<branch>-danielguzman.bluedune.workers.dev` (for example `feat-m1-tokens-layout-…`).
- **Previews:** branch builds deploy with `npx wrangler preview` (Workers Previews, beta), which needs the `"previews": {}` block in `wrangler.jsonc`. It stays empty while the site has no bindings or vars. Previews answer unknown URLs with a plain "Not found"; only production applies `not_found_handling`.
- **Build command:** `pnpm build`. **Deploy command:** `npx wrangler deploy`. Node comes from `.nvmrc`, pnpm from `packageManager` in `package.json`.
- **Worker:** `danielguzman`, also served at `danielguzman.bluedune.workers.dev`. The name in `wrangler.jsonc` must match the Worker name in the dashboard.
- **Domain:** `danielguzman.io`, bought through Cloudflare Registrar and attached as a custom domain on the Worker.
- **Dashboard-only settings** (not in the repo, so check here before changing them):
  - DNS: `www` is a proxied `AAAA` record to `100::`. It exists only so the redirect rule can catch `www` traffic.
  - Rules → Redirect Rules: "Redirect from WWW to root", 301, preserving path and query string.
  - SSL/TLS → Edge Certificates: **Always Use HTTPS** on.
- **Analytics:** Cloudflare Web Analytics (no cookies), loaded by `src/components/CloudflareAnalytics.astro` from `BaseLayout`, in production builds only. Automatic injection doesn't work for Worker static assets, so the dashboard is set to "Enable with JS Snippet installation". The token is public by design. Preview deploys also report to it.

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
| M6  | About (Videos deferred until the YouTube channel opens)                 | Reusing components, `astro:assets`           |
| M7  | SEO: meta tags, Open Graph, sitemap                                     | Head management, integrations                |
| M8  | Accessibility and performance audit                                     | Lighthouse, reduced motion, focus            |
| M9  | Deploy to Cloudflare + analytics                                        | Static hosting, CI basics                    |

---

## 8. Troubleshooting

Add entries here as you hit problems: symptom → cause → fix.

- **Build fails with `MissingSharp`** → `astro:assets` needs Sharp to optimize images → `pnpm add -D sharp` (done in M1).
- **Fonts API downloads italic files you don't use** → it fetches every style by default → set `styles: ['normal']` per family.
- **ESLint `no-unknown-classes` on custom class names in a component `<style>`** → the Tailwind plugin only knows utilities → select with data attributes (`[data-word]`) instead of class names.
- **An animation looks wrong right after editing its CSS** → hot reload keeps running animations instead of restarting them → hard reload (Cmd+Shift+R) before judging timing.
- **Unknown URL shows a blank Cloudflare 404 in production** → Workers static assets default to no 404 page → `"not_found_handling": "404-page"` in `wrangler.jsonc` (set in M1).
