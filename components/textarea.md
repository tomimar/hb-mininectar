A multi-line text field for narrative: notes, rationales, SAR text.

## Structure

Same wrapper and rules as Input: `hb-field`, a visible label tied to the field with `for`/`id`, and help or error text below.

```html
<div class="hb-field">
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

```html
<div class="hb-field">
  <label class="hb-field__label" for="case-note">Case note</label>
  <textarea class="hb-textarea hb-textarea--error" id="case-note" rows="4"
            aria-invalid="true" aria-describedby="case-note-error"></textarea>
  <p class="hb-field__error" id="case-note-error">Add a note before closing the case.</p>
</div>
```
