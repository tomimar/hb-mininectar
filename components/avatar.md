A person, as initials or a photograph.

The consumer supplies two initials as the element's text, or an `<img>` with the
same classes and a real `alt`. Sizes: `--sm`, `--md` (default), `--lg`. The ground
is `ui-interaction-contrast`; override it per person with the `--hb-avatar-bg`
custom property, using an expressive token so the initials stay knockout-readable.

`--muted` drops the whole avatar's opacity, to de-emphasize someone who is no longer
active on the case.

Wrap several in `hb-avatar-group` to overlap them; the group masks a 2px transparent
gap into each overlap, so it sits on any surface without configuration. Show at most
three or four and put the remainder in a final `hb-avatar-group__overflow` avatar
("+3") whose accessible name lists who it stands for.

An avatar is never the only identification of a person — pair it with the name
wherever the name fits.
