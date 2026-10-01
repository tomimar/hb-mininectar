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

`hb.js` does the work — no script of your own:

- The toggle is one native `<button type="button">` with `aria-expanded` and `aria-controls`.
- The region it controls (`hb-expand__region`) comes straight after it in the DOM. A closed region carries `hidden`.
- Write the starting state in the markup (`aria-expanded="false"` + `hidden`, or `"true"` and no `hidden`). A click flips both.
- A label that changes with the state: `<span data-label-open="Show less">Show more details</span>`.
- The chevron (`hb-expand__chevron`, `expand_more`, `aria-hidden`) points down when closed and turns up when open.

### Base

Put `hb-expand__toggle` on a tertiary `hb-btn`, and the region right after it.

```html preview
<div class="hb-expand">
  <button type="button" class="hb-btn hb-btn--tertiary hb-btn--sm hb-expand__toggle"
          aria-controls="alert-details" aria-expanded="false">
    <span data-label-open="Show less">Show more details</span>
    <span class="hb-icon hb-expand__chevron" aria-hidden="true">expand_more</span>
  </button>
  <div class="hb-expand__region" id="alert-details" hidden>
    <p>Cash deposits kept under the $10,000 reporting threshold. Detected 29 Jun 2026, assigned to Elena Cruz.</p>
  </div>
</div>
```

### Card

The whole header is ONE button inside a heading.

- `hb-expand__header` > `h3.hb-expand__heading` > `button.hb-expand__toggle`. Pick the heading level that fits the page outline.
- Inside the button: `hb-expand__title`, an optional `hb-expand__meta` count, and the chevron.
- Header actions go in `hb-expand__actions`, a sibling of the heading.
- The region takes `role="region"` and `aria-labelledby` the button. Inside it: `hb-expand__body`, or `hb-expand__list` for a list.

```html preview
<div class="hb-expand hb-expand--card">
  <div class="hb-expand__header">
    <h3 class="hb-expand__heading">
      <button type="button" class="hb-expand__toggle" id="rules-btn"
              aria-controls="rules" aria-expanded="true">
        <span class="hb-expand__title">Triggered rules</span>
        <span class="hb-expand__meta">2</span>
        <span class="hb-icon hb-expand__chevron" aria-hidden="true">expand_more</span>
      </button>
    </h3>
  </div>
  <div class="hb-expand__region" id="rules" role="region" aria-labelledby="rules-btn">
    <div class="hb-expand__body">
      R-104 Cash structuring. 12 cash deposits between $9,400 and $9,900 in 27 days.
    </div>
  </div>
</div>
```

With a muted header, a list and header actions:

```html preview
<div class="hb-expand hb-expand--card hb-expand--muted-header">
  <div class="hb-expand__header">
    <h3 class="hb-expand__heading">
      <button type="button" class="hb-expand__toggle" id="accounts-btn"
              aria-controls="accounts" aria-expanded="false">
        <span class="hb-expand__title">Linked accounts</span>
        <span class="hb-expand__meta">3</span>
        <span class="hb-icon hb-expand__chevron" aria-hidden="true">expand_more</span>
      </button>
    </h3>
    <div class="hb-expand__actions">
      <button type="button" class="hb-btn hb-btn--ghost hb-btn--sm" aria-label="Add linked account">
        <span class="hb-icon">add</span>
      </button>
    </div>
  </div>
  <div class="hb-expand__region" id="accounts" role="region" aria-labelledby="accounts-btn" hidden>
    <ul class="hb-expand__list">
      <li>Personal checking ••4821 · Opened 2016 · Active</li>
      <li>Business checking ••7710 · Okafor Trading LLC · Active</li>
      <li>Savings ••0937 · Opened 2018 · Active</li>
    </ul>
  </div>
</div>
```

### Show more

The region comes first and stays rendered (no `hidden`): CSS clips it to four lines while closed. The toggle follows it, in `hb-expand__footer`. Collapsing keeps focus on the button and scrolls it back into view.

```html preview
<div class="hb-expand hb-expand--card hb-expand--show-more">
  <div class="hb-expand__region" id="note">
    <div class="hb-expand__body">
      <p>Subject made 12 cash deposits into personal checking ••4821 between 2 and 28 June 2026, each between $9,400 and $9,900, for a total of $115,200.</p>
      <p>Within 48 hours of each deposit, most of the funds were moved to business checking ••7710 and then wired to Lagos Freight Partners Ltd.</p>
      <p>KYC was last refreshed in March 2024 and lists expected monthly cash activity under $2,000.</p>
      <p>Recommendation: escalate to enhanced due diligence and prepare a continuing-activity SAR.</p>
    </div>
  </div>
  <div class="hb-expand__footer">
    <button type="button" class="hb-btn hb-btn--tertiary hb-btn--sm hb-expand__toggle"
            aria-controls="note" aria-expanded="false">
      <span data-label-open="Show less">Show more</span>
      <span class="hb-icon hb-expand__chevron" aria-hidden="true">expand_more</span>
    </button>
  </div>
</div>
```

## States

| State | Trigger | What changes |
|---|---|---|
| Open | `aria-expanded="true"` | Chevron turns up. Card: a divider under the header. Show more: full text. |
| Hover | `:hover` on a card header | `ui-bg-secondary` background (`ui-bg-tertiary` on a muted header). |
| Focus | `:focus-visible` on a card header | A focus ring inside the header's edge. |
| Loading | `aria-busy="true"` on the card | `hb-expand__skeleton` with two `hb-expand__skeleton-line` replaces the title. The toggle is `disabled` and keeps a visually hidden "Loading …" name (`hb-visually-hidden`). |

```html preview
<div class="hb-expand hb-expand--card" aria-busy="true">
  <div class="hb-expand__header">
    <h3 class="hb-expand__heading">
      <button type="button" class="hb-expand__toggle" aria-controls="previous-alerts" aria-expanded="false" disabled>
        <span class="hb-expand__skeleton" aria-hidden="true">
          <span class="hb-expand__skeleton-line"></span>
          <span class="hb-expand__skeleton-line"></span>
        </span>
        <span class="hb-visually-hidden">Loading previous alerts</span>
        <span class="hb-icon hb-expand__chevron" aria-hidden="true">expand_more</span>
      </button>
    </h3>
  </div>
  <div class="hb-expand__region" id="previous-alerts" hidden></div>
</div>
```

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
- Give the button `data-hb-expand-all="<id of the container>"`. `hb.js` opens every card, or closes them all when every one is already open.
- The button reads "Collapse all" only when every section is open (`data-label-open="Collapse all"`).
- Any number of sections can be open at once. Never "only one open at a time": analysts compare sections side by side.
- "Expand all" helps analysts scan everything, and lets the browser's find see closed sections.
- There is no `hb-accordion`. It becomes a component only if three or more real use cases need more behaviour.

```html preview
<div style="display: flex; flex-direction: column; gap: var(--spacing-8);">
  <div>
    <button type="button" class="hb-btn hb-btn--tertiary hb-btn--sm"
            data-hb-expand-all="case-review" data-label-open="Collapse all">Expand all</button>
  </div>
  <div id="case-review" style="display: flex; flex-direction: column; gap: var(--spacing-8);">
    <div class="hb-expand hb-expand--card">
      <div class="hb-expand__header">
        <h3 class="hb-expand__heading">
          <button type="button" class="hb-expand__toggle" id="subject-btn" aria-controls="subject" aria-expanded="false">
            <span class="hb-expand__title">Subject details</span>
            <span class="hb-icon hb-expand__chevron" aria-hidden="true">expand_more</span>
          </button>
        </h3>
      </div>
      <div class="hb-expand__region" id="subject" role="region" aria-labelledby="subject-btn" hidden>
        <div class="hb-expand__body">Daniel Okafor · Born 14 Mar 1981 · Import/export broker · Customer since 2016</div>
      </div>
    </div>
    <div class="hb-expand hb-expand--card">
      <div class="hb-expand__header">
        <h3 class="hb-expand__heading">
          <button type="button" class="hb-expand__toggle" id="transactions-btn" aria-controls="transactions" aria-expanded="false">
            <span class="hb-expand__title">Transactions</span>
            <span class="hb-expand__meta">12 flagged</span>
            <span class="hb-icon hb-expand__chevron" aria-hidden="true">expand_more</span>
          </button>
        </h3>
      </div>
      <div class="hb-expand__region" id="transactions" role="region" aria-labelledby="transactions-btn" hidden>
        <div class="hb-expand__body">12 cash deposits between $9,400 and $9,900, 2–28 Jun 2026.</div>
      </div>
    </div>
  </div>
</div>
```

## Do

- Put header actions in `hb-expand__actions`, next to the heading.
- Keep the chevron decorative. The state comes from `aria-expanded`.
- Write the starting state in the markup and let `hb.js` keep `aria-expanded` and `hidden` in step.

## Don't

- Don't put links, buttons or any interactive element inside the toggle button. Nested click targets are invalid and unreachable by keyboard.
- Don't fix a nested action with `stopPropagation`. Move it out of the button.
- Don't put links or buttons in show more content. The clipped part stays focusable while hidden. Use a card instead.
- Don't write key handlers. The native button gives Enter and Space for free.
