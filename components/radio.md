Exactly one choice from a short, mutually exclusive set.

Each option is an `hb-radio` input inside an `hb-radio-row` label; the set goes in an
`hb-radio-group` with an `hb-radio-group__label` that asks the question. Add
`--inline` for two or three short options. The consumer supplies a shared `name` —
without it the options are not one group, for the browser or for a screen reader.

Show every option; a radio group has no collapsed state. Above about five options,
use a Select. If the analyst may need to undo their choice, include the "none" case
as an explicit option rather than relying on them clearing it.

Do not preselect a value that the analyst should decide — in a disposition, a default
is an opinion.
