A short, rounded label for a status, a category or a filter value.

## Colors

Each color paints a `-soft` background with its `-contrast` text, so it keeps its contrast in both themes. Pick the color for meaning, not decoration.

| Color | Class | Meaning |
|---|---|---|
| Blue | `--blue` | Open, active, informational. |
| Green | `--green` | Resolved, approved, success. |
| Red | `--red` | Cancelled, rejected, error. |
| Yellow | `--yellow` | Pending, needs attention, warning. |
| Orange | `--orange` | In progress, in review. |
| Grey | `--grey` | Neutral, submitted, draft, default. |
| Purple, pink, brown | `--purple`, `--pink`, `--brown` | Categories and labels that are not a status. |
| Outlined | `--outlined` | Low-emphasis metadata, counts, neutral chips. |

```html preview
<div class="hb-tag-group">
  <span class="hb-tag hb-tag--blue">Open</span>
  <span class="hb-tag hb-tag--green">Resolved</span>
  <span class="hb-tag hb-tag--red">Cancelled</span>
  <span class="hb-tag hb-tag--yellow">Pending</span>
  <span class="hb-tag hb-tag--orange">In review</span>
  <span class="hb-tag hb-tag--grey">Submitted</span>
  <span class="hb-tag hb-tag--purple">Wire transfer</span>
  <span class="hb-tag hb-tag--pink">Retail</span>
  <span class="hb-tag hb-tag--brown">Cash</span>
  <span class="hb-tag hb-tag--outlined">12 alerts</span>
</div>
```

Keep the mapping stable across the product: if blue means Open on one screen, it means Open on every screen.

## Structure

- `hb-tag` plus one color modifier. The label is plain text.
- Optional leading `hb-icon hb-icon--sm` to reinforce a status. Wrap icon and label in `hb-tag__inner` so a long label truncates.
- Optional trailing `hb-tag__remove` button turns it into a removable chip (an applied filter, an editable list of values). It needs an `aria-label` naming what it removes.
- Wrap several tags in `hb-tag-group` for a wrapping row with even spacing.
- `hb-tag--add` is a 24×24px icon-only button that adds a tag to a group. Give it an `aria-label`.
- A tag is at most 240px wide; longer text is cut with an ellipsis.

With a leading icon, a remove button, the add button and a long label that truncates:

```html preview
<div class="hb-tag-group">
  <span class="hb-tag hb-tag--green">
    <span class="hb-tag__inner">
      <span class="hb-icon hb-icon--sm" aria-hidden="true">check_circle</span>
      <span>Resolved</span>
    </span>
  </span>
  <span class="hb-tag hb-tag--blue">
    Structuring
    <button class="hb-tag__remove" aria-label="Remove filter: Structuring">×</button>
  </span>
  <span class="hb-tag hb-tag--grey">
    <span class="hb-tag__inner">
      <span>Northwind Trading Company Limited, offshore subsidiary</span>
    </span>
  </span>
  <button class="hb-tag hb-tag--add" aria-label="Add tag">
    <span class="hb-icon hb-icon--sm" aria-hidden="true">add</span>
  </button>
</div>
```

## Writing the label

- Sentence case, one or two words: "In review", "High risk".

## Do

- Use the same color for the same status everywhere.
- Keep labels short enough to read at a glance.

## Don't

- Don't rely on color alone. The word is the status; the color is the accent.
- Don't make the whole tag clickable to filter. A tag is not a button.
- Don't use many colors in one view. It dilutes the meaning.

## Example

```html preview
<div class="hb-tag-group">
  <span class="hb-tag hb-tag--blue">Open</span>
  <span class="hb-tag hb-tag--orange">In review</span>
  <span class="hb-tag hb-tag--red">
    High risk
    <button class="hb-tag__remove" aria-label="Remove filter: High risk">×</button>
  </span>
</div>
```
