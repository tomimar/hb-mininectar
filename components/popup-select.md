The filter panel that drops from a filter button in the table toolbar, for picking one or more values from a known set.

## Structure

```html preview
<div class="hb-popup-select" style="width: 280px;">
  <div class="hb-popup-select__header">
    <span class="hb-text-heading-small" style="color: var(--ui-text-secondary);">Alert status</span>
    <button type="button" class="hb-popup-select__clear">Clear</button>
  </div>
  <div class="hb-popup-select__list">
    <label class="hb-popup-select__option">
      <input type="checkbox" class="hb-checkbox" checked>
      <span class="hb-popup-select__label">Open</span>
      <span class="hb-popup-select__count">1,284</span>
    </label>
    <label class="hb-popup-select__option">
      <input type="checkbox" class="hb-checkbox">
      <span class="hb-popup-select__label">In review</span>
      <span class="hb-popup-select__count">312</span>
    </label>
  </div>
</div>
```

- `__header` holds the filter's name and the `__clear` button, which resets every selection at once.
- `__list` holds the `__option` rows. Each row is an `hb-checkbox`, a `__label` and an optional `__count`.
- The panel floats: it closes when the analyst clicks away or applies the filter.
- `hb.js` can open and close it: give the trigger `aria-haspopup="dialog"`, `aria-expanded="false"` and `aria-controls` (the panel's id), and start the panel `hidden`. A click outside or Escape closes it; Escape returns focus to the trigger. Clear, applying and the counts stay yours.

## Counts

The counts are the point: they tell the analyst what a filter will cost before they apply it.

- Show a count whenever the number is known.
- Format it with thousands separators: "1,284".

## States

Handled by CSS, no extra classes:

| State | Trigger | What changes |
|---|---|---|
| Hover | `:hover` on the option | `ui-bg-secondary` fill. |
| Selected | Checked `hb-checkbox` | `ui-bg-secondary` fill plus a 4px `ui-interaction` bar on the left edge. |

Long labels truncate with an ellipsis.

```html preview
<div class="hb-popup-select" style="width: 280px;">
  <div class="hb-popup-select__header">
    <span class="hb-text-heading-small" style="color: var(--ui-text-secondary);">Risk level</span>
    <button type="button" class="hb-popup-select__clear">Clear</button>
  </div>
  <div class="hb-popup-select__list">
    <label class="hb-popup-select__option">
      <input type="checkbox" class="hb-checkbox">
      <span class="hb-popup-select__label">Low</span>
      <span class="hb-popup-select__count">2,906</span>
    </label>
    <!-- Hover is forced here so you can see it -->
    <label class="hb-popup-select__option" style="background: var(--ui-bg-secondary);">
      <input type="checkbox" class="hb-checkbox">
      <span class="hb-popup-select__label">Medium</span>
      <span class="hb-popup-select__count">841</span>
    </label>
    <label class="hb-popup-select__option">
      <input type="checkbox" class="hb-checkbox" checked>
      <span class="hb-popup-select__label">High</span>
      <span class="hb-popup-select__count">96</span>
    </label>
    <label class="hb-popup-select__option">
      <input type="checkbox" class="hb-checkbox">
      <span class="hb-popup-select__label">Politically exposed person, sanctions list match pending review</span>
      <span class="hb-popup-select__count">7</span>
    </label>
  </div>
</div>
```

## What the consumer owns

- Applying the filter, and the Clear button. (`hb.js` opens and closes the panel — see Structure.)
- Anchor the panel to its trigger: in a table toolbar, wrap both in `hb-table-toolbar__menu-wrap`.
- Return focus to the trigger when the filter is applied. (Escape already does.)
- Show the applied filter as a removable tag next to the filter buttons — its name and values, "Status: Open, In review" — never as a selected state or a count on the trigger. See Table → Applied filters.

## When to use

| Use it when | Use instead |
|---|---|
| The choice filters a view — a filter button in a table toolbar. | Inside a form: a Select or Multi select (`hb-multiselect`), which aligns and validates with other fields. |
| The options are predefined and known up front. | Free text or arbitrary values: an Input or a Search input. |
| A light, dismissible panel fits the surface. | A single value that must stay on display: a Select or a Radio group. |

## Do

- Order options logically: by workflow stage, frequency or alphabet.
- Keep labels short and scannable: one or two words ("Open", "In review", "Escalated").

## Don't

- Don't pack long descriptions into options. They break the scannable rhythm of the list.
- Don't use it inside a form.

## Example

The trigger is a filter button in the table toolbar (`hb-btn--secondary hb-btn--lg`, `filter_list` icon, `expand_more` chevron), wrapped with the panel in `hb-table-toolbar__menu-wrap`, which anchors it. Open the Status filter, tick a value, then click away or press Escape:

```html preview
<div style="min-height: 260px; width: 100%;">
  <div class="hb-table-toolbar" role="toolbar" aria-label="Alerts">
    <div class="hb-table-toolbar__controls">
      <span class="hb-table-toolbar__menu-wrap">
        <button type="button" class="hb-btn hb-btn--secondary hb-btn--lg"
                aria-haspopup="dialog" aria-expanded="false" aria-controls="status-filter">
          <span class="hb-icon" aria-hidden="true">filter_list</span> Status <span class="hb-icon" aria-hidden="true">expand_more</span>
        </button>
        <div class="hb-popup-select" id="status-filter" role="dialog" aria-labelledby="status-filter-title" hidden>
          <div class="hb-popup-select__header">
            <span id="status-filter-title" class="hb-text-heading-small" style="color: var(--ui-text-secondary);">Status</span>
            <button type="button" class="hb-popup-select__clear">Clear</button>
          </div>
          <div class="hb-popup-select__list">
            <label class="hb-popup-select__option">
              <input type="checkbox" class="hb-checkbox" checked>
              <span class="hb-popup-select__label">Open</span>
              <span class="hb-popup-select__count">1,284</span>
            </label>
            <label class="hb-popup-select__option">
              <input type="checkbox" class="hb-checkbox" checked>
              <span class="hb-popup-select__label">In review</span>
              <span class="hb-popup-select__count">312</span>
            </label>
            <label class="hb-popup-select__option">
              <input type="checkbox" class="hb-checkbox">
              <span class="hb-popup-select__label">Escalated</span>
              <span class="hb-popup-select__count">47</span>
            </label>
          </div>
        </div>
      </span>
      <div class="hb-table-toolbar__filters" role="group" aria-label="Applied filters">
        <span class="hb-tag hb-tag--blue" data-hb-filter="status">
          <span class="hb-tag__inner"><span>Status: Open, In review</span></span>
          <button type="button" class="hb-tag__remove" aria-label="Remove filter: Status">×</button>
        </span>
      </div>
    </div>
  </div>
</div>
```
