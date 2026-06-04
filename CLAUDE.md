# Hummingbird Nectar Design System

This repository contains the CSS design system for Hummingbird HTML prototypes.
It is hosted on GitHub Pages so any prototype can reference it with two lines.

## How to use in a new prototype

Add these two lines in the `<head>` of any HTML file:

```html
<link rel="stylesheet" href="https://hummingbird-co.github.io/hb-nectar-ds/tokens.css">
<link rel="stylesheet" href="https://hummingbird-co.github.io/hb-nectar-ds/components.css">
```

Also add Tailwind (layout only) and Alpine.js (interactivity):

```html
<script src="https://cdn.tailwindcss.com"></script>
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

Prototypes are static HTML files opened via `file://` — no server needed.
They are shared as a zip folder.

---

## Stack

- **Styles**: `tokens.css` + `components.css` from this repo
- **Layout**: Tailwind CDN (layout utilities only — no colors, no typography)
- **Interactivity**: Alpine.js v3 (CDN)
- **Sharing**: zip folder, opened directly in browser via `file://`

---

## Tokens (tokens.css)

All CSS custom properties. Key ones:

```css
/* Backgrounds */
--ui-bg                  /* white */
--ui-bg-secondary        /* #f5f5f5 — page background, section bodies */
--ui-bg-tertiary         /* #e8e8e8 — disabled field background */
--ui-bg-overlay          /* white — floating panels (modals, dropdowns) */

/* Borders */
--ui-border              /* #d1d1d1 */
--ui-border-secondary    /* #b8b8b8 — input borders */

/* Text */
--ui-text                /* #000000 */
--ui-text-secondary      /* #595959 */
--ui-text-tertiary       /* #767676 */
--ui-text-knockout       /* #ffffff — text on dark backgrounds */

/* Icons */
--ui-icon                /* #595959 */

/* Interaction (blue) */
--ui-interaction         /* #0a6cff — primary buttons, focus */
--ui-interaction-contrast /* #003f9e — avatar bg, dark blue */
--ui-interaction-soft    /* #ccdeff — focus ring */
--ui-interaction-link    /* #005eeb — links */

/* Status */
--ui-status-danger       /* #e32402 */
--ui-status-danger-text  /* #fd4f30 */
--ui-status-danger-soft  /* #fdd5ce */
--ui-status-success      /* #1e8536 */
--ui-status-success-contrast /* #065120 */
--ui-status-success-soft /* #c7ebcb */
--ui-status-warning      /* #f3ce45 */
--ui-status-warning-contrast /* #655106 */

/* Expressive colors */
--ui-expressive-blue, --ui-expressive-blue-contrast, --ui-expressive-blue-soft
--ui-expressive-green, --ui-expressive-green-contrast, --ui-expressive-green-soft
--ui-expressive-red, --ui-expressive-red-contrast, --ui-expressive-red-soft
--ui-expressive-orange, --ui-expressive-orange-contrast, --ui-expressive-orange-soft
--ui-expressive-yellow, --ui-expressive-yellow-contrast, --ui-expressive-yellow-soft
--ui-expressive-purple, --ui-expressive-purple-contrast, --ui-expressive-purple-soft
--ui-expressive-pink, --ui-expressive-pink-contrast, --ui-expressive-pink-soft
--ui-expressive-brown, --ui-expressive-brown-contrast, --ui-expressive-brown-soft

/* Spacing — use these instead of arbitrary px values */
--spacing-2 --spacing-4 --spacing-8 --spacing-12 --spacing-16
--spacing-24 --spacing-32 --spacing-40 --spacing-48 --spacing-56
--spacing-64 --spacing-72 --spacing-80

/* Border radius */
--border-radius-4        /* inputs, checkboxes */
--border-radius-8        /* buttons, cards, dropdowns */
--border-radius-16       /* modals */
--border-radius-round    /* avatars, pills */

/* Elevation */
--shadow-overlay         /* 0 2px 6px rgba(0,0,0,0.16) — dropdowns */
--shadow-floating        /* 0 8px 24px rgba(0,0,0,0.14) — modals */

/* Typography primitives */
--font-family            /* Inter */
--font-size-12 / --font-size-14 / --font-size-16
--font-weight-regular (400) / --font-weight-bold (500) / --font-weight-bolder (600)
--line-height-default (1.5) / --line-height-ui (1.6)
--tracking-none / --tracking-1
```

---

## Components (components.css)

### Typography

```html
<p class="hb-text-heading">Page title (16px/500)</p>
<p class="hb-text-heading-small">Section title (14px/600)</p>
<p class="hb-text-body">Default text (14px/400)</p>
<p class="hb-text-body-bold">Emphasized text (14px/500)</p>
<p class="hb-text-caption">Small text (12px/400)</p>
<p class="hb-text-caption-bold">Small bold (12px/500)</p>
<p class="hb-text-all-caps">LABEL (12px/400/1px tracking)</p>
```

### Avatar

```html
<!-- Sizes: --sm (24px) / --md (32px, default) / --lg (40px) -->
<div class="hb-avatar hb-avatar--md">SD</div>

<!-- Custom color via CSS variable -->
<div class="hb-avatar hb-avatar--md" style="--hb-avatar-bg: var(--ui-interaction-contrast)">SD</div>

<!-- Expressive colors for team members -->
<div class="hb-avatar hb-avatar--md" style="--hb-avatar-bg: var(--ui-expressive-blue-soft); color: var(--ui-expressive-blue)">EC</div>
```

### AvatarGroup

```html
<!-- Avatars overlap automatically. Max 5 visible + overflow counter -->
<div class="hb-avatar-group">
  <div class="hb-avatar hb-avatar--md" style="--hb-avatar-bg: var(--ui-expressive-blue-soft); color: var(--ui-expressive-blue)">EC</div>
  <div class="hb-avatar hb-avatar--md" style="--hb-avatar-bg: var(--ui-expressive-brown-soft); color: var(--ui-expressive-brown)">SD</div>
  <div class="hb-avatar hb-avatar--md" style="--hb-avatar-bg: var(--ui-expressive-purple-soft); color: var(--ui-expressive-purple)">AC</div>
  <span class="hb-avatar-group__overflow">+2</span>
</div>
```

### Button

```html
<!-- Types: primary / secondary / tertiary / ghost / danger / confirmation -->
<!-- Sizes: --lg (40px, default) / --sm (32px) -->
<button class="hb-btn hb-btn--primary hb-btn--lg">Submit</button>
<button class="hb-btn hb-btn--secondary hb-btn--lg">Cancel</button>
<button class="hb-btn hb-btn--ghost hb-btn--sm">Back</button>
<button class="hb-btn hb-btn--danger hb-btn--lg">Delete</button>
<button class="hb-btn hb-btn--full-width hb-btn--primary hb-btn--lg">Full width</button>
```

### Tag

```html
<!-- Colors: grey / green / red / yellow / blue / orange / pink / brown / purple / outlined -->
<span class="hb-tag hb-tag--blue">Open</span>
<span class="hb-tag hb-tag--green">Resolved</span>
<span class="hb-tag hb-tag--grey">Submitted</span>
<span class="hb-tag hb-tag--red">Cancelled</span>

<!-- With remove button -->
<span class="hb-tag hb-tag--blue">
  Label
  <button class="hb-tag__remove" aria-label="Remove">×</button>
</span>

<!-- Group -->
<div class="hb-tag-group">
  <span class="hb-tag hb-tag--blue">Tag 1</span>
  <span class="hb-tag hb-tag--green">Tag 2</span>
</div>
```

### Form fields

```html
<!-- Always wrap fields in hb-field -->
<div class="hb-field">
  <label class="hb-field__label">Label <span class="hb-field__required">*</span></label>
  <input class="hb-input" type="text" placeholder="Enter value">
  <p class="hb-field__help">Optional help text</p>
</div>

<!-- Input modifiers: --sm (32px) / --error -->
<input class="hb-input hb-input--error" type="text">

<!-- Textarea -->
<textarea class="hb-textarea" rows="3"></textarea>

<!-- Select (wrap native select in hb-select) -->
<div class="hb-select">
  <select>
    <option value="">Select an option</option>
    <option>Option 1</option>
  </select>
</div>

<!-- Date input (wrap in hb-date-input, add calendar icon) -->
<div class="hb-date-input" style="position: relative;">
  <input type="text" class="hb-input" placeholder="MM/DD/YYYY" style="padding-right: 40px;">
  <svg class="hb-date-input__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
  </svg>
</div>

<!-- Disabled state (read-only views) -->
<input class="hb-input" disabled value="Read-only value">
<textarea class="hb-textarea" disabled>Read-only content</textarea>
```

### Checkbox

```html
<!-- Standalone -->
<label class="hb-checkbox-row">
  <input type="checkbox" class="hb-checkbox">
  <span>Option label</span>
</label>

<!-- Group -->
<div class="hb-checkbox-group">
  <span class="hb-checkbox-group__label">Group label</span>
  <label class="hb-checkbox-row">
    <input type="checkbox" class="hb-checkbox">
    <span>Option 1</span>
  </label>
</div>
```

### Radio

```html
<!-- Standalone -->
<label class="hb-radio-row">
  <input type="radio" class="hb-radio" name="group" value="yes">
  <span>Yes</span>
</label>

<!-- Group -->
<div class="hb-radio-group">
  <span class="hb-radio-group__label">Question label</span>
  <label class="hb-radio-row"><input type="radio" class="hb-radio" name="q1" value="Y"><span>Yes</span></label>
  <label class="hb-radio-row"><input type="radio" class="hb-radio" name="q1" value="N"><span>No</span></label>
  <label class="hb-radio-row"><input type="radio" class="hb-radio" name="q1" value="NA"><span>N/A</span></label>
</div>
```

### PopupSelect (dropdown multiselect)

```html
<div class="hb-popup-select">
  <div class="hb-popup-select__header">
    <span class="hb-text-heading-small" style="color: var(--ui-text-secondary)">Filter by status</span>
    <button class="hb-popup-select__clear">Clear</button>
  </div>
  <div class="hb-popup-select__list">
    <label class="hb-popup-select__option">
      <input type="checkbox" class="hb-checkbox">
      <span class="hb-popup-select__label">Open</span>
      <span class="hb-popup-select__count">3</span>
    </label>
  </div>
</div>
```

### Modal

```html
<!-- Use x-show + x-cloak with Alpine.js -->
<div class="hb-modal-overlay" @click="closeModal" @keydown.escape.window="closeModal">
  <div class="hb-modal" @click.stop>
    <div class="hb-modal__header">
      <span class="hb-modal__title">Modal title</span>
      <button class="hb-modal__close" @click="closeModal" aria-label="Close">
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
    <div class="hb-modal__body">
      <p class="hb-text-body" style="color: var(--ui-text)">Modal content goes here.</p>
    </div>
    <div class="hb-modal__footer">
      <button class="hb-btn hb-btn--ghost hb-btn--lg" @click="closeModal">Cancel</button>
      <button class="hb-btn hb-btn--primary hb-btn--lg" @click="confirm">Confirm</button>
    </div>
  </div>
</div>
```

### DatePicker (custom calendar — Alpine.js required)

Copy the `hbDatepicker(modelKey)` function from `rfi-phase1/rfi.html` (end of script).

```html
<div class="hb-field" x-data="hbDatepicker('fieldKey')" @click.outside="dpOpen = false">
  <label class="hb-field__label">Date label</label>
  <div class="hb-date-input" style="position: relative;">
    <div style="position:relative;width:100%;">
      <input type="text" class="hb-input" placeholder="MM/DD/YYYY"
        x-init="dpInit(a['fieldKey'])"
        :value="dpInputValue"
        @input="dpHandleInput($event.target.value)"
        @focus="dpOpen = true"
        style="padding-right: 40px;">
      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"
        style="position:absolute;right:12px;top:50%;transform:translateY(-50%);color:var(--ui-icon);pointer-events:none;">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
      </svg>
    </div>
    <!-- Calendar panel — copy full markup from rfi-phase1/rfi.html -->
  </div>
</div>
```

---

## Figma references

- **Nectar Design System**: https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System
