A binary on/off switch whose change takes effect immediately.

## Size

One size:

| Element | Size |
|---|---|
| Track | 36×20px |
| Thumb | 16×16px |
| Track to label | 8px |

## Structure

An `hb-toggle` label wraps a checkbox, the track with its thumb, and the text label.

```html preview
<label class="hb-toggle">
  <input type="checkbox" class="hb-toggle__input">
  <span class="hb-toggle__track"><span class="hb-toggle__thumb"></span></span>
  <span class="hb-toggle__label">Include closed alerts</span>
</label>
```

The label sits to the right of the toggle.

## States

Handled by CSS:

| State | Trigger | Track color |
|---|---|---|
| On | `checked` | `ui-interaction` |
| Off | Resting | `ui-disabled-soft` |
| On, disabled | `checked` + `disabled` | `ui-interaction-soft` |
| Off, disabled | `disabled` | `ui-bg-tertiary` |

```html preview
<div style="display: flex; flex-wrap: wrap; gap: var(--spacing-32);">
  <label class="hb-toggle"><input type="checkbox" class="hb-toggle__input" checked><span class="hb-toggle__track"><span class="hb-toggle__thumb"></span></span><span class="hb-toggle__label">On</span></label>
  <label class="hb-toggle"><input type="checkbox" class="hb-toggle__input"><span class="hb-toggle__track"><span class="hb-toggle__thumb"></span></span><span class="hb-toggle__label">Off</span></label>
  <label class="hb-toggle"><input type="checkbox" class="hb-toggle__input" checked disabled><span class="hb-toggle__track"><span class="hb-toggle__thumb"></span></span><span class="hb-toggle__label">On, disabled</span></label>
  <label class="hb-toggle"><input type="checkbox" class="hb-toggle__input" disabled><span class="hb-toggle__track"><span class="hb-toggle__thumb"></span></span><span class="hb-toggle__label">Off, disabled</span></label>
</div>
```

If the switch cannot be changed, disable it and say why next to it (for example, an enforced policy).

## Writing the label

- Short, in sentence case, phrased as the on state: "Include closed alerts", "Email notifications".
- Never a question. Never a pair of words ("On/Off").

## When to use

| Use | When |
|---|---|
| Toggle | A setting that applies the moment it is flipped: a notification preference, a view filter. |
| Checkbox | The change only lands on Save, or needs confirmation. A toggle's whole meaning is immediacy. |

## Do

- Use toggles for immediate, binary settings.
- Keep the on and off states visually distinct.

## Don't

- Don't use toggles for a group of multiple selections. Use checkboxes.
- Don't leave a toggle without a visible text label.
- Don't use a toggle for a destructive action without confirmation.

## Example

```html preview
<div style="display: flex; flex-direction: column; gap: var(--spacing-4);">
  <label class="hb-toggle">
    <input type="checkbox" class="hb-toggle__input" checked disabled>
    <span class="hb-toggle__track"><span class="hb-toggle__thumb"></span></span>
    <span class="hb-toggle__label">Require second review for SAR filing</span>
  </label>
  <p class="hb-field__help">Set by your organization's compliance policy.</p>
</div>
```
