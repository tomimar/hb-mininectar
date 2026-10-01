/* ============================================================
   hb-mininectar — Foundations pages, rendered from the sources
   A foundation page has no content of its own:
     <p class="page-header__desc" data-hb-section-summary></p>
     <div class="guide" data-hb-guidelines="Color"></div>   ← that "## Color"
                                                              section of
                                                              guidelines.md
     <div class="guide" data-hb-tokens="color"></div>       ← tokens.json
   Families: color · spacing · radius · shadow · type.
   Needs marked (cdnjs) loaded before this script.
   ============================================================ */
(function () {
  var ROOT = '../';

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function code(s) { return '<code>' + esc(s) + '</code>'; }
  function table(head, rows) {
    return '<div class="state-table-wrap"><table class="state-table tokens-table"><thead><tr>' +
      head.map(function (h) { return '<th>' + h + '</th>'; }).join('') +
      '</tr></thead><tbody>' + rows.join('') + '</tbody></table></div>';
  }
  function row(cells) { return '<tr>' + cells.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }
  function usage(t) { return t.usage ? esc(t.usage) : ''; }

  /* The guidance: one "## Section" of guidelines.md */
  function renderGuidelines(el, md) {
    var name = el.getAttribute('data-hb-guidelines');
    var parts = md.split(/^## /m);
    var section = parts.filter(function (p) { return p.split('\n')[0].trim() === name; })[0];
    if (!section) { el.innerHTML = '<p>Section “' + esc(name) + '” not found in guidelines.md.</p>'; return; }
    var body = section.slice(section.indexOf('\n') + 1).trim();
    el.innerHTML = marked.parse(body);
    var summary = document.querySelector('[data-hb-section-summary]');
    if (summary && !summary.textContent) {
      var first = body.split('\n\n')[0];
      summary.innerHTML = marked.parseInline(first.split(/(?<=\.)\s/)[0]);
    }
  }

  /* Colors, grouped the way tokens.css is (scripts/build_tokens.py) */
  function colorGroup(name) {
    if (/^ui-(bg|border|disabled)/.test(name)) return 'Scaffolding';
    if (/^ui-(text|icon)/.test(name)) return 'Text and icons';
    if (/^ui-interaction/.test(name)) return 'Interaction';
    var m = name.match(/^ui-status-(\w+)/);
    if (m) return 'Status: ' + m[1];
    m = name.match(/^ui-expressive-(.+?)(-contrast|-soft)?$/);
    if (m) return 'Expressive: ' + m[1].replace(/-/g, ' ');
    return 'Other';
  }
  function swatch(value, label) {
    return '<span class="tokens-swatch" style="background:' + esc(value) + '" title="' + esc(label) + '"></span>';
  }
  function renderColor(t) {
    var themes = t.color.themes.map(function (th) { return th.id; });
    var groups = [], byName = {};
    t.color.tokens.forEach(function (tok) {
      var g = colorGroup(tok.name);
      if (!byName[g]) { byName[g] = []; groups.push(g); }
      byName[g].push(tok);
    });
    return groups.map(function (g) {
      var rows = byName[g].map(function (tok) {
        var v = typeof tok.value === 'string' ? { light: tok.value } : tok.value;
        var light = v[themes[0]], dark = v[themes[1]] || light;
        return row([
          swatch(light, 'Light') + swatch(dark, 'Dark'),
          code('--' + tok.name),
          esc(light) + (dark !== light ? '<br><span class="tokens-muted">' + esc(dark) + ' dark</span>' : ''),
          usage(tok)
        ]);
      });
      return '<h3>' + esc(g.charAt(0).toUpperCase() + g.slice(1)) + '</h3>' +
        table(['Light · dark', 'Token', 'Value', 'Use it for'], rows);
    }).join('');
  }

  function renderSpacing(t) {
    return table(['Token', 'Value', '', 'Use it for'], t.spacing.tokens.map(function (tok) {
      return row([code('--' + tok.name), esc(tok.value),
        '<span class="tokens-bar" style="width:' + esc(tok.value) + '"></span>', usage(tok)]);
    }));
  }

  function renderRadius(t) {
    return table(['', 'Token', 'Value', 'Use it for'], t.radius.tokens.map(function (tok) {
      return row(['<span class="tokens-radius" style="border-radius:' + esc(tok.value) + '"></span>',
        code('--' + tok.name), esc(tok.value), usage(tok)]);
    }));
  }

  function renderShadow(t) {
    return table(['', 'Token', 'Value', 'Use it for'], t.shadow.tokens.map(function (tok) {
      var v = typeof tok.value === 'string' ? tok.value : tok.value.light;
      return row(['<span class="tokens-shadow" style="box-shadow:var(--' + esc(tok.name) + ')"></span>',
        code('--' + tok.name), code(v), usage(tok)]);
    }));
  }

  function renderType(t) {
    var html = '';
    t.type.groups.forEach(function (g) {
      html += table(['Sample', 'Class', 'Size · line · weight', 'Use it for'], g.styles.map(function (st) {
        var spec = esc(st.fontSize) + ' · ' + esc(st.lineHeight) + ' · ' + esc(st.fontWeight) +
          (st.letterSpacing && st.letterSpacing !== '0px' ? ' · ' + esc(st.letterSpacing) + ' tracking' : '');
        return row(['<span class="' + esc(st.name) + '">Escalate case 4128</span>', code(st.name), spec, usage(st)]);
      }));
    });
    html += '<h3>Families</h3>' + table(['Sample', 'Token', 'Stack'], Object.keys(t.type.families).map(function (k) {
      var token = k === 'family' ? 'font-family' : 'font-' + k;
      return row(['<span style="font-family:var(--' + token + ')">ACC-0048 1a2b3c</span>', code('--' + token), esc(t.type.families[k])]);
    }));
    html += '<h3>Primitives</h3>' + table(['Token', 'Value', 'Use it for'],
      ['fontSize', 'fontWeight', 'lineHeight', 'tracking'].reduce(function (rows, fam) {
        return rows.concat((t[fam] ? t[fam].tokens : []).map(function (tok) {
          return row([code('--' + tok.name), esc(tok.value), usage(tok)]);
        }));
      }, []));
    return html;
  }

  var RENDER = { color: renderColor, spacing: renderSpacing, radius: renderRadius, shadow: renderShadow, type: renderType };

  var guide = document.querySelector('[data-hb-guidelines]');
  var tokens = document.querySelector('[data-hb-tokens]');

  if (guide) {
    fetch(ROOT + 'guidelines.md').then(function (r) { return r.text(); })
      .then(function (md) { renderGuidelines(guide, md); })
      .catch(function () { guide.innerHTML = '<p>The guidelines load when this page is served over http.</p>'; });
  }
  if (tokens) {
    fetch(ROOT + 'tokens.json').then(function (r) { return r.json(); })
      .then(function (t) { tokens.innerHTML = RENDER[tokens.getAttribute('data-hb-tokens')](t); })
      .catch(function () { tokens.innerHTML = '<p>The tokens load when this page is served over http.</p>'; });
  }
})();
