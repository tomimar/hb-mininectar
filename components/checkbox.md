Independent on/off choices — zero, one or many.

## Structure

- A box is `<input type="checkbox" class="hb-checkbox">` (20px).
- Wrap it with its label in an `hb-checkbox-row` `<label>`. The whole 40px row is the hit target.
- Group related boxes in `hb-checkbox-group`, with an `hb-checkbox-group__label`.
- Add `hb-checkbox-group--inline` to lay them in a row, when the options are short and few. (Not in the Figma spec; it mirrors the inline radio group.)

```html
<div class="hb-checkbox-group">
  <span class="hb-checkbox-group__label">Group label</span>
  <label class="hb-checkbox-row">
    <input type="checkbox" class="hb-checkbox"> <span>Option</span>
  </label>
</div>
```

## States

Handled by CSS, no extra classes:

| State | Trigger | What changes |
|---|---|---|
| Unchecked | Resting | White fill, `ui-border-secondary` border. |
| Hover | `:hover` | Border turns `ui-interaction`. |
| Checked | `checked` attribute | `ui-interaction` fill with a white checkmark. |
| Focus | `:focus-visible` | 2px ring in `ui-interaction-soft`. |
| Disabled | `disabled` attribute | `ui-disabled-soft` fill (`ui-disabled` when checked); the row text greys out; not clickable. |
| Indeterminate | `indeterminate` DOM property | Set it in script, not as an attribute. No dedicated style yet: it looks unchecked. |

## Writing the label

- Sentence case: "Include closed alerts".
- A standalone box with no visible label (a table select-all) needs an `aria-label` naming what it selects: "Select all alerts".

## When to use

- Checkbox: the options are independent and nothing happens until the form is submitted.
- Toggle: the change takes effect immediately. Prefer it for a single on/off setting.
- Radio: exactly one option may be chosen.

## Do

- Keep the full row clickable, so both the box and the label toggle the option.
- Group related options under a shared label to give them context.
- Keep an indeterminate parent box reachable by keyboard.

## Don't

- Don't use checkboxes for mutually exclusive choices. Use a Radio group.
- Don't use a single checkbox for a setting that applies immediately. Use a Toggle.
- Don't leave a standalone box without an `aria-label`.

## Example

```html
<div class="hb-checkbox-group">
  <span class="hb-checkbox-group__label">Notify me about</span>
  <label class="hb-checkbox-row">
    <input type="checkbox" class="hb-checkbox" checked> <span>New alerts assigned to me</span>
  </label>
  <label class="hb-checkbox-row">
    <input type="checkbox" class="hb-checkbox"> <span>Case status changes</span>
  </label>
  <label class="hb-checkbox-row">
    <input type="checkbox" class="hb-checkbox" disabled> <span>SAR filing deadlines</span>
  </label>
</div>
```
