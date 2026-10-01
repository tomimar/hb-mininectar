The secondary navigation inside a page, listing that page's sections — the sections of a Case, a Profile or Settings.

## Structure

```html
<div class="hb-sidenav-area">
  <nav class="hb-sidenav" aria-label="Case sections">
    <div class="hb-sidenav__section">Investigation</div>
    <a class="hb-sidenav__item hb-sidenav__item--active" href="#" aria-current="page">
      <span class="hb-sidenav__label">Alerts</span>
      <span class="hb-sidenav__count">12</span>
    </a>
    <ul class="hb-sidenav__submenu">
      <li><a class="hb-sidenav__subitem hb-sidenav__subitem--active" href="#" aria-current="page">Screening</a></li>
      <li><a class="hb-sidenav__subitem" href="#">Transaction monitoring</a></li>
    </ul>
    <a class="hb-sidenav__item" href="#"><span class="hb-sidenav__label">Files</span></a>
  </nav>
  <main>…</main>
</div>
```

- `hb-sidenav-area` wraps the nav and the content. It is required: it is what the collapsed nav floats over.
- It shares the surface of the content: no background, no divider.
- `hb-sidenav__section` is an uppercase label above a group of items.
- `hb-sidenav__item` is one page section: an `<a>` or a `<button>`, with an optional `__icon`, a `__label` (truncates, never wraps) and an optional `__count`.
- No header or title in the nav: the page already has one.
- Width comes from `--hb-sidenav-width` (240px by default).

## States

| State | Trigger | What changes |
|---|---|---|
| Default | Resting | Secondary text on a transparent row. |
| Hover | `:hover` | `ui-bg-secondary` fill; text and icon go to `ui-text`. |
| Focus | `:focus-visible` | 2px `ui-interaction` outline, inset so it never clips. |
| Active | `__item--active` | `ui-bg-secondary` fill plus bold weight. Hover deepens to `ui-bg-tertiary`. |
| Disabled | `__item--disabled` or `disabled` | `ui-disabled` text, not clickable. |

## Icons

- Add a leading `hb-sidenav__icon` only when the nav lists destinations of different kinds (Settings does; a Case's sections don't).
- All items or none. One icon among plain labels reads as an error.

## Counts

- `hb-sidenav__count` tells how many records a section holds, so the analyst knows what is worth opening.
- Show it only where the number changes something.
- Leave it off instead of showing 0. The empty state inside the section says it's empty.

## Submenus

- An item may own one level of `hb-sidenav__submenu` with `hb-sidenav__subitem` rows, in caption bold, hung off a thin rail line.
- It shows only while its parent is the current section. There is no chevron and nothing to expand.
- The current sub-item takes `__subitem--active` and darkens its own segment of the rail. Its parent stays `__item--active`.

## Collapsing

- `is-collapsed` on `hb-sidenav` takes the nav out of the layout, handing its width back to a wide table. Nothing is left behind: no rail, no strip of icons.
- Hovering (or focusing) the toggle adds `is-peeking`: the nav floats back over the content, fully usable. A short delay on leaving stops it flickering.
- Clicking `hb-sidenav__toggle` pins it open again. The Notion pattern.
- Persist the collapsed state per user (localStorage), not per page.

## The toggle

- Always the top-left corner of the content, in the same place on every page.
- The content starts with a title or breadcrumb: the toggle goes inline, right before it.
- The content starts with a card, form or table: the toggle sits alone on that first line.
- The peek panel hangs from `--hb-sidenav-peek-top` (56px by default) so it never covers the toggle. Raise it if the content starts with a taller header.
- Only its icon and name change with the state: "Collapse navigation" / "Expand navigation", with `aria-expanded`.

## What the consumer owns

The items, the current-section state, and `aria-current="page"` on the active item.

## When to use

- In-page navigation between a page's sections only.
- Moving between products or top-level areas is the app header's job (the global rail), not this component's.

## Do

- Offer the collapse toggle wherever the nav sits next to a table or another wide surface.
- Let the peeking nav be fully usable: the analyst can navigate from it without pinning it.
- Keep the current sub-item's parent marked active.

## Don't

- Don't leave a strip of icons behind when collapsed.
- Don't make hover the only way to bring the nav back. The toggle is a real button that works on click and Enter.
- Don't let the peek panel cover the toggle.
- Don't put a chevron on a section with sub-sections.
- Don't nest more than one level. Flatten the section instead.
- Don't signal the current item by colour alone.

## Accessibility

- The `<nav>` has an `aria-label`: a page often has two navs, and they must be told apart.
- Mark the current item with `aria-current="page"`, not only `--active`.
- Nothing needs `aria-expanded` except the toggle.
- A submenu is a plain `<ul>` nested under its parent item.
- Icons are decorative (`aria-hidden`); the label carries the meaning.
- A collapsed nav is hidden with `visibility`, so its links leave the tab order.
- Transitions are dropped under `prefers-reduced-motion`.

## Example

```html
<div class="hb-sidenav-area">
  <nav class="hb-sidenav is-collapsed" aria-label="Case sections">…</nav>
  <main>
    <h2>
      <button class="hb-sidenav__toggle" aria-label="Expand navigation" aria-expanded="false">
        <span class="hb-icon" aria-hidden="true">last_page</span>
      </button>
      CASE-10482 / Alerts
    </h2>
    <div class="hb-table-wrap">…</div>
  </main>
</div>
```
