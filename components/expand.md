The one component for showing and hiding content — what people also call an accordion, a collapsible, a collapse card or a show more.

It replaces Nectar's HbExpand (→ base), HbAccordion (→ card with `--muted-header`) and HbCollapseCard (→ card; its "composed" variant is show more).

## Variants

| Variant | Class | Use it for |
|---|---|---|
| Base | `hb-expand` | Small bits of secondary detail inside other content: "Show more details" / "Show less". Behaviour only, no chrome. |
| Card | `hb-expand hb-expand--card` | A self-contained section the analyst may not need every time. Bordered, with a divider under the header when open. |
| Muted header | `+ hb-expand--muted-header` | A card with a grey header. |
| Show more | `hb-expand hb-expand--card hb-expand--show-more` | Long text where the first four lines are enough most of the time. The toggle sits at the bottom. |

Stacked cards with an "Expand all" button are the accordion — a pattern, not a separate component (see below).

## Behaviour

- One native `<button type="button">` with `aria-expanded` and `aria-controls`.
- The region it controls (`hb-expand__region`) comes straight after it in the DOM.
- Open/closed state lives in Alpine: `x-data="{ open: false }"`.
- The chevron (`hb-expand__chevron`, `expand_more`, `aria-hidden`) points down when closed and turns up when open.

## Structure

Base: put `hb-expand__toggle` on a tertiary `hb-btn`, and the region right after it.

```html
<div class="hb-expand" x-data="{ open: false }">
  <button type="button" class="hb-btn hb-btn--tertiary hb-btn--sm hb-expand__toggle"
          aria-controls="alert-details" :aria-expanded="open ? 'true' : 'false'" @click="open = !open">
    <span x-text="open ? 'Show less' : 'Show more details'">Show more details</span>
    <span class="hb-icon hb-expand__chevron" aria-hidden="true">expand_more</span>
  </button>
  <div class="hb-expand__region" id="alert-details" x-show="open" x-cloak>…</div>
</div>
```

Card: the whole header is ONE button inside a heading.

- `hb-expand__header` > `h3.hb-expand__heading` > `button.hb-expand__toggle`. Pick the heading level that fits the page outline.
- Inside the button: `hb-expand__title`, an optional `hb-expand__meta` count, and the chevron.
- Header actions go in `hb-expand__actions`, a sibling of the heading.
- The region takes `role="region"` and `aria-labelledby` the button. Inside it: `hb-expand__body`, or `hb-expand__list` for a list.

```html
<div class="hb-expand hb-expand--card" x-data="{ open: false }">
  <div class="hb-expand__header">
    <h3 class="hb-expand__heading">
      <button type="button" class="hb-expand__toggle" id="rules-btn"
              aria-controls="rules" :aria-expanded="open ? 'true' : 'false'" @click="open = !open">
        <span class="hb-expand__title">Triggered rules</span>
        <span class="hb-expand__meta">2</span>
        <span class="hb-icon hb-expand__chevron" aria-hidden="true">expand_more</span>
      </button>
    </h3>
    <div class="hb-expand__actions">…</div>
  </div>
  <div class="hb-expand__region" id="rules" role="region" aria-labelledby="rules-btn" x-show="open" x-cloak>
    <div class="hb-expand__body">…</div>
  </div>
</div>
```

Show more: the region comes first and stays rendered (no `x-show`). The toggle follows it, in `hb-expand__footer`. Collapsing keeps focus on the button and scrolls it back into view.

## States

| State | Trigger | What changes |
|---|---|---|
| Open | `aria-expanded="true"` | Chevron turns up. Card: a divider under the header. Show more: full text. |
| Hover | `:hover` on a card header | `ui-bg-secondary` background (`ui-bg-tertiary` on a muted header). |
| Focus | `:focus-visible` on a card header | A focus ring inside the header's edge. |
| Loading | `aria-busy="true"` on the card | `hb-expand__skeleton` with two `hb-expand__skeleton-line` replaces the title. The toggle is `disabled` and keeps a visually hidden "Loading …" name (`hb-visually-hidden`). |

## Writing the header

- A count on its own is fine when the title says what it counts: "Linked accounts 3".
- Add the unit when it counts a subset or something else: "Transactions 12 flagged".
- Name icon-only actions after the section: "More actions for Linked accounts".

## When to use

| Use | For |
|---|---|
| Base | Small bits of secondary detail, inline within other content. |
| Card | Self-contained sections a user may not need every time. |
| Show more | Long content where the first part is enough most of the time — and clearly longer than the preview. |
| Stacked cards | Several related sections on one screen. |

Don't collapse:

- Critical information analysts must see: risk scores, warnings, required actions.
- Very short content. Opening it costs more than reading it.
- Content needed on every visit.

For expandable rows inside a table, use Table's expandable rows — the same disclosure logic, applied to rows.

## Stacked cards (the accordion pattern)

- Several `hb-expand--card` sections, with an "Expand all" button above them.
- The button reads "Collapse all" only when every section is open.
- Any number of sections can be open at once. Never "only one open at a time": analysts compare sections side by side.
- "Expand all" helps analysts scan everything, and lets the browser's find see closed sections.
- There is no `hb-accordion`. It becomes a component only if three or more real use cases need more behaviour.

## Do

- Put header actions in `hb-expand__actions`, next to the heading.
- Keep the chevron decorative. The state comes from `aria-expanded`.
- Update `aria-expanded` on every toggle.

## Don't

- Don't put links, buttons or any interactive element inside the toggle button. Nested click targets are invalid and unreachable by keyboard.
- Don't fix a nested action with `stopPropagation`. Move it out of the button.
- Don't put links or buttons in show more content. The clipped part stays focusable while hidden. Use a card instead.
- Don't write key handlers. The native button gives Enter and Space for free.

## Example

```html
<div class="hb-expand hb-expand--card hb-expand--muted-header" x-data="{ open: false }">
  <div class="hb-expand__header">
    <h3 class="hb-expand__heading">
      <button type="button" class="hb-expand__toggle" id="accounts-btn"
              aria-controls="accounts" :aria-expanded="open ? 'true' : 'false'" @click="open = !open">
        <span class="hb-expand__title">Linked accounts</span>
        <span class="hb-expand__meta">3</span>
        <span class="hb-icon hb-expand__chevron" aria-hidden="true">expand_more</span>
      </button>
    </h3>
    <div class="hb-expand__actions">
      <button type="button" class="hb-btn hb-btn--ghost hb-btn--sm" aria-label="More actions for Linked accounts">
        <span class="hb-icon">more_vert</span>
      </button>
    </div>
  </div>
  <div class="hb-expand__region" id="accounts" role="region" aria-labelledby="accounts-btn" x-show="open" x-cloak>
    <ul class="hb-expand__list">
      <li>Personal checking ••4821 · Opened 2016 · Active</li>
      <li>Business checking ••7710 · Okafor Trading LLC · Active</li>
      <li>Savings ••0937 · Opened 2018 · Active</li>
    </ul>
  </div>
</div>
```
