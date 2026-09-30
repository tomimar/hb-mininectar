A focused, blocking surface for one decision or one short form.

Structure: `hb-modal-overlay` (fixed, dimmed) holding `hb-modal` with
`hb-modal__header` (`__title` plus an `__close` button with an `aria-label`),
`hb-modal__body` and `hb-modal__footer`. It is the only surface at
`border-radius-16`, on `ui-bg-overlay` with `shadow-floating`. Width is 400–720px.

The footer holds the cancel on the left as a ghost button and the commit on the right
as primary — or danger, when the action destroys something. The label on the commit
button repeats the verb in the title: "Escalate", not "OK".

The consumer owns the dialog semantics: `role="dialog"` with `aria-modal="true"`,
a label pointing at the title, focus moved into the modal on open, focus trapped
while it is open, Escape to close, and focus returned to the trigger afterwards.

Use a modal only when the analyst cannot usefully continue without answering. Never
nest one modal in another, and never put a long form in one — that is a page.
