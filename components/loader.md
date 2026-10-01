Indeterminate progress, for waits the product cannot measure.

## Types

| Type | Class | Looks like | Use for |
|---|---|---|---|
| Circular | `--circular` | 20px spinner. | Component-level loading: inside the panel, card or button that is loading. |
| Linear | `--linear` | Full-width 4px bar. | Page- or section-level loading, at the top of the region it describes. |

`--contrast` is the circular loader on a dark or saturated background, e.g. a loading Toast.

## When to use

- Use it for waits of about 300ms or more. Shorter waits cause flicker.
- For a table, prefer skeleton rows over replacing the table with a spinner.
- For a background task the analyst started, pair it with a loading Toast (`hb-toast--loading`).

## Do

- Keep the surrounding layout in place while it runs, so nothing jumps when the data arrives.
- Remove the loader as soon as the content is ready.

## Don't

- Don't put a linear loader inside a button or small element.
- Don't use a circular loader as a full-page loader.
- Don't show two loaders on one screen, or both types for the same action.

## Accessibility

- The loader is decorative.
- Put the accessible state on the surrounding region: `aria-busy` or `aria-live`.

## Example

```html
<section aria-busy="true" aria-label="Case alerts">
  <div class="hb-loader hb-loader--linear"></div>
  <!-- existing alert table stays in place -->
</section>

<span class="hb-loader hb-loader--circular"></span>
```
