The accessible data table — the densest and most-used surface in Hummingbird.

The governing rule: **the row is not the control.** Use real `<table>` semantics and
put every action in a cell as a real `<a>` or `<button>`. Never attach a click
handler to a `<tr>`, and never turn the table into an ARIA grid to make a row
clickable — both break screen-reader semantics and the keyboard path.

Structure: `hb-table-wrap` (a `role="region"` with `tabindex="0"` and
`aria-labelledby`, so the scroll container is keyboard reachable) around
`table.hb-table`, whose first content cell is a `<th scope="row">` carrying
`hb-table__rowheader` and the primary `hb-link hb-table__link`. Numeric cells take
`hb-table__cell--num`; the actions column's header takes a `hb-visually-hidden`
label.

Modifiers: `--plain` (no rules), `--comfortable` (48px rows; the default is a 36px
compact row), `--row-link` (the block-link pattern — the row-header link stretches
over the whole row via `::after`; it makes other cells unselectable, so never use it
on tables where analysts copy IDs or amounts), `--resizable` (fixed layout plus an
`hb-table__resizer` button in each resizable `<th>`).

Optional parts: `__expander` and `__detail-row` for disclosure rows (the detail rows
carry `hidden` when collapsed; `aria-expanded` goes on the button, never the `<tr>`),
`__overflow`/`__menu`/`__menu-item` for more than two row actions, and a
`__footer` with `__footer-group`, `__pagination` and `__page-info` as a sibling of
the wrap.

Column reordering and hiding go through `hb-column-manager`, never through dragging
alone: a Columns popover splits into Visible and Hidden groups, each row carrying a
drag handle *and* Up/Down buttons. Resizing likewise has keyboard equivalents —
double-click to auto-fit, arrows for 16px steps (Shift for 48px). This is WCAG 2.5.7:
dragging is never the only way.

Every icon-only row action names its row: "More actions for alert 4128".
