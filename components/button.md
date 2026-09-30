The standard action control, in six types and two sizes.

Types, in descending emphasis: `--primary` (one per view — the action the screen
exists for), `--secondary` (the common alternatives), `--tertiary`, `--ghost`
(dismissals and cancels), `--danger` (destructive, and only when the action cannot
be undone), `--confirmation` (an approval that commits a decision).

Sizes: `--lg` is 40px and the default; `--sm` is 32px for toolbars, table rows and
anywhere buttons sit inside dense content. `--full-width` stretches to the container,
for narrow panels and modals on small screens.

The consumer supplies the label — a verb on the object, sentence case: "Escalate
case", never "Submit" or "OK". An icon goes inside the button as an `hb-icon` before
the label and inherits the button's color.

Never place two primaries in the same view. Never disable a button without telling
the analyst nearby what would enable it. For an icon-only action use FloatingAction
or a ghost button with an `aria-label`.
