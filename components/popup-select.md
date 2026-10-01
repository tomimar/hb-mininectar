The filter panel that drops from a Floating action above a table or list, for picking one or more values from a known set.

## Structure

```html
<div class="hb-popup-select">
  <div class="hb-popup-select__header">
    <span>Status</span>
    <button class="hb-popup-select__clear">Clear</button>
  </div>
  <div class="hb-popup-select__list">
    <label class="hb-popup-select__option">
      <input type="checkbox" class="hb-checkbox">
      <span class="hb-popup-select__label">Open</span>
      <span class="hb-popup-select__count">1,284</span>
    </label>
  </div>
</div>
```

- `__header` holds the filter's name and the `__clear` button, which resets every selection at once.
- `__list` holds the `__option` rows. Each row is an `hb-checkbox`, a `__label` and an optional `__count`.
- The panel floats: it closes when the analyst clicks away or applies the filter.

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

## What the consumer owns

- Opening, closing, positioning and applying the filter.
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

```html
<button class="hb-fab hb-fab--selected" aria-expanded="true">Status · 2</button>

<div class="hb-popup-select">
  <div class="hb-popup-select__header">
    <span>Status</span>
    <button class="hb-popup-select__clear">Clear</button>
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
```
