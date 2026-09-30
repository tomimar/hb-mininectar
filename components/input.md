A single-line text field, with the shared field wrapper that carries its label, help
text and error.

Structure: `hb-field` wraps an `hb-field__label` (with `hb-field__required` for the
asterisk), the `hb-input`, and one of `hb-field__help` or `hb-field__error`. The
consumer supplies a real `for`/`id` pair — the label must be programmatically
associated, not merely adjacent.

Sizes: default 40px, `--sm` 32px for dense toolbars and inline editing.
`--error` paints the invalid border; pair it with `aria-invalid="true"` and
`aria-describedby` pointing at the `hb-field__error`.

Labels are always visible: placeholder text is an example of the format, never the
label, and disappears as soon as the analyst types. Error text says what is wrong and
what shape the value should take.

`hb-field` is the wrapper for every control on this system — Textarea, Select,
DateInput, SearchInput all sit inside it.
