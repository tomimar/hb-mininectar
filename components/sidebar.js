/* ============================================================
   hb-mininectar — Universal sidebar
   Inject into <aside class="sidenav" id="hb-sidebar"></aside>
   Add a new section/component here once — every page updates.
   ============================================================ */
(function () {
  function build() {
    var el = document.getElementById('hb-sidebar');
    if (!el) return;

    var path = window.location.pathname;
    var inComponents = path.indexOf('/components/') !== -1;
    var prefix = inComponents ? '' : 'components/';
    var introHref = inComponents ? '../index.html' : 'index.html';
    var current = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

    // Foundations: [label, href, matchFilename]
    var foundations = [
      ['Introduction', introHref, 'index.html'],
      ['Colors',        prefix + 'colors.html',        'colors.html'],
      ['Spacing',       prefix + 'spacing.html',       'spacing.html'],
      ['Border radius', prefix + 'border-radius.html', 'border-radius.html'],
      ['Elevation',     prefix + 'elevation.html',     'elevation.html'],
      ['Typography',    prefix + 'typography.html',    'typography.html'],
      ['Icons',         prefix + 'icons.html',         'icons.html'],
    ];

    // Components: [label, filename]
    var components = [
      ['Avatar',          'avatar.html'],
      ['Button',          'button.html'],
      ['Floating action', 'floating-action.html'],
      ['Tag',             'tag.html'],
      ['Input',           'input.html'],
      ['Search input',    'search-input.html'],
      ['Textarea',        'textarea.html'],
      ['Select',          'select.html'],
      ['Date input',      'date-input.html'],
      ['Checkbox',        'checkbox.html'],
      ['Radio',           'radio.html'],
      ['Toggle',          'toggle.html'],
      ['Table',           'table.html'],
      ['Drag',            'drag.html'],
      ['Sidenav',         'sidenav.html'],
      ['Popup select',    'popup-select.html'],
      ['Link',            'link.html'],
      ['Modal',           'modal.html'],
      ['Tooltip',         'tooltip.html'],
      ['Alert',           'alert.html'],
      ['Toast',           'toast.html'],
      ['Loader',          'loader.html'],
    ];

    var html = '';

    // Wordmark + beta badge
    html += '<div class="sidenav__back" style="gap: var(--spacing-8);">';
    html += '<span class="hb-text-body-bold" style="color: var(--ui-text);">Mini Nectar</span>';
    html += '<span class="hb-text-caption-bold" style="background: var(--ui-expressive-blue-soft); color: var(--ui-expressive-blue-contrast); padding: 0 var(--spacing-8); border-radius: var(--border-radius-round);">beta</span>';
    html += '</div>';

    // Foundations
    html += '<div class="sidenav__section hb-text-all-caps">Foundations</div>';
    foundations.forEach(function (f) {
      var active = (f[2] === current) ? ' sidenav__link--active' : '';
      html += '<a href="' + f[1] + '" class="sidenav__link hb-text-body' + active + '">' + f[0] + '</a>';
    });

    // Components
    html += '<div class="sidenav__section hb-text-all-caps" style="margin-top: var(--spacing-16);">Components</div>';
    components.forEach(function (c) {
      var active = (c[1] === current) ? ' sidenav__link--active' : '';
      html += '<a href="' + prefix + c[1] + '" class="sidenav__link hb-text-body' + active + '">' + c[0] + '</a>';
    });

    el.innerHTML = html;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
