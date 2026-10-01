#!/usr/bin/env python3
"""Build the Claude Design artifact's component files from the repo.

    python3 scripts/build_bundle.py <dir>/project/components

Writes two files into that folder:
  bundle.css — the font imports + components.css (the artifact generates
               its own tokens.css from tokens.json)
  bundle.js  — hb.js + datepicker.js, so components behave the same in Claude Design
               prototypes and previews. The artifact expects the bundle to
               define window.<namespace> ("Nectar").
"""
import pathlib
import sys

from build_tokens import IMPORTS, ROOT

NAMESPACE = "Nectar"


def main():
    if len(sys.argv) != 2:
        sys.exit("usage: python3 scripts/build_bundle.py <dir>/project/components")
    out = pathlib.Path(sys.argv[1])
    out.mkdir(parents=True, exist_ok=True)

    imports = "\n".join(f"@import url('{url}');" for url in IMPORTS)
    css = imports + "\n\n" + (ROOT / "components.css").read_text()
    (out / "bundle.css").write_text(css)

    # hb.js + datepicker.js: everything a prototype needs to behave
    js = (ROOT / "hb.js").read_text() + "\n\n" + (ROOT / "datepicker.js").read_text()
    # The artifact inlines bundle.js in a <script>: these would break it
    for bad in ("</script", "<!--"):
        if bad in js.lower():
            sys.exit(f"hb.js or datepicker.js contains {bad!r}, which can't be inlined in a <script>")
    # Line 1: the header the artifact reads to recognise and load the bundle.
    # No React components are exported — hb.js only adds behaviour.
    header = '/* @ds-bundle: {"format":4,"namespace":"%s","components":[]} */\n' % NAMESPACE
    js = header + js + f"\nwindow.{NAMESPACE} = window.{NAMESPACE} || {{ behaviour: 'hb.js' }};\n"
    (out / "bundle.js").write_text(js)

    print(f"Wrote {out / 'bundle.css'} and {out / 'bundle.js'}")


if __name__ == "__main__":
    main()
