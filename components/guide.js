/* ============================================================
   hb-mininectar — Component docs pages, rendered from the .md
   Everything about a component (text and examples) lives once, in
   components/<name>.md. A docs page is a template:
     <p class="page-header__desc" data-hb-guide-summary></p>   ← first line
     <div class="guide" data-hb-guide="button.md"></div>       ← the rest
   A fenced block tagged `html preview` renders as a live example
   followed by its code. Needs marked (cdnjs) loaded before this script;
   hb.js gives the rendered examples their behaviour by itself.
   ============================================================ */
(function () {
  var target = document.querySelector('[data-hb-guide]');
  if (!target) return;
  var file = target.getAttribute('data-hb-guide');
  var summary = document.querySelector('[data-hb-guide-summary]');

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  marked.use({
    renderer: {
      code: function (code, info) {
        if ((info || '').trim() !== 'html preview') return false; // default rendering
        return '<div class="preview">' + code + '</div>' +
               '<div class="code-block"><pre>' + escapeHtml(code) + '</pre></div>';
      }
    }
  });

  // Example links (href="#") would jump to the top of the page: keep them still
  target.addEventListener('click', function (e) {
    var link = e.target.closest('.preview a[href="#"]');
    if (link) e.preventDefault();
  });

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
        if (table.closest('.preview')) return; // example tables keep their own look
        var wrap = document.createElement('div');
        wrap.className = 'state-table-wrap';
        table.classList.add('state-table');
        table.parentNode.insertBefore(wrap, table);
        wrap.appendChild(table);
      });
      // Interactive examples need no extra step: hb.js listens on the
      // document and sets up markup added after it starts.
    })
    .catch(function () {
      // file:// can't fetch — point to the published page instead
      target.innerHTML =
        '<p class="hb-text-body">The guidelines load when this page is served over http. ' +
        '<a class="hb-link" href="https://tomimar.github.io/hb-mininectar/components/' +
        location.pathname.split('/').pop() + '">Open it on the docs site</a>.</p>';
    });
})();
