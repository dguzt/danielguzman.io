# Design & Product Decisions

This is the source of truth for **what** the site is. `MANUAL.md` covers **how** it's built and maintained.

## 1. Purpose and audience

- **Identity:** an engineer who builds learning products with AI.
- **Tagline:** "I build things that teach." / "Construyo cosas que enseñan."
- **Primary audiences:** CEOs and CTOs of edtech startups, and the Stanford LDT admissions committee.
- **Secondary audience:** friends and acquaintances who may refer Daniel to teachers, principals, or schools.
- **Not the audience:** recruiters, and clients of the consulting company (it gets its own site).

## 2. Content rules

- **Only publish what exists.** Never announce future features or products. (Example: Admitidos shows only what's being built now: the results portal.)
- **Write about what you built or are building,** not ideas.
- **One post a month**, as a personal goal. Never promised publicly.
- **Critique patterns, not companies or people.**
- **Never publish** students' work, grades, or names.
- **Personal** means reflections on tech and industry. No politics or health.

## 3. Language (i18n)

- English is the default. Spanish lives under `/es/`.
- UI and fixed pages (home, projects, videos, about) are fully translated.
- Posts are **not** mandatory translations. A post exists in Spanish only if Daniel writes it. In the Spanish UI, English-only posts show an "Artículo en inglés" badge.
- Videos are in Spanish. The UI says so.

## 4. Sitemap

```
/                      Home
/projects              Projects (two groups)
/projects/[slug]       Project case study
/writing               Posts feed (tags: engineering, learning, notes)
/writing/tag/[tag]     Posts by tag (static pages, no client JS)
/writing/[slug]        Post
/videos                Videos (link out to YouTube)
/about                 About
/es/...                Spanish mirror of the above

Phase 2: /para-docentes (Spanish-first page for teachers and schools)
Phase 3: /talks (visible from ~3 entries; audience filter + role tag)
```

## 5. Page content (launch)

- **Home:** photo, name, tagline, location, social links → Admitidos (currently building, with status loop) → MakerLab (learning design) → latest post → latest video → "Also built: CoCapital, Tributo".
- **Projects:** "Learning products" (Admitidos, MakerLab) and "Other builds" (CoCapital, Tributo). A project gets a link only when its page is ready.
- **Project page:** back link, title, status, one-liner, meta (role, stack, links), then sections: problem → what I built / am building → what I'm learning → related content.
- **Writing:** intro, tag filter, list. Empty tags show "nothing here yet".
- **Post:** back link, date, tag, reading time, title, body, related project.
- **Videos:** intro (videos are in Spanish), list with thumbnail, date, project, link to YouTube.
- **About:** photo, three short paragraphs, "now", "before" (PUCP until 2025), "elsewhere".
- **No email address** on the site for now.

## 6. Visual design: One Dark

### Color tokens

| Token             | Value     | Use                                                                     |
| ----------------- | --------- | ----------------------------------------------------------------------- |
| `--color-bg`      | `#282C34` | Page background                                                         |
| `--color-surface` | `#21252B` | Code blocks, thumbnails                                                 |
| `--color-chip`    | `#3E4451` | Active toggle / chip background                                         |
| `--color-line`    | `#3A3F4B` | Dividers, borders                                                       |
| `--color-fg`      | `#D7DAE0` | Primary text                                                            |
| `--color-soft`    | `#C0C5CE` | Body paragraphs                                                         |
| `--color-muted`   | `#949AA6` | Secondary text, labels (lightened from the original theme for contrast) |
| `--color-green`   | `#98C379` | Tagline, "live", status loop                                            |
| `--color-blue`    | `#61AFEF` | Active nav, links, tags                                                 |
| `--color-yellow`  | `#E5C07B` | "In progress"                                                           |
| `--color-purple`  | `#C678DD` | MakerLab / teaching accents                                             |

### Typography

- **Sans:** Geist (400, 500, 600) for headings and body.
- **Mono:** Geist Mono (400, 500) for nav, labels, meta, section headings (`## label`).
- Scale used in the prototype: 13, 14, 16, 17, 19, 22, 26, 32, 44, 52 px. As tokens: `xs` 13, `sm` 14, `base` 16, `md` 17, `lg` 19, `xl` 22, `2xl` 26, `3xl` 32, `4xl` 44, `5xl` 52 (Tailwind `text-*`).

### Layout

- Single column, max width ~820px. On desktop the column is offset left (prototype: 260px from the left edge at 1440px). Rows, not cards.
- Sections separated by 1px `--color-line` dividers. Section headings look like `## currently building`.
- Mobile: same single column, full width with side padding. No layout changes beyond spacing and type size.

### Components (from the prototype)

- **Header:** nav (home, projects, writing, videos, about) + EN/ES toggle. Active item in blue with `aria-current="page"`.
- **Footer:** © + "made in lima" + social links.
- **SectionHeading:** mono, muted, prefixed with `## `.
- **Row:** title + description on the left, meta on the right; whole row is a link when it has a destination.
- **StatusLoop:** see below.
- **MetaList:** role / stack / links grid on project pages (`<dl>`).
- **LangBadge:** "Artículo en inglés" on English-only posts in the Spanish UI.

### StatusLoop (Admitidos)

Replaces a static "in progress" label with a Claude-style reasoning loop: `✻ building… → thinking… → testing… → pivoting…` (ES: `construyendo… → pensando… → probando… → pivoteando…`).

- Pure CSS. No JavaScript.
- Words rotate every 2s; a white shimmer sweeps over the visible word; the ✻ rotates slowly.
- The shimmer is an overlay (`::after` with `content: attr(data-text)`), so the word stays readable if the effect fails.
- Screen readers hear "In progress" once; the loop is `aria-hidden`.
- `prefers-reduced-motion`: show only the first word, static.
- Reference implementation: the `<style>` block in `design-reference/prototype/Site-Home.dc.html`.

## 7. Deferred (not in launch)

- **Hero neuron effect:** glowing neurons that light up the longer the cursor rests on them (Hollow Knight–style lighting). A separate mini-project. When built: Astro island with `client:visible`, pause offscreen and on hidden tabs, cap pixel ratio at 2, fewer neurons on mobile, avoid canvas `shadowBlur` (pre-render glows).
- Teachers page, talks section, repo index, other themes.

## 8. Decision log

| Decision                                                 | Why                                                                   |
| -------------------------------------------------------- | --------------------------------------------------------------------- |
| Audience: edtech founders + LDT, not recruiters          | Education is the destination; AI is the tool                          |
| Admitidos first; CoCapital and Tributo as "other builds" | Show engineering range without diluting the edtech story              |
| Only show what's being built now                         | Announcing future features creates promises that can backfire         |
| Rows over cards                                          | Linear reading order; simpler responsive behavior                     |
| One Dark only, no light mode                             | Clean, readable dark theme chosen after comparing four                |
| No hero animation at launch                              | Performance; the effect becomes its own project                       |
| Tags as static pages                                     | Zero JS, better SEO, a good Astro learning exercise                   |
| Tailwind CSS 4 for styling, tokens in `@theme`           | Daniel already knows Tailwind; tokens stay the single source of truth |
