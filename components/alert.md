A persistent, non-blocking banner at the top of a page or a section.

Structure: `hb-alert` with a type modifier, an `hb-alert__icon`, an
`hb-alert__content` paragraph, and optionally an `hb-alert__link` inside the content
and an `hb-alert__dismiss` button with an `aria-label`.

Types: `--info` (default), `--success`, `--warning`, `--error`. Each paints its
`-soft` ground with its `-contrast` ink and border. The icon and the words carry the
status together — never the color alone.

An Alert stays until the condition changes or the analyst dismisses it. For a
transient confirmation of something they just did, use a Toast. For something that
must be acknowledged before work continues, use a Modal.

The consumer supplies the message: what happened, then what to do. Place the alert
directly above the region it describes, and give an error alert focus or an
`aria-live` region so it is announced.
