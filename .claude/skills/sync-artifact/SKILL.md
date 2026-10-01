---
name: sync-artifact
description: Use after any change to tokens.json, guidelines.md, components.css, hb.js or a component's guide (components/<name>.md) in hb-mininectar, to push the change to the Mini Nectar Claude Design artifact so Claude Design prototypes stay identical to the repo. Covers which artifact files to regenerate (tokens.json, README.md, components/bundle.css + bundle.js, components/<Name>/README.md + preview.html) and how to publish them.
---

## Sync the Mini Nectar artifact

The repo is the single source of truth. The Claude Design artifact is a copy
that must be updated whenever the repo changes, or Claude Design prototypes
drift from Claude Code prototypes.

- **Artifact**: https://claude.ai/artifact/3EkAk2dhv5TzvQdrvUwqnd (type "Design System")
- Its content lives under `project/`. Never write `index.html`, `SKILL.md`,
  `artifact-type/…`, or the generated `project/tokens.css`, `api/…`, `manifest.json`.

### What to sync

| Repo change | Artifact file | How |
|---|---|---|
| `tokens.json` | `project/tokens.json` | copy the file as is |
| `guidelines.md` | `project/README.md` | copy the file as is |
| `components.css` or `hb.js` | `project/components/bundle.css` + `project/components/bundle.js` | `python3 scripts/build_bundle.py <dir>/project/components` (writes both; always publish both) |
| `components/<component>.md` | `project/components/<Name>/README.md` | copy the file as is |
| New component | `project/components/<Name>/preview.html` | write it (see below), plus the README copy above |

`<Name>` is PascalCase (`floating-action.md` → `FloatingAction`, `popup-select.md` → `PopupSelect`; `icons.md` → `Icon`).

### Component guidelines and preview

- **Guidelines** — written in the repo at `components/<component>.md`, never in the
  artifact directly. Same format as `components/button.md`: first line is a
  one-sentence summary (no `#` title), then short `##` sections — variants,
  sizes, structure, states, writing the label, when to use, Do, Don't, example.
  Copy it as the artifact's `README.md`.
- **preview.html** — line 1 is `<!-- @dsCard group="<Group>" height=<px> -->`,
  then one `<div>` fragment (no doctype) with a small `<style>` and static
  markup showing the main variants and states. No Alpine. The artifact preloads
  `bundle.js` (= `hb.js`), so components with behaviour work in previews: write
  their starting state (`aria-expanded`, `hidden`…) in the markup. Use tokens only and
  realistic AML content (cases, alerts, entities). Copy the shape of an
  existing preview, e.g. `project/components/Drag/preview.html`.
  Groups in use: `Foundations`, `Actions`, `Forms`, `Data display`, `Navigation`, `Feedback`.

### How to publish

1. `read` the artifact files you will change (Artifact tool, `action: "read"`,
   `paths`) into one scratchpad folder `<dir>`, so the local copies are current.
2. Write the new versions at `<dir>/project/<path>`.
3. ONE publish: `url` = the artifact, `root` = `<dir>`, `file_path` = one changed
   file (absolute path), `files` = the others (`{"project/…": "project/…"}`).
   Do not send `project/design-system.json` unless its own keys change.
4. If the publish is refused because the artifact changed, read it again, redo
   the edit once, and publish again.
