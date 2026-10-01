A text field dedicated to filtering a list, table or menu.

## Sizes

| Size | Class | Height | Use for |
|---|---|---|---|
| Large | (default) | 40px | Page-level, table and primary search. |
| Small | `--sm` | 32px | Table toolbars, compact filters, dense layouts. |

Default width is 320px. Override it with a style when the container demands.

```html preview
<div style="display: flex; flex-direction: column; gap: var(--spacing-16);">
  <div class="hb-search">
    <svg class="hb-search__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"/></svg>
    <input class="hb-search__input" type="text" placeholder="Search alerts…" aria-label="Search alerts">
  </div>
  <div class="hb-search hb-search--sm">
    <svg class="hb-search__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"/></svg>
    <input class="hb-search__input" type="text" placeholder="Search transactions…" aria-label="Search transactions">
  </div>
</div>
```

## Structure

```html preview
<div class="hb-search">
  <svg class="hb-search__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"/></svg>
  <input class="hb-search__input" type="text" placeholder="Search alerts…" aria-label="Search alerts" value="Structuring">
  <button class="hb-search__clear" type="button" aria-label="Clear search"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>
</div>
```

- `hb-search__icon` leads; `hb-search__input` holds the query.
- Always include `hb-search__clear` (with an `aria-label`) and a placeholder on the input: CSS shows the button only while the field has a value, and `hb.js` empties the field — and puts focus back in it — when it's clicked.

## States

Handled by CSS on the wrapper:

| State | Trigger | What changes |
|---|---|---|
| Empty | Resting | Placeholder in `ui-disabled`, `ui-border-secondary` border. |
| Hover | `:hover` | Border darkens to `ui-text`. |
| Focus | `:focus-within` | `ui-interaction` border plus a 2px `ui-interaction-soft` halo. |
| Filled | The input has a value | Value in `ui-text`; the clear button appears. |
| Disabled | `disabled` on the input (or `hb-search--disabled` on the wrapper) | `ui-bg-tertiary` background, muted icon and text. |

```html preview
<div style="display: flex; flex-direction: column; gap: var(--spacing-16);">
  <div class="hb-search">
    <svg class="hb-search__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"/></svg>
    <input class="hb-search__input" type="text" placeholder="Search entities…" aria-label="Search entities (empty)">
  </div>
  <!-- Hover and focus are forced here so you can see them -->
  <div class="hb-search" style="border-color: var(--ui-text);">
    <svg class="hb-search__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"/></svg>
    <input class="hb-search__input" type="text" placeholder="Search entities…" aria-label="Search entities (hover)">
  </div>
  <div class="hb-search" style="border-color: var(--ui-interaction); box-shadow: 0 0 0 2px var(--ui-interaction-soft);">
    <svg class="hb-search__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"/></svg>
    <input class="hb-search__input" type="text" aria-label="Search entities (focus)" value="Meridian">
    <button class="hb-search__clear" type="button" aria-label="Clear search"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>
  </div>
  <div class="hb-search">
    <svg class="hb-search__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"/></svg>
    <input class="hb-search__input" type="text" aria-label="Search entities (filled)" value="Barclays">
    <button class="hb-search__clear" type="button" aria-label="Clear search"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>
  </div>
  <div class="hb-search">
    <svg class="hb-search__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"/></svg>
    <input class="hb-search__input" type="text" placeholder="Search entities…" aria-label="Search entities (disabled)" disabled>
  </div>
</div>
```

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

```html preview
<div style="display: flex; align-items: center; gap: var(--spacing-12); flex-wrap: wrap;">
  <div class="hb-search hb-search--sm">
    <svg class="hb-search__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"/></svg>
    <input class="hb-search__input" type="text" placeholder="Search cases…" aria-label="Search cases" value="Meridian">
    <button class="hb-search__clear" type="button" aria-label="Clear search"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>
  </div>
  <span class="hb-text-caption" style="color: var(--ui-text-secondary);">12 of 348 cases</span>
</div>
```
