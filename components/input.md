A single-line text field for short values, inside the shared field wrapper that carries its label, help text and error.

## Structure

`hb-field` is the wrapper for every control in the system — Textarea, Select, DateInput and SearchInput all sit inside it.

```html
<div class="hb-field">
  <label class="hb-field__label" for="case-id">Case ID <span class="hb-field__required">*</span></label>
  <input class="hb-input" id="case-id" type="text" placeholder="e.g. CASE-10482" aria-describedby="case-id-help">
  <p class="hb-field__help" id="case-id-help">Found in the case header.</p>
</div>
```

- `hb-field__label` with a real `for`/`id` pair. Adjacent is not enough; it must be associated.
- `hb-field__required` adds the asterisk.
- Then one of `hb-field__help` or `hb-field__error`, never both. On error, swap the help for the error.

## Sizes

| Size | Class | Height | Use for |
|---|---|---|---|
| Default | — | 40px | Forms. |
| Small | `--sm` | 32px | Dense toolbars, inline editing. |

## States

| State | Trigger | What changes |
|---|---|---|
| Default | — | `ui-bg` with a `ui-border-secondary` border. |
| Hover | `:hover` | Border darkens. |
| Focus | `:focus` | Blue border with a `ui-interaction-soft` ring. |
| Error | `--error` | `ui-status-danger` border; `ui-status-danger-soft` ring on focus. |
| Disabled | `disabled` attribute | `ui-bg-tertiary` background, muted text, not editable. Use it for read-only views. |

## Writing the content

- Labels are always visible.
- The placeholder is an example of the format, never the label. It disappears as soon as the analyst types.
- Error text says what is wrong and what shape the value should take: "Enter an amount greater than zero."

## Do

- Pair every input with a visible label.
- Mark required fields.
- Show the error directly below the field.
- On error, add `aria-invalid="true"` and `aria-describedby` pointing at the `hb-field__error`.

## Don't

- Don't use the placeholder as the label.
- Don't leave required fields unmarked.

## Example

```html
<div class="hb-field">
  <label class="hb-field__label" for="amount">Transaction amount <span class="hb-field__required">*</span></label>
  <input class="hb-input hb-input--error" id="amount" type="text" value="0"
         aria-invalid="true" aria-describedby="amount-error">
  <p class="hb-field__error" id="amount-error">Enter an amount greater than zero, e.g. 2,500.00.</p>
</div>
```
