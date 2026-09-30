Choice from a known list — one value, or several.

Single select wraps a real `<select>` in `hb-select`; the wrapper supplies the
chevron and the control styling, the native element supplies the behaviour and the
keyboard. The consumer provides the `<option>` list and a `for`/`id` label.

The multi variant is `hb-multiselect`: selections become removable
`hb-multiselect__tag` chips inside `hb-multiselect__control`, and the menu
(`__menu`, `__option`, `__empty`) lists options with checkboxes. Open state is
`is-open` on the root. Sizes: default 40px, `--sm` 32px; `--disabled` on the root.
Behaviour — open, type-to-filter, toggle, remove — is the consumer's, wired with
Alpine in prototypes; this component is the markup and styling contract.

Use a Select from about five options up. Below that, Radio (one) or Checkbox (many)
shows every option without a click. Above about twenty, give the multiselect its
filter input a real job.

Show the placeholder as an empty first option, not as a selected value — a select
that arrives with a value has made a choice for the analyst.
