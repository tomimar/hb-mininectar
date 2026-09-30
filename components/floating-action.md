A pill-shaped, shadowed action that floats over content rather than sitting in it.

Use it for controls that act on a whole view and must stay reachable while the
content scrolls — filter and column pickers above a table, a compose action on a
list. Anything that belongs to a form or a panel is a Button, not a FloatingAction.

Types: `--primary`, `--secondary`. Sizes: default 40px, `--sm` 32px. `--icon` makes
it a square icon-only control — then the consumer must supply an `aria-label`.
`--selected` marks the persistent on state, for a filter that is currently applied.

It is the only control that carries `shadow-action`. Do not stack two of them, and
do not use one inside a modal.
