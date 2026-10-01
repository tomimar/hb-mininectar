Navigation to another place — a case, an entity, a document, an external source.

## Types

| Type | Class | Looks like | Use for |
|---|---|---|---|
| Default | `hb-link` | Underlined, `ui-interaction-link`. | Most contexts. |
| Subtle | `--subtle` | `ui-text-tertiary`, underline only on hover. | Links inside dense data, where a field of blue would be noise. |
| Reverse | `--reverse` | Underlined, `ui-text-knockout`. | Dark or colored backgrounds only. |

`ui-interaction-link` is darker than `ui-interaction`, so link text clears 4.5:1 on `ui-bg`.

## States

| State | Trigger | What changes |
|---|---|---|
| Hover | `:hover` | Underline removed (subtle: underline added). |
| Focus | `:focus-visible` | 2px `ui-interaction-soft` ring. |
| Disabled | `--disabled` | Muted, no underline, not clickable. Removes the target but keeps the text readable. |

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

```html
<a href="/cases/10482" class="hb-link">View case CASE-10482</a>

<a href="https://sanctionssearch.ofac.treas.gov" class="hb-link" target="_blank">
  Open OFAC sanctions search
  <svg class="hb-link__icon" aria-hidden="true">…</svg><!-- open_in_new -->
</a>

<td><a href="/entities/883" class="hb-link hb-table__link">Acme Holdings Ltd</a></td>
```
