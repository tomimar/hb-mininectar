---
name: sync-artifact
description: Use after any change to tokens.json, components.css or a component's guidelines in hb-mininectar, to push the change to the Mini Nectar Claude Design artifact so Claude Design prototypes stay identical to the repo. Covers which artifact files to regenerate (tokens.json, components/bundle.css, components/<Name>/README.md + preview.html) and how to publish them.
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
| `components.css` | `project/components/bundle.css` | `python3 scripts/build_bundle.py <dir>/project/components/bundle.css` |
| New component | `project/components/<Name>/README.md` + `preview.html` | write both (see below) |
| Changed component guidelines | `project/components/<Name>/README.md` | update it to match the docs page |

`<Name>` is PascalCase (`FloatingAction`, `PopupSelect`).

### Component README and preview

- **README.md** — guidelines in plain prose: first sentence is a one-line summary,
  then structure (classes), variants, states, what the consumer provides, and
  accessibility rules. Source: the component's usage comment in `components.css`
  and its docs page `components/<component>.html`.
- **preview.html** — line 1 is `<!-- @dsCard group="<Group>" height=<px> -->`,
  then one `<div>` fragment (no doctype) with a small `<style>` and static
  markup showing the main variants and states. No Alpine: set `aria-expanded`,
  `checked`, `hidden`, etc. directly to show each state. Use tokens only and
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
