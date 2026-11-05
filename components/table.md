The data table — the densest and most-used surface in Hummingbird.

## The main rule: the row is not the control

- Put every action in a cell, as a real `<a>` or `<button>`.
- Never put a click handler on a `<tr>`.
- Never turn the table into an ARIA grid to make rows clickable.

Both break the keyboard and screen readers.

## Structure

```html
<div class="hb-table-wrap" role="region" tabindex="0" aria-labelledby="caption-id">
  <table class="hb-table">
    <caption id="caption-id" class="hb-table__caption">Screening alerts</caption>
    …
    <tr>
      <th scope="row" class="hb-table__rowheader">
        <a class="hb-link hb-table__link" href="#">Alert 4128</a>
      </th>
      <td class="hb-table__cell--num">92</td>
      <td class="hb-table__actions">…</td>
    </tr>
  </table>
</div>
```

- `hb-table-wrap` makes the scroll area reachable by keyboard.
- The caption names the table for screen readers. It can be visually hidden.
- The first cell of each row is a `<th scope="row">` with the main link.
- Numbers use `hb-table__cell--num` (right-aligned).
- The actions column header uses a `hb-visually-hidden` label. Every column has a header.

## Variants

| Modifier | What it does |
|---|---|
| (default) | Compact, 36px rows, full grid (horizontal and vertical lines). |
| `--comfortable` | 48px rows. For tables with few rows or that need larger targets. |
| `--plain` | No vertical lines — rows only. For tables scanned row by row rather than compared cell by cell. |
| `--row-link` | The whole row opens the main link. Cells can't be selected, so don't use it where analysts copy IDs or amounts. |
| `--resizable` | Columns can be resized — add `data-hb-resizable` and `hb.js` adds the handles. |

Default (compact, full grid) and `--plain`:

```html preview
<div class="hb-table-wrap" role="region" tabindex="0" aria-labelledby="cap-default">
  <table class="hb-table">
    <caption id="cap-default" class="hb-table__caption hb-visually-hidden">Open cases</caption>
    <thead><tr><th scope="col">Case</th><th scope="col">Subject</th><th scope="col" class="hb-table__cell--num">Alerts</th></tr></thead>
    <tbody>
      <tr><th scope="row" class="hb-table__rowheader"><a href="#" class="hb-link hb-table__link">CASE-10482</a></th><td>Aurora Holdings LLC</td><td class="hb-table__cell--num">14</td></tr>
      <tr><th scope="row" class="hb-table__rowheader"><a href="#" class="hb-link hb-table__link">CASE-10511</a></th><td>Daniel Okafor</td><td class="hb-table__cell--num">6</td></tr>
      <tr><th scope="row" class="hb-table__rowheader"><a href="#" class="hb-link hb-table__link">CASE-10530</a></th><td>Lagos Freight Partners Ltd</td><td class="hb-table__cell--num">3</td></tr>
    </tbody>
  </table>
</div>
```

```html preview
<div class="hb-table-wrap" role="region" tabindex="0" aria-labelledby="cap-plain">
  <table class="hb-table hb-table--plain">
    <caption id="cap-plain" class="hb-table__caption hb-visually-hidden">Open cases, plain</caption>
    <thead><tr><th scope="col">Case</th><th scope="col">Subject</th><th scope="col" class="hb-table__cell--num">Alerts</th></tr></thead>
    <tbody>
      <tr><th scope="row" class="hb-table__rowheader"><a href="#" class="hb-link hb-table__link">CASE-10482</a></th><td>Aurora Holdings LLC</td><td class="hb-table__cell--num">14</td></tr>
      <tr><th scope="row" class="hb-table__rowheader"><a href="#" class="hb-link hb-table__link">CASE-10511</a></th><td>Daniel Okafor</td><td class="hb-table__cell--num">6</td></tr>
      <tr><th scope="row" class="hb-table__rowheader"><a href="#" class="hb-link hb-table__link">CASE-10530</a></th><td>Lagos Freight Partners Ltd</td><td class="hb-table__cell--num">3</td></tr>
    </tbody>
  </table>
</div>
```

`--comfortable`:

```html preview
<div class="hb-table-wrap" role="region" tabindex="0" aria-labelledby="cap-comfortable">
  <table class="hb-table hb-table--comfortable">
    <caption id="cap-comfortable" class="hb-table__caption hb-visually-hidden">Open cases, comfortable</caption>
    <thead><tr><th scope="col">Case</th><th scope="col">Subject</th><th scope="col" class="hb-table__cell--num">Alerts</th></tr></thead>
    <tbody>
      <tr><th scope="row" class="hb-table__rowheader"><a href="#" class="hb-link hb-table__link">CASE-10482</a></th><td>Aurora Holdings LLC</td><td class="hb-table__cell--num">14</td></tr>
      <tr><th scope="row" class="hb-table__rowheader"><a href="#" class="hb-link hb-table__link">CASE-10511</a></th><td>Daniel Okafor</td><td class="hb-table__cell--num">6</td></tr>
      <tr><th scope="row" class="hb-table__rowheader"><a href="#" class="hb-link hb-table__link">CASE-10530</a></th><td>Lagos Freight Partners Ltd</td><td class="hb-table__cell--num">3</td></tr>
    </tbody>
  </table>
</div>
```

## Row parts

- **Primary action** — a real `hb-link` in the row-header cell, usually opening the detail view. It is underlined, so it's findable without hover.
- **Row actions** — icon-only ghost buttons (`hb-btn--ghost hb-btn--sm`) in `__actions`, the last column.
- **Selection** — a real `hb-checkbox` in `__select-col`, the first column. The header checkbox toggles all rows.
- **Selection and expand together** — two narrow `__select-col` columns: the checkbox first, then the expander (its header is a `hb-visually-hidden` "Expand"). The detail row's `colspan` covers every column.

Selection — `hb.js` makes the header checkbox tick every row, and keeps it checked or indeterminate as rows change:

```html preview
<div class="hb-table-wrap" role="region" tabindex="0" aria-labelledby="cap-select">
  <table class="hb-table">
    <caption id="cap-select" class="hb-table__caption hb-visually-hidden">Selection example</caption>
    <thead><tr><th scope="col" class="hb-table__select-col"><input type="checkbox" class="hb-checkbox" aria-label="Select all cases"></th><th scope="col">Case</th><th scope="col">Owner</th></tr></thead>
    <tbody>
      <tr><td class="hb-table__select-col"><input type="checkbox" class="hb-checkbox" aria-label="Select CASE-10482"></td><th scope="row" class="hb-table__rowheader"><a href="#" class="hb-link hb-table__link">CASE-10482</a></th><td>Elena Cruz</td></tr>
      <tr><td class="hb-table__select-col"><input type="checkbox" class="hb-checkbox" aria-label="Select CASE-10511"></td><th scope="row" class="hb-table__rowheader"><a href="#" class="hb-link hb-table__link">CASE-10511</a></th><td>Marcus Webb</td></tr>
      <tr><td class="hb-table__select-col"><input type="checkbox" class="hb-checkbox" aria-label="Select CASE-10530"></td><th scope="row" class="hb-table__rowheader"><a href="#" class="hb-link hb-table__link">CASE-10530</a></th><td>Priya Nair</td></tr>
    </tbody>
  </table>
</div>
```

## Optional parts

- **Expandable rows** — `__expander` + `__detail-row`. The button has `aria-expanded` and `aria-controls` (never the `<tr>`); the detail row starts `hidden`. `hb.js` toggles both. When the detail is tabular, nest a table in the detail row so child rows keep their own headers.
- **Row menu** — `__overflow`, `__menu`, `__menu-item`. Use it when a row has more than two actions. Keep the most frequent action visible; the trigger has `aria-haspopup="menu"`, `aria-expanded` and `aria-controls` pointing at the menu, which starts `hidden`; every item is a real `<button role="menuitem">`. `hb.js` opens and closes it (click outside and Escape close it; arrow keys move between items).
- **Toolbar** — `hb-table-toolbar`, placed directly before the wrap, with default-size (large) controls: search, filters and the Columns panel in `__controls`, and the batch actions in `__selection` while rows are ticked. See Batch actions below.
- **Footer** — `__footer` with `__footer-group`, `__pagination` and `__page-info`, placed after the wrap. For many rows or pages: row count, page-size Select (`__footer-label`) and status on the left; pagination on the right.

Expandable rows:

```html preview
<div class="hb-table-wrap" role="region" tabindex="0" aria-labelledby="cap-expand">
  <table class="hb-table">
    <caption id="cap-expand" class="hb-table__caption hb-visually-hidden">Expandable rows example</caption>
    <thead><tr><th scope="col" class="hb-table__select-col"><span class="hb-visually-hidden">Expand</span></th><th scope="col">Alert</th><th scope="col">Risk</th></tr></thead>
    <tbody>
      <tr>
        <td class="hb-table__select-col">
          <button type="button" class="hb-table__expander" aria-expanded="false" aria-controls="detail-2201"
                  aria-label="Toggle details for ALERT-2201"><span class="hb-icon hb-table__expander-icon">chevron_right</span></button>
        </td>
        <th scope="row" class="hb-table__rowheader"><a href="#" class="hb-link hb-table__link">ALERT-2201</a></th>
        <td><span class="hb-tag hb-tag--red">High</span></td>
      </tr>
      <tr class="hb-table__detail-row" id="detail-2201" hidden>
        <td colspan="3">Structuring pattern across 4 linked accounts. Recommended: escalate to enhanced due diligence.</td>
      </tr>
      <tr>
        <td class="hb-table__select-col">
          <button type="button" class="hb-table__expander" aria-expanded="false" aria-controls="detail-2202"
                  aria-label="Toggle details for ALERT-2202"><span class="hb-icon hb-table__expander-icon">chevron_right</span></button>
        </td>
        <th scope="row" class="hb-table__rowheader"><a href="#" class="hb-link hb-table__link">ALERT-2202</a></th>
        <td><span class="hb-tag hb-tag--yellow">Medium</span></td>
      </tr>
      <tr class="hb-table__detail-row" id="detail-2202" hidden>
        <td colspan="3">Cross-border transfer just under the reporting threshold. Recommended: request source of funds.</td>
      </tr>
    </tbody>
  </table>
</div>
```

Row menu:

```html preview
<div style="min-height: 220px;">
<div class="hb-table-wrap" role="region" tabindex="0" aria-labelledby="cap-menu">
  <table class="hb-table">
    <caption id="cap-menu" class="hb-table__caption hb-visually-hidden">Row menu example</caption>
    <thead><tr><th scope="col">Name</th><th scope="col">Owner</th><th scope="col"><span class="hb-visually-hidden">Actions</span></th></tr></thead>
    <tbody>
      <tr>
        <th scope="row" class="hb-table__rowheader"><a href="#" class="hb-link hb-table__link">AML transaction review</a></th>
        <td>Elena Cruz</td>
        <td class="hb-table__actions">
          <button type="button" class="hb-btn hb-btn--ghost hb-btn--sm" aria-label="Edit AML transaction review"><span class="hb-icon">edit</span></button>
          <span class="hb-table__overflow">
            <button type="button" class="hb-btn hb-btn--ghost hb-btn--sm" aria-haspopup="menu" aria-expanded="false"
                    aria-controls="menu-aml" aria-label="More actions for AML transaction review"><span class="hb-icon hb-icon--rounded">more_vert</span></button>
            <div class="hb-table__menu" id="menu-aml" role="menu" aria-label="More actions for AML transaction review" hidden>
              <button type="button" class="hb-table__menu-item" role="menuitem">Duplicate</button>
              <button type="button" class="hb-table__menu-item" role="menuitem">Archive</button>
              <button type="button" class="hb-table__menu-item" role="menuitem">Delete</button>
            </div>
          </span>
        </td>
      </tr>
      <tr>
        <th scope="row" class="hb-table__rowheader"><a href="#" class="hb-link hb-table__link">Sanctions screening</a></th>
        <td>Marcus Webb</td>
        <td class="hb-table__actions">
          <button type="button" class="hb-btn hb-btn--ghost hb-btn--sm" aria-label="Edit Sanctions screening"><span class="hb-icon">edit</span></button>
          <span class="hb-table__overflow">
            <button type="button" class="hb-btn hb-btn--ghost hb-btn--sm" aria-haspopup="menu" aria-expanded="false"
                    aria-controls="menu-sanctions" aria-label="More actions for Sanctions screening"><span class="hb-icon hb-icon--rounded">more_vert</span></button>
            <div class="hb-table__menu" id="menu-sanctions" role="menu" aria-label="More actions for Sanctions screening" hidden>
              <button type="button" class="hb-table__menu-item" role="menuitem">Duplicate</button>
              <button type="button" class="hb-table__menu-item" role="menuitem">Archive</button>
              <button type="button" class="hb-table__menu-item" role="menuitem">Delete</button>
            </div>
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</div>
```

Footer:

```html preview
<div>
<div class="hb-table-wrap" role="region" tabindex="0" aria-labelledby="cap-footer">
  <table class="hb-table">
    <caption id="cap-footer" class="hb-table__caption hb-visually-hidden">Footer example</caption>
    <thead><tr><th scope="col">Request</th><th scope="col">Status</th></tr></thead>
    <tbody>
      <tr><th scope="row" class="hb-table__rowheader"><a href="#" class="hb-link hb-table__link">Periodic review 2026</a></th><td><span class="hb-tag hb-tag--blue">Open</span></td></tr>
      <tr><th scope="row" class="hb-table__rowheader"><a href="#" class="hb-link hb-table__link">Sanctions refresh</a></th><td><span class="hb-tag hb-tag--grey">Awaiting review</span></td></tr>
    </tbody>
  </table>
</div>
<div class="hb-table__footer">
  <div class="hb-table__footer-group">
    <span class="hb-table__page-info">2 of 2</span>
    <label class="hb-table__footer-group">
      <span class="hb-table__footer-label">View</span>
      <div class="hb-select hb-select--sm" style="width: 88px;">
        <select aria-label="Rows per page"><option>10</option><option>25</option><option>50</option></select>
      </div>
    </label>
  </div>
  <nav class="hb-table__pagination" aria-label="Pagination">
    <button type="button" class="hb-btn hb-btn--secondary hb-btn--sm" aria-label="Previous page" disabled><span class="hb-icon">chevron_left</span></button>
    <span class="hb-table__page-info">1 of 1</span>
    <button type="button" class="hb-btn hb-btn--secondary hb-btn--sm" aria-label="Next page" disabled><span class="hb-icon">chevron_right</span></button>
  </nav>
</div>
</div>
```

## Batch actions

When analysts act on many rows at once — change their status, assign them, merge them — ticking rows puts the table's toolbar into **selection mode**: the usual controls give way to the selection count and the batch actions. Clearing the selection brings the controls back.

- **Keep the actions next to what they affect.** They live in the table's own toolbar, never in a bar that floats over the page or slides down from the top.
- **Keep the table still.** The toolbar has a fixed height (`--control-height-lg`, the height of a default button), so swapping modes never moves the rows. The swap is instant — no animation.
- **Use it for actions on several rows.** An action on one row belongs in that row (`__actions` or the row menu); don't make analysts tick a row to act on it alone.

### Anatomy

```html
<div class="hb-table-toolbar" role="toolbar" aria-label="Open cases"
     data-hb-toolbar-for="cases" data-hb-noun="case|cases">
  <div class="hb-table-toolbar__controls"> search · filters · Columns </div>
  <div class="hb-table-toolbar__selection" hidden>
    <span class="hb-table-toolbar__count hb-text-body-bold"></span>
    <span class="hb-table-toolbar__divider" aria-hidden="true"></span>
    <div class="hb-table-toolbar__actions"> batch actions </div>
    <button type="button" class="hb-btn hb-btn--ghost hb-btn--lg hb-table-toolbar__clear"
            data-hb-selection-clear>Clear selection</button>
  </div>
</div>
<div class="hb-table-wrap" …><table class="hb-table" id="cases"> … </table></div>
```

- **The toolbar** sits directly above `hb-table-wrap` and names its table with `data-hb-toolbar-for="<table id>"`. Same surface as the page: no background, no elevation. `role="toolbar"` and an `aria-label` that names the table; Tab moves through it as usual.
- **`__controls`** — the default slot: search, filters and the Columns panel. A `__spacer` pushes what follows it to the end.
- **`__selection`** — starts `hidden`. Left to right: the count, a divider, the batch actions, and Clear selection at the end.
- **The count** reads "1 case selected", "50 cases selected". Give the singular and plural with `data-hb-noun="case|cases"` (default "row|rows"). `hb.js` writes it.
- **Batch actions** are `hb-btn--secondary hb-btn--lg` with a leading icon. An action that opens options is a menu: wrap it in `__menu-wrap`, end the label with an `expand_more` chevron and use the row-menu markup (`aria-haspopup="menu"`, `hb-table__menu`, `role="menuitem"`). Never `--ghost` for a batch action: next to Clear selection, a "Cancel" action would read as dismissing the toolbar.
- **Clear selection** (`data-hb-selection-clear`) is the one `hb-btn--ghost` in the row — it dismisses the selection rather than acting on the rows. It unticks every row and moves focus to the select-all checkbox, because the button that had focus disappears.

`hb.js` does all of it from the row checkboxes — no script of your own. Your prototype only does what each action does.

### Minimum selection

Some actions need more than one row — you can't merge one case. Give them `data-hb-min-selection="2"` and point `aria-describedby` at a short reason: "Select 2 or more cases to merge".

- Below the minimum, `hb.js` sets `aria-disabled="true"`, not the `disabled` attribute: the button stays focusable, so keyboard and screen-reader users can reach it and hear why it's unavailable. Its clicks do nothing.
- Put the reason in an `hb-tooltip__content` next to the button so it shows on hover and focus. `hb.js` shows it only while the action is unavailable, and drops the `aria-describedby` once it isn't.

Tick one case, then a second:

```html preview
<div style="min-height: 340px;">
  <div class="hb-table-toolbar" role="toolbar" aria-label="Open cases" data-hb-toolbar-for="batch-cases" data-hb-noun="case|cases">
    <div class="hb-table-toolbar__controls">
      <div class="hb-search" style="width: 240px;">
        <svg class="hb-search__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"/></svg>
        <input class="hb-search__input" type="text" placeholder="Search cases…" aria-label="Search cases">
      </div>
      <span class="hb-table-toolbar__spacer"></span>
      <button type="button" class="hb-btn hb-btn--secondary hb-btn--lg"><span class="hb-icon" aria-hidden="true">download</span> Export CSV</button>
    </div>
    <div class="hb-table-toolbar__selection" hidden>
      <span class="hb-table-toolbar__count hb-text-body-bold"></span>
      <span class="hb-table-toolbar__divider" aria-hidden="true"></span>
      <div class="hb-table-toolbar__actions">
        <span class="hb-table-toolbar__menu-wrap">
          <button type="button" class="hb-btn hb-btn--secondary hb-btn--lg" aria-haspopup="menu" aria-expanded="false" aria-controls="batch-cases-status">
            <span class="hb-icon" aria-hidden="true">sync_alt</span> Case status <span class="hb-icon" aria-hidden="true">expand_more</span>
          </button>
          <div class="hb-table__menu" id="batch-cases-status" role="menu" aria-label="Case status" hidden>
            <button type="button" class="hb-table__menu-item" role="menuitem">Opened</button>
            <button type="button" class="hb-table__menu-item" role="menuitem">Work started</button>
            <button type="button" class="hb-table__menu-item" role="menuitem">Closed</button>
          </div>
        </span>
        <button type="button" class="hb-btn hb-btn--secondary hb-btn--lg"><span class="hb-icon" aria-hidden="true">block</span> Cancel</button>
        <span class="hb-tooltip">
          <button type="button" class="hb-btn hb-btn--secondary hb-btn--lg" data-hb-min-selection="2" aria-describedby="batch-cases-merge-reason">
            <span class="hb-icon" aria-hidden="true">merge</span> Merge
          </button>
          <span class="hb-tooltip__content" id="batch-cases-merge-reason" role="tooltip">Select 2 or more cases to merge</span>
        </span>
      </div>
      <button type="button" class="hb-btn hb-btn--ghost hb-btn--lg hb-table-toolbar__clear" data-hb-selection-clear>Clear selection</button>
    </div>
  </div>
  <div class="hb-table-wrap" role="region" tabindex="0" aria-labelledby="cap-batch">
    <table class="hb-table" id="batch-cases">
      <caption id="cap-batch" class="hb-table__caption hb-visually-hidden">Open cases</caption>
      <thead><tr><th scope="col" class="hb-table__select-col"><input type="checkbox" class="hb-checkbox" aria-label="Select all cases"></th><th scope="col">Case</th><th scope="col">Type</th><th scope="col">Status</th><th scope="col" class="hb-table__cell--num">Net activity</th></tr></thead>
      <tbody>
        <tr><td class="hb-table__select-col"><input type="checkbox" class="hb-checkbox" aria-label="Select CASE-10482"></td><th scope="row" class="hb-table__rowheader"><a href="#" class="hb-link hb-table__link">CASE-10482</a></th><td>AML investigation</td><td><span class="hb-tag hb-tag--yellow">Opened</span></td><td class="hb-table__cell--num">$1,194,502.06</td></tr>
        <tr><td class="hb-table__select-col"><input type="checkbox" class="hb-checkbox" aria-label="Select CASE-10511"></td><th scope="row" class="hb-table__rowheader"><a href="#" class="hb-link hb-table__link">CASE-10511</a></th><td>Fraud investigation</td><td><span class="hb-tag hb-tag--yellow">Opened</span></td><td class="hb-table__cell--num">$46,704.45</td></tr>
        <tr><td class="hb-table__select-col"><input type="checkbox" class="hb-checkbox" aria-label="Select CASE-10530"></td><th scope="row" class="hb-table__rowheader"><a href="#" class="hb-link hb-table__link">CASE-10530</a></th><td>EDD</td><td><span class="hb-tag hb-tag--blue">Work started</span></td><td class="hb-table__cell--num">$45,225.27</td></tr>
        <tr><td class="hb-table__select-col"><input type="checkbox" class="hb-checkbox" aria-label="Select CASE-10547"></td><th scope="row" class="hb-table__rowheader"><a href="#" class="hb-link hb-table__link">CASE-10547</a></th><td>PEP</td><td><span class="hb-tag hb-tag--yellow">Opened</span></td><td class="hb-table__cell--num">$9,375.00</td></tr>
        <tr><td class="hb-table__select-col"><input type="checkbox" class="hb-checkbox" aria-label="Select CASE-10552"></td><th scope="row" class="hb-table__rowheader"><a href="#" class="hb-link hb-table__link">CASE-10552</a></th><td>Adverse media</td><td><span class="hb-tag hb-tag--yellow">Opened</span></td><td class="hb-table__cell--num">$312.48</td></tr>
      </tbody>
    </table>
  </div>
</div>
```

### Accessibility

- Each change of the count is announced once through the live region — "3 cases selected", "Selection cleared" — debounced, so ticking select all on 50 rows says it once.
- Focus never stays on something that disappears: if it was inside the slot being hidden, it moves to the select-all checkbox.
- The swap is instant, so there is nothing to reduce for `prefers-reduced-motion`. The divider is a border and the unavailable actions use `GrayText`, so both hold in forced-colors mode.

## States

Handled by CSS, no extra classes:

| State | Trigger | What changes |
|---|---|---|
| Row hover | `:hover` on the row | `ui-bg-secondary` fill — a scan aid, not a sign the row is clickable. |
| Row selected | Checked `hb-checkbox` in the row | `ui-interaction-soft` fill. |
| Rows selected | 1+ row checkboxes ticked | The toolbar switches to selection mode: count, batch actions, Clear selection. |
| Row expanded | `aria-expanded="true"` on `__expander` | Chevron rotates; the detail row shows on `ui-bg-secondary`. |
| Region focus | `:focus-visible` on `hb-table-wrap` | 2px `ui-interaction` outline. |
| Menu open | `aria-expanded="true"` on the overflow trigger | The menu can overflow the wrap's scroll area. |

## Reordering, hiding and resizing columns

Dragging is never the only way (WCAG 2.5.7). `hb.js` does the work — no script of your own.

### Columns panel

- A **Columns** button (`aria-haspopup="dialog"`, `aria-controls`) opens `hb-column-manager__panel`, which starts `hidden`. A click outside or Escape closes it. It goes at the end of the toolbar's `__controls`.
- The root names its table: `data-hb-columns-for="<table id>"`. Each data column's cells — `<th>` and `<td>` — carry `data-column="<key>"`; the identifier column has none, so it stays pinned as the row's title.
- Two lists: `data-hb-columns="visible"` and `data-hb-columns="hidden"`. Each `hb-column-manager__item` has the same `data-column`, a checkbox + `__name`, a `__drag` + `__move` pair (shown while visible) and a `__spacer` (shown while hidden).
- Reorder the Visible group with the drag handle or the Up/Down buttons — the same behaviour as Drag. The table follows.
- A checkbox moves a column between Visible and Hidden. The last visible column can't be hidden. Hidden columns are listed A→Z, without reorder controls. A re-shown column goes to the end.
- `data-hb-columns-reset` on a button restores the starting columns.
- Focus stays on the control pressed, and each change is announced through the `aria-live` region.

Open Columns, reorder, then hide and show a column:

```html preview
<div style="min-height: 420px;">
  <div class="hb-table-toolbar" role="toolbar" aria-label="Workflows" data-hb-toolbar-for="workflows">
    <div class="hb-table-toolbar__controls">
    <span class="hb-table-toolbar__spacer"></span>
    <div class="hb-column-manager" data-hb-columns-for="workflows">
      <button type="button" class="hb-btn hb-btn--secondary hb-btn--lg" aria-haspopup="dialog"
              aria-expanded="false" aria-controls="workflows-columns">
        <span class="hb-icon">view_column</span> Columns
      </button>
      <div class="hb-column-manager__panel hb-column-manager__panel--end" id="workflows-columns"
           role="dialog" aria-label="Manage columns" hidden>
        <div class="hb-column-manager__group">
          <div class="hb-column-manager__header">
            <span class="hb-icon">visibility</span>
            <span class="hb-column-manager__title hb-text-caption-bold">Visible columns</span>
            <button type="button" class="hb-popup-select__clear" data-hb-columns-reset>Reset</button>
          </div>
          <ul class="hb-column-manager__list" data-hb-columns="visible" aria-label="Visible columns">
          <li class="hb-column-manager__item" data-column="owner" draggable="true">
            <span class="hb-column-manager__drag hb-icon" aria-hidden="true">drag_indicator</span>
            <span class="hb-column-manager__spacer" aria-hidden="true"></span>
            <label class="hb-column-manager__toggle">
              <input type="checkbox" class="hb-checkbox" checked>
              <span class="hb-column-manager__name">Owner</span>
            </label>
            <div class="hb-column-manager__move">
              <button type="button" class="hb-column-manager__move-btn"><span class="hb-icon">arrow_upward</span></button>
              <button type="button" class="hb-column-manager__move-btn"><span class="hb-icon">arrow_downward</span></button>
            </div>
          </li>
          <li class="hb-column-manager__item" data-column="status" draggable="true">
            <span class="hb-column-manager__drag hb-icon" aria-hidden="true">drag_indicator</span>
            <span class="hb-column-manager__spacer" aria-hidden="true"></span>
            <label class="hb-column-manager__toggle">
              <input type="checkbox" class="hb-checkbox" checked>
              <span class="hb-column-manager__name">Status</span>
            </label>
            <div class="hb-column-manager__move">
              <button type="button" class="hb-column-manager__move-btn"><span class="hb-icon">arrow_upward</span></button>
              <button type="button" class="hb-column-manager__move-btn"><span class="hb-icon">arrow_downward</span></button>
            </div>
          </li>
          <li class="hb-column-manager__item" data-column="cases" draggable="true">
            <span class="hb-column-manager__drag hb-icon" aria-hidden="true">drag_indicator</span>
            <span class="hb-column-manager__spacer" aria-hidden="true"></span>
            <label class="hb-column-manager__toggle">
              <input type="checkbox" class="hb-checkbox" checked>
              <span class="hb-column-manager__name">Cases</span>
            </label>
            <div class="hb-column-manager__move">
              <button type="button" class="hb-column-manager__move-btn"><span class="hb-icon">arrow_upward</span></button>
              <button type="button" class="hb-column-manager__move-btn"><span class="hb-icon">arrow_downward</span></button>
            </div>
          </li>
          </ul>
        </div>
        <div class="hb-column-manager__group">
          <div class="hb-column-manager__header">
            <span class="hb-icon">visibility_off</span>
            <span class="hb-column-manager__title hb-text-caption-bold">Hidden columns</span>
          </div>
          <ul class="hb-column-manager__list" data-hb-columns="hidden" aria-label="Hidden columns">
          <li class="hb-column-manager__item" data-column="region" draggable="false">
            <span class="hb-column-manager__drag hb-icon" aria-hidden="true">drag_indicator</span>
            <span class="hb-column-manager__spacer" aria-hidden="true"></span>
            <label class="hb-column-manager__toggle">
              <input type="checkbox" class="hb-checkbox">
              <span class="hb-column-manager__name">Region</span>
            </label>
            <div class="hb-column-manager__move">
              <button type="button" class="hb-column-manager__move-btn"><span class="hb-icon">arrow_upward</span></button>
              <button type="button" class="hb-column-manager__move-btn"><span class="hb-icon">arrow_downward</span></button>
            </div>
          </li>
          <li class="hb-column-manager__item" data-column="priority" draggable="false">
            <span class="hb-column-manager__drag hb-icon" aria-hidden="true">drag_indicator</span>
            <span class="hb-column-manager__spacer" aria-hidden="true"></span>
            <label class="hb-column-manager__toggle">
              <input type="checkbox" class="hb-checkbox">
              <span class="hb-column-manager__name">Priority</span>
            </label>
            <div class="hb-column-manager__move">
              <button type="button" class="hb-column-manager__move-btn"><span class="hb-icon">arrow_upward</span></button>
              <button type="button" class="hb-column-manager__move-btn"><span class="hb-icon">arrow_downward</span></button>
            </div>
          </li>
          </ul>
          <p class="hb-column-manager__empty" hidden>No hidden columns.</p>
        </div>
      </div>
    </div>
    </div>
  </div>
  <div class="hb-table-wrap" role="region" tabindex="0" aria-labelledby="cap-columns">
    <table class="hb-table" id="workflows">
      <caption id="cap-columns" class="hb-table__caption hb-visually-hidden">Workflows</caption>
      <thead><tr><th scope="col">Name</th><th scope="col" data-column="owner">Owner</th><th scope="col" data-column="status">Status</th><th scope="col" data-column="cases" class="hb-table__cell--num">Cases</th><th scope="col" data-column="region">Region</th><th scope="col" data-column="priority">Priority</th></tr></thead>
      <tbody>
        <tr><th scope="row" class="hb-table__rowheader"><a href="#" class="hb-link hb-table__link">AML transaction review</a></th><td data-column="owner">Elena Cruz</td><td data-column="status">Awaiting review</td><td data-column="cases" class="hb-table__cell--num">128</td><td data-column="region">EMEA</td><td data-column="priority">High</td></tr>
        <tr><th scope="row" class="hb-table__rowheader"><a href="#" class="hb-link hb-table__link">Sanctions screening</a></th><td data-column="owner">Marcus Webb</td><td data-column="status">Open</td><td data-column="cases" class="hb-table__cell--num">342</td><td data-column="region">AMER</td><td data-column="priority">Medium</td></tr>
        <tr><th scope="row" class="hb-table__rowheader"><a href="#" class="hb-link hb-table__link">PEP due diligence</a></th><td data-column="owner">Priya Nair</td><td data-column="status">Resolved</td><td data-column="cases" class="hb-table__cell--num">56</td><td data-column="region">APAC</td><td data-column="priority">Low</td></tr>
      </tbody>
    </table>
  </div>
</div>
```

### Resize

- Add `data-hb-resizable` to a `hb-table--resizable` table: `hb.js` adds a focusable `role="separator"` handle to every header but the last, which flexes.
- Drag the handle, double-click it to auto-fit, or focus it and use the arrow keys: 16px steps (Shift: 48px); Enter or Home auto-fits.
- The width is exposed through `aria-valuenow`/`min`/`max`, so screen readers announce each change.

```html preview
<div class="hb-table-wrap" role="region" tabindex="0" aria-labelledby="cap-resize">
  <table class="hb-table hb-table--resizable" data-hb-resizable>
    <caption id="cap-resize" class="hb-table__caption hb-visually-hidden">Resizable columns example</caption>
    <thead><tr><th scope="col" style="width: 220px;">Name</th><th scope="col" style="width: 140px;">Owner</th><th scope="col">Last modified</th></tr></thead>
    <tbody>
      <tr><th scope="row" class="hb-table__rowheader"><a href="#" class="hb-link hb-table__link">AML transaction review — periodic</a></th><td>Elena Cruz</td><td>24 Jun 2026, 11:38 EDT</td></tr>
      <tr><th scope="row" class="hb-table__rowheader"><a href="#" class="hb-link hb-table__link">Sanctions screening (EU + OFAC)</a></th><td>Marcus Webb</td><td>22 Jun 2026, 09:14 EDT</td></tr>
    </tbody>
  </table>
</div>
```

## Do

- Give every action its own visible link or button inside a cell.
- Keep the identifier column as the row's title, holding the primary link.
- Make interactivity visible without hover: underlined links, visible buttons, focus rings.
- Pair every drag (reorder, resize) with a single-pointer path: a button or a double-click. A keyboard path alone is not enough.
- Put batch actions in the table's toolbar, where the analyst is already looking.

## Don't

- Don't make clicking somewhere in the row the only way to act on it.
- Don't reveal row actions only on hover.
- Don't hide the row's primary action inside the overflow menu.
- Don't use `--row-link` where analysts select or copy cell values.
- Don't make dragging the only way to reorder or resize columns.
- Don't float batch actions over the page or slide them in from the top.
- Don't disable a batch action with the `disabled` attribute: use `data-hb-min-selection` so it stays focusable and says why.

## Accessibility

Icon-only row actions name their row: "More actions for alert 4128", "Edit case CASE-10482".

## Example

```html
<div class="hb-table-wrap" role="region" tabindex="0" aria-labelledby="cases-caption">
  <table class="hb-table">
    <caption id="cases-caption" class="hb-table__caption">Open cases</caption>
    <thead>
      <tr>
        <th class="hb-table__select-col"><input type="checkbox" class="hb-checkbox" aria-label="Select all cases"></th>
        <th scope="col">Case</th>
        <th scope="col">Subject</th>
        <th scope="col" class="hb-table__cell--num">Alerts</th>
        <th scope="col"><span class="hb-visually-hidden">Actions</span></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="hb-table__select-col"><input type="checkbox" class="hb-checkbox" aria-label="Select CASE-10482"></td>
        <th scope="row" class="hb-table__rowheader">
          <a class="hb-link hb-table__link" href="#">CASE-10482</a>
        </th>
        <td>Aurora Holdings LLC</td>
        <td class="hb-table__cell--num">14</td>
        <td class="hb-table__actions">
          <button class="hb-btn hb-btn--ghost hb-btn--sm" aria-label="Escalate case CASE-10482">
            <span class="hb-icon" aria-hidden="true">arrow_upward</span>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```
