The filter panel that drops from a FloatingAction above a table or list.

Structure: `hb-popup-select` with an `hb-popup-select__header` (the filter's name
plus an `hb-popup-select__clear` button) over an `hb-popup-select__list` of
`hb-popup-select__option` labels, each an `hb-checkbox`, an
`hb-popup-select__label` and an optional `hb-popup-select__count`.

The counts are the point: they tell the analyst what a filter will cost before they
apply it. Supply them whenever the number is known, formatted with thousands
separators.

The consumer owns open/close, positioning and applying the filter. Anchor the panel
to its trigger, return focus to the trigger on close, and reflect the applied filters
back on the trigger (`hb-fab--selected` plus a count) so the analyst can see the view
is filtered without opening it.

Use this over a Multi Select when the choice filters a view rather than fills a form
field.
