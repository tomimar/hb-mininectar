The one component for showing and hiding content — what people also call an accordion, a collapsible, a collapse card or a show more.

One behaviour: a native `<button>` with `aria-expanded` and `aria-controls`, and the region it controls placed straight after it. The chevron (`hb-expand__chevron`, `expand_more`) points down when closed and turns up when open. Open/closed state lives in Alpine (`x-data="{ open: false }"`).

- **Base — `hb-expand`.** Behaviour only, no chrome. Put `hb-expand__toggle` on a tertiary `hb-btn` and the `hb-expand__region` right after it. For small bits of secondary detail inside other content: "Show more details" / "Show less".
- **Card — `hb-expand--card`.** A bordered section. The whole header is ONE button inside a heading (`hb-expand__header` > `h3.hb-expand__heading` > `button.hb-expand__toggle` with `hb-expand__title`, an optional `hb-expand__meta` count and the chevron). The region takes `role="region"` and `aria-labelledby` the button; inside it, `hb-expand__body` or `hb-expand__list`. `--muted-header` gives the grey header.
- **Show more — `hb-expand--show-more`.** The first four lines stay visible and the toggle sits at the bottom in `hb-expand__footer`. Text only: the clipped part stays focusable, so never put links or buttons in it.

Header actions go in `hb-expand__actions`, a sibling of the heading — never inside the toggle button (nested click targets are invalid and unreachable by keyboard). Name icon-only actions after the section: "More actions for Linked accounts".

A count on its own is fine when the title says what it counts ("Linked accounts 3"); add the unit when it counts a subset ("Transactions 12 flagged").

Loading: `aria-busy="true"` on the card, `hb-expand__skeleton` with two `hb-expand__skeleton-line` in place of the title, the toggle `disabled` with a visually hidden "Loading …" name.

Stacked cards with an "Expand all" button are the accordion — a pattern, not a separate component. This replaces Nectar's HbExpand, HbAccordion and HbCollapseCard.
