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

  // Restore remembered states
  function restoreSidenavs() {
    document.querySelectorAll('.hb-sidenav__toggle[data-hb-persist]').forEach(function (toggle) {
      var stored = null;
      try { stored = localStorage.getItem(toggle.getAttribute('data-hb-persist')); } catch (e) {}
      if (stored !== null) setCollapsed(toggle, stored === '1');
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', restoreSidenavs);
  else restoreSidenavs();
})();
