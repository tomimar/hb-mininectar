A multi-line text field for narrative: notes, rationales, SAR text.

## Structure

Same wrapper and rules as Input: `hb-field`, a visible label tied to the field with `for`/`id`, and help or error text below.

```html preview
<div class="hb-field" style="max-width: 480px;">
  <label class="hb-field__label" for="rationale">Escalation rationale</label>
  <textarea class="hb-textarea" id="rationale" rows="3"></textarea>
  <p class="hb-field__help">Explain why this case needs a second review.</p>
</div>
```

- Set `rows` to the shortest height that fits a typical answer. Three is the default.
- It resizes vertically only.

## States

Handled by CSS:

| State | Trigger | What changes |
|---|---|---|
| Default | Resting | White background, `ui-border-secondary` border. |
| Hover | `:hover` | Border darkens. |
| Focus | `:focus` | Blue border and `ui-interaction-soft` ring. |
| Error | `hb-textarea--error` | Danger border and ring. Pair it with `hb-field__error`. |
| Disabled | `disabled` attribute | `ui-bg-tertiary` background, muted text, no resize. |

```html preview
<div style="display: flex; flex-direction: column; gap: var(--spacing-16); width: 100%; max-width: 480px;">
  <div class="hb-field">
    <label class="hb-field__label" for="ta-default">Investigation notes</label>
    <textarea class="hb-textarea" id="ta-default" rows="3">Customer made 12 cash deposits between $9,400 and $9,900 over 27 days.</textarea>
  </div>
  <!-- Hover and focus are forced here so you can see them -->
  <div class="hb-field">
    <label class="hb-field__label" for="ta-hover">Source of funds</label>
    <textarea class="hb-textarea" id="ta-hover" rows="3" style="border-color: var(--ui-text);"></textarea>
  </div>
  <div class="hb-field">
    <label class="hb-field__label" for="ta-focus">Escalation rationale</label>
    <textarea class="hb-textarea" id="ta-focus" rows="3" style="border-color: var(--ui-interaction); box-shadow: 0 0 0 2px var(--ui-interaction-soft);"></textarea>
  </div>
  <div class="hb-field">
    <label class="hb-field__label" for="ta-error">Closure reason</label>
    <textarea class="hb-textarea hb-textarea--error" id="ta-error" rows="3"
              aria-invalid="true" aria-describedby="ta-error-msg"></textarea>
    <p class="hb-field__error" id="ta-error-msg">Explain why the alert is a false positive before closing it.</p>
  </div>
  <div class="hb-field">
    <label class="hb-field__label" for="ta-disabled">SAR narrative</label>
    <textarea class="hb-textarea" id="ta-disabled" rows="3" disabled>Filed 14 Aug 2026. The narrative can't be edited after filing.</textarea>
  </div>
</div>
```

## When to use

| Use | For |
|---|---|
| Textarea | Prose the analyst writes and a regulator may read: notes, rationales, SAR narratives, comments. |
| Input | A value with a fixed shape: an account number, an amount, an email. The single line itself hints at the expected length. |

## Do

- Set enough rows to show how much room there is.
- Show a live character count whenever a limit applies.

## Don't

- Don't use a textarea for short single-line values.
- Don't enforce a character limit without showing the count.
- Don't truncate what was typed on save.

## Example

```html preview
<div class="hb-field" style="max-width: 480px;">
  <label class="hb-field__label" for="case-note">Case note</label>
  <textarea class="hb-textarea hb-textarea--error" id="case-note" rows="4"
            aria-invalid="true" aria-describedby="case-note-error"></textarea>
  <p class="hb-field__error" id="case-note-error">Add a note before closing the case.</p>
</div>
```
