#!/usr/bin/env python3
"""Escape bare <placeholder> tokens in migrated markdown.

Vue's template compiler parses anything that looks like an HTML element, so
bare tokens like <slug>, <session-id>, <agent_id> break the build when they
appear in prose. This pass walks every migrated markdown file, skips fenced
code blocks and inline backtick spans, and replaces <identifier> with the
literal-rendering &lt;identifier&gt;.
"""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path("/Users/moonshot/Projects/agentic/kimi-coding-docs")
TOKEN_RE = re.compile(r"<([A-Za-z_][A-Za-z0-9_\-]*)>")


def escape_line(line: str) -> str:
    out: list[str] = []
    i = 0
    in_code = False
    while i < len(line):
        ch = line[i]
        if ch == "`":
            in_code = not in_code
            out.append(ch)
            i += 1
            continue
        if not in_code and ch == "<":
            m = TOKEN_RE.match(line, i)
            if m:
                out.append(f"&lt;{m.group(1)}&gt;")
                i = m.end()
                continue
        out.append(ch)
        i += 1
    return "".join(out)


def process(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    lines = text.split("\n")
    in_fence = False
    changed = False
    for idx, line in enumerate(lines):
        stripped = line.lstrip()
        if stripped.startswith("```") or stripped.startswith("~~~"):
            in_fence = not in_fence
            continue
        if in_fence:
            continue
        new = escape_line(line)
        if new != line:
            lines[idx] = new
            changed = True
    if changed:
        path.write_text("\n".join(lines), encoding="utf-8")
    return changed


def main() -> None:
    for lang in ("zh", "en"):
        for md in (ROOT / lang).rglob("*.md"):
            if process(md):
                print(f"  escaped: {md.relative_to(ROOT)}")
    print("done")


if __name__ == "__main__":
    main()
