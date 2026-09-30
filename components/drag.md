A list whose items can be reordered by dragging **or** by Up/Down buttons.

The buttons are not a convenience, they are the requirement: WCAG 2.5.7 (Dragging
movements) says a drag can never be the only way to do something. They stay in the
tab order at all times and are never `display: none`.

Structure: `ul.hb-drag` of `li.hb-drag__item`, each with an `hb-drag__handle`, an
`hb-drag__content` and an `hb-drag__move` group of two `hb-drag__move-btn` buttons
whose `aria-label`s name the item ("Move Date of birth up"). Item states:
`is-dragging`, `is-drop-target`.

Two presentations: default, with the buttons always visible, for a dedicated
management panel such as the table's Columns popover; and `--inline`, where the
controls appear on hover or keyboard focus so short lists sit in content without
permanent chrome. An item's content may hold another `hb-drag` — nested lists reorder
independently.

The consumer supplies the reorder behaviour; in prototypes that is the `hbReorder()`
Alpine factory from `drag.js`, spread into `x-data`. Keep focus on the button that
was pressed after a move and announce the new position through the shared polite live
region (`#hb-live-region`) — otherwise a keyboard user loses their place.
