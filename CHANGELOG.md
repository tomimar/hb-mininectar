# Changelog

Prototypes pin a version (see scripts/new_prototype.py). Newest first.

## Unreleased

**Changed**
- Table guide: how to combine selection and expandable rows in the same table.
- Tag guide: risk levels always use the same tags — High red, Medium yellow, Low grey.
- Amounts use the currency symbol (`$9,850.00`); the ISO code only where the symbol is ambiguous.

**Fixed**
- `case-tab` template: the case tag reads "High risk" (sentence case).

## v1.0.0 — 2026-10-01

First pinned release. Everything about Mini Nectar is now written once, in this repo, and the docs site, Claude Code and Claude Design all read from it.

**New**
- **Dark mode.** Add `data-theme="dark"` to `<html>`. The docs sidebar has a toggle.
- **`hb.js`** — component behaviour with no dependencies: Expand, Sidenav, Multi select, Drag, Table (select all, expandable rows, row menus, column resize, Columns panel) and Modal work from their markup. Alpine.js is now optional, only for a prototype's own logic.
- **One guide per component** (`components/<name>.md`) with live examples, states and Do / Don't, plus `guidelines.md` for the design rules.
- **Versioned prototypes.** `scripts/new_prototype.py` creates a prototype pinned to a release, optionally offline and zipped. `scripts/release.py` publishes a release.
- **`templates/blank`**, next to `case-tab`.
- New tokens: `--font-mono`, `ui-expressive-light-blue-*`.

**Changed**
- Tokens live in `tokens.json`; `tokens.css` is generated from it.
- Focus rings are `ui-interaction` (strong blue) everywhere, as the guidelines say.
- Every docs page is generated: component pages from their `.md`, Foundations pages from `guidelines.md` and `tokens.json`.
- `drag.js` is gone — use `hb.js`.

**Fixed**
- `ui-status-danger-text` is `#e32402` in light mode, so error text passes contrast.
- Icons inside floating actions, tags, alerts and toasts take the component's color.
- Checkbox has an indeterminate style (a dash).
- A selected floating action keeps its dark fill on hover and shows a focus ring.
- The search clear button only shows while there's text, and clears the field.
- The date picker works on fields added after the page loads.
