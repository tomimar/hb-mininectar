---
name: add-component
description: Use when adding a new component to Mini Nectar (hb-mininectar)
  or promoting a prototype's custom component into the design system. Covers
  implementing it in components.css using tokens, creating the docs page,
  registering it in sidebar.js, adding Figma + docs links to CLAUDE.md,
  syncing the Notion Component Library, and committing. Also covers building
  a component on the fly inside a prototype's custom.css before promotion.
---

## Adding a component to Mini Nectar — full checklist

Whenever a new component is added to Mini Nectar, complete ALL of these steps (mirroring how every existing component was done):

1. **Implement the component** in `components.css` (and `tokens.css` if new tokens are needed). Always use tokens, never hardcoded values.
   - When the spec **is** in Figma, extract the exact values from it.
   - When the spec is **not** in Figma (common when testing or prototyping a new component), follow the best practices of leading design systems (e.g. Material, Polaris, Carbon, Atlassian) and build it on top of the existing Mini Nectar tokens — reuse spacing, color, radius, elevation and typography tokens so it stays visually consistent. Never invent hardcoded values; if a token is genuinely missing, add it to `tokens.css`.
2. **Create a documentation page** in `components/[component].html`, following the same structure as the existing component pages (copy the layout/`<style>` block from `button.html`).
3. **Add the page to the sidebar** by registering it in the `components` array in `components/sidebar.js` (label + filename). The sidebar is universal — adding it once updates every page.
4. **Add a reference link in the repo's CLAUDE.md** — the Figma links table at the bottom, plus the component docs table, so the page is discoverable.
5. **Update the Notion Component Library** (see below).
6. **Commit and push** to GitHub.

---

## Notion tracking — Component Library

There is a Notion page that tracks every component and its Mini Nectar status:

- **Page**: https://app.notion.com/p/hummingbirdcharm/Components-2eaccc5a525a8089a7ecf6b2e07cdf3f
- **Database**: "Component Library" (data source `collection://823d7da7-ce4d-4b5b-87e3-5cd333011a47`)
- **Column**: `Mini Nectar` — a select with three options: `Added`, `Pending`, `Testing`.

**Whenever a component is added to Mini Nectar, keep this column in sync:**

1. Find the component's row in the Component Library (match by the `Component` title).
2. If the row exists → change its `Mini Nectar` value from `Pending` to `Added`.
3. If the row does NOT exist → create a new row for the component and set `Mini Nectar` to `Testing`.

Use the Notion tools (`notion-query-data-sources` to find the row, `notion-update-page` with `update_properties` to set the value, `notion-create-pages` to add a new row under the data source).

---

## Creating new components on the fly

If a prototype needs a component that doesn't exist in the DS yet, follow this workflow:

### 1. Create it locally in the prototype

Add a `custom.css` file inside the prototype folder and link it **after** the DS links:

```html
<link rel="stylesheet" href="https://tomimar.github.io/hb-mininectar/tokens.css">
<link rel="stylesheet" href="https://tomimar.github.io/hb-mininectar/components.css">
<link rel="stylesheet" href="custom.css">
```

### 2. Follow DS conventions

- Name: `.hb-[component]`, `.hb-[component]__[element]`, `.hb-[component]--[modifier]`
- Always use tokens — never hardcode colors, sizes or spacing:
  - ✅ `color: var(--ui-text-secondary)`
  - ✅ `padding: var(--spacing-8) var(--spacing-16)`
  - ❌ `color: #595959`
  - ❌ `padding: 8px 16px`
- Document the component with a usage comment at the top

### 3. Validate with the designer

The designer reviews the component in the prototype. Once approved:

### 4. Add it to hb-mininectar (optional)

Copy the component CSS into `~/Documents/hb-mininectar/components.css`, then push:

```bash
cd ~/Documents/hb-mininectar
git add components.css
git commit -m "Add [component-name] component"
git push
```
