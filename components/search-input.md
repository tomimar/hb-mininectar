A text field dedicated to filtering a list, table or menu.

## Sizes

| Size | Class | Height | Use for |
|---|---|---|---|
| Large | (default) | 40px | Page-level, table and primary search. |
| Small | `--sm` | 32px | Table toolbars, compact filters, dense layouts. |

Default width is 320px. Override it with a style when the container demands.

## Structure

```html
<div class="hb-search">
  <svg class="hb-search__icon" aria-hidden="true">…</svg>
  <input class="hb-search__input" type="text" placeholder="Search alerts…" aria-label="Search alerts">
  <button class="hb-search__clear" type="button" aria-label="Clear search">…</button>
</div>
```

- `hb-search__icon` leads; `hb-search__input` holds the query.
- `hb-search__clear` appears only while the field has a value, and always has an `aria-label`.

## States

Handled by CSS on the wrapper:

| State | Trigger | What changes |
|---|---|---|
| Empty | Resting | Placeholder in `ui-disabled`, `ui-border-secondary` border. |
| Hover | `:hover` | Border darkens to `ui-text`. |
| Focus | `:focus-within` | `ui-interaction` border plus a 2px `ui-interaction-soft` ring. |
| Filled | The input has a value | Value in `ui-text`; the clear button appears. |
| Disabled | `disabled` on the input (or `hb-search--disabled` on the wrapper) | `ui-bg-tertiary` background, muted icon and text. |

## Writing the placeholder

- The placeholder names the scope being searched: "Search alerts…", "Search entities…".
- It is the only guidance. A Search has no `hb-field` label and no helper text.

## What the consumer owns

- The placeholder and the filtering itself.
- Filter as the analyst types. Don't wait for Enter.

## When to use

- Use it to narrow a list, table or menu that is already on screen.
- A query that has to be submitted is an Input plus a Button.
- Validated, required or stored data (dates, amounts, IDs in a form) goes in an Input.

## Do

- Put it directly above the thing it filters.
- Keep the result count visible nearby.
- Show the clear button so the query can be reset in one click.

## Don't

- Don't use it as a form field.
- Don't add a label or helper text.
- Don't overload it with extra icons or actions.

## Example

```html
<div class="hb-search hb-search--sm">
  <svg class="hb-search__icon" aria-hidden="true">…</svg>
  <input class="hb-search__input" type="text" placeholder="Search cases…" aria-label="Search cases" value="Meridian">
  <button class="hb-search__clear" type="button" aria-label="Clear search">…</button>
</div>
<span>12 of 348 cases</span>
```
