A list whose items can be reordered by dragging or by Up/Down buttons.

## Variants

| Variant | Class | Use it for |
|---|---|---|
| Panel (default) | `hb-drag` | A dedicated management panel, where arranging things is the point — such as the table's Columns popover. Up/Down buttons always visible. |
| Inline | `hb-drag--inline` | Short lists (5–10 items) in the content, with no panel around them. The grip and buttons appear on hover or keyboard focus, so there is no permanent chrome. |

Panel — drag a row, or use the arrows:

```html preview
<ul class="hb-drag" aria-label="Visible columns" style="max-width: 360px;">
  <li class="hb-drag__item" draggable="true">
    <span class="hb-drag__handle hb-icon" aria-hidden="true">drag_indicator</span>
    <span class="hb-drag__content">Alert</span>
    <div class="hb-drag__move">
      <button type="button" class="hb-drag__move-btn"><span class="hb-icon">arrow_upward</span></button>
      <button type="button" class="hb-drag__move-btn"><span class="hb-icon">arrow_downward</span></button>
    </div>
  </li>
  <li class="hb-drag__item" draggable="true">
    <span class="hb-drag__handle hb-icon" aria-hidden="true">drag_indicator</span>
    <span class="hb-drag__content">Subject</span>
    <div class="hb-drag__move">
      <button type="button" class="hb-drag__move-btn"><span class="hb-icon">arrow_upward</span></button>
      <button type="button" class="hb-drag__move-btn"><span class="hb-icon">arrow_downward</span></button>
    </div>
  </li>
  <li class="hb-drag__item" draggable="true">
    <span class="hb-drag__handle hb-icon" aria-hidden="true">drag_indicator</span>
    <span class="hb-drag__content">Status</span>
    <div class="hb-drag__move">
      <button type="button" class="hb-drag__move-btn"><span class="hb-icon">arrow_upward</span></button>
      <button type="button" class="hb-drag__move-btn"><span class="hb-icon">arrow_downward</span></button>
    </div>
  </li>
  <li class="hb-drag__item" draggable="true">
    <span class="hb-drag__handle hb-icon" aria-hidden="true">drag_indicator</span>
    <span class="hb-drag__content">Score</span>
    <div class="hb-drag__move">
      <button type="button" class="hb-drag__move-btn"><span class="hb-icon">arrow_upward</span></button>
      <button type="button" class="hb-drag__move-btn"><span class="hb-icon">arrow_downward</span></button>
    </div>
  </li>
  <li class="hb-drag__item" draggable="true">
    <span class="hb-drag__handle hb-icon" aria-hidden="true">drag_indicator</span>
    <span class="hb-drag__content">Assigned to</span>
    <div class="hb-drag__move">
      <button type="button" class="hb-drag__move-btn"><span class="hb-icon">arrow_upward</span></button>
      <button type="button" class="hb-drag__move-btn"><span class="hb-icon">arrow_downward</span></button>
    </div>
  </li>
</ul>
```

Inline — hover a row, or Tab into it:

```html preview
<ul class="hb-drag hb-drag--inline" aria-label="Sections" style="max-width: 420px;">
  <li class="hb-drag__item" draggable="true">
    <span class="hb-drag__handle hb-icon" aria-hidden="true">drag_indicator</span>
    <span class="hb-drag__content">Business risk profile</span>
    <div class="hb-drag__move">
      <button type="button" class="hb-drag__move-btn"><span class="hb-icon">arrow_upward</span></button>
      <button type="button" class="hb-drag__move-btn"><span class="hb-icon">arrow_downward</span></button>
    </div>
  </li>
  <li class="hb-drag__item" draggable="true">
    <span class="hb-drag__handle hb-icon" aria-hidden="true">drag_indicator</span>
    <span class="hb-drag__content">Beneficial owners and authorized signers</span>
    <div class="hb-drag__move">
      <button type="button" class="hb-drag__move-btn"><span class="hb-icon">arrow_upward</span></button>
      <button type="button" class="hb-drag__move-btn"><span class="hb-icon">arrow_downward</span></button>
    </div>
  </li>
  <li class="hb-drag__item" draggable="true">
    <span class="hb-drag__handle hb-icon" aria-hidden="true">drag_indicator</span>
    <span class="hb-drag__content">Cash management services</span>
    <div class="hb-drag__move">
      <button type="button" class="hb-drag__move-btn"><span class="hb-icon">arrow_upward</span></button>
      <button type="button" class="hb-drag__move-btn"><span class="hb-icon">arrow_downward</span></button>
    </div>
  </li>
  <li class="hb-drag__item" draggable="true">
    <span class="hb-drag__handle hb-icon" aria-hidden="true">drag_indicator</span>
    <span class="hb-drag__content">Review materials</span>
    <div class="hb-drag__move">
      <button type="button" class="hb-drag__move-btn"><span class="hb-icon">arrow_upward</span></button>
      <button type="button" class="hb-drag__move-btn"><span class="hb-icon">arrow_downward</span></button>
    </div>
  </li>
</ul>
```

## Structure

- `ul.hb-drag` of `li.hb-drag__item`.
- Each item has:
  - `hb-drag__handle` — the grip for pointer dragging. Decorative (`aria-hidden`).
  - `hb-drag__content` — the label or any content. It truncates rather than wraps.
  - `hb-drag__move` — a group of two `hb-drag__move-btn` buttons: Up first, Down second.
- Nested list: put another `ul.hb-drag.hb-drag__nested` inside the item. It reorders independently of its parent.

```html
<ul class="hb-drag" aria-label="Visible columns">
  <li class="hb-drag__item" draggable="true">
    <span class="hb-drag__handle hb-icon" aria-hidden="true">drag_indicator</span>
    <span class="hb-drag__content">Date of birth</span>
    <div class="hb-drag__move">
      <button type="button" class="hb-drag__move-btn"><span class="hb-icon">arrow_upward</span></button>
      <button type="button" class="hb-drag__move-btn"><span class="hb-icon">arrow_downward</span></button>
    </div>
  </li>
</ul>
```

Nested — the fields move inside their task, the tasks move on their own:

```html preview
<ul class="hb-drag hb-drag--inline" aria-label="Tasks" style="max-width: 460px;">
  <li class="hb-drag__item" draggable="true">
    <span class="hb-drag__handle hb-icon" aria-hidden="true">drag_indicator</span>
    <span class="hb-drag__content">Business risk profile</span>
    <div class="hb-drag__move">
      <button type="button" class="hb-drag__move-btn"><span class="hb-icon">arrow_upward</span></button>
      <button type="button" class="hb-drag__move-btn"><span class="hb-icon">arrow_downward</span></button>
    </div>
      <ul class="hb-drag hb-drag--inline hb-drag__nested" aria-label="Fields of Business risk profile">
        <li class="hb-drag__item" draggable="true">
          <span class="hb-drag__handle hb-icon" aria-hidden="true">drag_indicator</span>
          <span class="hb-drag__content">Confirm address</span>
          <div class="hb-drag__move">
            <button type="button" class="hb-drag__move-btn"><span class="hb-icon">arrow_upward</span></button>
            <button type="button" class="hb-drag__move-btn"><span class="hb-icon">arrow_downward</span></button>
          </div>
        </li>
        <li class="hb-drag__item" draggable="true">
          <span class="hb-drag__handle hb-icon" aria-hidden="true">drag_indicator</span>
          <span class="hb-drag__content">Change address</span>
          <div class="hb-drag__move">
            <button type="button" class="hb-drag__move-btn"><span class="hb-icon">arrow_upward</span></button>
            <button type="button" class="hb-drag__move-btn"><span class="hb-icon">arrow_downward</span></button>
          </div>
        </li>
        <li class="hb-drag__item" draggable="true">
          <span class="hb-drag__handle hb-icon" aria-hidden="true">drag_indicator</span>
          <span class="hb-drag__content">Keep address</span>
          <div class="hb-drag__move">
            <button type="button" class="hb-drag__move-btn"><span class="hb-icon">arrow_upward</span></button>
            <button type="button" class="hb-drag__move-btn"><span class="hb-icon">arrow_downward</span></button>
          </div>
        </li>
      </ul>
  </li>
  <li class="hb-drag__item" draggable="true">
    <span class="hb-drag__handle hb-icon" aria-hidden="true">drag_indicator</span>
    <span class="hb-drag__content">Beneficial owners and authorized signers</span>
    <div class="hb-drag__move">
      <button type="button" class="hb-drag__move-btn"><span class="hb-icon">arrow_upward</span></button>
      <button type="button" class="hb-drag__move-btn"><span class="hb-icon">arrow_downward</span></button>
    </div>
  </li>
  <li class="hb-drag__item" draggable="true">
    <span class="hb-drag__handle hb-icon" aria-hidden="true">drag_indicator</span>
    <span class="hb-drag__content">Review materials</span>
    <div class="hb-drag__move">
      <button type="button" class="hb-drag__move-btn"><span class="hb-icon">arrow_upward</span></button>
      <button type="button" class="hb-drag__move-btn"><span class="hb-icon">arrow_downward</span></button>
    </div>
  </li>
</ul>
```

## States

| State | Trigger | What changes |
|---|---|---|
| Hover | `:hover` on the item | `ui-bg-secondary` background. Inline: grip and buttons appear. |
| Focus | `:focus-visible` on a button | 2px ring in `ui-interaction`. Inline: grip and buttons appear. |
| Dragging | `is-dragging` on the item | The row fades. |
| Drop target | `is-drop-target` on the item | A `ui-interaction` line on top of the row. |
| At the ends | `disabled` on Up (first) or Down (last) | The arrow greys out. |

## Behaviour

`hb.js` does the work — no script of your own:

- The Up / Down buttons move the `<li>`; so does dragging it. A drag only lands within its own list, so nested lists never disturb each other.
- It names each button after its item ("Move Date of birth up"), disables Up on the first item and Down on the last, and keeps them right after every move.
- After a move, focus stays on the button that was pressed (or its sibling, if that one became disabled). Otherwise a keyboard user loses their place.
- It announces the new position ("Date of birth moved to position 2 of 5") through the shared polite live region, `#hb-live-region`, and creates it if the page has none.
- A prototype that needs to react (save the order, update a table) listens for the `hb-reorder` event on the list: `event.detail` holds the `item`, and its `from` and `to` positions.

## Do

- Always offer the Up/Down buttons. WCAG 2.5.7 (Dragging movements): a drag can never be the only way to do something. The buttons are the requirement, not a convenience.
- Keep the buttons in the tab order at all times.
- Name each button after its item: "Move Risk factors up", not "Move up".
- In the inline variant, hide the controls with opacity (the CSS does), so they stay focusable.

## Don't

- Don't make dragging the only way to reorder.
- Don't hide the buttons with `display: none`. It drops them from the tab order.
- Don't let a drag in one nested list drop into another level.
- Don't add "Move to top / bottom" shortcuts yet. Out of scope while lists stay short (5–10 items).
