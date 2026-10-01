Navigation to another place — a case, an entity, a document, an external source.

## Types

| Type | Class | Looks like | Use for |
|---|---|---|---|
| Default | `hb-link` | Underlined, `ui-interaction-link`. | Most contexts. |
| Subtle | `--subtle` | `ui-text-tertiary`, underline only on hover. | Links inside dense data, where a field of blue would be noise. |
| Reverse | `--reverse` | Underlined, `ui-text-knockout`. | Dark or colored backgrounds only. |

```html preview
<a href="#" class="hb-link">View case CASE-10482</a>
<a href="#" class="hb-link hb-link--subtle">Acme Holdings Ltd</a>
<!-- The dark ground is only for the example -->
<span style="display: inline-flex; padding: var(--spacing-8) var(--spacing-12); background: var(--ui-text); border-radius: var(--border-radius-8);">
  <a href="#" class="hb-link hb-link--reverse">View alert ALR-2291</a>
</span>
```

`ui-interaction-link` is darker than `ui-interaction`, so link text clears 4.5:1 on `ui-bg`.

## States

| State | Trigger | What changes |
|---|---|---|
| Hover | `:hover` | Underline removed (subtle: underline added). |
| Focus | `:focus-visible` | 2px `ui-interaction` ring. |
| Disabled | `--disabled` | Muted, no underline, not clickable. Removes the target but keeps the text readable. |

```html preview
<a href="#" class="hb-link">Default</a>
<!-- Hover and focus are forced here so you can see them -->
<a href="#" class="hb-link" style="text-decoration: none;">Hover</a>
<a href="#" class="hb-link" style="text-decoration: none; outline: 2px solid var(--ui-interaction); outline-offset: 2px; border-radius: var(--border-radius-4);">Focus</a>
<a class="hb-link hb-link--disabled">Disabled</a>
```

## Structure

- Always an `<a>` with a real `href`.
- A link that leaves the product takes a trailing `hb-link__icon` (12×12px) with `open_in_new`.
- Inside a table, the primary cell link also takes `hb-table__link`.

## Writing the label

- Descriptive, and makes sense on its own: "View case CASE-10482", "Open OFAC sanctions list".
- For a link that leaves the product, the text says where it goes.
- Never "Click here" or "Read more".

## When to use

- Use a link to navigate. If it does not navigate, it is a Button.
- Use a button for primary or high-importance actions.

## Do

- Use Default in most contexts; Subtle when the link competes with key content.
- Keep one variant within a component unless there is a clear reason.

## Don't

- Don't style a button as a link to make it quieter.
- Don't add icons unless they communicate something concrete, like leaving the product.

## Example

```html preview
<a href="#" class="hb-link">View case CASE-10482</a>

<a href="https://sanctionssearch.ofac.treas.gov" class="hb-link" target="_blank">
  Open OFAC sanctions search
  <svg class="hb-link__icon" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5h5v5M19 5l-7 7M10 5H5v14h14v-5"/></svg><!-- open_in_new -->
</a>
```

In a table cell:

```html
<td><a href="/entities/883" class="hb-link hb-table__link">Acme Holdings Ltd</a></td>
```
