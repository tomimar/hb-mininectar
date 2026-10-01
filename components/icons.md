Material Icons, written as a ligature name in the element's text.

## Structure

Put the icon name (snake_case) as the text of a `<span class="hb-icon">`. The fonts load with `tokens.css`; no extra `<link>` needed.

```html
<span class="hb-icon">edit</span>
```

- Names come from the Material Icons set (mui.com/material-ui/material-icons): `edit`, `more_vert`, `delete`, `check_circle`.
- MUI's `EditIcon` is `edit`; `MoreVertIcon` is `more_vert`; `CalendarTodayIcon` is `calendar_today`.

Icons the product uses most:

```html preview
<span class="hb-icon hb-icon--lg">search</span>
<span class="hb-icon hb-icon--lg">filter_list</span>
<span class="hb-icon hb-icon--lg">add</span>
<span class="hb-icon hb-icon--lg">edit</span>
<span class="hb-icon hb-icon--lg">delete</span>
<span class="hb-icon hb-icon--lg">close</span>
<span class="hb-icon hb-icon--lg">check</span>
<span class="hb-icon hb-icon--lg">more_vert</span>
<span class="hb-icon hb-icon--lg">chevron_right</span>
<span class="hb-icon hb-icon--lg">expand_more</span>
<span class="hb-icon hb-icon--lg">download</span>
<span class="hb-icon hb-icon--lg">open_in_new</span>
<span class="hb-icon hb-icon--lg">visibility</span>
<span class="hb-icon hb-icon--lg">flag</span>
<span class="hb-icon hb-icon--lg">info</span>
<span class="hb-icon hb-icon--lg">warning</span>
<span class="hb-icon hb-icon--lg">error</span>
<span class="hb-icon hb-icon--lg">check_circle</span>
<span class="hb-icon hb-icon--lg">person</span>
<span class="hb-icon hb-icon--lg">account_balance</span>
<span class="hb-icon hb-icon--lg">calendar_today</span>
<span class="hb-icon hb-icon--lg">notifications</span>
<span class="hb-icon hb-icon--lg">settings</span>
```

## Variants

| Variant | Class | Use for |
|---|---|---|
| Outlined | `hb-icon` (default) | Everywhere. |
| Rounded | `hb-icon--rounded` | Prominent actions and important menus. |

```html preview
<span class="hb-icon hb-icon--lg">flag</span>
<span class="hb-icon hb-icon--lg">notifications</span>
<span class="hb-icon hb-icon--lg">more_vert</span>
<span class="hb-icon hb-icon--lg hb-icon--rounded">flag</span>
<span class="hb-icon hb-icon--lg hb-icon--rounded">notifications</span>
<span class="hb-icon hb-icon--lg hb-icon--rounded">more_vert</span>
```

## Sizes

| Size | Class | Use for |
|---|---|---|
| 16px | `hb-icon--sm` | Dense controls, small buttons, table rows. |
| 20px | — (default) | Inline UI. |
| 24px | `hb-icon--lg` | Standalone or prominent icons. |

```html preview
<span class="hb-icon hb-icon--sm">flag</span>
<span class="hb-icon">flag</span>
<span class="hb-icon hb-icon--lg">flag</span>
```

## Color

- Default: `ui-icon`.
- Inside `hb-btn`, `hb-link`, `hb-fab`, `hb-tag`, `hb-alert` or `hb-toast` it inherits the component's color. Don't override it there.
- To force another color, set `color` inline from a token.

```html preview
<span class="hb-icon hb-icon--lg">info</span>
<button class="hb-btn hb-btn--primary hb-btn--lg"><span class="hb-icon">check</span> Approve</button>
<a href="#" class="hb-link">Download SAR <span class="hb-icon hb-icon--sm">download</span></a>
<span class="hb-icon hb-icon--lg" style="color: var(--ui-status-danger);">error</span>
```

## Do

- Use names from the Material Icons catalog so prototypes share one set.
- Pick icons with widely understood meanings (trash for delete, pencil for edit). If it needs a caption to be understood, use a text label instead.
- Give every icon-only control an `aria-label` that names the object: "More actions for AML review", not "More".
- Pair a status icon with a word.

## Don't

- Don't paste raw SVG or mix in other icon sets when the concept exists in Material Icons.
- Don't mix Outlined and Rounded in the same group of controls.
- Don't hardcode a pixel size or hex color. Use the size modifiers and tokens.
- Don't use an icon as the only label of a control without an `aria-label`.
- Don't let an icon carry a status on its own.

## Example

```html preview
<button class="hb-btn hb-btn--secondary hb-btn--lg">
  <span class="hb-icon">download</span> Export alerts
</button>
<button class="hb-btn hb-btn--ghost hb-btn--lg" aria-label="More actions for AML review">
  <span class="hb-icon hb-icon--rounded">more_vert</span>
</button>
<span style="display: inline-flex; align-items: center; gap: var(--spacing-4);">
  <span class="hb-icon hb-icon--sm" style="color: var(--ui-status-success)">check_circle</span> Cleared
</span>
```
