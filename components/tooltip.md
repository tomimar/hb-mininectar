A short, non-interactive label shown on hover and on keyboard focus.

## Structure

Wrap the trigger and an `hb-tooltip__content` in `hb-tooltip`. The content carries `role="tooltip"`.

```html
<span class="hb-tooltip">
  <button class="hb-fab hb-fab--secondary hb-fab--icon" aria-label="Assign case">…</button>
  <span class="hb-tooltip__content" role="tooltip">Assign case</span>
</span>
```

- The bubble: dark background, light text, 12px type, 8px padding, 8px radius, max width 240px. Longer text wraps.
- `hb-tooltip__content` can also stand alone as a bubble in a custom popover.

## Placement

| Placement | Class |
|---|---|
| Bottom (default) | none |
| Top | `hb-tooltip__content--top` |
| Left | `hb-tooltip__content--left` |
| Right | `hb-tooltip__content--right` |

8px gap from the trigger.

## Behavior

- Shows on hover and on keyboard focus (`:focus-within`); hides when the cursor leaves or focus moves away. Handled by CSS.
- Not built in: a ~300ms show delay, hiding on Escape, flipping to fit the viewport. Add them in script if the prototype needs them.

## Writing the content

- Text only, a few words, sentence case.

## When to use

- The name of an icon-only control, for sighted users.
- The full value of a truncated table cell.

## Do

- Keep the text short.
- Make it reachable by keyboard, not just mouse hover.

## Don't

- Don't put links, buttons or anything the analyst has to reach inside a tooltip.
- Don't put anything essential in it: content needed to finish a task, or critical information that must stay visible.
- Don't use it instead of a label. An icon-only control still needs its own `aria-label`; the tooltip repeats that name, it does not replace it.

## Example

```html
<td>
  <span class="hb-tooltip">
    <span tabindex="0">Northwind Trading Ltd. (Cayman…</span>
    <span class="hb-tooltip__content" role="tooltip">Northwind Trading Ltd. (Cayman Islands)</span>
  </span>
</td>
```
