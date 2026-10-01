A transient notification in a corner of the viewport that confirms something that just happened.

## Types

| Type | Use it for | Auto-dismiss | Dismiss button | Action |
|---|---|---|---|---|
| `--info` | Neutral notices. | After ~4s | Optional | Optional |
| `--success` | Confirming an action. | After ~4s, unless it has an Undo | Optional | Optional ("Undo") |
| `--warning` | Something the analyst should act on soon. | Never | Required | Required |
| `--error` | A failure. | Never | Required | Optional ("Retry") |
| `--loading` | A background process in progress. | Never; it ends with the process | None | Optional ("Cancel") |

`--info` is the default type, but the base class has no background: always add a type modifier.

Toasts are the one inverted surface in the system: a saturated background with `ui-text-knockout` text, so they read as an overlay, not page content. The exception is `--warning`: dark `ui-text` on yellow.

Each type:

```html preview
<div style="display: flex; flex-direction: column; gap: var(--spacing-12); width: 100%;">
  <div class="hb-toast hb-toast--info">
    <span class="hb-icon hb-toast__icon" aria-hidden="true">info</span>
    <p class="hb-toast__content">Scheduled maintenance starts Sunday at 2am.</p>
  </div>
  <div class="hb-toast hb-toast--success">
    <span class="hb-icon hb-toast__icon" aria-hidden="true">check_circle</span>
    <p class="hb-toast__content">Note deleted from case 4128.</p>
    <button class="hb-toast__action">Undo</button>
  </div>
  <div class="hb-toast hb-toast--warning">
    <span class="hb-icon hb-toast__icon" aria-hidden="true">warning</span>
    <p class="hb-toast__content">Your session expires in 5 minutes.</p>
    <button class="hb-toast__action">Stay signed in</button>
    <button class="hb-toast__dismiss" aria-label="Dismiss">
      <span class="hb-icon" aria-hidden="true">close</span>
    </button>
  </div>
  <div class="hb-toast hb-toast--error">
    <span class="hb-icon hb-toast__icon" aria-hidden="true">error</span>
    <p class="hb-toast__content">Alert 9932 could not be assigned.</p>
    <button class="hb-toast__action">Retry</button>
    <button class="hb-toast__dismiss" aria-label="Dismiss">
      <span class="hb-icon" aria-hidden="true">close</span>
    </button>
  </div>
  <div class="hb-toast hb-toast--loading">
    <span class="hb-loader hb-loader--circular hb-loader--contrast hb-toast__icon"></span>
    <p class="hb-toast__content">Exporting 1,240 transactions…</p>
    <button class="hb-toast__action">Cancel</button>
  </div>
</div>
```

## Structure

- `hb-toast` plus a type modifier.
- `hb-toast__icon`. For `--loading`, use `hb-loader hb-loader--circular hb-loader--contrast hb-toast__icon`.
- `hb-toast__content` with the message.
- Optional `hb-toast__action` button. One per toast at most.
- Optional `hb-toast__dismiss` button with an `aria-label`.
- Max width 720px.

## Behavior

The consumer owns placement, stacking and timing.

- Place toasts in a corner of the viewport. They never block interaction.
- Stack them vertically, 3 visible at most.
- Never auto-dismiss a toast carrying an error or an Undo. An action the analyst may need has to wait for them.
- Announce toasts through a polite live region.

## Writing the message

- One line, in sentence case, naming the object.
- Past tense for confirmations: "Note added to case 4128."
- Action labels are a verb: "Undo", "Retry", "Cancel".

## When to use

| Use | When |
|---|---|
| Toast | Feedback on an action or a background task. Transient, in a corner, over the page. |
| Alert | The message must persist or be re-read: system status, page-level issues. In the page flow, until resolved. |
| Modal | A blocking error the analyst must deal with before going on. |

## Do

- Auto-dismiss info and success toasts.
- Keep one action per toast.

## Don't

- Don't auto-dismiss errors or warnings.
- Don't stack more than 3 toasts.
- Don't put long copy, several actions or form validation in a toast.

## Example

```html preview
<div class="hb-toast hb-toast--success">
  <span class="hb-icon hb-toast__icon" aria-hidden="true">check_circle</span>
  <p class="hb-toast__content">Case 4128 escalated.</p>
  <button class="hb-toast__action">Undo</button>
  <button class="hb-toast__dismiss" aria-label="Dismiss">
    <span class="hb-icon" aria-hidden="true">close</span>
  </button>
</div>
```
