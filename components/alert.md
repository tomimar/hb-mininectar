A persistent, non-blocking banner at the top of a page or a section.

## Types

Always add a type modifier. `--info` is the default choice.

| Type | Use it for | Example |
|---|---|---|
| `--info` | Neutral information. No action required. | "Scheduled maintenance on Sunday from 2am to 4am." |
| `--success` | A completed action or a resolved condition. | "Case CASE-4821 was escalated to the SAR team." |
| `--warning` | A potential problem. Action recommended, not blocking. | "KYC for this entity expires in 5 days." |
| `--error` | A failure or a blocking problem. | "Transactions could not be loaded. Refresh the page." |

Each type paints a `-soft` fill, a matching solid border and `-contrast` text. The icon and the words carry the status together — never the color alone.

Each type:

```html preview
<div style="display: flex; flex-direction: column; gap: var(--spacing-12); width: 100%;">
  <div class="hb-alert hb-alert--info">
    <span class="hb-icon hb-alert__icon" aria-hidden="true">info</span>
    <p class="hb-alert__content">Scheduled maintenance on Sunday from 2am to 4am.</p>
  </div>
  <div class="hb-alert hb-alert--success">
    <span class="hb-icon hb-alert__icon" aria-hidden="true">check_circle</span>
    <p class="hb-alert__content">Case CASE-4821 was escalated to the SAR team.</p>
  </div>
  <div class="hb-alert hb-alert--warning">
    <span class="hb-icon hb-alert__icon" aria-hidden="true">warning</span>
    <p class="hb-alert__content">KYC for this entity expires in 5 days.</p>
  </div>
  <div class="hb-alert hb-alert--error">
    <span class="hb-icon hb-alert__icon" aria-hidden="true">error</span>
    <p class="hb-alert__content">Transactions could not be loaded. Refresh the page.</p>
  </div>
</div>
```

## Structure

- `hb-alert` + type modifier.
- `hb-alert__icon` — required, 20px, matches the type.
- `hb-alert__content` — the message, a `<p>`.
- `hb-alert__link` — optional, inline inside the content.
- `hb-alert__dismiss` — optional button, with an `aria-label`.

```html
<div class="hb-alert hb-alert--warning">
  <svg class="hb-alert__icon">…</svg>
  <p class="hb-alert__content">Message <a class="hb-alert__link" href="#">Link</a></p>
  <button class="hb-alert__dismiss" aria-label="Dismiss">…</button>
</div>
```

## Writing the message

- What happened, then what to do.
- 1–2 lines. Concise and actionable.

## When to use

- The alert stays until the condition changes or the analyst dismisses it.
- For a transient confirmation of something they just did, use a Toast.
- For something that must be acknowledged before work continues, use a Modal.
- For field-level validation, use the Input error state.

## Do

- Use the type that matches the message's intent.
- Place the alert directly above the region it describes (the page, below the navbar, or a section).
- Show one alert at a time.
- Keep the icon top-aligned when the text wraps (the CSS does this).
- Give an error alert focus or an `aria-live` region so it is announced.

## Don't

- Don't auto-dismiss an alert, of any type. A message that should disappear on its own is a Toast.
- Don't use warning for errors, or error for warnings.
- Don't remove the icon.
- Don't use an alert as permanent page content.
- Don't make a dismiss button without an `aria-label`.

## Example

```html preview
<div class="hb-alert hb-alert--error" role="alert" style="width: 100%;">
  <span class="hb-icon hb-alert__icon" aria-hidden="true">error</span>
  <p class="hb-alert__content">
    The SAR draft could not be saved. Try again, or
    <a class="hb-alert__link" href="#">download a copy</a>.
  </p>
  <button class="hb-alert__dismiss" aria-label="Dismiss">
    <span class="hb-icon" aria-hidden="true">close</span>
  </button>
</div>
```
