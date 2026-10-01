A pill-shaped, shadowed action that floats over content instead of sitting in it.

## Types

| Type | Use it for | Avoid |
|---|---|---|
| `--primary` | The single most important quick action in a context. | More than one per context. |
| `--secondary` | Contextual actions that stay available without dominating. | Replacing the primary. |

## Sizes

| Size | Class | Height | Padding / gap |
|---|---|---|---|
| Large | — (default) | 40px | 8px 12px · gap 8px |
| Small | `--sm` | 32px | 8px · gap 4px |

## Icons

- `hb-fab__icon` is always 20×20px. Place it before or after the label, or alone.
- `--icon` makes a square icon-only control (40px, or 32px with `--sm`). It needs an `aria-label`.
- Use an SVG with `hb-fab__icon`. It follows the text color through `currentColor`.

## States

| State | Trigger | What changes |
|---|---|---|
| Default | — | Base background + `shadow-action`. |
| Hover | `:hover` | Primary → `ui-interaction-highlighted`; secondary → `ui-bg-secondary`. |
| Focus | `:focus-visible` | 2px ring in `ui-interaction`. |
| Disabled | `disabled` attribute or `--disabled` | `ui-disabled` text on `ui-disabled-soft`; not clickable. |
| Selected | `--selected` | Black (`ui-text`) background, knockout text. The persistent on state — e.g. a filter that is applied. |

## Writing the label

- Short, a verb on the object, in sentence case: "Filter alerts", "New case".
- Never "Submit" or "OK".

## When to use

- Use it for controls that act on a whole view and must stay reachable while content scrolls: filter and column pickers above a table, a compose action on a list.
- Anything that belongs to a form or a panel is a Button, not a floating action.

## Do

- Use it for quick, contextual actions that need strong visibility.
- Keep one primary per context.

## Don't

- Don't replace standard form or page buttons with it.
- Don't stack two floating actions.
- Don't use one inside a modal.
- Don't use it for destructive actions without a confirmation.
- Don't give another control `shadow-action` — it is reserved for this one.

## Example

```html
<button class="hb-fab hb-fab--secondary hb-fab--selected">
  <svg class="hb-fab__icon" aria-hidden="true">…</svg> Filter alerts
</button>
<button class="hb-fab hb-fab--primary hb-fab--icon" aria-label="New case">
  <svg class="hb-fab__icon" aria-hidden="true">…</svg>
</button>
```
