A list whose items can be reordered by dragging or by Up/Down buttons.

## Variants

| Variant | Class | Use it for |
|---|---|---|
| Panel (default) | `hb-drag` | A dedicated management panel, where arranging things is the point — such as the table's Columns popover. Up/Down buttons always visible. |
| Inline | `hb-drag--inline` | Short lists (5–10 items) in the content, with no panel around them. The grip and buttons appear on hover or keyboard focus, so there is no permanent chrome. |

## Structure

- `ul.hb-drag` of `li.hb-drag__item`.
- Each item has:
  - `hb-drag__handle` — the grip for pointer dragging. Decorative (`aria-hidden`).
  - `hb-drag__content` — the label or any content. It truncates rather than wraps.
  - `hb-drag__move` — a group of two `hb-drag__move-btn` buttons (Up, Down).
- Nested list: put another `ul.hb-drag.hb-drag__nested` inside the item. It reorders independently of its parent.

```html
<ul class="hb-drag">
  <li class="hb-drag__item" draggable="true">
    <span class="hb-drag__handle hb-icon" aria-hidden="true">drag_indicator</span>
    <span class="hb-drag__content">Date of birth</span>
    <div class="hb-drag__move">
      <button type="button" class="hb-drag__move-btn" aria-label="Move Date of birth up">…</button>
      <button type="button" class="hb-drag__move-btn" aria-label="Move Date of birth down">…</button>
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

- In prototypes, use the `hbReorder()` Alpine factory from `drag.js`, spread into `x-data`. The consumer supplies the reorder behaviour otherwise.
- Pass each list its own array to the move buttons and to drop. Nested lists never disturb each other.
- After a move, keep focus on the button that was pressed (or its sibling, if that one became disabled). Otherwise a keyboard user loses their place.
- Announce the new position through the shared polite live region, `#hb-live-region` (`drag.js` creates it if the page has none).

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

## Example

```html
<script src="https://tomimar.github.io/hb-mininectar/drag.js"></script>

<ul class="hb-drag hb-drag--inline"
    x-data="Object.assign({ items: [
      { id: 'r1', label: 'Subject details' },
      { id: 'r2', label: 'Linked accounts' },
      { id: 'r3', label: 'Flagged transactions' }
    ] }, hbReorder())">
  <template x-for="item in items" :key="item.id">
    <li class="hb-drag__item" draggable="true"
        :class="{ 'is-dragging': reorderIsDragging(item), 'is-drop-target': reorderIsDropTarget(item) }"
        @dragstart="reorderDragStart(item)" @dragend="reorderDragEnd()"
        @dragover.prevent="reorderDragOver(item)" @drop.prevent="reorderDrop(item, items)">
      <span class="hb-drag__handle hb-icon" aria-hidden="true">drag_indicator</span>
      <span class="hb-drag__content" x-text="item.label"></span>
      <div class="hb-drag__move">
        <button type="button" class="hb-drag__move-btn"
                :data-hb-drag-btn="reorderId(item) + '-up'" :disabled="!reorderCanUp(item, items)"
                :aria-label="'Move ' + reorderLabel(item) + ' up'" @click="reorderMove(item, -1, items)">
          <span class="hb-icon">arrow_upward</span></button>
        <button type="button" class="hb-drag__move-btn"
                :data-hb-drag-btn="reorderId(item) + '-down'" :disabled="!reorderCanDown(item, items)"
                :aria-label="'Move ' + reorderLabel(item) + ' down'" @click="reorderMove(item, 1, items)">
          <span class="hb-icon">arrow_downward</span></button>
      </div>
    </li>
  </template>
</ul>
```
