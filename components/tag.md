A short, fully-rounded label for a status, a category or a filter value.

Ten colors: `--grey`, `--blue`, `--green`, `--red`, `--yellow`, `--orange`, `--pink`,
`--purple`, `--brown`, `--outlined`. Each paints a `-soft` ground with its
`-contrast` ink, so it holds contrast in both themes. Choose the color for meaning
and keep it stable across the product — if blue means Open on one screen it means
Open on every screen.

The consumer supplies the label, in sentence case, one or two words. A leading
`hb-icon hb-icon--sm` may reinforce a status; a trailing `hb-tag__remove` button
turns it into a removable filter chip and needs an `aria-label` naming what it
removes. Wrap several in `hb-tag-group`.

A tag is not a button: do not make the whole tag clickable to filter. Do not use
color alone to carry a status — the word is the status, the color is the accent.
