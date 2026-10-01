The filter panel that drops from a Floating action above a table or list, for picking one or more values from a known set.

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
- Anchor the panel to its trigger.
- Return focus to the trigger on close.
- Reflect applied filters on the trigger (`hb-fab--selected` plus a count), so the analyst sees the view is filtered without opening the panel.

## When to use

| Use it when | Use instead |
|---|---|
| The choice filters a view — toolbar and table filters. | Inside a form: a Select or Multi select (`hb-multiselect`), which aligns and validates with other fields. |
| The options are predefined and known up front. | Free text or arbitrary values: an Input or a Search input. |
| A light, dismissible panel fits the surface. | A single value that must stay on display: a Select or a Radio group. |

## Do

- Order options logically: by workflow stage, frequency or alphabet.
- Keep labels short and scannable: one or two words ("Open", "In review", "Escalated").

## Don't

- Don't pack long descriptions into options. They break the scannable rhythm of the list.
- Don't use it inside a form.

## Example

Open the Status filter, tick a value, then click away or press Escape:

```html preview
<div style="min-height: 260px;">
<div style="position: relative; display: inline-block;">
  <button type="button" class="hb-fab hb-fab--selected"
          aria-haspopup="dialog" aria-expanded="false" aria-controls="status-filter">
    <svg class="hb-fab__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 5h18M6 12h12M10 19h4"/></svg>
    Status · 2
  </button>
  <div class="hb-popup-select" id="status-filter" role="dialog" aria-labelledby="status-filter-title" hidden
       style="position: absolute; top: calc(100% + var(--spacing-8)); left: 0; width: 280px; z-index: 1;">
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
</div>
</div>
```
