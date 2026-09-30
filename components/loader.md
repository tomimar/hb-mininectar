Indeterminate progress, for waits the product cannot measure.

`--circular` sits inside the component that is loading — a panel, a card, a button's
place. `--linear` spans the full width of a page or section, at the top of the
region it describes. `--contrast` is the circular loader on a dark or saturated
ground.

The consumer supplies an accessible name on the surrounding region (`aria-live` or
`aria-busy`) — the loader itself is decorative. Leave the surrounding layout in
place while it spins so nothing jumps when the data arrives; for a table, prefer
skeleton rows over replacing the table with a spinner.

Do not use a loader for a wait under about 300ms, and never two on one screen.
