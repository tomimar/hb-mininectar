Material Icons, written as a ligature name in the element's text.

## Structure

Put the icon name (snake_case) as the text of a `<span class="hb-icon">`. The fonts load with `tokens.css`; no extra `<link>` needed.

```html
<span class="hb-icon">edit</span>
```

- Names come from the Material Icons set (mui.com/material-ui/material-icons): `edit`, `more_vert`, `delete`, `check_circle`.
- MUI's `EditIcon` is `edit`; `MoreVertIcon` is `more_vert`; `CalendarTodayIcon` is `calendar_today`.

## Variants

| Variant | Class | Use for |
|---|---|---|
| Outlined | `hb-icon` (default) | Everywhere. |
| Rounded | `hb-icon--rounded` | Prominent actions and important menus. |

## Sizes

| Size | Class | Use for |
|---|---|---|
| 16px | `hb-icon--sm` | Dense controls, small buttons, table rows. |
| 20px | — (default) | Inline UI. |
| 24px | `hb-icon--lg` | Standalone or prominent icons. |

## Color

- Default: `ui-icon`.
- Inside `hb-btn` or `hb-link` it inherits the control's color. Don't override it there.
- To force another color, set `color` inline from a token.

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

```html
<button class="hb-btn hb-btn--secondary">
  <span class="hb-icon">download</span> Export alerts
</button>
<button class="hb-btn hb-btn--ghost" aria-label="More actions for AML review">
  <span class="hb-icon hb-icon--rounded">more_vert</span>
</button>
<span class="hb-icon hb-icon--sm" style="color: var(--ui-status-success)">check_circle</span> Cleared
```
