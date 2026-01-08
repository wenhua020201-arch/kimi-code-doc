#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
TEMP_DIR=$(mktemp -d)
REPO_URL="https://github.com/MoonshotAI/kimi-cli.git"

cleanup() {
    rm -rf "$TEMP_DIR"
}
trap cleanup EXIT

echo "📦 Fetching latest release tag..."
# Use releases API to get the latest release tag (not pre-release)
LATEST_TAG=$(curl -s "https://api.github.com/repos/MoonshotAI/kimi-cli/releases/latest" | \
    grep -o '"tag_name": "[^"]*"' | sed 's/"tag_name": "//;s/"//')

if [ -z "$LATEST_TAG" ]; then
    echo "❌ Failed to get latest tag"
    exit 1
fi

echo "📥 Cloning kimi-cli@${LATEST_TAG}..."
git clone --depth 1 --branch "$LATEST_TAG" "$REPO_URL" "$TEMP_DIR/kimi-cli" 2>/dev/null

echo "📁 Preparing directories..."
# Clean up existing generated files
rm -rf "$PROJECT_ROOT/zh/kimi-cli/guides" "$PROJECT_ROOT/en/kimi-cli/guides" "$PROJECT_ROOT/kimi-cli/sidebar.json"
mkdir -p "$PROJECT_ROOT/zh/kimi-cli/guides"
mkdir -p "$PROJECT_ROOT/en/kimi-cli/guides"
mkdir -p "$PROJECT_ROOT/kimi-cli"

echo "📄 Copying guides..."
cp -r "$TEMP_DIR/kimi-cli/docs/zh/guides/"* "$PROJECT_ROOT/zh/kimi-cli/guides/"
cp -r "$TEMP_DIR/kimi-cli/docs/en/guides/"* "$PROJECT_ROOT/en/kimi-cli/guides/"

echo "⚙️  Extracting sidebar configuration..."
node "$SCRIPT_DIR/extract-sidebar.js" "$TEMP_DIR/kimi-cli/docs/.vitepress/config.ts" "$PROJECT_ROOT/kimi-cli/sidebar.json"

echo "🔗 Fixing external links in guides..."
# Fix zh links
find "$PROJECT_ROOT/zh/kimi-cli/guides" -name "*.md" -exec sed -i '' \
    -e 's|](\.\./configuration\/|](https://moonshotai.github.io/kimi-cli/zh/configuration/|g' \
    -e 's|](\.\./reference\/|](https://moonshotai.github.io/kimi-cli/zh/reference/|g' \
    -e 's|](\.\./customization\/|](https://moonshotai.github.io/kimi-cli/zh/customization/|g' \
    -e 's|](\.\./release-notes\/|](https://moonshotai.github.io/kimi-cli/zh/release-notes/|g' \
    -e 's|\.md)|.html)|g' \
    {} \;
# Fix en links
find "$PROJECT_ROOT/en/kimi-cli/guides" -name "*.md" -exec sed -i '' \
    -e 's|](\.\./configuration\/|](https://moonshotai.github.io/kimi-cli/en/configuration/|g' \
    -e 's|](\.\./reference\/|](https://moonshotai.github.io/kimi-cli/en/reference/|g' \
    -e 's|](\.\./customization\/|](https://moonshotai.github.io/kimi-cli/en/customization/|g' \
    -e 's|](\.\./release-notes\/|](https://moonshotai.github.io/kimi-cli/en/release-notes/|g' \
    -e 's|\.md)|.html)|g' \
    {} \;

echo "✅ Synced kimi-cli@${LATEST_TAG} successfully!"
echo "   - zh/kimi-cli/guides/"
echo "   - en/kimi-cli/guides/"
echo "   - kimi-cli/sidebar.json"
