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
   `python3 scripts/new_prototype.py ../prototypes/my-prototype --template case-tab`
   (add `--offline` to work without internet, `--zip` for a zip to share).
2. Open `index.html` directly in the browser (`file://` — no server needed).
3. Build your prototype inside the marked `PROTOTYPE AREA`, replacing the
   placeholder.

## Available templates

| Template | Folder | Description |
|---|---|---|
| Page | `page/` | Most pages (settings, a list, a form): global nav, paper, page header with a title and an action; breadcrumbs ready to uncomment for a page under another one. |
| Dashboard | `dashboard/` | A section's main page, like Requests: section icon, title and tabs in the header; table toolbar, table and footer in the body. |
| Page with tabs | `page-tabs/` | One record with sibling views, each in a tab: status tag next to the title, actions, tabs and one panel per tab. |
| Record | `profile/` | A profile or entity: type icon, title, subtitle and tags in the header, a collapsible Sidenav for its sections. |
| Case - Tab | `case-tab/` | A tab inside a Hummingbird case: case header (name, tags, people, Comments/History/Add to case/Lock case, Ask AI), browser-like case tabs and the open tab. [Figma](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=8737-457) |
| Blank | `blank/` | An empty page with Mini Nectar, Tailwind and Alpine loaded, for a component experiment. |

The layouts are explained on the docs site: [App shell](https://tomimar.github.io/hb-mininectar/components/app-shell.html).
