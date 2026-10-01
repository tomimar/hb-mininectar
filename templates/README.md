# Templates

Starting points for building Hummingbird prototypes. Each template is a
self-contained folder — copy it, rename it, and build your prototype inside.

Templates load the published Mini Nectar DS (`tokens.css` + `components.css`)
plus a local `custom.css` with components that are **not in the DS yet**.
Once a custom component is approved, promote it to `components.css` with the
`add-component` skill.

## How to use

1. Create the prototype from the repo root — it copies the template and pins
   Mini Nectar to the latest release:
   `python3 scripts/new_prototype.py ~/Documents/Prototypes/my-prototype --template case-tab`
   (add `--offline` to work without internet, `--zip` for a zip to share).
2. Open `index.html` directly in the browser (`file://` — no server needed).
3. Build your prototype inside the marked `PROTOTYPE AREA`, replacing the
   placeholder.

## Available templates

| Template | Folder | Description |
|---|---|---|
| Blank | `blank/` | An empty page with Mini Nectar, Tailwind and Alpine loaded. |
| Case - Tab | `case-tab/` | A tab inside a Hummingbird case: global nav rail, case header (name, tags, History/Comments/Add to case/Lock Case actions), browser-like tab strip and a white canvas for prototyping. [Figma](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=8737-457) |
