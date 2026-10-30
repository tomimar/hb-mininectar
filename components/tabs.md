Page tabs switch between sibling views of the same page, like Requests and Analytics, and sit right under the page header.

## Size

One size:

| Element | Size |
|---|---|
| Tab height | 36px |
| Gap between tabs | `spacing-24` |
| Text | `font-size-14`, regular |
| Selected underline | 2px, `ui-interaction` |
| List divider | 1px, `ui-border` |
| Title to tabs | `spacing-8` |
| Inset | `--hb-tabs-inset`, 0 by default. Set it to 24px inside a white page surface so the first tab lines up with the page title. |

## Structure

Tabs that swap content on the same page are buttons in an `hb-tabs` tablist, each linked to its panel with `aria-controls`. `hb.js` selects a tab on click, moves between tabs with the Arrow keys, Home and End, and shows the linked panel (`hidden` on the others).

```html preview
<div class="hb-tabs" role="tablist" aria-label="Requests views">
  <button class="hb-tabs__tab" role="tab" id="tab-list" aria-controls="panel-list" aria-selected="true">Requests</button>
  <button class="hb-tabs__tab" role="tab" id="tab-analytics" aria-controls="panel-analytics" aria-selected="false" tabindex="-1">Analytics</button>
</div>
<div id="panel-list" role="tabpanel" aria-labelledby="tab-list" style="padding-top: var(--spacing-16);">32 open requests across 18 cases.</div>
<div id="panel-analytics" role="tabpanel" aria-labelledby="tab-analytics" style="padding-top: var(--spacing-16);" hidden>Median response time: 3 days.</div>
```

Tabs that change the URL are links in a `nav`. Mark the current one with `aria-current="page"`. They need no script.

```html preview
<nav class="hb-tabs" aria-label="Automations">
  <a class="hb-tabs__tab" href="#" aria-current="page">Automations</a>
  <a class="hb-tabs__tab" href="#">Run history</a>
</nav>
```

A tab can show a count with `hb-tabs__count`.

```html preview
<div class="hb-tabs" role="tablist" aria-label="Case alerts">
  <button class="hb-tabs__tab" role="tab" aria-selected="true">Open <span class="hb-tabs__count">12</span></button>
  <button class="hb-tabs__tab" role="tab" aria-selected="false" tabindex="-1">Dispositioned <span class="hb-tabs__count">48</span></button>
</div>
```

## States

Handled by CSS:

| State | Trigger | Look |
|---|---|---|
| Default | Resting | `ui-text-secondary` |
| Hover | Pointer over | `ui-text` |
| Selected | `aria-selected="true"` or `aria-current="page"` | `ui-interaction` text and 2px underline |
| Focus | Keyboard focus | 2px `ui-interaction` ring inside the tab |
| Disabled | `disabled` or `aria-disabled="true"` | `ui-text-tertiary`, not clickable |

```html preview
<div class="hb-tabs" role="tablist" aria-label="Case views">
  <button class="hb-tabs__tab" role="tab" aria-selected="true">Overview</button>
  <button class="hb-tabs__tab" role="tab" aria-selected="false" tabindex="-1">Transactions</button>
  <button class="hb-tabs__tab" role="tab" aria-selected="false" tabindex="-1" disabled>Filing</button>
</div>
```

If a tab is disabled, say why nearby (for example, "Filing opens once the case is approved").

## Writing the label

- One or two words, in sentence case.
- Name the view, not the action: "Analytics", not "See analytics".
- Keep the same order every time the page opens.

## When to use

| Use | When |
|---|---|
| Tabs | 2 to 6 sibling views of one page that share the same header. |
| View dropdown or filters | The views are the same table with different rows. |
| Sidenav | Many sections, or sections with sub-sections. |
| Stepper | Steps in a flow that must be done in order. |

Closable, browser-like document tabs are a different pattern and are not part of this component.

## Do

- Place the tabs right under the page title, inside the same surface.
- Keep one tab selected at all times.
- Keep the selected tab when the person comes back to the page.

## Don't

- Don't nest tabs inside tabs.
- Don't put actions in the tab list.
- Don't rely on tabs on touch-first screens without more height: 36px is below the 44px touch target.

## Example

```html preview
<div style="background: var(--ui-bg); border: 1px solid var(--ui-border); border-radius: var(--border-radius-8);">
  <div style="padding: var(--spacing-16) var(--spacing-24) 0;">
    <h1 class="hb-text-heading" style="margin: 0;">Requests</h1>
  </div>
  <div class="hb-tabs" role="tablist" aria-label="Requests views" style="--hb-tabs-inset: 24px; margin-top: var(--spacing-8);">
    <button class="hb-tabs__tab" role="tab" aria-selected="true">Requests</button>
    <button class="hb-tabs__tab" role="tab" aria-selected="false" tabindex="-1">Analytics</button>
  </div>
  <div style="padding: var(--spacing-16) var(--spacing-24);">32 open requests across 18 cases.</div>
</div>
```
