# Changelog

Prototypes pin a version (see scripts/new_prototype.py). Newest first.

## Unreleased

**New**
- **Table toolbar** (`hb-table-toolbar`): the row above a table for its search, filters and Columns panel, with default-size (large) controls. Ticking rows switches it to selection mode — "3 cases selected", the batch actions and Clear selection — in place, with no slide. `hb.js` handles the swap, the count, minimum selections (`data-hb-min-selection`), Clear selection and the announcements.
- Buttons with `aria-disabled="true"` look disabled but stay focusable, so they can say why they're unavailable.
- Tokens `--control-height-sm` (32px) and `--control-height-lg` (40px).

**Changed**
- Table guide: the Columns panel sits in the toolbar instead of a hand-styled row; new Batch actions section.
- Guidelines: batch actions live in the table's toolbar, never over the page.

**Fixed**
- Checkbox, radio and toggle keep their state in Windows High Contrast (forced colors): ticked, indeterminate (e.g. a table's select-all), selected, on and disabled no longer look like empty controls, and the toggle no longer disappears.

## v1.1.0 — 2026-10-30

Add Tabs component (hb-tabs)

**New**
- **Tabs** (`hb-tabs`): page tabs under a page header, as buttons with panels or as links. `hb.js` handles click, Arrow keys, Home and End.

## v1.0.1 — 2026-10-01

Guide clarifications from a fresh-session test

**Changed**
- Table guide: how to combine selection and expandable rows in the same table.
- Tag guide: risk levels always use the same tags — High red, Medium yellow, Low grey.
- Status rule: a status always carries a word; a tag's label is enough, its icon is optional.
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
