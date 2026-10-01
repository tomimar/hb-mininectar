A focused, blocking surface for one decision or one short form.

## Types

All modals share one structure. The footer changes with the decision:

| Type | Use it for | Footer |
|---|---|---|
| Informational | Something the analyst only needs to acknowledge. | One button naming the action: "Back to case". |
| Confirmation | Confirming a reversible action before it runs. | Ghost cancel + primary: "Cancel" · "Escalate case". |
| Danger | Confirming a destructive, irreversible action. | Ghost cancel + danger: "Cancel" · "Delete note". |
| Form | Collecting a little input without leaving the view. | Ghost cancel + primary: "Cancel" · "Save changes". |

## Structure

```html
<div class="hb-modal-overlay">
  <div class="hb-modal" role="dialog" aria-modal="true" aria-labelledby="m-title">
    <div class="hb-modal__header">
      <span class="hb-modal__title" id="m-title">…</span>
      <button class="hb-modal__close" aria-label="Close"><span class="hb-icon">close</span></button>
    </div>
    <div class="hb-modal__body">…</div>
    <div class="hb-modal__footer">…</div>
  </div>
</div>
```

- `hb-modal-overlay`: fixed, dimmed backdrop that centers the modal.
- `hb-modal`: the only surface at `border-radius-16`, on `ui-bg-overlay` with `shadow-floating`. Width 400–720px.
- `hb-modal__header`: `__title` plus an `__close` button with an `aria-label`.
- `hb-modal__footer`: right-aligned. Cancel first as a ghost button, commit last as primary — or danger when it destroys something.

## Writing the content

- The commit label repeats the verb in the title: title "Escalate case?", button "Escalate case".
- Never "OK", "Yes", "Submit" or "Confirm".
- Keep the body short: one focused decision.

## When to use

- Only when the analyst cannot usefully continue without answering.
- A long form is a page, not a modal.
- Success or error feedback is a Toast, not a modal.

## Do

- Offer every way to dismiss: the close button, Cancel, an overlay click and Escape.

## Don't

- Don't nest or stack modals. Resolve one before opening the next.
- Don't put a floating action inside a modal.

## Accessibility

The consumer owns the dialog semantics:

- `role="dialog"` with `aria-modal="true"`, labelled by the title.
- Move focus into the modal on open and trap it while open.
- Escape closes it.
- Return focus to the trigger afterwards.

## Example

```html
<div class="hb-modal-overlay">
  <div class="hb-modal" role="dialog" aria-modal="true" aria-labelledby="esc-title">
    <div class="hb-modal__header">
      <span class="hb-modal__title" id="esc-title">Escalate case CASE-10482?</span>
      <button class="hb-modal__close" aria-label="Close"><span class="hb-icon">close</span></button>
    </div>
    <div class="hb-modal__body">The case moves to the Level 2 queue and you can no longer edit the narrative.</div>
    <div class="hb-modal__footer">
      <button class="hb-btn hb-btn--ghost">Cancel</button>
      <button class="hb-btn hb-btn--primary">Escalate case</button>
    </div>
  </div>
</div>
```
