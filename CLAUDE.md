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

/* Icon sizes — Material Icons via hb-icon */
--icon-size-sm           /* 16px — dense controls */
--icon-size-md           /* 20px — default */
--icon-size-lg           /* 24px — prominent / standalone */

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
| Icons | https://tomimar.github.io/hb-mininectar/components/icons.html |

### Components

| Component | Classes | Docs |
|---|---|---|
| Avatar | `hb-avatar` (`--sm`/`--md`/`--lg`/`--muted`) + `hb-avatar-group` (`__overflow`) | https://tomimar.github.io/hb-mininectar/components/avatar.html |
| Button | `hb-btn` · types `--primary`/`--secondary`/`--tertiary`/`--ghost`/`--danger`/`--confirmation` · sizes `--lg`/`--sm` · `--full-width` | https://tomimar.github.io/hb-mininectar/components/button.html |
| Floating action | `hb-fab` · types `--primary`/`--secondary` · sizes default/`--sm` · `--icon`/`--selected` + `hb-fab__icon` | https://tomimar.github.io/hb-mininectar/components/floating-action.html |
| Tag | `hb-tag` (10 colors) + `hb-tag__remove` + `hb-tag-group` | https://tomimar.github.io/hb-mininectar/components/tag.html |
| Input | `hb-field` (`__label`/`__required`/`__help`/`__error`) + `hb-input` (`--sm`/`--error`) | https://tomimar.github.io/hb-mininectar/components/input.html |
| Search input | `hb-search` (`--sm`) + `hb-search__icon`/`__input`/`__clear` | https://tomimar.github.io/hb-mininectar/components/search-input.html |
| Textarea | `hb-textarea` | https://tomimar.github.io/hb-mininectar/components/textarea.html |
| Select | `hb-select` (wraps native `<select>`) · multi variant `hb-multiselect` (`__control`/`__tag`/`__tag-remove`/`__input`/`__chevron`/`__menu`/`__option`/`__empty`, `--sm`/`--disabled`) | https://tomimar.github.io/hb-mininectar/components/select.html |
| Date input | `hb-date-input` + `__icon` | https://tomimar.github.io/hb-mininectar/components/date-input.html |
| Checkbox | `hb-checkbox` + `hb-checkbox-row` + `hb-checkbox-group` (`--inline`) | https://tomimar.github.io/hb-mininectar/components/checkbox.html |
| Radio | `hb-radio` + `hb-radio-row` + `hb-radio-group` (`--inline`) | https://tomimar.github.io/hb-mininectar/components/radio.html |
| Toggle | `hb-toggle` + `hb-toggle__input`/`__track`/`__thumb`/`__label` | https://tomimar.github.io/hb-mininectar/components/toggle.html |
| Table | `hb-table` (compact by default · `--plain`/`--comfortable`/`--row-link`/`--resizable`) + `hb-table-wrap`/`__caption`/`__rowheader`/`__link` (use with `hb-link`)/`__select-col`/`__actions`/`__cell--num`/`__expander`/`__detail-row`/`__overflow`/`__menu`/`__menu-item`/`__resizer`/`__footer`/`__footer-group`/`__footer-label`/`__pagination`/`__page-info` + `hb-visually-hidden`. Accessible column reorder/hide via `hb-column-manager` (`__panel`(`--end`)/`__group`/`__header`/`__title`/`__list`/`__item`/`__drag`/`__toggle`/`__name`/`__move`/`__move-btn`/`__spacer`/`__empty`) — Visible/Hidden groups, single-pointer alternatives to dragging (WCAG 2.5.7). The Columns panel reuses the shared **Drag** component. | https://tomimar.github.io/hb-mininectar/components/table.html |
| Drag (reorderable list) | `hb-drag` (`--inline`) + `hb-drag__item`(`.is-dragging`/`.is-drop-target`)/`__handle`/`__content`/`__move`/`__move-btn`/`__nested`. Pair with the `hbReorder()` Alpine factory in `drag.js` (spread into `x-data`); shared polite live region `#hb-live-region`. Panel variant (buttons always visible) + inline variant (reveal on hover/focus); supports nested lists. Single-pointer alternative to dragging (WCAG 2.5.7) | https://tomimar.github.io/hb-mininectar/components/drag.html |
| Sidenav | `hb-sidenav` + `__header`/`__title`/`__toggle`/`__section`/`__group`/`__item`(`--active`/`--expandable`/`--disabled`)/`__icon`/`__label`/`__count`(`--start`)/`__chevron`/`__submenu`/`__subitem`(`--active`). In-page section navigation with icons, counts and one level of submenu. Collapses to an icon rail (`is-collapsed`) or hides entirely (`is-hidden`) to give width back to tables; width via `--hb-sidenav-width` / `--hb-sidenav-rail-width` | https://tomimar.github.io/hb-mininectar/components/sidenav.html |
| Popup select | `hb-popup-select` (`__header`/`__clear`/`__list`/`__option`/`__label`/`__count`) | https://tomimar.github.io/hb-mininectar/components/popup-select.html |
| Link | `hb-link` (`--subtle`/`--reverse`/`--disabled`) + `hb-link__icon` | https://tomimar.github.io/hb-mininectar/components/link.html |
| Modal | `hb-modal-overlay` + `hb-modal` (`__header`/`__title`/`__close`/`__body`/`__footer`) | https://tomimar.github.io/hb-mininectar/components/modal.html |
| Tooltip | `hb-tooltip` + `hb-tooltip__content` (`--top`/`--left`/`--right`) | https://tomimar.github.io/hb-mininectar/components/tooltip.html |
| Alert | `hb-alert` (`--info`/`--success`/`--warning`/`--error`) + `hb-alert__icon`/`__content`/`__link`/`__dismiss` | https://tomimar.github.io/hb-mininectar/components/alert.html |
| Toast | `hb-toast` (`--info`/`--success`/`--warning`/`--error`/`--loading`) + `hb-toast__icon`/`__content`/`__action`/`__dismiss` | https://tomimar.github.io/hb-mininectar/components/toast.html |
| Loader | `hb-loader` (`--circular`/`--linear`/`--contrast`) | https://tomimar.github.io/hb-mininectar/components/loader.html |

**DatePicker (interactive calendar):** use the self-contained `datepicker.js` — plain JavaScript, no Alpine.js. Add `data-hb-datepicker` to a `hb-date-input` wrapper and include the script:

```html
<div class="hb-date-input" data-hb-datepicker style="position:relative;">
  <input type="text" class="hb-input" placeholder="MM/DD/YYYY" style="padding-right:40px;">
  <svg class="hb-date-input__icon" ...><!-- calendar icon --></svg>
</div>

<script src="https://tomimar.github.io/hb-mininectar/datepicker.js"></script>
```

It auto-enhances every `[data-hb-datepicker]`: click/focus to open, type with auto-inserted slashes, month/year navigation, and a Today shortcut. Values are always `MM/DD/YYYY`. See https://tomimar.github.io/hb-mininectar/components/date-input.html

**Drag (reorderable list):** the `hb-drag` component pairs with `drag.js`, which exposes an Alpine factory. Spread it into a component's `x-data` and give it an array to reorder:

```html
<script src="https://tomimar.github.io/hb-mininectar/drag.js"></script>

<ul class="hb-drag" x-data="Object.assign({ items: [...] }, hbReorder())">
  <!-- hb-drag__item rows with a handle, content and Up/Down buttons -->
</ul>
```

`hbReorder()` provides `reorderMove(item, dir, list)`, `reorderDrop(item, list)`, drag handlers and `reorderCanUp/Down`. Pass each list its own array (nested lists reorder independently). Announcements go through the shared `#hb-live-region`. See https://tomimar.github.io/hb-mininectar/components/drag.html

---

## Figma references

- **Nectar Design System**: https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System

---

## Adding or promoting components

To add a new component to Mini Nectar, or to promote a prototype's custom component into the design system, use the **`add-component`** skill — it covers the full checklist (implement in `components.css` with tokens, docs page, sidebar registration, CLAUDE.md links, Notion sync, commit) and building components on the fly in a prototype's `custom.css`.

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
| FloatingAction | [Component](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=7712-4455) | [Spec](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=7712-6395) | — |
| SearchInput | [Component](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=7628-1750) | [Spec](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=7628-1949) | — |
| Tag | [Component](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=8322-4227) | [Spec](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=7292-189) | [TagGroup](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=7603-2908) · [AddTag](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=7603-3346) |
| Checkbox | [Component](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=7680-3877) | [Spec](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=7692-440) | [CheckboxGroup](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=7692-2313) |
| Radio | [Component](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=7712-1366) | [Spec](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=7710-3808) | [RadioGroup](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=7710-3860) |
| Input | [Component](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=6704-1132) | [Spec](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=6704-1128) | — |
| Textarea | [Component](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=7680-2340) | [Spec](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=7680-3144) | — |
| Select | [Component](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=7665-4233) | [Spec](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=7665-4754) | — |
| DateInput | [Component](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=7631-193) | [Spec](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=7631-3471) | [DatePicker](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=7631-4106) |
| PopupSelect | [Component](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=8131-4945) | [Spec](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=8131-817) | — |
| Modal | [Component](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=8351-680) | [Spec](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=8322-5572) | — |
| Toggle | [Component](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=8058-2755) | [Spec](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=8052-370) | — |
| Link | [Component](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=8131-1945) | [Spec](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=7745-1944) | — |
| Tooltip | [Component](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=8169-1944) | [Spec](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=8169-718) | — |
| Alert | [Component](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=8174-1659) | [Spec](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=8174-1273) | — |
| Toast | [Component](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=8262-1917) | [Spec](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=8239-3395) | — |
| Loader | [Component](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=8262-2332) | [Spec](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=8262-1960) | — |
| Sidenav (SectionSidebar) | [Component](https://www.figma.com/design/39uAofuoRFGDFCVOyD9Wby/Nectar-Design-System?node-id=4605-5089) | — | — |
