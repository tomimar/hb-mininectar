A date field: a native `<input type="date">` inside an `hb-date-input` wrapper that
supplies the calendar affordance and the control styling.

The consumer supplies the `for`/`id` label and, where the range matters, `min` and
`max`. The native control gives the keyboard, the locale format and the platform
picker for free — do not replace it with a text field.

For a richer in-page calendar, hb-mininectar ships a self-contained `datepicker.js`:
add `data-hb-datepicker` to the wrapper and include the script. It needs no Alpine.

Dates in Hummingbird are displayed as `12 Mar 2026` in read-only content; the input
itself follows the platform. Where a date has a time zone, label it — an alert's
timestamp is meaningless without one.
