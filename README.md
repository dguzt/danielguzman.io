# danielguzman.io

Personal site of Daniel Guzman, an engineer who builds learning products with AI.

Built with [Astro](https://astro.build) as a fully static site, in English and Spanish, deployed on Cloudflare.

## Stack

- Astro, static output, zero client JavaScript by default
- TypeScript (strict)
- Plain CSS with design tokens (One Dark theme)
- Content collections for projects, posts, and videos
- ESLint + Prettier

## Getting started

Requires Node (see `.nvmrc`) and pnpm.

```sh
pnpm install
pnpm dev
```

| Command             | What it does                        |
| ------------------- | ----------------------------------- |
| `pnpm dev`          | Start the dev server                |
| `pnpm build`        | Build the site to `dist/`           |
| `pnpm preview`      | Serve the production build locally  |
| `pnpm check`        | Type-check `.astro` and `.ts` files |
| `pnpm lint`         | Run ESLint                          |
| `pnpm lint:fix`     | Run ESLint and fix what it can      |
| `pnpm format`       | Format everything with Prettier     |
| `pnpm format:check` | Check formatting without writing    |

## Repository layout

```
src/                 Site source (pages, components, layouts, content)
public/              Static files served as-is
docs/DESIGN.md       Product and design decisions
docs/MANUAL.md       Architecture, conventions, and maintenance guide
design-reference/    Approved prototype and copy (read-only)
```
