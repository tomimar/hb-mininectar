/* ============================================================
   hb-mininectar — DatePicker (vanilla JS, no dependencies)

   Usage:
     <div class="hb-date-input" data-hb-datepicker style="position:relative;">
       <input type="text" class="hb-input" placeholder="MM/DD/YYYY" style="padding-right:40px;">
       <svg class="hb-date-input__icon" ...><!-- calendar icon --></svg>
     </div>

   - Click/focus the input to open the calendar.
   - Type a date (MM/DD/YYYY) — slashes are inserted automatically.
   - Click a day to fill the field; click the month label to switch to year view.
   - Value is always formatted as MM/DD/YYYY.
   ============================================================ */
(function () {
  var MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

  function pad(n) { return String(n).padStart(2, '0'); }
  function fmt(d) { return pad(d.getMonth() + 1) + '/' + pad(d.getDate()) + '/' + d.getFullYear(); }
  function sameDay(a, b) {
    return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }

  function enhance(wrap) {
    var input = wrap.querySelector('input');
    if (!input) return;
    wrap.style.position = wrap.style.position || 'relative';

    var state = {
      view: 'day',
      open: false,
      selected: null,
      viewYear: new Date().getFullYear(),
      viewMonth: new Date().getMonth(),
    };

    var panel = document.createElement('div');
    panel.className = 'hb-datepicker';
    panel.style.display = 'none';
    wrap.appendChild(panel);

    // Parse any pre-filled value
    function syncFromInput() {
      var m = input.value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
      if (m) {
        var d = new Date(+m[3], +m[1] - 1, +m[2]);
        if (!isNaN(d) && d.getMonth() === +m[1] - 1) {
          state.selected = d;
          state.viewYear = d.getFullYear();
          state.viewMonth = d.getMonth();
        }
      }
    }
    syncFromInput();

    function iconBtn(dir) {
      var path = dir === 'prev' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7';
      return '<button type="button" class="hb-datepicker__nav-btn" data-nav="' + dir + '">' +
        '<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="' + path + '"/></svg></button>';
    }

    function renderDay() {
      var today = new Date();
      var first = new Date(state.viewYear, state.viewMonth, 1);
      var startDow = (first.getDay() + 6) % 7; // Monday-first
      var daysInMonth = new Date(state.viewYear, state.viewMonth + 1, 0).getDate();
      var prevDays = new Date(state.viewYear, state.viewMonth, 0).getDate();

      var html = '';
      // Header
      html += '<div class="hb-datepicker__header">';
      html += '<button type="button" class="hb-datepicker__month-btn" data-toggle="year">' +
        '<span>' + MONTHS[state.viewMonth] + ', ' + state.viewYear + '</span>' +
        '<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg></button>';
      html += '<div class="hb-datepicker__nav">' + iconBtn('prev') + iconBtn('next') + '</div>';
      html += '</div>';

      // Grid
      html += '<div class="hb-datepicker__grid">';
      DAYS.forEach(function (d) { html += '<div class="hb-datepicker__label">' + d + '</div>'; });

      // leading days (previous month)
      for (var i = startDow; i > 0; i--) {
        html += '<button type="button" class="hb-datepicker__day hb-datepicker__day--other-month" data-day="' + (prevDays - i + 1) + '" data-month="-1">' + (prevDays - i + 1) + '</button>';
      }
      // current month days
      for (var day = 1; day <= daysInMonth; day++) {
        var cur = new Date(state.viewYear, state.viewMonth, day);
        var cls = 'hb-datepicker__day';
        if (sameDay(cur, state.selected)) cls += ' hb-datepicker__day--selected';
        else if (sameDay(cur, today)) cls += ' hb-datepicker__day--today';
        html += '<button type="button" class="' + cls + '" data-day="' + day + '" data-month="0">' + day + '</button>';
      }
      // trailing days to complete the last week
      var totalCells = startDow + daysInMonth;
      var trailing = (7 - (totalCells % 7)) % 7;
      for (var t = 1; t <= trailing; t++) {
        html += '<button type="button" class="hb-datepicker__day hb-datepicker__day--other-month" data-day="' + t + '" data-month="1">' + t + '</button>';
      }
      html += '</div>';

      // Today button
      html += '<button type="button" class="hb-datepicker__today" data-today="1">Today</button>';

      panel.innerHTML = html;
    }

    function renderYear() {
      var start = state.viewYear - 11;
      var html = '';
      html += '<div class="hb-datepicker__header">';
      html += '<button type="button" class="hb-datepicker__month-btn" data-toggle="day">' +
        '<span>' + MONTHS[state.viewMonth] + ', ' + state.viewYear + '</span>' +
        '<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/></svg></button>';
      html += '</div>';
      html += '<div class="hb-datepicker__year-grid">';
      for (var i = 0; i < 24; i++) {
        var y = start + i;
        var cls = 'hb-datepicker__year' + (y === state.viewYear ? ' hb-datepicker__year--selected' : '');
        html += '<button type="button" class="' + cls + '" data-year="' + y + '">' + y + '</button>';
      }
      html += '</div>';
      panel.innerHTML = html;
    }

    function render() {
      if (state.view === 'year') renderYear();
      else renderDay();
    }

    function openPanel() {
      if (state.open) return;
      syncFromInput();
      state.view = 'day';
      state.open = true;
      panel.style.display = 'block';
      render();
    }
    function closePanel() {
      state.open = false;
      panel.style.display = 'none';
    }

    function selectDate(d) {
      state.selected = d;
      input.value = fmt(d);
      input.dispatchEvent(new Event('change', { bubbles: true }));
      closePanel();
    }

    // ── Events ──
    input.addEventListener('focus', openPanel);
    input.addEventListener('click', openPanel);

    // Auto-format typing → MM/DD/YYYY
    input.addEventListener('input', function () {
      var digits = input.value.replace(/\D/g, '').slice(0, 8);
      var out = digits;
      if (digits.length > 4) out = digits.slice(0, 2) + '/' + digits.slice(2, 4) + '/' + digits.slice(4);
      else if (digits.length > 2) out = digits.slice(0, 2) + '/' + digits.slice(2);
      input.value = out;
      if (digits.length === 8) {
        var mm = +digits.slice(0, 2), dd = +digits.slice(2, 4), yyyy = +digits.slice(4);
        var d = new Date(yyyy, mm - 1, dd);
        if (!isNaN(d) && d.getMonth() === mm - 1) {
          state.selected = d;
          state.viewYear = yyyy;
          state.viewMonth = mm - 1;
          if (state.open) render();
        }
      }
    });

    // Delegate clicks inside the panel
    panel.addEventListener('mousedown', function (e) { e.preventDefault(); }); // keep input focus
    panel.addEventListener('click', function (e) {
      var t = e.target.closest('button');
      if (!t) return;

      if (t.dataset.toggle === 'year') { state.view = 'year'; render(); return; }
      if (t.dataset.toggle === 'day')  { state.view = 'day';  render(); return; }
      if (t.dataset.nav === 'prev') {
        if (state.viewMonth === 0) { state.viewMonth = 11; state.viewYear--; } else state.viewMonth--;
        render(); return;
      }
      if (t.dataset.nav === 'next') {
        if (state.viewMonth === 11) { state.viewMonth = 0; state.viewYear++; } else state.viewMonth++;
        render(); return;
      }
      if (t.dataset.today) {
        var n = new Date();
        state.viewYear = n.getFullYear();
        state.viewMonth = n.getMonth();
        selectDate(new Date(n.getFullYear(), n.getMonth(), n.getDate()));
        return;
      }
      if (t.dataset.year) {
        state.viewYear = +t.dataset.year;
        state.view = 'day';
        render(); return;
      }
      if (t.dataset.day) {
        var monthOffset = +t.dataset.month;
        var d = new Date(state.viewYear, state.viewMonth + monthOffset, +t.dataset.day);
        selectDate(d);
        return;
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (state.open && !wrap.contains(e.target)) closePanel();
    });
    // Close on Escape
    input.addEventListener('keydown', function (e) { if (e.key === 'Escape') closePanel(); });
  }

  function init() {
    document.querySelectorAll('[data-hb-datepicker]').forEach(enhance);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
