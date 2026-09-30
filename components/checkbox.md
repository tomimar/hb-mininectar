Independent on/off choices — zero, one or many.

A single box is `<input type="checkbox" class="hb-checkbox">` inside an
`hb-checkbox-row` label, so the whole row is the hit target. Several related boxes go
in an `hb-checkbox-group` with an `hb-checkbox-group__label`; add `--inline` to lay
them in a row when they are short and few.

The consumer supplies the label text and, for a standalone box with no visible label
(a table select-all), an `aria-label` naming what it selects.

Use a checkbox when the options are independent and nothing happens until the form is
submitted. If the change takes effect immediately, that is a Toggle. If exactly one
option may be chosen, that is a Radio.

An indeterminate parent box is set with the `indeterminate` DOM property, not an
attribute — and it must always be reachable by keyboard.
