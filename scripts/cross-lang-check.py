#!/usr/bin/env python3
"""Cross-language parity check for zh/ vs en/ markdown files.

Reports per-page differences in:
  - file presence (missing on one side)
  - heading count
  - code block count
  - link count (markdown links)
  - image count
  - external domain distribution (kimi.com / github.com / etc.)
  - references to old moonshotai.github.io/kimi-cli (should be zero)
  - bare <placeholder> tokens outside backticks/fenced blocks
"""
from __future__ import annotations

import re
import sys
from collections import Counter
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path("/Users/moonshot/Projects/agentic/kimi-coding-docs")
HEADING_RE = re.compile(r"^(#{1,6})\s+\S", re.MULTILINE)
LINK_RE = re.compile(r"(?<!!)\[([^\]]*)\]\(([^)]+)\)")
IMAGE_RE = re.compile(r"!\[([^\]]*)\]\(([^)]+)\)")


def analyze(path: Path) -> dict:
    text = path.read_text(encoding="utf-8")
    # Strip fenced code blocks for prose-level checks
    stripped = re.sub(r"```[\s\S]*?```", "", text)
    stripped = re.sub(r"~~~[\s\S]*?~~~", "", stripped)
    # Strip inline backticks
    prose = re.sub(r"`[^`]*`", "", stripped)

    headings = HEADING_RE.findall(text)
    code_blocks = len(re.findall(r"^```", text, re.MULTILINE)) // 2
    links = LINK_RE.findall(text)
    images = IMAGE_RE.findall(text)
    external = Counter()
    old_gh = 0
    for _, href in links:
        href = href.strip()
        if href.startswith("<") and href.endswith(">"):
            href = href[1:-1]
        if href.startswith(("http://", "https://")):
            host = urlparse(href).hostname or ""
            external[host] += 1
            if "moonshotai.github.io" in host:
                old_gh += 1
    bare_tokens = re.findall(r"<([A-Za-z_][A-Za-z0-9_-]*)>", prose)
    return {
        "headings": len(headings),
        "code_blocks": code_blocks,
        "links": len(links),
        "images": len(images),
        "external": external,
        "old_github_links": old_gh,
        "bare_tokens": bare_tokens,
        "size": len(text),
    }


def main() -> int:
    zh_files = {p.relative_to(ROOT / "zh").as_posix(): p for p in (ROOT / "zh").rglob("*.md")}
    en_files = {p.relative_to(ROOT / "en").as_posix(): p for p in (ROOT / "en").rglob("*.md")}

    missing_in_en = sorted(set(zh_files) - set(en_files))
    missing_in_zh = sorted(set(en_files) - set(zh_files))
    common = sorted(set(zh_files) & set(en_files))

    print("=" * 70)
    print(f"files: zh={len(zh_files)}  en={len(en_files)}  shared={len(common)}")
    if missing_in_en:
        print(f"\n[MISSING IN EN] {len(missing_in_en)}")
        for p in missing_in_en:
            print(f"  - {p}")
    if missing_in_zh:
        print(f"\n[MISSING IN ZH] {len(missing_in_zh)}")
        for p in missing_in_zh:
            print(f"  - {p}")

    print("\n" + "=" * 70)
    print("PER-PAGE PARITY (flagged = structural mismatch):")
    anomalies = 0
    all_external = Counter()
    for rel in common:
        zh = analyze(zh_files[rel])
        en = analyze(en_files[rel])
        all_external.update(zh["external"])
        all_external.update(en["external"])
        diffs = []
        # Headings/codeblocks/images should match exactly; links allowed a small delta
        if zh["headings"] != en["headings"]:
            diffs.append(f"H{zh['headings']}vs{en['headings']}")
        if zh["code_blocks"] != en["code_blocks"]:
            diffs.append(f"CB{zh['code_blocks']}vs{en['code_blocks']}")
        if zh["images"] != en["images"]:
            diffs.append(f"IMG{zh['images']}vs{en['images']}")
        if abs(zh["links"] - en["links"]) > 2:
            diffs.append(f"L{zh['links']}vs{en['links']}")
        if zh["old_github_links"] or en["old_github_links"]:
            diffs.append(f"OLD-GH(z{zh['old_github_links']}/e{en['old_github_links']})")
        if zh["bare_tokens"] or en["bare_tokens"]:
            diffs.append(f"BARE(z={zh['bare_tokens']}|e={en['bare_tokens']})")
        if diffs:
            anomalies += 1
            print(f"  ⚠ {rel}  {', '.join(diffs)}")
    if not anomalies:
        print("  ✓ all pages structurally aligned")

    print("\n" + "=" * 70)
    print("EXTERNAL DOMAINS (combined zh+en):")
    for host, n in all_external.most_common():
        print(f"  {n:4d}  {host}")

    return 1 if (missing_in_en or missing_in_zh or anomalies) else 0


if __name__ == "__main__":
    sys.exit(main())
