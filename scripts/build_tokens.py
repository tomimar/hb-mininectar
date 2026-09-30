#!/usr/bin/env python3
"""Generate tokens.css from tokens.json — the single source of truth.

    python3 scripts/build_tokens.py

Never edit tokens.css by hand: change tokens.json and run this script.
Light values go in :root; dark values go in [data-theme="dark"].
"""
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "tokens.json"
OUT = ROOT / "tokens.css"

IMPORTS = [
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Roboto+Mono:wght@400&display=swap",
    "https://fonts.googleapis.com/icon?family=Material+Icons+Outlined|Material+Icons+Round",
]

# Non-color families, in the order they are written, with their heading.
FAMILIES = [
    ("fontSize", "Font size"),
    ("iconSize", "Icon size"),
    ("lineHeight", "Line height"),
    ("fontWeight", "Font weight"),
    ("tracking", "Letter spacing"),
    ("spacing", "Spacing"),
    ("radius", "Border radius"),
    ("shadow", "Elevation"),
]


def color_group(name):
    """Heading a color token is listed under, derived from its name."""
    if re.match(r"ui-(bg|border|disabled)", name):
        return "Scaffolding"
    if re.match(r"ui-(text|icon)", name):
        return "Foreground"
    if name.startswith("ui-interaction"):
        return "Interaction"
    m = re.match(r"ui-status-(\w+)", name)
    if m:
        return "Status: " + m.group(1).capitalize()
    m = re.match(r"ui-expressive-(.+?)(-contrast|-soft)?$", name)
    if m:
        return "Expressive: " + m.group(1).replace("-", " ").capitalize()
    return "Other"


def heading(title, indent="  "):
    rule = "─" * max(3, 46 - len(title))
    return f"{indent}/* ── {title} {rule} */"


def block(selector, groups, preamble=()):
    """groups: list of (title, [(name, value)])"""
    width = max(len(n) for _, rows in groups for n, _ in rows) + 3
    lines = [selector + " {", *[f"  {line}" for line in preamble]]
    for title, rows in groups:
        lines.append("")
        lines.append(heading(title))
        for name, value in rows:
            lines.append(f"  {('--' + name + ':').ljust(width)} {value};")
    lines.append("")
    lines.append("}")
    return "\n".join(lines)


def main():
    data = json.loads(SRC.read_text())
    themes = [t["id"] for t in data["color"]["themes"]]
    base = themes[0]

    light, dark = [], {}
    families = data["type"]["families"]
    light.append(("Font family", [
        ("font-family", families["family"]),
        ("font-mono", families["mono"]),
    ]))
    for key, title in FAMILIES:
        light.append((title, [(t["name"], t["value"]) for t in data[key]["tokens"]]))

    for t in data["color"]["tokens"]:
        value = t["value"]
        values = value if isinstance(value, dict) else {base: value}
        group = color_group(t["name"])
        if not light or light[-1][0] != group:
            light.append((group, []))
        light[-1][1].append((t["name"], values[base]))
        for theme in themes[1:]:
            if theme in values and values[theme] != values[base]:
                dark.setdefault(group, []).append((t["name"], values[theme]))

    parts = [
        "/* ============================================================",
        "   Hummingbird Design System — Tokens",
        "   GENERATED from tokens.json — do not edit by hand.",
        "   Change tokens.json, then run: python3 scripts/build_tokens.py",
        "",
        '   Dark mode: add data-theme="dark" to <html>.',
        "   ============================================================ */",
        "",
        *[f"@import url('{url}');" for url in IMPORTS],
        "",
        block(":root", light),
        "",
        block('[data-theme="dark"]', list(dark.items()), preamble=["color-scheme: dark;"]),
        "",
    ]
    OUT.write_text("\n".join(parts))
    print(f"Wrote {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
