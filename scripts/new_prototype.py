#!/usr/bin/env python3
"""Start a prototype from a template, pinned to a Mini Nectar version.

    python3 scripts/new_prototype.py <folder> [--template blank|case-tab]
                                              [--version v1.0.0]
                                              [--offline] [--zip]

- Copies templates/<template>/ into <folder>.
- Pins every Mini Nectar link to one release through jsDelivr
  (cdn.jsdelivr.net/gh/tomimar/hb-mininectar@<version>/…), so later
  changes to the design system never change a prototype already shared.
  The version defaults to the latest release tag.
- --offline copies everything the prototype loads into <folder>/vendor/
  — Mini Nectar at that version, the Inter / Roboto Mono / Material Icons
  fonts, Tailwind and Alpine — so it opens with no internet. This step
  downloads the fonts, Tailwind and Alpine once, from Google Fonts,
  cdn.tailwindcss.com and cdn.jsdelivr.net.
- --zip writes <folder>.zip next to the folder, ready to share.
"""
import argparse
import pathlib
import re
import shutil
import subprocess
import sys
import urllib.request
import zipfile

ROOT = pathlib.Path(__file__).resolve().parent.parent
LIVE = "https://tomimar.github.io/hb-mininectar/"
PINNED = "https://cdn.jsdelivr.net/gh/tomimar/hb-mininectar@{version}/"
DS_FILES = ["tokens.css", "components.css", "hb.js", "datepicker.js"]
TAILWIND = "https://cdn.tailwindcss.com"
ALPINE_TAG = "https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"
ALPINE_PINNED = "https://cdn.jsdelivr.net/npm/alpinejs@3.14.1/dist/cdn.min.js"
# A desktop browser UA, so Google Fonts answers with woff2
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"


def git(*args):
    return subprocess.run(["git", "-C", str(ROOT), *args], check=True,
                          capture_output=True, text=True).stdout


def latest_release():
    tags = git("tag", "--list", "v*", "--sort=-v:refname").split()
    if not tags:
        sys.exit("No release tag yet. Create one with: python3 scripts/release.py 1.0.0 \"First release\"")
    return tags[0]


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read()


def vendor_fonts(tokens_css, vendor):
    """Replace tokens.css's Google Fonts @imports with local font files."""
    fonts_dir = vendor / "fonts"
    fonts_dir.mkdir(parents=True, exist_ok=True)
    local_css = []
    for url in re.findall(r"@import url\('([^']+)'\);", tokens_css):
        css = fetch(url).decode()
        for i, font_url in enumerate(re.findall(r"url\((https://[^)]+)\)", css)):
            name = re.sub(r"[^A-Za-z0-9._-]", "_", font_url.split("/")[-1])
            name = f"{len(list(fonts_dir.iterdir()))}-{name}"
            (fonts_dir / name).write_bytes(fetch(font_url))
            css = css.replace(font_url, f"fonts/{name}")
        local_css.append(css)
    (vendor / "fonts.css").write_text("\n".join(local_css))
    return re.sub(r"@import url\('[^']+'\);\n?", "", tokens_css).replace(
        "/* ====", "@import url('../fonts.css');\n\n/* ====", 1)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("folder")
    ap.add_argument("--template", default="blank", choices=sorted(p.name for p in (ROOT / "templates").iterdir() if p.is_dir()))
    ap.add_argument("--version", help="release tag, e.g. v1.0.0 (default: the latest)")
    ap.add_argument("--offline", action="store_true", help="copy everything it loads into vendor/")
    ap.add_argument("--zip", action="store_true", help="also write <folder>.zip")
    args = ap.parse_args()

    version = args.version or latest_release()
    if version not in git("tag", "--list").split():
        sys.exit(f"Unknown version {version}. Releases: {' '.join(git('tag', '--list', 'v*').split())}")

    dest = pathlib.Path(args.folder).expanduser().resolve()
    if dest.exists():
        sys.exit(f"{dest} already exists — pick a new folder.")
    shutil.copytree(ROOT / "templates" / args.template, dest, ignore=shutil.ignore_patterns(".DS_Store"))
    page = dest / "index.html"
    html = page.read_text()

    if args.offline:
        vendor = dest / "vendor"
        ds = vendor / "mininectar"
        ds.mkdir(parents=True)
        for f in DS_FILES:  # the files exactly as they were at that release
            content = git("show", f"{version}:{f}")
            if f == "tokens.css":
                content = vendor_fonts(content, vendor)
            (ds / f).write_text(content)
        (vendor / "tailwind.js").write_bytes(fetch(TAILWIND))
        (vendor / "alpine.min.js").write_bytes(fetch(ALPINE_PINNED))
        html = html.replace(LIVE, "vendor/mininectar/")
        html = html.replace(f'src="{TAILWIND}"', 'src="vendor/tailwind.js"')
        html = html.replace(ALPINE_TAG, "vendor/alpine.min.js")
    else:
        html = html.replace(LIVE, PINNED.format(version=version))
        html = html.replace(ALPINE_TAG, ALPINE_PINNED)

    html = html.replace("<!-- Mini Nectar design system -->",
                        f"<!-- Mini Nectar design system — {version} -->", 1)
    page.write_text(html)
    print(f"Created {dest} from '{args.template}', pinned to Mini Nectar {version}"
          + (" (offline: everything is in vendor/)" if args.offline else ""))

    if args.zip:
        archive = dest.with_suffix(".zip")
        with zipfile.ZipFile(archive, "w", zipfile.ZIP_DEFLATED) as z:
            for f in sorted(dest.rglob("*")):
                if f.is_file() and f.name != ".DS_Store":
                    z.write(f, pathlib.Path(dest.name) / f.relative_to(dest))
        print(f"Zipped to {archive}")


if __name__ == "__main__":
    main()
