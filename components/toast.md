A transient notification in a corner of the viewport, confirming something that just
happened.

Structure: `hb-toast` with a type modifier, `hb-toast__icon`, `hb-toast__content`,
an optional `hb-toast__action` button and an optional `hb-toast__dismiss` with an
`aria-label`. Types: `--info` (default), `--success`, `--warning`, `--error`,
`--loading`.

Toasts are the one dark-on-light inversion in the system: they paint a saturated
ground and set `ui-text-knockout` on it, so they read as an overlay rather than page
content.

The consumer owns placement, stacking and timing. Let an informational toast auto
dismiss after a few seconds; never auto dismiss one carrying an error or an Undo — an
action the analyst may need has to wait for them. Announce toasts through a polite
live region.

One line, past tense, naming the object: "Note added to case 4128." If the message
needs to persist or be re-read, it is an Alert.
