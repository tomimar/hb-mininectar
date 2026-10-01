/* ============================================================
   hb-mininectar — Component guidelines on docs pages
   The text of each component lives once, in components/<name>.md.
   A docs page shows it with:
     <p class="page-header__desc" data-hb-guide-summary></p>   ← first line
     <div class="guide" data-hb-guide="button.md"></div>       ← the rest
   Needs marked (cdnjs) loaded before this script.
   ============================================================ */
(function () {
  var target = document.querySelector('[data-hb-guide]');
  if (!target) return;
  var file = target.getAttribute('data-hb-guide');
  var summary = document.querySelector('[data-hb-guide-summary]');

  fetch(file)
    .then(function (res) {
      if (!res.ok) throw new Error(res.status);
      return res.text();
    })
    .then(function (md) {
      // First line = one-sentence summary → page header
      var split = md.indexOf('\n');
      var first = split === -1 ? md : md.slice(0, split);
      var rest = split === -1 ? '' : md.slice(split + 1);
      if (summary) summary.innerHTML = marked.parseInline(first.trim());
      target.innerHTML = marked.parse(rest);
      // Tables get the docs table look
      target.querySelectorAll('table').forEach(function (table) {
        var wrap = document.createElement('div');
        wrap.className = 'state-table-wrap';
        table.classList.add('state-table');
        table.parentNode.insertBefore(wrap, table);
        wrap.appendChild(table);
      });
    })
    .catch(function () {
      // file:// can't fetch — point to the published page instead
      target.innerHTML =
        '<p class="hb-text-body">The guidelines load when this page is served over http. ' +
        '<a class="hb-link" href="https://tomimar.github.io/hb-mininectar/components/' +
        location.pathname.split('/').pop() + '">Open it on the docs site</a>.</p>';
    });
})();
