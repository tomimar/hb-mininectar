A text field dedicated to filtering a list, table or menu.

Structure: `hb-search` wrapping `hb-search__icon`, `hb-search__input` and — only
while the field has a value — an `hb-search__clear` button with an `aria-label`.
Default width is 320px; override it with a style when the container demands.
`--sm` is the 32px height for toolbars.

The consumer supplies the placeholder, which names the scope being searched
("Search alerts…"), and the filtering itself. Put the control directly above the
thing it filters, and keep the result count visible nearby.

A Search is not a form field: it has no `hb-field` label and it should filter as the
analyst types rather than waiting for Enter. If the query has to be submitted, that
is an Input plus a Button.
