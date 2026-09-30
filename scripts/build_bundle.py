#!/usr/bin/env python3
"""Build the Claude Design artifact's bundle.css from components.css.

    python3 scripts/build_bundle.py <out-path>

The artifact generates its own tokens.css from tokens.json, so its bundle
only needs the font imports followed by components.css.
"""
import pathlib
import sys

from build_tokens import IMPORTS, ROOT


def main():
    if len(sys.argv) != 2:
        sys.exit("usage: python3 scripts/build_bundle.py <out-path>")
    out = pathlib.Path(sys.argv[1])
    out.parent.mkdir(parents=True, exist_ok=True)
    imports = "\n".join(f"@import url('{url}');" for url in IMPORTS)
    out.write_text(imports + "\n\n" + (ROOT / "components.css").read_text())
    print(f"Wrote {out}")


if __name__ == "__main__":
    main()
