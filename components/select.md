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

### Single select

The wrapper supplies the chevron and the styling; the native `<select>` supplies the behaviour and the keyboard. The consumer provides the `<option>` list and a `for`/`id` label.

```html preview
<div class="hb-field" style="max-width: 320px;">
  <label class="hb-field__label" for="status">Status</label>
  <div class="hb-select">
    <select id="status">
      <option value="">Select a status</option>
      <option>Open</option>
      <option>In review</option>
      <option>Escalated</option>
      <option>Closed</option>
    </select>
  </div>
</div>
```

### Multi select

`hb.js` does the work — no script of your own:

- The menu (`__menu`, with `hidden` while closed) holds one `<label class="hb-multiselect__option">` per option, each wrapping a real checkbox. The checked boxes are the value.
- Clicking the field or focusing its `__input` opens the menu. A click outside, Escape or tabbing away closes it. The `__chevron` toggles it.
- Ticking a box adds a `__tag` chip (with a `__tag-remove` button) inside `__control` and marks the row `__option--selected`. Removing a tag, or Backspace in the empty field, unticks it.
- Typing in `__input` filters the options. `__empty` (start it `hidden`) shows when nothing matches.
- Write the starting state in the markup: a tag for each box that starts checked. `hb.js` keeps them in step from then on.

Pick a few assignees, remove one, then type to filter:

```html preview
<div class="hb-field" style="max-width: 360px; min-height: 300px;">
  <label class="hb-field__label" for="assignees">Assignees</label>
  <div class="hb-multiselect">
    <div class="hb-multiselect__control">
      <span class="hb-multiselect__tag">Elena Cruz<button type="button" class="hb-multiselect__tag-remove" aria-label="Remove Elena Cruz"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg></button></span>
      <input class="hb-multiselect__input" id="assignees" type="text" placeholder="Select assignees"
             autocomplete="off" aria-expanded="false" aria-controls="assignees-menu">
      <span class="hb-icon hb-multiselect__chevron" aria-hidden="true">expand_more</span>
    </div>
    <div class="hb-multiselect__menu" id="assignees-menu" hidden>
      <label class="hb-multiselect__option hb-multiselect__option--selected"><input type="checkbox" class="hb-checkbox" checked> Elena Cruz</label>
      <label class="hb-multiselect__option"><input type="checkbox" class="hb-checkbox"> Daniel Okafor</label>
      <label class="hb-multiselect__option"><input type="checkbox" class="hb-checkbox"> Priya Raman</label>
      <label class="hb-multiselect__option"><input type="checkbox" class="hb-checkbox"> Marco Silva</label>
      <div class="hb-multiselect__empty" hidden>No results found</div>
    </div>
  </div>
</div>
```

## States

| State | Trigger | What changes |
|---|---|---|
| Default | Resting | White background, `ui-border-secondary` border. |
| Hover | `:hover` | Border darkens to `ui-text`. |
| Focus / open | `:focus`; `is-open` on the `hb-multiselect` root | `ui-interaction` border plus a `ui-interaction-soft` ring. |
| Error | `hb-select--error` on the wrapper | `ui-status-danger` border and ring. Pair with `hb-field__error`. |
| Disabled | `disabled` on the `<select>`; `hb-multiselect--disabled` on the root | `ui-bg-tertiary` background, muted text, not clickable. |

```html preview
<div style="display: flex; gap: var(--spacing-16); flex-wrap: wrap;">
  <div class="hb-field" style="width: 240px;">
    <label class="hb-field__label" for="risk">Risk level</label>
    <div class="hb-select hb-select--error">
      <select id="risk" aria-invalid="true" aria-describedby="risk-error">
        <option value="">Select a risk level</option>
        <option>Low</option><option>Medium</option><option>High</option>
      </select>
    </div>
    <p class="hb-field__error" id="risk-error">Select a risk level to close the case.</p>
  </div>
  <div class="hb-field" style="width: 240px;">
    <label class="hb-field__label" for="queue">Queue</label>
    <div class="hb-select hb-select--sm">
      <select id="queue" disabled><option>Screening alerts</option></select>
    </div>
  </div>
</div>
```

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
