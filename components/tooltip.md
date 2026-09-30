A short, non-interactive label revealed on hover and on keyboard focus.

Wrap the trigger and an `hb-tooltip__content` in `hb-tooltip`; the content carries
`role="tooltip"`. Placement is bottom by default — add `--top`, `--left` or
`--right`. `hb-tooltip__content` can also stand alone as a bubble in a custom
popover.

The consumer supplies text only: a few words, no links, no buttons, nothing the
analyst has to reach. Because it appears on hover, nothing essential lives here.

A tooltip is not a substitute for a label. An icon-only control still needs its own
`aria-label` — the tooltip repeats that name for sighted users, it does not replace
it. For the full value of a truncated cell, a tooltip is the right home.
