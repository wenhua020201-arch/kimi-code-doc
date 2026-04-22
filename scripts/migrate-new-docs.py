#!/usr/bin/env python3
"""Migrate new docs from ~/Downloads/kimidocs——new into the VitePress project.

Performs:
  1. Copy images to public/images/{zh,en}/{vscode,media}/
  2. Copy + rename markdown files from (Kimi Code / Kimi Code CLI / ...) with
     spaces + Chinese names into kebab-case slugs.
  3. Rewrite internal markdown links that reference source paths.
  4. Rewrite image references from ./images/x.png to /images/{lang}/vscode/x.png.
  5. Move `Overview.md` / `产品概览.md` to become the locale homepage (index.md).

Idempotent: overwrites target files. Does not delete old project content — a
follow-up shell step handles deletion.
"""
from __future__ import annotations

import re
import shutil
from pathlib import Path

SRC = Path("/Users/moonshot/Downloads/kimidocs——new")
DST = Path("/Users/moonshot/Projects/agentic/kimi-coding-docs")

# Mapping of directory names (relative to <lang>/) to target slugs.
DIR_SLUG = {
    "en": {
        "Kimi Code": "kimi-code",
        "Kimi Code CLI": "kimi-code-cli",
        "Kimi Code CLI/Configuration": "kimi-code-cli/configuration",
        "Kimi Code CLI/Customization": "kimi-code-cli/customization",
        "Kimi Code CLI/Reference": "kimi-code-cli/reference",
        "Kimi Code for VS Code": "kimi-code-for-vscode",
        "Use in Third-Party Tools": "third-party-tools",
    },
    "zh": {
        "Kimi Code": "kimi-code",
        "Kimi Code CLI": "kimi-code-cli",
        "Kimi Code CLI/配置": "kimi-code-cli/configuration",
        "Kimi Code CLI/定制化": "kimi-code-cli/customization",
        "Kimi Code CLI/参考手册": "kimi-code-cli/reference",
        "Kimi Code for VS Code": "kimi-code-for-vscode",
        "在更多第三方开发工具使用": "third-party-tools",
    },
}

# Mapping of source markdown basenames (with .md) to target slugs (with .md).
FILE_SLUG = {
    "en": {
        # Kimi Code — Overview becomes homepage, handled separately.
        "Kimi Code/Overview.md": "__INDEX__",
        "Kimi Code/FAQ.md": "kimi-code/faq.md",
        # Kimi Code CLI
        "Kimi Code CLI/Getting Started.md": "kimi-code-cli/getting-started.md",
        "Kimi Code CLI/Core Operations.md": "kimi-code-cli/core-operations.md",
        "Kimi Code CLI/Configuration/Configuration Files.md": "kimi-code-cli/configuration/configuration-files.md",
        "Kimi Code CLI/Configuration/Environment Variables.md": "kimi-code-cli/configuration/environment-variables.md",
        "Kimi Code CLI/Configuration/Providers and Models.md": "kimi-code-cli/configuration/providers-and-models.md",
        "Kimi Code CLI/Configuration/Data Locations.md": "kimi-code-cli/configuration/data-locations.md",
        "Kimi Code CLI/Configuration/Overrides and Precedence.md": "kimi-code-cli/configuration/overrides-and-precedence.md",
        "Kimi Code CLI/Customization/MCP.md": "kimi-code-cli/customization/mcp.md",
        "Kimi Code CLI/Customization/Hooks.md": "kimi-code-cli/customization/hooks.md",
        "Kimi Code CLI/Customization/Plugins.md": "kimi-code-cli/customization/plugins.md",
        "Kimi Code CLI/Customization/Skills.md": "kimi-code-cli/customization/skills.md",
        "Kimi Code CLI/Customization/Sub-Agents.md": "kimi-code-cli/customization/sub-agents.md",
        "Kimi Code CLI/Customization/Wire Protocol.md": "kimi-code-cli/customization/wire-protocol.md",
        "Kimi Code CLI/Reference/kimi Command.md": "kimi-code-cli/reference/kimi-command.md",
        "Kimi Code CLI/Reference/kimi acp Subcommand.md": "kimi-code-cli/reference/kimi-acp.md",
        "Kimi Code CLI/Reference/kimi info Subcommand.md": "kimi-code-cli/reference/kimi-info.md",
        "Kimi Code CLI/Reference/kimi mcp Subcommand.md": "kimi-code-cli/reference/kimi-mcp.md",
        "Kimi Code CLI/Reference/kimi term Subcommand.md": "kimi-code-cli/reference/kimi-term.md",
        "Kimi Code CLI/Reference/kimi vis Subcommand.md": "kimi-code-cli/reference/kimi-vis.md",
        "Kimi Code CLI/Reference/kimi web Subcommand.md": "kimi-code-cli/reference/kimi-web.md",
        "Kimi Code CLI/Reference/Slash Commands Cheat Sheet.md": "kimi-code-cli/reference/slash-commands.md",
        "Kimi Code CLI/Reference/Keyboard Shortcuts Cheat Sheet.md": "kimi-code-cli/reference/keyboard-shortcuts.md",
        # Kimi Code for VS Code
        "Kimi Code for VS Code/Getting Started.md": "kimi-code-for-vscode/getting-started.md",
        "Kimi Code for VS Code/Core Operations.md": "kimi-code-for-vscode/core-operations.md",
        "Kimi Code for VS Code/Configuration.md": "kimi-code-for-vscode/configuration.md",
        "Kimi Code for VS Code/Customization.md": "kimi-code-for-vscode/customization.md",
        # Third-party tools
        "Use in Third-Party Tools/JetBrains.md": "third-party-tools/jetbrains.md",
        "Use in Third-Party Tools/Zed.md": "third-party-tools/zed.md",
        "Use in Third-Party Tools/Zsh.md": "third-party-tools/zsh.md",
        "Use in Third-Party Tools/Other Coding Agents.md": "third-party-tools/other-coding-agents.md",
    },
    "zh": {
        "Kimi Code/产品概览.md": "__INDEX__",
        "Kimi Code/常见问题.md": "kimi-code/faq.md",
        "Kimi Code CLI/快速开始.md": "kimi-code-cli/getting-started.md",
        "Kimi Code CLI/核心操作.md": "kimi-code-cli/core-operations.md",
        "Kimi Code CLI/配置/配置文件.md": "kimi-code-cli/configuration/configuration-files.md",
        "Kimi Code CLI/配置/环境变量.md": "kimi-code-cli/configuration/environment-variables.md",
        "Kimi Code CLI/配置/平台与模型.md": "kimi-code-cli/configuration/providers-and-models.md",
        "Kimi Code CLI/配置/数据路径.md": "kimi-code-cli/configuration/data-locations.md",
        "Kimi Code CLI/配置/配置覆盖与优先级.md": "kimi-code-cli/configuration/overrides-and-precedence.md",
        "Kimi Code CLI/定制化/MCP.md": "kimi-code-cli/customization/mcp.md",
        "Kimi Code CLI/定制化/Hooks.md": "kimi-code-cli/customization/hooks.md",
        "Kimi Code CLI/定制化/Plugins.md": "kimi-code-cli/customization/plugins.md",
        "Kimi Code CLI/定制化/Skills.md": "kimi-code-cli/customization/skills.md",
        "Kimi Code CLI/定制化/子 Agent.md": "kimi-code-cli/customization/sub-agents.md",
        "Kimi Code CLI/定制化/Wire 协议.md": "kimi-code-cli/customization/wire-protocol.md",
        "Kimi Code CLI/参考手册/kimi 命令.md": "kimi-code-cli/reference/kimi-command.md",
        "Kimi Code CLI/参考手册/kimi acp 子命令.md": "kimi-code-cli/reference/kimi-acp.md",
        "Kimi Code CLI/参考手册/kimi info 子命令.md": "kimi-code-cli/reference/kimi-info.md",
        "Kimi Code CLI/参考手册/kimi mcp 子命令.md": "kimi-code-cli/reference/kimi-mcp.md",
        "Kimi Code CLI/参考手册/kimi term 子命令.md": "kimi-code-cli/reference/kimi-term.md",
        "Kimi Code CLI/参考手册/kimi vis 子命令.md": "kimi-code-cli/reference/kimi-vis.md",
        "Kimi Code CLI/参考手册/kimi web 子命令.md": "kimi-code-cli/reference/kimi-web.md",
        "Kimi Code CLI/参考手册/斜杠命令速查.md": "kimi-code-cli/reference/slash-commands.md",
        "Kimi Code CLI/参考手册/键盘快捷键速查.md": "kimi-code-cli/reference/keyboard-shortcuts.md",
        "Kimi Code for VS Code/快速开始.md": "kimi-code-for-vscode/getting-started.md",
        "Kimi Code for VS Code/核心操作.md": "kimi-code-for-vscode/core-operations.md",
        "Kimi Code for VS Code/配置.md": "kimi-code-for-vscode/configuration.md",
        "Kimi Code for VS Code/定制化.md": "kimi-code-for-vscode/customization.md",
        "在更多第三方开发工具使用/JetBrains.md": "third-party-tools/jetbrains.md",
        "在更多第三方开发工具使用/Zed.md": "third-party-tools/zed.md",
        "在更多第三方开发工具使用/Zsh.md": "third-party-tools/zsh.md",
        "在更多第三方开发工具使用/在其他code agent中使用.md": "third-party-tools/other-coding-agents.md",
    },
}

# Markdown link regex: [text](url) or [text](<url with spaces>)
# Captures: group(1)=label, group(2)=target (possibly wrapped in <>)
LINK_RE = re.compile(r"(!?)\[([^\]]*)\]\(([^)]+)\)")
# Heading anchor slugifier: turn "Print 模式" into something stable.
# We leave anchors alone (VitePress auto-slugs them) but strip them for lookup.


def slug_url(src_rel: str, current_src: str, lang: str) -> str | None:
    """Resolve a source-relative link to the target URL.

    src_rel: raw href from markdown (may include anchor, may be wrapped in <>)
    current_src: source file path (relative to <lang>/)
    lang: 'en' or 'zh'
    Returns the rewritten URL, or None if the link should be left alone.
    """
    href = src_rel.strip()
    if href.startswith("<") and href.endswith(">"):
        href = href[1:-1]

    # Skip external, absolute, mailto, anchor-only, and non-.md
    if href.startswith(("http://", "https://", "mailto:", "#", "/")):
        return None
    path_part, _, anchor = href.partition("#")
    if not path_part.endswith(".md"):
        return None

    # Resolve relative to current_src's directory within <lang>/
    current_dir = Path(current_src).parent
    resolved = (current_dir / path_part).as_posix()
    # Normalize .. segments
    parts: list[str] = []
    for seg in resolved.split("/"):
        if seg == "..":
            if parts:
                parts.pop()
        elif seg in ("", "."):
            continue
        else:
            parts.append(seg)
    key = "/".join(parts)

    mapping = FILE_SLUG[lang]
    target = mapping.get(key)
    if target is None:
        return None
    if target == "__INDEX__":
        # Points to homepage
        url = "/" if lang == "zh" else "/en/"
    else:
        # Target is e.g. kimi-code-cli/getting-started.md — drop .md suffix,
        # prefix with locale base.
        stem = target[:-3] if target.endswith(".md") else target
        url = f"/{stem}" if lang == "zh" else f"/en/{stem}"
    if anchor:
        url = f"{url}#{anchor}"
    return url


def rewrite_content(text: str, current_src: str, lang: str) -> str:
    def repl(m: re.Match) -> str:
        bang, label, target = m.group(1), m.group(2), m.group(3)
        if bang:  # image
            # Rewrite ./images/xxx.png to /images/{lang}/vscode/xxx.png
            t = target.strip()
            if t.startswith("<") and t.endswith(">"):
                t = t[1:-1]
            if t.startswith("./images/"):
                fname = t[len("./images/"):]
                return f"![{label}](/images/{lang}/vscode/{fname})"
            if t.startswith("../media/"):
                fname = t[len("../media/"):]
                return f"![{label}](/images/{lang}/media/{fname})"
            return m.group(0)
        new_url = slug_url(target, current_src, lang)
        if new_url is None:
            return m.group(0)
        return f"[{label}]({new_url})"

    return LINK_RE.sub(repl, text)


def copy_images(lang: str) -> None:
    # VS Code per-section images
    src_dir = SRC / lang / "Kimi Code for VS Code" / "images"
    dst_dir = DST / "public" / "images" / lang / "vscode"
    dst_dir.mkdir(parents=True, exist_ok=True)
    if src_dir.exists():
        for f in src_dir.iterdir():
            if f.is_file() and not f.name.startswith("."):
                shutil.copy2(f, dst_dir / f.name)
    # Top-level media gifs — copy regardless (EN may reuse ZH copies)
    media_src = SRC / lang / "media"
    media_dst = DST / "public" / "images" / lang / "media"
    media_dst.mkdir(parents=True, exist_ok=True)
    if media_src.exists():
        for f in media_src.iterdir():
            if f.is_file() and not f.name.startswith("."):
                shutil.copy2(f, media_dst / f.name)
    # EN fallback: if EN media is missing files that exist in ZH, copy them in
    if lang == "en":
        zh_media = DST / "public" / "images" / "zh" / "media"
        if zh_media.exists():
            for f in zh_media.iterdir():
                tgt = media_dst / f.name
                if f.is_file() and not tgt.exists():
                    shutil.copy2(f, tgt)


def migrate_lang(lang: str) -> None:
    mapping = FILE_SLUG[lang]
    src_lang_dir = SRC / lang
    dst_lang_dir = DST / lang
    for rel, target in mapping.items():
        src_file = src_lang_dir / rel
        if not src_file.exists():
            print(f"[WARN] missing source: {src_file}")
            continue
        text = src_file.read_text(encoding="utf-8")
        text = rewrite_content(text, rel, lang)
        if target == "__INDEX__":
            dst_file = dst_lang_dir / "index.md"
        else:
            dst_file = dst_lang_dir / target
        dst_file.parent.mkdir(parents=True, exist_ok=True)
        dst_file.write_text(text, encoding="utf-8")
        print(f"  {lang}/{rel}  ->  {dst_file.relative_to(DST)}")


def main() -> None:
    print("== copying images ==")
    for lang in ("zh", "en"):
        copy_images(lang)
    print("== migrating zh ==")
    migrate_lang("zh")
    print("== migrating en ==")
    migrate_lang("en")
    print("done")


if __name__ == "__main__":
    main()
