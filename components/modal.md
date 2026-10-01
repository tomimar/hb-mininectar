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
<button type="button" class="hb-btn hb-btn--primary hb-btn--lg" data-hb-modal-open="escalate">Escalate case</button>

<div class="hb-modal-overlay" id="escalate" hidden>
  <div class="hb-modal" role="dialog" aria-modal="true" aria-labelledby="escalate-title">
    <div class="hb-modal__header">
      <span class="hb-modal__title" id="escalate-title">Escalate case CASE-10482?</span>
      <button type="button" class="hb-modal__close" aria-label="Close"><span class="hb-icon" aria-hidden="true">close</span></button>
    </div>
    <div class="hb-modal__body">…</div>
    <div class="hb-modal__footer">
      <button type="button" class="hb-btn hb-btn--ghost hb-btn--lg" data-hb-modal-close>Cancel</button>
      <button type="button" class="hb-btn hb-btn--primary hb-btn--lg" data-hb-modal-close>Escalate case</button>
    </div>
  </div>
</div>
```

- `hb-modal-overlay`: fixed, dimmed backdrop that centers the modal. It has an `id` and starts `hidden`.
- `hb-modal`: the only surface at `border-radius-16`, on `ui-bg-overlay` with `shadow-floating`. Width 400–720px.
- `hb-modal__header`: `__title` plus an `__close` button with an `aria-label`.
- `hb-modal__footer`: right-aligned. Cancel first as a ghost button, commit last as primary — or danger when it destroys something.

## Behaviour

`hb.js` does the work — no script of your own:

- A button with `data-hb-modal-open="<overlay id>"` opens it.
- It closes on the `__close` button, on any button with `data-hb-modal-close` (Cancel, and the commit button in a prototype), on a click on the overlay, or on Escape.
- On open, focus moves into the modal (the first field, else the first footer button) and Tab stays inside. On close, focus goes back to the button that opened it. The page behind doesn't scroll.
- Only one modal at a time: opening another closes the first.
- A prototype that needs to act on the choice listens for `hb-modal-close` on the overlay: `event.detail.by` is the button that closed it (none for Escape or an overlay click).

Open each one, then close it every way — ×, Cancel, a click outside, Escape:

```html preview
<button type="button" class="hb-btn hb-btn--primary hb-btn--lg" data-hb-modal-open="modal-escalate">Escalate case</button>
<button type="button" class="hb-btn hb-btn--danger hb-btn--lg" data-hb-modal-open="modal-delete">Delete note</button>

<div class="hb-modal-overlay" id="modal-escalate" hidden>
  <div class="hb-modal" role="dialog" aria-modal="true" aria-labelledby="modal-escalate-title">
    <div class="hb-modal__header">
      <span class="hb-modal__title" id="modal-escalate-title">Escalate case CASE-10482?</span>
      <button type="button" class="hb-modal__close" aria-label="Close"><span class="hb-icon" aria-hidden="true">close</span></button>
    </div>
    <div class="hb-modal__body">
      <div class="hb-field">
        <label class="hb-field__label" for="escalate-reason">Reason <span class="hb-field__required">*</span></label>
        <textarea class="hb-textarea" id="escalate-reason" rows="3">Name and date of birth both match the sanctioned party.</textarea>
        <p class="hb-field__help">Included in the audit trail.</p>
      </div>
    </div>
    <div class="hb-modal__footer">
      <button type="button" class="hb-btn hb-btn--ghost hb-btn--lg" data-hb-modal-close>Cancel</button>
      <button type="button" class="hb-btn hb-btn--primary hb-btn--lg" data-hb-modal-close>Escalate case</button>
    </div>
  </div>
</div>

<div class="hb-modal-overlay" id="modal-delete" hidden>
  <div class="hb-modal" role="dialog" aria-modal="true" aria-labelledby="modal-delete-title">
    <div class="hb-modal__header">
      <span class="hb-modal__title" id="modal-delete-title">Delete note?</span>
      <button type="button" class="hb-modal__close" aria-label="Close"><span class="hb-icon" aria-hidden="true">close</span></button>
    </div>
    <div class="hb-modal__body">
      <p class="hb-text-body">The note by Elena Cruz on 2 Jul 2026 is removed from CASE-10482. This can't be undone.</p>
    </div>
    <div class="hb-modal__footer">
      <button type="button" class="hb-btn hb-btn--ghost hb-btn--lg" data-hb-modal-close>Cancel</button>
      <button type="button" class="hb-btn hb-btn--danger hb-btn--lg" data-hb-modal-close>Delete note</button>
    </div>
  </div>
</div>
```

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

- Give the dialog `role="dialog"` and `aria-modal="true"`, labelled by its title (`aria-labelledby`).
- `hb.js` handles the rest: focus moves in on open and is trapped while open, Escape closes it, and focus returns to the trigger afterwards.
