# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start local dev server (Astro)
npm run build    # Production build → /dist
npm run preview  # Preview production build locally
```

No test suite is configured. Type checking is via TypeScript strict mode.

## Architecture

This is an **Astro 5** static site (portfolio) with **Tailwind CSS** and **TypeScript**.

### Routing

- `src/pages/index.astro` — home page, composes Hero, SkillSection, and project cards
- `src/pages/projects/[id].astro` — dynamic detail page; `id` is the slug derived from the Markdown filename (`.md` extension stripped)

### Content Collections

Projects are stored as Markdown in `src/content/projects/`. The schema is defined in `src/content/config.ts` with fields: `title`, `date`, `company`, `tags`, `summary`, `featured`, `order`. Adding a new project means adding a `.md` file — no routing changes needed.

### Data

Skill categories are defined in `src/data/skills.ts` as plain TypeScript arrays, not content collections.

### Design System

- Background: `zinc-950`, text: `zinc-100`, accent: `#4ade80` (green)
- Custom Tailwind config in `tailwind.config.mjs`: mono font override, typography plugin, custom accent color
- Global styles in `src/styles/global.css`

### Layout

`src/layouts/BaseLayout.astro` wraps every page with `<html>`, metadata, and nav. All pages import this layout.
