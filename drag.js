/* ============================================================
   hb-mininectar — Reorderable list (hb-drag)
   Self-contained Alpine.js helper for lists that can be reordered
   by dragging OR by Up / Down buttons — the single-pointer
   alternative required by WCAG 2.5.7 (Dragging movements).

   Usage — spread the factory into any Alpine component and give it
   an array to reorder:

     <ul class="hb-drag" x-data="Object.assign({ items: [
            { id: 'a', label: 'Owner' },
            { id: 'b', label: 'Status' },
          ] }, hbReorder())">
       <template x-for="item in items" :key="item.id">
         <li class="hb-drag__item" draggable="true"
             :class="{ 'is-dragging': reorderIsDragging(item),
                       'is-drop-target': reorderIsDropTarget(item) }"
             @dragstart="reorderDragStart(item)"
             @dragend="reorderDragEnd()"
             @dragover.prevent="reorderDragOver(item)"
             @drop.prevent="reorderDrop(item, items)">
           <span class="hb-drag__handle hb-icon" aria-hidden="true">drag_indicator</span>
           <span class="hb-drag__content" x-text="item.label"></span>
           <div class="hb-drag__move">
             <button type="button" class="hb-drag__move-btn"
                     :data-hb-drag-btn="reorderId(item) + '-up'"
                     :disabled="!reorderCanUp(item, items)"
                     :aria-label="'Move ' + reorderLabel(item) + ' up'"
                     @click="reorderMove(item, -1, items)">
               <span class="hb-icon">arrow_upward</span></button>
             <button type="button" class="hb-drag__move-btn"
                     :data-hb-drag-btn="reorderId(item) + '-down'"
                     :disabled="!reorderCanDown(item, items)"
                     :aria-label="'Move ' + reorderLabel(item) + ' down'"
                     @click="reorderMove(item, 1, items)">
               <span class="hb-icon">arrow_downward</span></button>
           </div>
         </li>
       </template>
     </ul>

   Notes:
   - Pass the SAME array to @drop and the move buttons; nested lists
     each pass their own array, so reordering one level never affects
     another (drops across different lists are rejected).
   - Item ids must be unique within the component root — the factory
     uses them to restore focus to the button that was pressed.
   - config.idKey / config.labelKey override the default 'id' / 'label'.
   ============================================================ */
(function (global) {
  'use strict';

  // A single shared polite live region (also used by the table resize
  // helper). Re-announcing empties it first so identical messages repeat.
  function announce(msg) {
    var el = document.getElementById('hb-live-region');
    if (!el) {
      el = document.createElement('div');
      el.id = 'hb-live-region';
      el.className = 'hb-visually-hidden';
      el.setAttribute('aria-live', 'polite');
      el.setAttribute('aria-atomic', 'true');
      document.body.appendChild(el);
    }
    el.textContent = '';
    setTimeout(function () { el.textContent = msg; }, 30);
  }

  function hbReorder(config) {
    config = config || {};
    var labelKey = config.labelKey || 'label';
    var idKey = config.idKey || 'id';

    return {
      // Drag state — object references, so identity is unambiguous even
      // when nested lists reuse the same ids.
      _dragItem: null,
      _dragOverItem: null,

      reorderLabel: function (item) { return item[labelKey]; },
      reorderId: function (item) { return item[idKey]; },
      reorderCanUp: function (item, list) { return list.indexOf(item) > 0; },
      reorderCanDown: function (item, list) { return list.indexOf(item) < list.length - 1; },

      // Single-pointer / keyboard reorder. Keeps focus on the button that
      // was pressed (or its sibling if that one became disabled) and
      // announces the new position.
      reorderMove: function (item, dir, list) {
        var i = list.indexOf(item), j = i + dir;
        if (i < 0 || j < 0 || j >= list.length) return;
        list.splice(i, 1);
        list.splice(j, 0, item);
        announce(item[labelKey] + ' moved to position ' + (j + 1) + ' of ' + list.length);
        var root = this.$root, id = item[idKey];
        this.$nextTick(function () {
          var want = dir < 0 ? 'up' : 'down', other = dir < 0 ? 'down' : 'up';
          var base = '[data-hb-drag-btn="' + id + '-';
          var btn = root.querySelector(base + want + '"]');
          if (!btn || btn.disabled) btn = root.querySelector(base + other + '"]');
          if (btn) btn.focus();
        });
      },

      // Pointer drag — the parallel path, never the only one.
      reorderDragStart: function (item) { this._dragItem = item; },
      reorderDragEnd: function () { this._dragItem = null; this._dragOverItem = null; },
      reorderDragOver: function (item) { this._dragOverItem = item; },
      reorderDrop: function (targetItem, list) {
        var dragged = this._dragItem;
        this._dragOverItem = null;
        if (!dragged || dragged === targetItem) { return; }
        // Reject drops that cross into a different list (nested lists)
        if (list.indexOf(dragged) === -1 || list.indexOf(targetItem) === -1) { this._dragItem = null; return; }
        list.splice(list.indexOf(dragged), 1);
        list.splice(list.indexOf(targetItem), 0, dragged);
        announce(dragged[labelKey] + ' moved to position ' + (list.indexOf(dragged) + 1) + ' of ' + list.length);
        this._dragItem = null;
      },

      reorderIsDragging: function (item) { return this._dragItem === item; },
      reorderIsDropTarget: function (item) { return this._dragOverItem === item && this._dragItem !== item; },
    };
  }

  global.hbReorder = hbReorder;
  global.hbDragAnnounce = announce;
})(window);
