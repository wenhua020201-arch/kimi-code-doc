#!/usr/bin/env python3
"""Audit the built VitePress dist for every page.

Reports:
  - status of every expected page (present / missing)
  - page title, h1, heading count
  - for every <img src>: does the file exist in dist?
  - for every internal <a href> ending in .html: does it point at a real dist page?
  - any <a href> pointing at .md (should be 0 post-rewrite)
"""
from __future__ import annotations

import re
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path("/Users/moonshot/Projects/agentic/kimi-coding-docs")
DIST = ROOT / ".vitepress" / "dist"
BASE = "/code/docs/"

ZH_PAGES = [
    "", "kimi-code/faq",
    "kimi-code-cli/getting-started", "kimi-code-cli/core-operations",
    "kimi-code-cli/configuration/configuration-files",
    "kimi-code-cli/configuration/environment-variables",
    "kimi-code-cli/configuration/providers-and-models",
    "kimi-code-cli/configuration/data-locations",
    "kimi-code-cli/configuration/overrides-and-precedence",
    "kimi-code-cli/customization/mcp",
    "kimi-code-cli/customization/hooks",
    "kimi-code-cli/customization/plugins",
    "kimi-code-cli/customization/skills",
    "kimi-code-cli/customization/sub-agents",
    "kimi-code-cli/customization/wire-protocol",
    "kimi-code-cli/reference/kimi-command",
    "kimi-code-cli/reference/kimi-acp",
    "kimi-code-cli/reference/kimi-info",
    "kimi-code-cli/reference/kimi-mcp",
    "kimi-code-cli/reference/kimi-term",
    "kimi-code-cli/reference/kimi-vis",
    "kimi-code-cli/reference/kimi-web",
    "kimi-code-cli/reference/slash-commands",
    "kimi-code-cli/reference/keyboard-shortcuts",
    "kimi-code-for-vscode/getting-started",
    "kimi-code-for-vscode/core-operations",
    "kimi-code-for-vscode/configuration",
    "kimi-code-for-vscode/customization",
    "third-party-tools/jetbrains",
    "third-party-tools/zed",
    "third-party-tools/zsh",
    "third-party-tools/other-coding-agents",
]


def expected_path(slug: str, lang_prefix: str) -> Path:
    if slug == "":
        return DIST / lang_prefix / "index.html"
    return DIST / lang_prefix / f"{slug}.html"


TITLE_RE = re.compile(r"<title>([^<]+)</title>")
H1_RE = re.compile(r'<h1[^>]*>\s*(?:<[^>]+>)*\s*([^<]+)', re.DOTALL)
HEADING_RE = re.compile(r'<h([1-3])[^>]*>', re.IGNORECASE)
# Content container on VitePress — look only at main content area markers
IMG_RE = re.compile(r'<img[^>]+src="([^"]+)"[^>]*>')
LINK_RE = re.compile(r'<a[^>]+href="([^"]+)"')


def dist_path_for_url(u: str) -> Path | None:
    """Resolve a /code/docs/... href to a dist file path."""
    if not u.startswith(BASE):
        return None
    rel = u[len(BASE):].split("#")[0].split("?")[0]
    if rel == "" or rel.endswith("/"):
        rel = rel + "index.html"
    if not rel.endswith(".html"):
        # maybe static asset
        return DIST / rel
    return DIST / rel


def audit_page(html_file: Path, lang: str) -> dict:
    html = html_file.read_text(encoding="utf-8", errors="replace")
    title = (TITLE_RE.search(html) or [None, None])[1]
    h1 = (H1_RE.search(html) or [None, None])[1]
    if h1:
        h1 = h1.strip()
    headings = len(HEADING_RE.findall(html))
    imgs = IMG_RE.findall(html)
    broken_imgs = []
    for src in imgs:
        if src.startswith(("http://", "https://", "data:")):
            continue
        p = dist_path_for_url(src)
        if p and not p.exists():
            broken_imgs.append(src)
    links = LINK_RE.findall(html)
    broken_links = []
    md_links = []
    for href in links:
        if href.startswith(("http://", "https://", "mailto:", "javascript:", "#", "tel:")):
            continue
        if ".md" in href and not href.endswith(".md"):
            pass
        if href.endswith(".md"):
            md_links.append(href)
            continue
        # Only check links under /code/docs/
        if href.startswith(BASE) and href.endswith(".html"):
            p = dist_path_for_url(href)
            if p and not p.exists():
                broken_links.append(href)
    return {
        "title": title,
        "h1": h1,
        "headings": headings,
        "imgs_total": len(imgs),
        "broken_imgs": broken_imgs,
        "md_links": md_links,
        "broken_links": broken_links,
    }


def main() -> int:
    issues = 0
    print("=" * 72)
    print(f"AUDITING {len(ZH_PAGES) * 2} PAGES")
    print("=" * 72)
    for lang in ("", "en"):
        for slug in ZH_PAGES:
            p = expected_path(slug, lang)
            loc = f"{lang or 'zh'}/{slug or 'index'}"
            if not p.exists():
                print(f"[MISSING] {loc}  (expected {p.relative_to(DIST)})")
                issues += 1
                continue
            info = audit_page(p, lang)
            flags = []
            if not info["h1"]:
                flags.append("NO_H1")
            if info["headings"] < 2:
                flags.append(f"headings={info['headings']}")
            if info["broken_imgs"]:
                flags.append(f"BROKEN_IMG={info['broken_imgs']}")
            if info["broken_links"]:
                flags.append(f"BROKEN_LINK={info['broken_links'][:3]}")
            if info["md_links"]:
                flags.append(f"MD_LINK={info['md_links'][:3]}")
            if flags:
                issues += 1
                print(f"[ISSUE] {loc}  -> {', '.join(flags)}")
    print("\n" + "=" * 72)
    if issues == 0:
        print("✓ all 64 pages look healthy (presence/h1/images/links)")
    else:
        print(f"✗ {issues} issues")
    return 0 if issues == 0 else 1


if __name__ == "__main__":
    raise SystemExit(main())
