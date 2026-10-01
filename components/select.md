Choice from a known list — one value, or several.

## Types

| Type | Class | Use for |
|---|---|---|
| Single | `hb-select` | One value. Wraps a real `<select>`. |
| Multi | `hb-multiselect` | Several values, shown as removable tags inside the field. |

## Sizes

| Size | Class | Height |
|---|---|---|
| Large | (default) | 40px |
| Small | `hb-select--sm` / `hb-multiselect--sm` | 32px |

## Structure

**Single select.** The wrapper supplies the chevron and the styling; the native `<select>` supplies the behaviour and the keyboard. The consumer provides the `<option>` list and a `for`/`id` label.

```html
<div class="hb-field">
  <label class="hb-field__label" for="status">Status</label>
  <div class="hb-select">
    <select id="status">
      <option value="">Select a status</option>
      <option>Open</option>
      <option>In review</option>
    </select>
  </div>
</div>
```

**Multi select.** Selections become `__tag` chips (each with a `__tag-remove` button) inside `__control`, next to a `__input` and a `__chevron`. The `__menu` lists `__option` rows with checkboxes; `__option--selected` marks the chosen ones, and `__empty` shows when the filter matches nothing.

```html
<div class="hb-multiselect is-open">
  <div class="hb-multiselect__control">
    <span class="hb-multiselect__tag">Elena Cruz
      <button class="hb-multiselect__tag-remove" aria-label="Remove Elena Cruz">…</button>
    </span>
    <input class="hb-multiselect__input" placeholder="Select assignees">
    <svg class="hb-multiselect__chevron" aria-hidden="true">…</svg>
  </div>
  <div class="hb-multiselect__menu">
    <div class="hb-multiselect__option hb-multiselect__option--selected">
      <input type="checkbox" class="hb-checkbox" checked> Elena Cruz
    </div>
    <div class="hb-multiselect__empty">No results found</div>
  </div>
</div>
```

Behaviour — open, type-to-filter, toggle, remove — is the consumer's, wired with Alpine in prototypes. This component is the markup and styling contract.

## States

| State | Trigger | What changes |
|---|---|---|
| Default | Resting | White background, `ui-border-secondary` border. |
| Hover | `:hover` | Border darkens to `ui-text`. |
| Focus / open | `:focus`; `is-open` on the `hb-multiselect` root | `ui-interaction` border plus a `ui-interaction-soft` ring. |
| Error | `hb-select--error` on the wrapper | `ui-status-danger` border and ring. Pair with `hb-field__error`. |
| Disabled | `disabled` on the `<select>`; `hb-multiselect--disabled` on the root | `ui-bg-tertiary` background, muted text, not clickable. |

## Writing the options

- Show the placeholder as an empty first option ("Select a status"), not as a selected value. A select that arrives with a value has made a choice for the analyst.
- Order options logically: alphabetical, by frequency, or by natural sequence (Low, Medium, High).

## When to use

| Options | Use |
|---|---|
| Fewer than about five | Radio (one) or Checkbox (many) — they show every option without a click. |
| About five or more | Select or Multi select. |
| More than about twenty | Multi select, and give its filter input a real job. |

- Filtering a view, not filling a form field: use a Popup select.
- Values that aren't predefined: use an Input.

## Do

- Always wrap the native `<select>` in `hb-select`.
- Label every select with `hb-field__label` and a matching `for`/`id`.

## Don't

- Don't use a single select for several values — use `hb-multiselect`.
- Don't use it for free text.

## Example

```html
<div class="hb-field">
  <label class="hb-field__label" for="disposition">Disposition</label>
  <div class="hb-select">
    <select id="disposition">
      <option value="">Select a disposition</option>
      <option>Escalate case</option>
      <option>Close as false positive</option>
      <option>Request more information</option>
    </select>
  </div>
</div>
```
