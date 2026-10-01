Exactly one choice from a short, mutually exclusive set.

## Structure

```html
<div class="hb-radio-group" role="radiogroup" aria-labelledby="priority-label">
  <span class="hb-radio-group__label" id="priority-label">Priority</span>
  <label class="hb-radio-row">
    <input type="radio" class="hb-radio" name="priority" value="low">
    <span>Low</span>
  </label>
  …
</div>
```

- Each option is an `hb-radio` input inside an `hb-radio-row` label. The whole 40px row is the click target.
- The set goes in an `hb-radio-group`. Its `hb-radio-group__label` asks the question.
- Every option needs the same `name`. Without it the options are not one group, for the browser or for a screen reader.

## Layouts

| Layout | Class | Use for |
|---|---|---|
| Vertical | `hb-radio-group` | The default. |
| Inline | `hb-radio-group--inline` | Two or three short options, such as Yes / No / N/A. |

## States

Handled by CSS, no extra classes:

| State | Trigger | What changes |
|---|---|---|
| Unselected | Resting | White fill, `ui-border-secondary` border. |
| Hover | `:hover` | Border turns `ui-interaction`. |
| Selected | `checked` attribute | `ui-interaction` fill with a white center dot. |
| Focus | `:focus-visible` | 2px ring in `ui-interaction`. |
| Disabled | `disabled` attribute | `ui-disabled-soft` fill (`ui-disabled` when selected); row text muted; not clickable. |

## Writing the options

- Sentence case, short labels.
- If the analyst may need to undo their choice, add the "none" case as an explicit option ("No finding"). Don't rely on them clearing it — a radio group can't be cleared.

## When to use

| Use it when | Use instead |
|---|---|
| One choice from up to about five options. | Above about five: a Select. |
| The analyst should compare all options before deciding. | More than one can be chosen: a Checkbox group. |

## Do

- Show every option at once. A radio group has no collapsed state.
- Use the inline layout for short Yes / No / N/A sets.

## Don't

- Don't preselect a value the analyst should decide. In a disposition, a default is an opinion.
- Don't use radios when more than one option can be selected.
- Don't show unavailable options as disabled. Remove them.

## Example

```html
<div class="hb-radio-group hb-radio-group--inline" role="radiogroup" aria-labelledby="sar-label">
  <span class="hb-radio-group__label" id="sar-label">File a SAR?</span>
  <label class="hb-radio-row">
    <input type="radio" class="hb-radio" name="file-sar" value="yes"> <span>Yes</span>
  </label>
  <label class="hb-radio-row">
    <input type="radio" class="hb-radio" name="file-sar" value="no"> <span>No</span>
  </label>
  <label class="hb-radio-row">
    <input type="radio" class="hb-radio" name="file-sar" value="undecided"> <span>Not yet decided</span>
  </label>
</div>
```
