#!/usr/bin/env python3
"""Check component behaviour on the docs site with Playwright.

    python3 scripts/check_docs.py [base-url] [--shots <dir>]

base-url defaults to http://127.0.0.1:8765 (the "docs" server in
.claude/launch.json, or `python3 -m http.server 8765` from the repo root).
--shots saves screenshots (light, dark, forced colors) to look at.

Needs Playwright, once, in a venv outside the repo:
    python3 -m venv ~/.venvs/hb && ~/.venvs/hb/bin/pip install playwright
    ~/.venvs/hb/bin/python -m playwright install chromium
then run this script with ~/.venvs/hb/bin/python.

Two traps this script avoids, keep avoiding them when adding checks:
- Positions: getBoundingClientRect is relative to the viewport, and ticking
  a checkbox scrolls it into view. Compare positions in the document
  (rect.top + scrollY), never bounding_box().
- Colours: buttons transition for 120ms. Wait for it (settle()) before
  reading computed colours or taking a screenshot.

Exits 1 if any check fails.
"""
import sys

from playwright.sync_api import sync_playwright

args = [a for a in sys.argv[1:]]
shots = None
if "--shots" in args:
    i = args.index("--shots")
    shots = args[i + 1]
    del args[i:i + 2]
BASE = (args[0] if args else "http://127.0.0.1:8765").rstrip("/")

failed = []


def check(name, cond, extra=""):
    print(("PASS " if cond else "FAIL ") + name + (f"  [{extra}]" if extra != "" else ""))
    if not cond:
        failed.append(name)


def table_toolbar(pg):
    """Table → Batch actions: selection mode, min selection, clear, announcements."""
    pg.goto(BASE + "/components/table.html")
    pg.wait_for_selector("#batch-cases")
    settle = lambda: pg.wait_for_timeout(300)
    bar = pg.locator('.hb-table-toolbar[data-hb-toolbar-for="batch-cases"]')
    controls = bar.locator(".hb-table-toolbar__controls")
    sel = bar.locator(".hb-table-toolbar__selection")
    count = sel.locator(".hb-table-toolbar__count")
    allbox = pg.locator("#batch-cases thead .hb-checkbox")
    rows = pg.locator("#batch-cases tbody .hb-checkbox")
    merge = bar.locator("[data-hb-min-selection]")
    reason = pg.locator("#" + merge.get_attribute("aria-describedby"))
    clear = bar.locator("[data-hb-selection-clear]")
    focused = "e => document.activeElement === e"
    doc_top = lambda: pg.locator("#batch-cases").evaluate("e => e.getBoundingClientRect().top + window.scrollY")
    pg.evaluate("""() => { window.__msgs = []; let lr = document.getElementById('hb-live-region');
      if (!lr) { hbAnnounce(''); lr = document.getElementById('hb-live-region'); }
      new MutationObserver(() => { if (lr.textContent) window.__msgs.push(lr.textContent); })
        .observe(lr, {childList: true, characterData: true, subtree: true}); }""")
    msgs = lambda: (pg.wait_for_timeout(700), pg.evaluate("window.__msgs.splice(0)"))[1]

    check("starts in controls mode", controls.is_visible() and not sel.is_visible())
    check("toolbar is a control-height-lg row", bar.bounding_box()["height"] == 40, bar.bounding_box()["height"])
    top = doc_top()

    rows.nth(0).check()
    check("1 row → selection mode", sel.is_visible() and not controls.is_visible())
    check("count is singular", count.inner_text() == "1 case selected", count.inner_text())
    check("select all is indeterminate", allbox.evaluate("e => e.indeterminate && !e.checked"))
    check("the table did not move", doc_top() == top, f"{top} → {doc_top()}")
    check("min-2 action is aria-disabled, not [disabled]",
          merge.get_attribute("aria-disabled") == "true" and merge.get_attribute("disabled") is None)
    check("its reason is shown and linked", not reason.evaluate("e => e.hidden")
          and merge.get_attribute("aria-describedby") == reason.get_attribute("id"))
    hit = merge.evaluate("e => { let hit = false; e.addEventListener('click', () => hit = true); e.click(); return hit; }")
    check("clicks on it are swallowed", not hit)
    check("announced once", msgs() == ["1 case selected"])

    rows.nth(1).check()
    check("count is plural", count.inner_text() == "2 cases selected", count.inner_text())
    check("min-2 action enabled at 2", merge.get_attribute("aria-disabled") is None
          and merge.get_attribute("aria-describedby") is None and reason.evaluate("e => e.hidden"))
    msgs()

    rows.nth(2).check(); rows.nth(3).check(); allbox.check()
    check("rapid changes announce once, with the final count", msgs() == ["5 cases selected"])

    menu_btn = bar.locator('[aria-haspopup="menu"]').first
    menu = pg.locator("#" + menu_btn.get_attribute("aria-controls"))
    menu_btn.click()
    check("action menu opens", menu.is_visible())
    pg.keyboard.press("Escape")
    check("Escape closes it", not menu.is_visible())

    clear.click()
    check("Clear selection → controls back", controls.is_visible() and not sel.is_visible())
    check("every row unticked", rows.evaluate_all("els => els.every(e => !e.checked)"))
    check("select all reset", allbox.evaluate("e => !e.checked && !e.indeterminate"))
    check("focus on select all", allbox.evaluate(focused))
    check("announced 'Selection cleared'", msgs() == ["Selection cleared"])
    check("the table did not move after clearing", doc_top() == top)

    controls.locator("input, button").first.focus()
    rows.nth(0).evaluate("b => { b.checked = true; b.dispatchEvent(new Event('change', {bubbles: true})); }")
    check("focus never left on a hidden slot", allbox.evaluate(focused))

    if shots:
        region = pg.locator("#batch-cases").locator("xpath=../..")
        bar.scroll_into_view_if_needed()
        merge.focus(); settle()
        region.screenshot(path=f"{shots}/toolbar-light.png")
        pg.emulate_media(forced_colors="active"); settle()
        region.screenshot(path=f"{shots}/toolbar-forced-colors.png")
        pg.emulate_media(forced_colors="none")
        pg.evaluate("document.documentElement.setAttribute('data-theme', 'dark')")
        rows.nth(1).check(); settle()
        region.screenshot(path=f"{shots}/toolbar-dark.png")
        pg.evaluate("document.documentElement.removeAttribute('data-theme')")
    clear.click()

    wf = pg.locator('.hb-table-toolbar[data-hb-toolbar-for="workflows"]')
    wf.locator('[aria-controls="workflows-columns"]').click()
    check("Columns panel opens from its toolbar", pg.locator("#workflows-columns").is_visible())
    pg.keyboard.press("Escape")


with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1280, "height": 900})
    page.set_default_timeout(3000)  # a broken component fails fast instead of hanging 30s
    errors = []
    page.on("pageerror", lambda e: errors.append(str(e)))
    for scenario in (table_toolbar,):
        try:
            scenario(page)
        except Exception as e:  # a step that can't run: report it and go on
            check(f"{scenario.__name__} stopped", False, str(e).splitlines()[0])
    check("no page errors", not errors, errors)
    browser.close()

print(f"{len(failed)} failed" if failed else "All checks pass")
sys.exit(1 if failed else 0)
