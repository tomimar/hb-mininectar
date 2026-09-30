# Templates

Starting points for building Hummingbird prototypes. Each template is a
self-contained folder — copy it, rename it, and build your prototype inside.

Templates load the published Mini Nectar DS (`tokens.css` + `components.css`)
plus a local `custom.css` with components that are **not in the DS yet**.
Once a custom component is approved, promote it to `components.css` following
the checklist in the root `CLAUDE.md`.

## How to use

1. Copy the template folder into your prototypes directory
   (e.g. `~/Documents/Prototypes/my-prototype/`).
2. Open `index.html` directly in the browser (`file://` — no server needed).
3. Build your prototype inside the marked `PROTOTYPE AREA`
   (`.hb-case-canvas`), replacing the placeholder.

## Available templates

| Template | Folder | Description |
|---|---|---|
| Case - Tab | `case-tab/` | A tab inside a Hummingbird case: global nav rail, case header (name, tags, History/Comments/Add to case/Lock Case actions), browser-like tab strip and a white canvas for prototyping. [Figma](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=8737-457) |
