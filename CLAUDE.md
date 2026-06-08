# Hummingbird Nectar Design System

This repository contains the CSS design system for Hummingbird HTML prototypes.
It is hosted on GitHub Pages so any prototype can reference it with two lines.

## How to use in a new prototype

Add these two lines in the `<head>` of any HTML file:

```html
<link rel="stylesheet" href="https://tomimar.github.io/hb-mininectar/tokens.css">
<link rel="stylesheet" href="https://tomimar.github.io/hb-mininectar/components.css">
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

## Components

Every component has a dedicated documentation page with live examples, all variants/states, usage guidelines and best practices. Browse them in the docs site sidebar:

**Docs site:** https://tomimar.github.io/hb-mininectar/

### Foundations

| Page | Link |
|---|---|
| Colors | https://tomimar.github.io/hb-mininectar/components/colors.html |
| Spacing | https://tomimar.github.io/hb-mininectar/components/spacing.html |
| Border radius | https://tomimar.github.io/hb-mininectar/components/border-radius.html |
| Elevation | https://tomimar.github.io/hb-mininectar/components/elevation.html |
| Typography | https://tomimar.github.io/hb-mininectar/components/typography.html |

### Components

| Component | Classes | Docs |
|---|---|---|
| Avatar | `hb-avatar` (`--sm`/`--md`/`--lg`) + `hb-avatar-group` (`__overflow`) | https://tomimar.github.io/hb-mininectar/components/avatar.html |
| Button | `hb-btn` · types `--primary`/`--secondary`/`--tertiary`/`--ghost`/`--danger`/`--confirmation` · sizes `--lg`/`--sm` · `--full-width` | https://tomimar.github.io/hb-mininectar/components/button.html |
| Tag | `hb-tag` (10 colors) + `hb-tag__remove` + `hb-tag-group` | https://tomimar.github.io/hb-mininectar/components/tag.html |
| Input | `hb-field` (`__label`/`__required`/`__help`/`__error`) + `hb-input` (`--sm`/`--error`) | https://tomimar.github.io/hb-mininectar/components/input.html |
| Textarea | `hb-textarea` | https://tomimar.github.io/hb-mininectar/components/textarea.html |
| Select | `hb-select` (wraps native `<select>`) | https://tomimar.github.io/hb-mininectar/components/select.html |
| Date input | `hb-date-input` + `__icon` | https://tomimar.github.io/hb-mininectar/components/date-input.html |
| Checkbox | `hb-checkbox` + `hb-checkbox-row` + `hb-checkbox-group` | https://tomimar.github.io/hb-mininectar/components/checkbox.html |
| Radio | `hb-radio` + `hb-radio-row` + `hb-radio-group` (`--inline`) | https://tomimar.github.io/hb-mininectar/components/radio.html |
| Popup select | `hb-popup-select` (`__header`/`__clear`/`__list`/`__option`/`__label`/`__count`) | https://tomimar.github.io/hb-mininectar/components/popup-select.html |
| Modal | `hb-modal-overlay` + `hb-modal` (`__header`/`__title`/`__close`/`__body`/`__footer`) | https://tomimar.github.io/hb-mininectar/components/modal.html |

**DatePicker (interactive calendar):** use the self-contained `datepicker.js` — plain JavaScript, no Alpine.js. Add `data-hb-datepicker` to a `hb-date-input` wrapper and include the script:

```html
<div class="hb-date-input" data-hb-datepicker style="position:relative;">
  <input type="text" class="hb-input" placeholder="MM/DD/YYYY" style="padding-right:40px;">
  <svg class="hb-date-input__icon" ...><!-- calendar icon --></svg>
</div>

<script src="https://tomimar.github.io/hb-mininectar/datepicker.js"></script>
```

It auto-enhances every `[data-hb-datepicker]`: click/focus to open, type with auto-inserted slashes, month/year navigation, and a Today shortcut. Values are always `MM/DD/YYYY`. See https://tomimar.github.io/hb-mininectar/components/date-input.html

---

## Figma references

- **Nectar Design System**: https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System

---

## Creating new components on the fly

If a prototype needs a component that doesn't exist in the DS yet, follow this workflow:

### 1. Create it locally in the prototype

Add a `custom.css` file inside the prototype folder and link it **after** the DS links:

```html
<link rel="stylesheet" href="https://tomimar.github.io/hb-mininectar/tokens.css">
<link rel="stylesheet" href="https://tomimar.github.io/hb-mininectar/components.css">
<link rel="stylesheet" href="custom.css">
```

### 2. Follow DS conventions

- Name: `.hb-[component]`, `.hb-[component]__[element]`, `.hb-[component]--[modifier]`
- Always use tokens — never hardcode colors, sizes or spacing:
  - ✅ `color: var(--ui-text-secondary)`
  - ✅ `padding: var(--spacing-8) var(--spacing-16)`
  - ❌ `color: #595959`
  - ❌ `padding: 8px 16px`
- Document the component with a usage comment at the top

### 3. Validate with the designer

The designer reviews the component in the prototype. Once approved:

### 4. Add it to hb-mininectar (optional)

Copy the component CSS into `~/Documents/hb-mininectar/components.css`, then push:

```bash
cd ~/Documents/hb-mininectar
git add components.css
git commit -m "Add [component-name] component"
git push
```


---

## Figma links — Tokens

| Token | Figma |
|---|---|
| Typography | [Spec](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=6516-1461) |
| Colors | [Spec](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=6516-1821) |
| Spacing | [Spec](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=6516-1624) |
| Border Radius | [Spec](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=7032-26) |
| Elevation | [Spec](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=7096-962) |

---

## Figma links — Components

| Component | Component | Spec | Sub-components |
|---|---|---|---|
| Avatar | [Component](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=8322-4242) | [Spec](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=8322-2911) | — |
| Button | [Component](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=6565-1024) | [Spec](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=6558-1331) | — |
| Tag | [Component](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=8322-4227) | [Spec](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=7292-189) | [TagGroup](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=7603-2908) · [AddTag](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=7603-3346) |
| Checkbox | [Component](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=7680-3877) | [Spec](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=7692-440) | [CheckboxGroup](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=7692-2313) |
| Radio | [Component](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=7712-1366) | [Spec](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=7710-3808) | [RadioGroup](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=7710-3860) |
| Input | [Component](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=6704-1132) | [Spec](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=6704-1128) | — |
| Textarea | [Component](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=7680-2340) | [Spec](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=7680-3144) | — |
| Select | [Component](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=7665-4233) | [Spec](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=7665-4754) | — |
| DateInput | [Component](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=7631-193) | [Spec](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=7631-3471) | [DatePicker](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=7631-4106) |
| PopupSelect | [Component](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=8131-4945) | [Spec](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=8131-817) | — |
| Modal | [Component](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=8351-680) | [Spec](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=8322-5572) | — |
