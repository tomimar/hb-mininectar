A field for a single date: a native `<input type="date">` inside an `hb-date-input` wrapper.

## Variants

| Variant | Markup | Use it for |
|---|---|---|
| Native (default) | `hb-date-input` > `input[type="date"]` (optionally `.hb-date-input__field`) + `hb-date-input__icon` | Most date fields. The native control gives the keyboard, the locale format and the platform picker for free. |
| Calendar picker | `hb-date-input[data-hb-datepicker]` > `input.hb-input` + `hb-date-input__icon`, plus `datepicker.js` | A richer in-page calendar. |

The wrapper supplies the calendar affordance (`hb-date-input__icon`) and the control styling.

## Structure

Native:

```html
<div class="hb-field">
  <label class="hb-field__label" for="due">Due date</label>
  <div class="hb-date-input">
    <input type="date" id="due" class="hb-date-input__field" min="2026-01-01" max="2026-12-31">
    <svg class="hb-date-input__icon" aria-hidden="true">…</svg>
  </div>
</div>
```

Calendar picker — `datepicker.js` is plain JavaScript, no Alpine:

```html
<div class="hb-date-input" data-hb-datepicker style="position:relative;">
  <input type="text" id="due" class="hb-input" placeholder="MM/DD/YYYY" style="padding-right:40px;">
  <svg class="hb-date-input__icon" aria-hidden="true">…</svg>
</div>
<script src="https://tomimar.github.io/hb-mininectar/datepicker.js"></script>
```

- It opens below the field on click or focus.
- Arrows change the month; the month label opens a year view; Today jumps to today.
- Typing inserts the slashes. Selecting a day fills the field and closes the picker.
- The value is always `MM/DD/YYYY`.

## States

Handled by CSS:

| State | Trigger | What changes |
|---|---|---|
| Default | Resting | White fill, `ui-border-secondary` border. |
| Hover | `:hover` | Border darkens. |
| Focus | `:focus` | `ui-interaction` border and a `ui-interaction-soft` ring. |
| Error | `hb-input--error` (calendar picker) | `ui-status-danger` border and ring. Pair with `hb-field__error`. |
| Disabled | `disabled` attribute (calendar picker) | `ui-bg-tertiary` fill, muted text, not interactive. |

## Content

- Always give the field a label, linked with `for`/`id`.
- Set `min` and `max` where the range matters.
- In read-only content, display dates as `12 Mar 2026`. The input itself follows the platform (native) or `MM/DD/YYYY` (calendar picker).
- Where a date has a time zone, label it. An alert's timestamp is meaningless without one.

## Do

- Keep the native date input for plain date fields.
- Show the `MM/DD/YYYY` format hint in the placeholder of the calendar picker.
- Offer a picker so analysts don't have to type dates by hand.

## Don't

- Don't replace the native date input with a plain text field.
- Don't rely on free text alone for dates. Without a format hint or a picker, input is error-prone.

## Example

```html
<div class="hb-field">
  <label class="hb-field__label" for="activity-from">Suspicious activity start date</label>
  <div class="hb-date-input">
    <input type="date" id="activity-from" class="hb-date-input__field" max="2026-09-30">
    <svg class="hb-date-input__icon" aria-hidden="true">…</svg>
  </div>
</div>
```
