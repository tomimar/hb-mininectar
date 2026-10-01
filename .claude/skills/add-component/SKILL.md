---
name: add-component
description: Use when adding a new component to Mini Nectar (hb-mininectar)
  or promoting a prototype's custom component into the design system. Covers
  implementing it in components.css using tokens, creating the docs page,
  registering it in sidebar.js, adding Figma + docs links to CLAUDE.md,
  syncing the Claude Design artifact, noting it in the changelog, and committing. Also covers building
  a component on the fly inside a prototype's custom.css before promotion.
---

## Adding a component to Mini Nectar — full checklist

Whenever a new component is added to Mini Nectar, complete ALL of these steps (mirroring how every existing component was done):

1. **Implement the component** in `components.css` (and `tokens.json` if new tokens are needed — then run `python3 scripts/build_tokens.py` to regenerate `tokens.css`; never edit `tokens.css` by hand). Always use tokens, never hardcoded values.
   - If it needs behaviour (open/close, select, reorder…), add it to `hb.js`: plain JavaScript with event delegation on `document`, driven by the markup's ARIA state (`aria-expanded`, `hidden`…). Never make a component depend on Alpine.
   - When the spec **is** in Figma, extract the exact values from it.
   - When the spec is **not** in Figma (common when testing or prototyping a new component), follow the best practices of leading design systems (e.g. Material, Polaris, Carbon, Atlassian) and build it on top of the existing Mini Nectar tokens — reuse spacing, color, radius, elevation and typography tokens so it stays visually consistent. Never invent hardcoded values; if a token is genuinely missing, add it to `tokens.json` (with a light and a dark value) and regenerate.
2. **Write the component guide** in `components/[component].md` — the single source for everything about it: text AND examples. Same format as `components/button.md`: one-sentence summary on the first line (no `#` title), then short `##` sections — variants, sizes, structure, states, writing the label, when to use, Do, Don't, example.
   - **Examples** are fenced blocks tagged `html preview`: the docs page shows them live with their code below. Put each example right after the table it illustrates (a table of variants, then one preview with all of them in the same order). Use one `###` subsection per variant only when variants differ in structure (e.g. Expand). Every example uses real classes (including the size class) and realistic AML content.
   **Create the docs page** `components/[component].html` by copying `components/button.html` and changing only the `<title>`, the `<h1>` and the `data-hb-guide` file name. The page is a template: never put text or examples in it.
3. **Add the page to the sidebar** by registering it in the `components` array in `components/sidebar.js` (label + filename). The sidebar is universal — adding it once updates every page.
4. **Add a reference link in the repo's CLAUDE.md** — the Figma links table at the bottom, plus the component docs table, so the page is discoverable.
5. **Sync the Claude Design artifact** with the **`sync-artifact`** skill: regenerate `bundle.css` from `components.css` and add the component's `README.md` + `preview.html` (plus `tokens.json` if tokens changed). Otherwise Claude Design prototypes won't have the component.
6. **Note it in `CHANGELOG.md`** under `## Unreleased` → **New** (create the heading at the top if it isn't there).
7. **Commit and push** to GitHub.

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

Copy the component CSS into the hb-mininectar repo's `components.css`, then push:

```bash
# from the hb-mininectar repo root
git add components.css
git commit -m "Add [component-name] component"
git push
```
