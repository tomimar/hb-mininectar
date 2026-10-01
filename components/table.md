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
| `--resizable` | Columns can be resized (`hb-table__resizer` in each `<th>`). |

## Row parts

- **Primary action** — a real `hb-link` in the row-header cell, usually opening the detail view. It is underlined, so it's findable without hover.
- **Row actions** — icon-only ghost buttons (`hb-btn--ghost hb-btn--sm`) in `__actions`, the last column.
- **Selection** — a real `hb-checkbox` in `__select-col`, the first column. The header checkbox toggles all rows.

## Optional parts

- **Expandable rows** — `__expander` + `__detail-row`. Hide detail rows with `hidden`; `aria-expanded` goes on the button, never on the `<tr>`. When the detail is tabular, nest a table in the detail row so child rows keep their own headers.
- **Row menu** — `__overflow`, `__menu`, `__menu-item`. Use it when a row has more than two actions. Keep the most frequent action visible; the trigger has `aria-haspopup="menu"` and `aria-expanded`; every item is a real `<button>`.
- **Footer** — `__footer` with `__footer-group`, `__pagination` and `__page-info`, placed after the wrap. For many rows or pages: row count, page-size Select (`__footer-label`) and status on the left; pagination on the right.

## States

Handled by CSS, no extra classes:

| State | Trigger | What changes |
|---|---|---|
| Row hover | `:hover` on the row | `ui-bg-secondary` fill — a scan aid, not a sign the row is clickable. |
| Row selected | Checked `hb-checkbox` in the row | `ui-interaction-soft` fill. |
| Row expanded | `aria-expanded="true"` on `__expander` | Chevron rotates; the detail row shows on `ui-bg-secondary`. |
| Region focus | `:focus-visible` on `hb-table-wrap` | 2px `ui-interaction-soft` outline. |
| Menu open | `aria-expanded="true"` on the overflow trigger | The menu can overflow the wrap's scroll area. |

## Reordering, hiding and resizing columns

Dragging is never the only way (WCAG 2.5.7).

- **Columns panel** (`hb-column-manager`) — Visible and Hidden groups. Each row has a drag handle and Up/Down buttons.
  - A checkbox moves a column between Visible and Hidden. The last visible column can't be hidden.
  - Hidden columns are listed A→Z, without reorder controls.
  - The identifier column stays pinned, so the row is always identifiable.
- **Resize** — double-click to auto-fit; arrow keys move 16px (Shift: 48px); Enter or Home auto-fits. The handle is a focusable `role="separator"` exposing its width through `aria-valuenow`/`min`/`max`.
- After a move or toggle, keep focus on the control pressed and announce the change through an `aria-live` region.

## Do

- Give every action its own visible link or button inside a cell.
- Keep the identifier column as the row's title, holding the primary link.
- Make interactivity visible without hover: underlined links, visible buttons, focus rings.
- Pair every drag (reorder, resize) with a single-pointer path: a button or a double-click. A keyboard path alone is not enough.

## Don't

- Don't make clicking somewhere in the row the only way to act on it.
- Don't reveal row actions only on hover.
- Don't hide the row's primary action inside the overflow menu.
- Don't use `--row-link` where analysts select or copy cell values.
- Don't make dragging the only way to reorder or resize columns.

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
