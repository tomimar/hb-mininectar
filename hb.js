/* ============================================================
   Hummingbird Design System — Component behaviour
   Plain JavaScript, no dependencies. Load it once, at the end of <body>,
   from https://tomimar.github.io/hb-mininectar/hb.js
   (in the Claude Design artifact it ships as components/bundle.js).
   It works through event delegation on the document, so markup added
   later (by a prototype's own script, or by Alpine) works too.
   Components describe their state in the markup — aria-expanded,
   hidden — and this file only flips it.
   ============================================================ */
(function () {
  if (window.hbBehaviour) return; // loaded twice
  window.hbBehaviour = true;

  /* ── Shared: a label that changes with the state ────────────
     <span data-label-open="Show less">Show more details</span>
     The element's own text is the closed label.                 */
  function swapLabel(el, open) {
    // Starting closed, the text is the closed label: remember it.
    // Starting open, write data-label-closed in the markup too.
    if (!el.hasAttribute('data-label-closed')) {
      if (!open) return;
      el.setAttribute('data-label-closed', el.textContent);
    }
    el.textContent = open ? el.getAttribute('data-label-open')
                          : el.getAttribute('data-label-closed');
  }

  /* ── Expand ─────────────────────────────────────────────────
     A button.hb-expand__toggle with aria-expanded and aria-controls.
     Closed regions carry `hidden` — except in show more, where the
     region stays rendered and CSS clips it.

     Expand all: a button with data-hb-expand-all="<container id>"
     opens every card in that container, or closes them all when
     every one is already open.                                     */
  function setExpanded(btn, open) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    var region = document.getElementById(btn.getAttribute('aria-controls'));
    var showMore = btn.closest('.hb-expand--show-more');
    if (region && !showMore) region.hidden = !open;
    btn.querySelectorAll('[data-label-open]').forEach(function (el) { swapLabel(el, open); });
  }

  function syncExpandAll() {
    document.querySelectorAll('[data-hb-expand-all]').forEach(function (all) {
      var group = document.getElementById(all.getAttribute('data-hb-expand-all'));
      if (!group) return;
      var toggles = group.querySelectorAll('.hb-expand__toggle[aria-controls]:not(:disabled)');
      var allOpen = toggles.length > 0 && Array.prototype.every.call(toggles, function (t) {
        return t.getAttribute('aria-expanded') === 'true';
      });
      var label = all.hasAttribute('data-label-open') ? all : all.querySelector('[data-label-open]');
      if (label) swapLabel(label, allOpen);
    });
  }

  document.addEventListener('click', function (e) {
    var all = e.target.closest('[data-hb-expand-all]');
    if (all) {
      var group = document.getElementById(all.getAttribute('data-hb-expand-all'));
      if (!group) return;
      var toggles = group.querySelectorAll('.hb-expand__toggle[aria-controls]:not(:disabled)');
      var allOpen = Array.prototype.every.call(toggles, function (t) {
        return t.getAttribute('aria-expanded') === 'true';
      });
      toggles.forEach(function (t) { setExpanded(t, !allOpen); });
      syncExpandAll();
      return;
    }

    var btn = e.target.closest('.hb-expand__toggle[aria-controls]');
    if (btn && !btn.disabled) {
      var open = btn.getAttribute('aria-expanded') !== 'true';
      setExpanded(btn, open);
      // Show more: after collapsing, bring the button back into view
      if (!open && btn.closest('.hb-expand--show-more')) {
        btn.scrollIntoView({ block: 'nearest' });
      }
      syncExpandAll();
    }
  });

  /* ── Sidenav ────────────────────────────────────────────────
     button.hb-sidenav__toggle with aria-controls="<nav id>" and
     aria-expanded. A click collapses the nav (is-collapsed) or pins it
     open again. While collapsed, hovering or focusing the toggle — or
     the floating nav itself — adds is-peeking; leaving removes it after
     a short delay so it doesn't flicker.
     Add data-hb-persist="<key>" to the toggle to remember the state in
     localStorage (per user, not per page).                          */
  var PEEK_DELAY = 200;
  var peekTimers = new WeakMap();

  function sidenavFor(el) {
    if (!el || !el.closest) return null;
    var nav = el.closest('.hb-sidenav');
    if (nav) return nav;
    var toggle = el.closest('.hb-sidenav__toggle[aria-controls]');
    return toggle ? document.getElementById(toggle.getAttribute('aria-controls')) : null;
  }

  function setCollapsed(toggle, collapsed) {
    var nav = document.getElementById(toggle.getAttribute('aria-controls'));
    if (!nav) return;
    nav.classList.toggle('is-collapsed', collapsed);
    nav.classList.remove('is-peeking');
    toggle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
    var name = collapsed ? 'Expand navigation' : 'Collapse navigation';
    toggle.setAttribute('aria-label', name);
    toggle.setAttribute('title', name);
    var icon = toggle.querySelector('.hb-icon');
    if (icon) icon.textContent = collapsed ? 'last_page' : 'first_page';
    var key = toggle.getAttribute('data-hb-persist');
    if (key) { try { localStorage.setItem(key, collapsed ? '1' : '0'); } catch (e) {} }
  }

  function peek(nav, on) {
    if (!nav || !nav.classList.contains('is-collapsed')) return;
    clearTimeout(peekTimers.get(nav));
    if (on) { nav.classList.add('is-peeking'); return; }
    peekTimers.set(nav, setTimeout(function () { nav.classList.remove('is-peeking'); }, PEEK_DELAY));
  }

  document.addEventListener('click', function (e) {
    var toggle = e.target.closest('.hb-sidenav__toggle[aria-controls]');
    if (!toggle) return;
    setCollapsed(toggle, toggle.getAttribute('aria-expanded') !== 'false');
  });

  // Peek: entering the toggle or the nav shows it; leaving both hides it
  ['mouseover', 'focusin'].forEach(function (type) {
    document.addEventListener(type, function (e) { peek(sidenavFor(e.target), true); });
  });
  ['mouseout', 'focusout'].forEach(function (type) {
    document.addEventListener(type, function (e) {
      var nav = sidenavFor(e.target);
      if (nav && sidenavFor(e.relatedTarget) !== nav) peek(nav, false);
    });
  });

  /* ── Multi select ───────────────────────────────────────────
     .hb-multiselect with a __control (tags + __input + __chevron) and
     a __menu (hidden while closed) of <label class="__option"> rows,
     each holding a real checkbox. The checked boxes are the value:
     hb.js keeps the tags, __option--selected and the open state in
     step, filters the options as the analyst types, and shows
     __empty when nothing matches. Write the starting tags in the
     markup for the boxes that start checked.                      */
  var REMOVE_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">' +
    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>';

  function msParts(root) {
    return {
      control: root.querySelector('.hb-multiselect__control'),
      input: root.querySelector('.hb-multiselect__input'),
      menu: root.querySelector('.hb-multiselect__menu'),
      empty: root.querySelector('.hb-multiselect__empty'),
      options: root.querySelectorAll('.hb-multiselect__option')
    };
  }
  function msLabel(option) { return option.textContent.trim(); }

  function msOpen(root, open) {
    var p = msParts(root);
    if (!p.menu || root.classList.contains('hb-multiselect--disabled')) return;
    p.menu.hidden = !open;
    root.classList.toggle('is-open', open);
    if (p.input) p.input.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (!open && p.input && p.input.value) { p.input.value = ''; msFilter(root); }
  }

  function msRender(root) {
    var p = msParts(root);
    if (!p.control) return;
    p.control.querySelectorAll('.hb-multiselect__tag').forEach(function (t) { t.remove(); });
    p.options.forEach(function (option) {
      var box = option.querySelector('input[type="checkbox"]');
      var on = !!(box && box.checked);
      option.classList.toggle('hb-multiselect__option--selected', on);
      if (!on) return;
      var label = msLabel(option);
      var tag = document.createElement('span');
      tag.className = 'hb-multiselect__tag';
      tag.appendChild(document.createTextNode(label));
      var remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'hb-multiselect__tag-remove';
      remove.setAttribute('aria-label', 'Remove ' + label);
      remove.innerHTML = REMOVE_ICON;
      tag.appendChild(remove);
      p.control.insertBefore(tag, p.input || null);
    });
  }

  function msFilter(root) {
    var p = msParts(root);
    var q = p.input ? p.input.value.trim().toLowerCase() : '';
    var shown = 0;
    p.options.forEach(function (option) {
      var match = !q || msLabel(option).toLowerCase().indexOf(q) !== -1;
      option.hidden = !match;
      if (match) shown++;
    });
    if (p.empty) p.empty.hidden = shown > 0;
  }

  function msUncheck(root, label) {
    msParts(root).options.forEach(function (option) {
      var box = option.querySelector('input[type="checkbox"]');
      if (box && msLabel(option) === label) box.checked = false;
    });
    msRender(root);
  }

  document.addEventListener('click', function (e) {
    // Close every open multi select the click is not inside
    document.querySelectorAll('.hb-multiselect.is-open').forEach(function (root) {
      if (!root.contains(e.target)) msOpen(root, false);
    });
    var root = e.target.closest('.hb-multiselect');
    if (!root || root.classList.contains('hb-multiselect--disabled')) return;

    var remove = e.target.closest('.hb-multiselect__tag-remove');
    if (remove) {
      var tag = remove.closest('.hb-multiselect__tag');
      msUncheck(root, tag.textContent.trim());
      return;
    }
    if (e.target.closest('.hb-multiselect__chevron')) {
      msOpen(root, !root.classList.contains('is-open'));
      return;
    }
    if (e.target.closest('.hb-multiselect__control')) {
      msOpen(root, true);
      var input = msParts(root).input;
      if (input) input.focus();
    }
  });

  document.addEventListener('change', function (e) {
    var root = e.target.closest && e.target.closest('.hb-multiselect');
    if (root && e.target.matches('.hb-multiselect__option input[type="checkbox"]')) msRender(root);
  });

  document.addEventListener('input', function (e) {
    var root = e.target.closest && e.target.closest('.hb-multiselect');
    if (root && e.target.matches('.hb-multiselect__input')) { msOpen(root, true); msFilter(root); }
  });

  document.addEventListener('focusin', function (e) {
    var root = e.target.closest && e.target.closest('.hb-multiselect');
    if (root && e.target.matches('.hb-multiselect__input')) msOpen(root, true);
  });

  // Tabbing out of the field closes the menu. A pointer press inside it
  // (on an option label) also moves focus away first: ignore that one.
  var msPointerRoot = null;
  document.addEventListener('pointerdown', function (e) {
    msPointerRoot = e.target.closest ? e.target.closest('.hb-multiselect') : null;
  });
  document.addEventListener('pointerup', function () {
    setTimeout(function () { msPointerRoot = null; }, 0);
  });
  document.addEventListener('focusout', function (e) {
    var root = e.target.closest && e.target.closest('.hb-multiselect');
    if (!root || !root.classList.contains('is-open') || msPointerRoot === root) return;
    if (!(e.relatedTarget && root.contains(e.relatedTarget))) msOpen(root, false);
  });

  document.addEventListener('keydown', function (e) {
    var root = e.target.closest && e.target.closest('.hb-multiselect');
    if (!root) return;
    if (e.key === 'Escape' && root.classList.contains('is-open')) {
      e.preventDefault();
      msOpen(root, false);
      var input = msParts(root).input;
      if (input) input.focus();
    }
    // Backspace in an empty field removes the last tag
    if (e.key === 'Backspace' && e.target.matches('.hb-multiselect__input') && !e.target.value) {
      var tags = root.querySelectorAll('.hb-multiselect__tag');
      if (tags.length) msUncheck(root, tags[tags.length - 1].textContent.trim());
    }
  });

  /* ── Drag (reorderable list) ────────────────────────────────
     ul.hb-drag of li.hb-drag__item[draggable="true"], each with a
     __handle, a __content and a __move group of two __move-btn
     buttons (Up first, Down second). hb.js moves the <li> itself:
     - Up / Down buttons — the single-pointer path (WCAG 2.5.7). Focus
       stays on the pressed button (or its sibling at the ends).
     - Pointer drag — the parallel path, within one list only, so a
       nested ul.hb-drag.hb-drag__nested reorders on its own.
     It names the buttons ("Move <label> up"), disables Up on the first
     item and Down on the last, announces each move in the shared
     polite live region (#hb-live-region), and fires an `hb-reorder`
     event on the list ({ detail: { item, from, to } }) for a
     prototype that needs to react.
     The Table's Columns panel (hb-column-manager) reuses all of it
     with its own class names — see KINDS.                          */
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
  window.hbAnnounce = announce;

  var KINDS = [
    { list: 'hb-drag', item: 'hb-drag__item', content: 'hb-drag__content',
      move: 'hb-drag__move', button: 'hb-drag__move-btn' },
    { list: 'hb-column-manager__list', item: 'hb-column-manager__item', content: 'hb-column-manager__name',
      move: 'hb-column-manager__move', button: 'hb-column-manager__move-btn' }
  ];
  function kindOf(list) {
    if (!list || !list.classList) return null;
    for (var i = 0; i < KINDS.length; i++) if (list.classList.contains(KINDS[i].list)) return KINDS[i];
    return null;
  }
  function childWith(el, cls) {
    return Array.prototype.find.call(el.children, function (c) { return c.classList.contains(cls); });
  }

  function dragItems(list) {
    var k = kindOf(list);
    return Array.prototype.filter.call(list.children, function (c) { return c.classList.contains(k.item); });
  }
  function dragLabel(item) {
    var k = kindOf(item.parentElement);
    var content = k && (childWith(item, k.content) || item.querySelector('.' + k.content));
    return content ? content.textContent.trim() : '';
  }
  function dragButtons(item) {
    var k = kindOf(item.parentElement);
    var move = k && childWith(item, k.move);
    return move ? move.querySelectorAll('.' + k.button) : [];
  }

  function syncDragList(list) {
    var items = dragItems(list);
    items.forEach(function (item, i) {
      var label = dragLabel(item);
      var btns = dragButtons(item);
      if (btns[0]) { btns[0].disabled = i === 0; btns[0].setAttribute('aria-label', 'Move ' + label + ' up'); }
      if (btns[1]) { btns[1].disabled = i === items.length - 1; btns[1].setAttribute('aria-label', 'Move ' + label + ' down'); }
    });
  }

  function dragMoved(list, item, from) {
    var items = dragItems(list);
    var to = items.indexOf(item);
    syncDragList(list);
    announce(dragLabel(item) + ' moved to position ' + (to + 1) + ' of ' + items.length);
    list.dispatchEvent(new CustomEvent('hb-reorder', { bubbles: true, detail: { item: item, from: from, to: to } }));
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.hb-drag__move-btn, .hb-column-manager__move-btn');
    if (!btn || btn.disabled) return;
    var list = btn.parentElement && btn.parentElement.parentElement && btn.parentElement.parentElement.parentElement;
    var k = kindOf(list);
    if (!k) return;
    var item = btn.closest('.' + k.item);
    var btns = dragButtons(item);
    var up = btn === btns[0];
    var items = dragItems(list);
    var from = items.indexOf(item);
    var swap = items[from + (up ? -1 : 1)];
    if (!swap) return;
    if (up) list.insertBefore(item, swap);
    else list.insertBefore(item, swap.nextSibling);
    dragMoved(list, item, from);
    // Keep focus where the keyboard user is
    btns = dragButtons(item);
    var keep = up ? btns[0] : btns[1];
    if (!keep || keep.disabled) keep = up ? btns[1] : btns[0];
    if (keep) keep.focus();
  });

  var dragging = null;
  function clearDropTargets(list) {
    list.querySelectorAll('.is-drop-target').forEach(function (el) { el.classList.remove('is-drop-target'); });
  }
  function draggableItem(el) {
    var item = el && el.closest && el.closest('[draggable="true"]');
    return item && kindOf(item.parentElement) ? item : null;
  }

  document.addEventListener('dragstart', function (e) {
    var item = draggableItem(e.target);
    if (!item || item !== e.target) return; // drag the row, not a link inside it
    dragging = item;
    item.classList.add('is-dragging');
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
      try { e.dataTransfer.setData('text/plain', dragLabel(item)); } catch (err) {}
    }
  });
  document.addEventListener('dragover', function (e) {
    if (!dragging) return;
    var k = kindOf(dragging.parentElement);
    var target = e.target.closest && e.target.closest('.' + k.item);
    // Only within the same list: nested levels never mix
    while (target && target.parentElement !== dragging.parentElement) {
      target = target.parentElement.closest('.' + k.item);
    }
    if (!target) return;
    e.preventDefault();
    clearDropTargets(dragging.parentElement);
    if (target !== dragging) target.classList.add('is-drop-target');
  });
  document.addEventListener('drop', function (e) {
    if (!dragging) return;
    var list = dragging.parentElement;
    var target = list.querySelector(':scope > .is-drop-target');
    clearDropTargets(list);
    if (!target) return;
    e.preventDefault();
    var items = dragItems(list);
    var from = items.indexOf(dragging);
    if (from < items.indexOf(target)) list.insertBefore(dragging, target.nextSibling);
    else list.insertBefore(dragging, target);
    dragMoved(list, dragging, from);
  });
  document.addEventListener('dragend', function () {
    if (!dragging) return;
    dragging.classList.remove('is-dragging');
    clearDropTargets(dragging.parentElement);
    dragging = null;
  });

  /* ── Popups: menus and panels ───────────────────────────────
     A button with aria-haspopup and aria-controls opens and closes the
     element it controls (which starts `hidden`): the table's row menu
     (hb-table__menu), the Columns panel (hb-column-manager__panel).
     A click outside or Escape closes it; Escape returns focus to the
     button. In a menu, choosing an item closes it, and the arrow keys
     move between items.                                            */
  function popupOf(btn) { return document.getElementById(btn.getAttribute('aria-controls')); }
  function setPopup(btn, open, focusFirst) {
    var popup = popupOf(btn);
    if (!popup) return;
    popup.hidden = !open;
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open && focusFirst) {
      var first = popup.querySelector('[role="menuitem"], button, input, a[href]');
      if (first) first.focus();
    }
  }
  function openPopupButtons() {
    return document.querySelectorAll('button[aria-haspopup][aria-controls][aria-expanded="true"]');
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('button[aria-haspopup][aria-controls]');
    openPopupButtons().forEach(function (open) {
      var popup = popupOf(open);
      if (open === btn || (popup && popup.contains(e.target))) return;
      setPopup(open, false);
    });
    if (btn) {
      setPopup(btn, btn.getAttribute('aria-expanded') !== 'true', e.detail === 0);
      return;
    }
    // Choosing a menu item closes its menu
    var item = e.target.closest('[role="menuitem"]');
    var menu = item && item.closest('[role="menu"]');
    if (menu && menu.id) {
      var owner = document.querySelector('button[aria-controls="' + menu.id + '"]');
      if (owner) { setPopup(owner, false); owner.focus(); }
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      openPopupButtons().forEach(function (open) {
        var popup = popupOf(open);
        if (popup && (popup.contains(e.target) || e.target === open)) { setPopup(open, false); open.focus(); e.preventDefault(); }
      });
      return;
    }
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    var menu = e.target.closest && e.target.closest('[role="menu"]');
    if (!menu) return;
    var items = Array.prototype.slice.call(menu.querySelectorAll('[role="menuitem"]'));
    var i = items.indexOf(e.target);
    if (i === -1) return;
    e.preventDefault();
    items[(i + (e.key === 'ArrowDown' ? 1 : items.length - 1)) % items.length].focus();
  });

  /* ── Table ──────────────────────────────────────────────────
     - Select all: the header checkbox in __select-col ticks every row;
       ticking rows by hand keeps it checked / indeterminate.
     - Expandable rows: button.hb-table__expander with aria-expanded and
       aria-controls="<detail row id>" (the detail row starts `hidden`).
     - Resizable columns: table[data-hb-resizable] gets a focusable
       resize handle (role="separator") in each header but the last.
       Drag it, double-click it to auto-fit, or use ← / → (Shift for
       bigger steps), Enter or Home to auto-fit.                      */
  function rowBoxes(table) {
    return table.querySelectorAll(':scope > tbody > tr > .hb-table__select-col .hb-checkbox');
  }
  function headBox(table) {
    return table.querySelector(':scope > thead .hb-table__select-col .hb-checkbox');
  }
  function syncSelectAll(table) {
    var all = headBox(table);
    if (!all) return;
    var boxes = Array.prototype.slice.call(rowBoxes(table));
    var on = boxes.filter(function (b) { return b.checked; }).length;
    all.checked = on > 0 && on === boxes.length;
    all.indeterminate = on > 0 && on < boxes.length;
  }

  document.addEventListener('change', function (e) {
    var box = e.target;
    if (!box.matches || !box.matches('.hb-table__select-col .hb-checkbox')) return;
    var table = box.closest('table');
    if (box === headBox(table)) {
      rowBoxes(table).forEach(function (b) { b.checked = box.checked; });
    }
    syncSelectAll(table);
  });

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.hb-table__expander[aria-controls]');
    if (!btn) return;
    var open = btn.getAttribute('aria-expanded') !== 'true';
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    var detail = document.getElementById(btn.getAttribute('aria-controls'));
    if (detail) detail.hidden = !open;
  });

  var RESIZE_MIN = 72, RESIZE_MAX = 560, RESIZE_STEP = 16, RESIZE_BIG_STEP = 48;

  function setColWidth(th, handle, w) {
    w = Math.max(RESIZE_MIN, Math.min(RESIZE_MAX, Math.round(w)));
    th.style.width = w + 'px';
    handle.setAttribute('aria-valuenow', String(w));
    return w;
  }
  // Natural (content) width of a column, independent of its current width
  function autofitWidth(table, colIndex) {
    var ths = table.querySelectorAll('thead th');
    var saved = [];
    ths.forEach(function (th) { saved.push(th.style.width); });
    var prevLayout = table.style.tableLayout;
    table.style.tableLayout = 'auto';
    ths.forEach(function (th, idx) { th.style.width = idx === colIndex ? 'auto' : (parseFloat(saved[idx]) || th.offsetWidth) + 'px'; });
    var natural = ths[colIndex].offsetWidth + 8;
    table.style.tableLayout = prevLayout || '';
    ths.forEach(function (th, idx) { th.style.width = saved[idx]; });
    return natural;
  }

  function initResizable(table) {
    if (table.hbResizable) return;
    table.hbResizable = true;
    var ths = table.querySelectorAll('thead th');
    ths.forEach(function (th, i) {
      if (i === ths.length - 1) return; // the last column flexes, no handle
      if (th.querySelector('.hb-table__resizer')) return;
      if (!th.style.width) th.style.width = th.offsetWidth + 'px';
      var name = (th.textContent || 'column').trim();
      var handle = document.createElement('div');
      handle.className = 'hb-table__resizer';
      handle.setAttribute('role', 'separator');
      handle.setAttribute('tabindex', '0');
      handle.setAttribute('aria-orientation', 'vertical');
      handle.setAttribute('aria-label', 'Resize ' + name + ' column');
      handle.setAttribute('aria-valuemin', String(RESIZE_MIN));
      handle.setAttribute('aria-valuemax', String(RESIZE_MAX));
      handle.setAttribute('aria-valuenow', String(Math.round(th.offsetWidth)));
      th.appendChild(handle);

      handle.addEventListener('pointerdown', function (e) {
        e.preventDefault();
        var startX = e.clientX, startW = th.offsetWidth;
        handle.setPointerCapture(e.pointerId);
        handle.classList.add('is-resizing');
        function onMove(ev) { setColWidth(th, handle, startW + (ev.clientX - startX)); }
        function onUp() {
          handle.classList.remove('is-resizing');
          handle.removeEventListener('pointermove', onMove);
          handle.removeEventListener('pointerup', onUp);
        }
        handle.addEventListener('pointermove', onMove);
        handle.addEventListener('pointerup', onUp);
      });
      handle.addEventListener('dblclick', function (e) {
        e.preventDefault();
        var w = setColWidth(th, handle, autofitWidth(table, i));
        announce(name + ' column auto-fitted to ' + w + ' pixels');
      });
      handle.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          var step = e.shiftKey ? RESIZE_BIG_STEP : RESIZE_STEP;
          setColWidth(th, handle, th.offsetWidth + (e.key === 'ArrowRight' ? step : -step));
        } else if (e.key === 'Enter' || e.key === 'Home') {
          e.preventDefault();
          var w = setColWidth(th, handle, autofitWidth(table, i));
          announce(name + ' column auto-fitted to ' + w + ' pixels');
        }
      });
    });
  }

  /* ── Table · Columns panel (hb-column-manager) ──────────────
     The panel lists the table's data columns in two groups:
       ul.hb-column-manager__list[data-hb-columns="visible"]
       ul.hb-column-manager__list[data-hb-columns="hidden"]
     Each li.hb-column-manager__item has data-column="<key>", a
     checkbox + __name, and both a __drag/__move pair (shown while
     visible) and a __spacer (shown while hidden). The table's cells
     carry the same data-column; cells without one (the row header)
     stay pinned first.
     The manager root names its table: data-hb-columns-for="<table id>".
     hb.js reorders the Visible group (Drag behaviour), moves a column
     between groups with its checkbox (the last visible one can't be
     hidden; hidden ones list A→Z), mirrors it all on the table, and
     restores the starting state on a [data-hb-columns-reset] button. */
  function cmParts(root) {
    return {
      visible: root.querySelector('[data-hb-columns="visible"]'),
      hidden: root.querySelector('[data-hb-columns="hidden"]'),
      table: document.getElementById(root.getAttribute('data-hb-columns-for')),
      empty: root.querySelector('.hb-column-manager__empty')
    };
  }
  function cmLabel(item) {
    var name = item.querySelector('.hb-column-manager__name');
    return name ? name.textContent.trim() : '';
  }
  function cmShape(item, visible) {
    var box = item.querySelector('.hb-checkbox');
    if (box) box.checked = visible;
    item.setAttribute('draggable', visible ? 'true' : 'false');
    ['hb-column-manager__drag', 'hb-column-manager__move'].forEach(function (cls) {
      var el = item.querySelector('.' + cls);
      if (el) el.hidden = !visible;
    });
    var spacer = item.querySelector('.hb-column-manager__spacer');
    if (spacer) spacer.hidden = visible;
  }

  function cmSync(root) {
    var p = cmParts(root);
    if (!p.visible || !p.hidden) return;
    var visibleItems = dragItems(p.visible);
    // Hidden group: A→Z, no reorder controls
    dragItems(p.hidden).sort(function (a, b) { return cmLabel(a).localeCompare(cmLabel(b)); })
      .forEach(function (item) { cmShape(item, false); p.hidden.appendChild(item); });
    visibleItems.forEach(function (item) { cmShape(item, true); });
    // Never hide the last visible column
    visibleItems.forEach(function (item) {
      var box = item.querySelector('.hb-checkbox');
      if (box) box.disabled = visibleItems.length === 1;
    });
    if (p.empty) p.empty.hidden = dragItems(p.hidden).length > 0;
    syncDragList(p.visible);
    // Mirror on the table: visible columns in order, hidden ones hidden
    if (!p.table) return;
    var order = visibleItems.map(function (item) { return item.getAttribute('data-column'); });
    p.table.querySelectorAll(':scope > thead > tr, :scope > tbody > tr').forEach(function (tr) {
      var cells = {};
      tr.querySelectorAll(':scope > [data-column]').forEach(function (c) { cells[c.getAttribute('data-column')] = c; });
      order.forEach(function (key) { if (cells[key]) { cells[key].hidden = false; tr.appendChild(cells[key]); } });
      Object.keys(cells).forEach(function (key) {
        if (order.indexOf(key) === -1) { cells[key].hidden = true; tr.appendChild(cells[key]); }
      });
    });
  }

  function initColumnManager(root) {
    if (root.hbColumns) return;
    var p = cmParts(root);
    if (!p.visible || !p.hidden) return;
    root.hbColumns = { visible: p.visible.innerHTML, hidden: p.hidden.innerHTML };
    cmSync(root);
  }

  document.addEventListener('hb-reorder', function (e) {
    var root = e.target.closest && e.target.closest('[data-hb-columns-for]');
    if (root) cmSync(root);
  });

  document.addEventListener('change', function (e) {
    var box = e.target;
    if (!box.matches || !box.matches('.hb-column-manager__item .hb-checkbox')) return;
    var root = box.closest('[data-hb-columns-for]');
    if (!root) return;
    var p = cmParts(root);
    var item = box.closest('.hb-column-manager__item');
    if (box.checked) {
      p.visible.appendChild(item); // shown again at the end
      announce(cmLabel(item) + ' shown — moved to Visible Columns');
    } else {
      p.hidden.appendChild(item);
      announce(cmLabel(item) + ' hidden — moved to Hidden Columns');
    }
    cmSync(root);
    if (!box.disabled) box.focus();
  });

  document.addEventListener('click', function (e) {
    var reset = e.target.closest('[data-hb-columns-reset]');
    var root = reset && reset.closest('[data-hb-columns-for]');
    if (!root || !root.hbColumns) return;
    var p = cmParts(root);
    p.visible.innerHTML = root.hbColumns.visible;
    p.hidden.innerHTML = root.hbColumns.hidden;
    cmSync(root);
    announce('Columns reset to their defaults');
  });

  /* ── Modal ──────────────────────────────────────────────────
     .hb-modal-overlay with an id, starting `hidden`, holding a
     .hb-modal[role="dialog"][aria-modal="true"]. A button with
     data-hb-modal-open="<overlay id>" opens it. It closes on the
     __close button, any [data-hb-modal-close] inside it (Cancel, the
     commit button in a prototype), a click on the overlay, or Escape.
     While open, focus moves inside and Tab stays inside; on close it
     returns to the button that opened it. The page behind doesn't
     scroll. An `hb-modal-close` event fires on the overlay with the
     button that closed it ({ detail: { by } }), for a prototype that
     needs to act on the choice.                                      */
  var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), ' +
                  'textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  var openModal = null; // { overlay, trigger }

  function focusables(el) {
    return Array.prototype.filter.call(el.querySelectorAll(FOCUSABLE), function (f) {
      return f.offsetParent !== null || f === document.activeElement;
    });
  }

  function showModal(overlay, trigger) {
    if (openModal) closeModal(); // never stacked
    overlay.hidden = false;
    openModal = { overlay: overlay, trigger: trigger };
    document.documentElement.style.overflow = 'hidden';
    var modal = overlay.querySelector('.hb-modal') || overlay;
    // First field, else the first footer button, else the dialog itself
    var target = modal.querySelector('.hb-modal__body ' + FOCUSABLE.split(', ').join(', .hb-modal__body ')) ||
                 modal.querySelector('.hb-modal__footer button:not([disabled])');
    if (!target) { modal.setAttribute('tabindex', '-1'); target = modal; }
    target.focus();
  }

  function closeModal(by) {
    if (!openModal) return;
    var o = openModal;
    openModal = null;
    o.overlay.hidden = true;
    document.documentElement.style.overflow = '';
    o.overlay.dispatchEvent(new CustomEvent('hb-modal-close', { bubbles: true, detail: { by: by || null } }));
    if (o.trigger && document.contains(o.trigger)) o.trigger.focus();
  }

  document.addEventListener('click', function (e) {
    var opener = e.target.closest('[data-hb-modal-open]');
    if (opener) {
      var overlay = document.getElementById(opener.getAttribute('data-hb-modal-open'));
      if (overlay) showModal(overlay, opener);
      return;
    }
    if (!openModal) return;
    if (e.target === openModal.overlay) { closeModal(); return; }
    var closer = e.target.closest('.hb-modal__close, [data-hb-modal-close]');
    if (closer && openModal.overlay.contains(closer)) closeModal(closer);
  });

  document.addEventListener('keydown', function (e) {
    if (!openModal) return;
    if (e.key === 'Escape') {
      // An open menu or multi select inside the modal closes first
      if (e.defaultPrevented) return;
      e.preventDefault();
      closeModal();
      return;
    }
    if (e.key !== 'Tab') return;
    var items = focusables(openModal.overlay);
    if (!items.length) { e.preventDefault(); return; }
    var first = items[0], last = items[items.length - 1];
    if (e.shiftKey && (document.activeElement === first || !openModal.overlay.contains(document.activeElement))) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  });

  // Set up what needs it — now, and whenever markup is added later
  // (a prototype's script, the docs pages)
  function setUp(root) {
    if (!root.querySelectorAll) return;
    var all = function (sel, fn) {
      if (root.matches && root.matches(sel)) fn(root);
      root.querySelectorAll(sel).forEach(fn);
    };
    all('ul.hb-drag', syncDragList);
    all('[data-hb-columns-for]', initColumnManager);
    all('table[data-hb-resizable]', initResizable);
    all('table', syncSelectAll);
    // A modal written without `hidden` starts open
    all('.hb-modal-overlay', function (overlay) {
      if (!overlay.hidden && !openModal) openModal = { overlay: overlay, trigger: null };
    });
  }
  function watchDom() {
    setUp(document);
    new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        m.addedNodes.forEach(function (n) { if (n.nodeType === 1) setUp(n); });
      });
    }).observe(document.body, { childList: true, subtree: true });
  }

  // Restore remembered states
  function restoreSidenavs() {
    document.querySelectorAll('.hb-sidenav__toggle[data-hb-persist]').forEach(function (toggle) {
      var stored = null;
      try { stored = localStorage.getItem(toggle.getAttribute('data-hb-persist')); } catch (e) {}
      if (stored !== null) setCollapsed(toggle, stored === '1');
    });
  }
  function init() { restoreSidenavs(); watchDom(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
