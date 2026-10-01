---
name: new-prototype
description: Use when starting a new Hummingbird HTML prototype with Mini Nectar (a screen, a flow, a component experiment, something to share as a zip). Creates the folder from a template pinned to a Mini Nectar release, optionally fully offline and zipped, and explains how to build inside it.
---

## Start a prototype

1. Pick a name and a template:
   - `blank` — an empty page.
   - `case-tab` — a tab inside a Hummingbird case: global nav, case header, tab strip and a canvas.
2. Run, from the hb-mininectar repo:

   ```bash
   python3 scripts/new_prototype.py ~/Documents/Prototypes/<name> --template <template>
   ```

   Add `--offline` if it will be opened without internet (it copies Mini Nectar,
   the fonts, Tailwind and Alpine into `vendor/`) and `--zip` to get `<name>.zip`
   to share. The version defaults to the latest release; `--version vX.Y.Z`
   pins another.
3. Build inside the `PROTOTYPE AREA` of `index.html`.

## Building

- Read `guidelines.md` and the `.md` of every component you use (`components/<name>.md`)
  — their examples are copy-paste ready.
- Components work from their markup through `hb.js` (already loaded). Don't write
  JavaScript to open, close or reorder components.
- Tailwind is for layout only (flex, grid, gap, padding with tokens). Never its
  colors or type.
- Alpine.js is optional, for the prototype's own logic: fake data, filters, tabs.
- Every value is a token. A component the DS doesn't have yet goes in the
  prototype's `custom.css` (named `.hb-<component>`, tokens only); promote it later
  with the `add-component` skill.
- Realistic AML content: cases, alerts, entities, transactions. Sentence case.
  Button labels are verbs on the object ("Escalate case"), never "Submit" or "OK".

## When the design system changes

The prototype stays on the release it was created with. To move it to a newer
one, change the version in its Mini Nectar URLs (`…/hb-mininectar@vX.Y.Z/…`) and
check `CHANGELOG.md` for anything that breaks.
