---
name: sync-artifact
description: Use after committing any change to tokens.json, guidelines.md, components.css, hb.js or a component's guide (components/<name>.md) in hb-mininectar, to push the change to the Mini Nectar Claude Design artifact so Claude Design prototypes stay identical to the repo. Covers which artifact files to regenerate (tokens.json, README.md, components/bundle.css + bundle.js, components/<Name>/README.md + preview.html) and how to publish them.
---

## Sync the Mini Nectar artifact

The repo is the single source of truth. The Claude Design artifact is a copy
that must be updated whenever the repo changes, or Claude Design prototypes
drift from Claude Code prototypes.

**Sync committed work only.** The artifact must never hold code the repo
doesn't. Commit first; `build_bundle.py` refuses to run while `components.css`,
`hb.js` or `datepicker.js` have uncommitted changes. If another session shares
this folder, don't sync its uncommitted work either — wait for its commit.

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

1. In ONE message: `read` the artifact itself (Artifact tool, `action: "read"`,
   `url` only — a publish is refused until you have seen its latest version,
   and reading only `paths` does not count), and `read` the files you will
   change (`paths`, `out_dir` = one scratchpad folder `<dir>`), so the local
   copies are current.
2. Write the new versions at `<dir>/project/<path>`.
3. ONE publish: `url` = the artifact, `root` = `<dir>`, `file_path` = one changed
   file (absolute path), `files` = the others (`{"project/…": "project/…"}`).
   Do not send `project/design-system.json` unless its own keys change.
4. If the publish is refused, do step 1 again (both reads), redo the edit on
   the fresh copies and publish once more. A second refusal: stop and tell
   the user — never `force`.
5. Verify: `read` the files you just published and check they hold the new
   content (e.g. a line you added). A failed command earlier in the chain can
   leave an old copy in `<dir>`, and the publish will happily send it.
