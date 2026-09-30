Navigation to another place — a case, an entity, a document, an external source.

`hb-link` inks in `ui-interaction-link`, which is darker than `ui-interaction` so
link text clears 4.5:1 on `ui-bg`. `--subtle` is for links inside dense data where a
field of blue would be noise; it still underlines on hover. `--reverse` is for dark
grounds only. `--disabled` removes the target but keeps the text readable.

A link that leaves the product takes a trailing `hb-link__icon` with `open_in_new`,
and its text says where it goes.

The consumer supplies a real `href`. If it does not navigate, it is a Button — never
style a button as a link to make it quieter. Inside a table the primary cell link
also takes `hb-table__link`.
