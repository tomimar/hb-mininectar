#!/usr/bin/env python3
"""Publish a Mini Nectar release that prototypes can pin to.

    python3 scripts/release.py <version> "<one-line summary>"

- Adds the version and summary at the top of CHANGELOG.md and commits it.
  Notes written under a "## Unreleased" heading at the top of the
  changelog (New / Changed / Fixed, as you go) become that release's
  details.
- Tags the commit v<version> and pushes the commit and the tag.
jsDelivr then serves that exact snapshot at
cdn.jsdelivr.net/gh/tomimar/hb-mininectar@v<version>/…, forever.

Versioning: bump the MAJOR number when a change can break an existing
prototype (a class renamed or removed, markup that must change), the
MINOR number for anything new, the PATCH number for fixes.
"""
import datetime
import os
import pathlib
import re
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent


def git(*args):
    return subprocess.run(["git", "-C", str(ROOT), *args], check=True,
                          capture_output=True, text=True).stdout


def main():
    if len(sys.argv) != 3 or not re.fullmatch(r"\d+\.\d+\.\d+", sys.argv[1]):
        sys.exit('usage: python3 scripts/release.py 1.2.0 "What changed, in one line"')
    version, summary = sys.argv[1], sys.argv[2].strip()
    tag = "v" + version
    if tag in git("tag", "--list").split():
        sys.exit(f"{tag} already exists.")
    if git("status", "--porcelain"):
        sys.exit("Commit or stash your changes first — a release is a snapshot of a clean tree.")

    log = ROOT / "CHANGELOG.md"
    head = "# Changelog\n\nPrototypes pin a version (see scripts/new_prototype.py). Newest first.\n"
    body = log.read_text()[len(head):] if log.exists() else ""
    # Notes collected under "## Unreleased" become this release's details
    details = ""
    m = re.match(r"\s*## Unreleased\n(.*?)(?=\n## |\Z)", body, re.S)
    if m:
        details = m.group(1).strip() + "\n"
        body = body[m.end():]
    entry = f"\n## {tag} — {datetime.date.today().isoformat()}\n\n{summary}\n" + (f"\n{details}" if details else "")
    log.write_text(head + entry + body)

    git("add", "CHANGELOG.md")
    message = ["-m", f"Release {tag}: {summary}"]
    if os.environ.get("RELEASE_TRAILER"):  # e.g. a Co-Authored-By line
        message += ["-m", os.environ["RELEASE_TRAILER"]]
    git("commit", *message)
    git("tag", "-a", tag, "-m", summary)
    git("push", "origin", "HEAD")
    git("push", "origin", tag)
    print(f"Released {tag}. Prototypes can pin it: https://cdn.jsdelivr.net/gh/tomimar/hb-mininectar@{tag}/")


if __name__ == "__main__":
    main()
