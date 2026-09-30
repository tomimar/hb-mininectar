Material Icons, written as a ligature name in the element's text.

Use `<span class="hb-icon">edit</span>`; the consumer supplies the icon name as the
text content — `edit`, `more_vert`, `delete`, `check_circle`. Names come from the
Material Icons set (mui.com/material-ui/material-icons).

Outlined is the default. Add `hb-icon--rounded` for prominent actions and important
menus. Sizes: `hb-icon--sm` (16px, dense controls and table rows), default (20px),
`hb-icon--lg` (24px, standalone or prominent).

The icon inks in `ui-icon` on its own. Inside a button or a link it inherits that
control's color — do not override it there. To force another color, set `color`
inline from a token.

Do not use an icon as the only label of a control without an `aria-label` that names
the object: "More actions for AML review", not "More". Do not use an icon to carry a
status on its own — pair it with a word.
