/* ============================================================
   Hummingbird Design System — Component behaviour
   Plain JavaScript, no dependencies. Include it once:
     <script src="https://tomimar.github.io/hb-mininectar/hb.js"></script>
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
    if (!el.hasAttribute('data-label-closed')) {
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
})();
