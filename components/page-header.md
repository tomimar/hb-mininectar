The top of the paper: what the page is (title, status tags), where it sits when it is not a top-level page (breadcrumbs) and what you can do with it (actions), with optional tabs underneath.

## Structure

```html
<header class="hb-page-header">
  <div class="hb-page-header__bar">
    <div class="hb-page-header__heading">
      <nav class="hb-breadcrumbs" aria-label="Breadcrumb">
        <ol><li><a href="#">Section</a></li><li><a href="#">Parent page</a></li></ol>
      </nav>
      <h1 class="hb-page-header__title">Page title</h1>
      <div class="hb-page-header__tags">…</div>
    </div>
    <div class="hb-page-header__actions">…</div>
  </div>
  <div class="hb-tabs" role="tablist">…</div>   <!-- optional -->
</header>
```

- It is always the first child of `hb-paper`, full width, with a 1px `ui-border` line under it.
- `hb-page-header__bar` is one row: the heading on the left, the actions on the right. 16px top and bottom, 24px sides.
- `hb-page-header__title` is the page's `<h1>`: `font-size-16`, bold. It truncates on one line; it never wraps.
- Everything but the title is optional.

| Element | Class | Notes |
|---|---|---|
| Breadcrumbs | `hb-breadcrumbs` | Optional. The page's ancestors, before the title. |
| Title | `hb-page-header__title` | The `<h1>`. The current page; never a link. |
| Tags | `hb-page-header__tags` | Status or classification of what the page shows, right of the title. |
| Actions | `hb-page-header__actions` | Buttons for the whole page, pushed right. |
| Tabs | `hb-tabs` | Sibling views of the page, under the bar. The header drops its own line; the tabs bring one. |
| Icon | `hb-page-header__icon` | Optional. A section's icon on its main page, or a record's type. 40px circle. |
| Subtitle | `hb-page-header__subtitle` | Record pages only. One line of caption under the title. |

## Title

The title alone is the simplest header, for a page that needs no more.

```html preview
<div class="hb-paper">
  <header class="hb-page-header">
    <div class="hb-page-header__bar">
      <div class="hb-page-header__heading">
        <h1 class="hb-page-header__title">Page title</h1>
      </div>
    </div>
  </header>
</div>
```

## Section icon

The main page of a section (Requests, Inbox, Cases) repeats the section's icon from the global nav before its title, so it reads as the place the nav took you.

```html preview
<div class="hb-paper">
  <header class="hb-page-header">
    <div class="hb-page-header__bar">
      <div class="hb-page-header__heading">
        <span class="hb-page-header__icon" aria-hidden="true"><span class="hb-icon">forward_to_inbox</span></span>
        <h1 class="hb-page-header__title">Requests</h1>
      </div>
    </div>
  </header>
</div>
```

- The icon is the same one the global nav shows for that section, and it is decorative (`aria-hidden`).
- Only on a section's main page. A page further down uses breadcrumbs instead.

## Breadcrumbs

When a page sits under another one, breadcrumbs list where it lives, from the top section down; the title is the page itself. A slash follows each crumb, so the title reads as the last step.

```html preview
<div class="hb-paper">
  <header class="hb-page-header">
    <div class="hb-page-header__bar">
      <div class="hb-page-header__heading">
        <nav class="hb-breadcrumbs" aria-label="Breadcrumb"><ol><li><a href="#">Section</a></li><li><a href="#">Parent page</a></li></ol></nav>
        <h1 class="hb-page-header__title">Page title</h1>
      </div>
    </div>
  </header>
</div>
```

- Every crumb is a link. The current page is the title, not a crumb.
- Leave them out on a top-level page: the title is enough.
- Use the same names as the global nav and the pages they lead to.

## Tags and actions

```html preview
<div class="hb-paper">
  <header class="hb-page-header">
    <div class="hb-page-header__bar">
      <div class="hb-page-header__heading">
        <nav class="hb-breadcrumbs" aria-label="Breadcrumb"><ol><li><a href="#">Section</a></li><li><a href="#">Parent page</a></li></ol></nav>
        <h1 class="hb-page-header__title">Page title</h1>
        <div class="hb-page-header__tags"><span class="hb-tag hb-tag--blue">Status</span></div>
      </div>
      <div class="hb-page-header__actions">
        <button type="button" class="hb-btn hb-btn--ghost hb-btn--sm" aria-label="Undo"><span class="hb-icon" aria-hidden="true">undo</span></button>
        <button type="button" class="hb-btn hb-btn--ghost hb-btn--sm" aria-label="Redo"><span class="hb-icon" aria-hidden="true">redo</span></button>
        <button type="button" class="hb-btn hb-btn--secondary hb-btn--lg">Secondary action</button>
        <button type="button" class="hb-btn hb-btn--primary hb-btn--lg">Primary action</button>
      </div>
    </div>
  </header>
</div>
```

- Tags sit right after the title, 12px away, never under it or at the far right.
- Actions act on the whole page. One primary button at most, last on the right. Icon-only actions are ghost `hb-btn--sm` buttons with an `aria-label`, before the labelled ones.
- An action for one item on the page belongs next to that item, not here.

## Tabs

Add `hb-tabs` as the header's last child for sibling views of the same page. The header sets `--hb-tabs-inset` so the first tab lines up with the breadcrumbs, and `hb.js` switches the panels. See [Tabs](tabs.html).

```html preview
<div class="hb-paper">
  <header class="hb-page-header">
    <div class="hb-page-header__bar">
      <div class="hb-page-header__heading">
        <nav class="hb-breadcrumbs" aria-label="Breadcrumb"><ol><li><a href="#">Section</a></li><li><a href="#">Parent page</a></li></ol></nav>
        <h1 class="hb-page-header__title">Page title</h1>
        <div class="hb-page-header__tags"><span class="hb-tag hb-tag--blue">Status</span></div>
      </div>
      <div class="hb-page-header__actions">
        <button type="button" class="hb-btn hb-btn--secondary hb-btn--lg">Secondary action</button>
      </div>
    </div>
    <nav class="hb-tabs" aria-label="Page views">
      <a class="hb-tabs__tab" href="#" aria-current="page">First view</a>
      <a class="hb-tabs__tab" href="#">Second view <span class="hb-tabs__count">12</span></a>
    </nav>
  </header>
</div>
```

## Record

Profiles and entities (a subject, a business, an account) start with what kind of record it is: a type icon, the name as the title, and a subtitle with the one fact that identifies it. Tags go right of the title.

```html preview
<div class="hb-paper">
  <header class="hb-page-header">
    <div class="hb-page-header__bar">
      <div class="hb-page-header__heading">
        <span class="hb-page-header__icon" aria-hidden="true"><span class="hb-icon">person</span></span>
        <div class="hb-page-header__titles">
          <div class="hb-page-header__title-row">
            <h1 class="hb-page-header__title">Daniel Okafor</h1>
            <div class="hb-page-header__tags">
              <span class="hb-tag hb-tag--green">PEP cleared</span>
              <span class="hb-tag hb-tag--purple">EDD</span>
              <span class="hb-tag hb-tag--red">High risk</span>
              <button type="button" class="hb-tag hb-tag--add" aria-label="Add tag"><span class="hb-icon hb-icon--sm" aria-hidden="true">add</span></button>
            </div>
          </div>
          <p class="hb-page-header__subtitle">Individual · 47 years old</p>
        </div>
      </div>
      <div class="hb-page-header__actions">
        <button type="button" class="hb-btn hb-btn--ghost hb-btn--sm" aria-label="History"><span class="hb-icon" aria-hidden="true">history</span></button>
      </div>
    </div>
  </header>
</div>
```

- `hb-page-header__titles` stacks `__title-row` (title and tags) over `__subtitle`.
- Type icons: `person` for an individual, `domain` for a business, `account_balance` for an account. The icon is decorative (`aria-hidden`): the subtitle names the type.
- The subtitle is one line: the type and a fact, joined by " · ". Don't repeat what the tags say.

## Accessibility

- One `<h1>` per page: the title.
- Breadcrumbs are a `<nav aria-label="Breadcrumb">` with an `<ol>`. The slashes are drawn by CSS and are not read out.
- Icon-only actions carry an `aria-label`. Use `aria-disabled="true"` on an action that is not available yet, so it stays focusable.

## Do

- Keep the title short and specific: the record's name, or the page's name.
- Put status in a tag next to the title, where it is read with the name.

## Don't

- Don't put filters, search or counts in the header. They belong to the content: a table toolbar, a card.
- Don't add a second row of actions. Move the less common ones into a "More" menu.
