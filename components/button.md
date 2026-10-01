The standard control for actions.

## Types

From most to least emphasis:

| Type | Use it for | Avoid |
|---|---|---|
| `--primary` | The main action of the screen: Save, Create, Send. | More than one per view. |
| `--secondary` | Common actions next to a primary: Export, Filter, Edit. | Replacing the primary in high-stakes flows. |
| `--tertiary` | Supporting actions: Learn more, View all, See details. | Main or destructive actions. |
| `--ghost` | Cancel, Back, Dismiss. | Main actions — it can look disabled. |
| `--confirmation` | Approving a decision: Approve, Resolve, Mark as complete. | Everyday actions. |
| `--danger` | Irreversible actions: Delete, Revoke, Remove. | Anything that can be undone. |

## Sizes

| Size | Class | Height | Use for |
|---|---|---|---|
| Large | `--lg` | 40px | The default: most views, forms, dialogs. |
| Small | `--sm` | 32px | Dense tables, compact toolbars, banners. |

`--full-width` fills its container — for narrow panels, confirmation modals and mobile layouts.

## States

Handled by CSS, no extra classes:

| State | Trigger | What changes |
|---|---|---|
| Hover | `:hover` | Background darkens to the `-highlighted` token. |
| Focus | `:focus-visible` | 2px ring in `ui-interaction-soft`. |
| Disabled | `disabled` attribute | `ui-disabled` text on `ui-disabled-soft`; not clickable. |

## Writing the label

- A verb on the object, in sentence case: "Escalate case", "Save changes".
- Never vague labels: "Submit", "OK", "Yes", "Confirm", "Click here".

## Do

- Pair a primary with a ghost or secondary to make the hierarchy clear.
- Ask for confirmation (a modal) before a danger action.
- Put an icon (`hb-icon`) before the label to reinforce meaning. It takes the button's color.

## Don't

- Don't use two primary buttons in the same view.
- Don't use danger for actions that aren't destructive.
- Don't disable a button without saying nearby what would enable it.
- Don't make an icon-only button without an `aria-label`. Use a Floating action, or a ghost button with an `aria-label`.

## Example

```html
<button class="hb-btn hb-btn--ghost">Cancel</button>
<button class="hb-btn hb-btn--primary">Escalate case</button>
<button class="hb-btn hb-btn--secondary hb-btn--sm">
  <span class="hb-icon hb-icon--sm">download</span> Download CSV
</button>
```
