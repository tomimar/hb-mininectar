A single-line text field for short values, inside the shared field wrapper that carries its label, help text and error.

## Structure

`hb-field` is the wrapper for every control in the system — Textarea, Select, DateInput and SearchInput all sit inside it.

```html preview
<div class="hb-field" style="max-width: 360px;">
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

```html preview
<div style="display: flex; flex-direction: column; gap: var(--spacing-16); width: 100%; max-width: 360px;">
  <div class="hb-field">
    <label class="hb-field__label" for="size-default">Account number</label>
    <input class="hb-input" id="size-default" type="text" placeholder="e.g. 4410-2283-0917">
  </div>
  <div class="hb-field">
    <label class="hb-field__label" for="size-small">Account number</label>
    <input class="hb-input hb-input--sm" id="size-small" type="text" placeholder="e.g. 4410-2283-0917">
  </div>
</div>
```

## States

| State | Trigger | What changes |
|---|---|---|
| Default | — | `ui-bg` with a `ui-border-secondary` border. |
| Hover | `:hover` | Border darkens. |
| Focus | `:focus` | Blue border with a `ui-interaction-soft` ring. |
| Error | `--error` | `ui-status-danger` border; `ui-status-danger-soft` ring on focus. |
| Disabled | `disabled` attribute | `ui-bg-tertiary` background, muted text, not editable. Use it for read-only views. |

```html preview
<div style="display: flex; flex-direction: column; gap: var(--spacing-16); width: 100%; max-width: 360px;">
  <div class="hb-field">
    <label class="hb-field__label" for="state-default">Customer name</label>
    <input class="hb-input" id="state-default" type="text" value="Northwind Trading LLC">
  </div>
  <!-- Hover and focus are forced here so you can see them -->
  <div class="hb-field">
    <label class="hb-field__label" for="state-hover">Counterparty</label>
    <input class="hb-input" id="state-hover" type="text" value="Meridian Imports Ltd" style="border-color: var(--ui-text);">
  </div>
  <div class="hb-field">
    <label class="hb-field__label" for="state-focus">Alert ID</label>
    <input class="hb-input" id="state-focus" type="text" value="ALT-20931" style="border-color: var(--ui-interaction); box-shadow: 0 0 0 2px var(--ui-interaction-soft);">
  </div>
  <div class="hb-field">
    <label class="hb-field__label" for="state-error">Beneficiary IBAN</label>
    <input class="hb-input hb-input--error" id="state-error" type="text" value="GB29 NWBK 6016"
           aria-invalid="true" aria-describedby="state-error-msg">
    <p class="hb-field__error" id="state-error-msg">Enter the full IBAN, e.g. GB29 NWBK 6016 1331 9268 19.</p>
  </div>
  <div class="hb-field">
    <label class="hb-field__label" for="state-disabled">Case ID</label>
    <input class="hb-input" id="state-disabled" type="text" value="CASE-10482" disabled>
  </div>
</div>
```

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

```html preview
<div class="hb-field" style="max-width: 360px;">
  <label class="hb-field__label" for="amount">Transaction amount <span class="hb-field__required">*</span></label>
  <input class="hb-input hb-input--error" id="amount" type="text" value="0"
         aria-invalid="true" aria-describedby="amount-error">
  <p class="hb-field__error" id="amount-error">Enter an amount greater than zero, e.g. 2,500.00.</p>
</div>
```
