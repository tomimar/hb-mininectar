The secondary navigation inside a page, listing that page's sections.

It shares the surface of the content: no background, no divider, no rail. Structure:
`hb-sidenav-area` wrapping `nav.hb-sidenav` and the content. The nav holds
`hb-sidenav__section` group labels and `hb-sidenav__item` rows — each an `<a>` or a
`<button>` with an optional `hb-sidenav__icon`, an `hb-sidenav__label` and an
`hb-sidenav__count`. An item may own one level of `hb-sidenav__submenu` with
`hb-sidenav__subitem` rows, shown only while its parent is the current section: there
is no chevron and nothing to expand. States: `--active`, `--disabled`.

The whole nav collapses out of the layout (`is-collapsed` on the root) to hand its
width back to a wide table, and floats back over the content on hover
(`is-peeking`) — the Notion pattern. Clicking `hb-sidenav__toggle` pins it open
again. The toggle lives in the top-left corner of the content, on the same line as
the page title, in the same place on every page; the peek panel hangs from
`--hb-sidenav-peek-top` so it never covers it.

Width comes from `--hb-sidenav-width` (240px by default). The consumer supplies the
items, the current-section state, and an `aria-current="page"` on the active item.

This is in-page navigation only. Moving between products or top-level areas is the
app header's job, not this component's.
