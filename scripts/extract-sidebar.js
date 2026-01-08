#!/usr/bin/env node
/**
 * Extract sidebar configuration from kimi-cli's config.ts
 * Usage: node extract-sidebar.js <config.ts path> <output.json path>
 */

const fs = require('fs');
const path = require('path');

const configPath = process.argv[2];
const outputPath = process.argv[3];

if (!configPath || !outputPath) {
  console.error('Usage: node extract-sidebar.js <config.ts> <output.json>');
  process.exit(1);
}

const content = fs.readFileSync(configPath, 'utf-8');

/**
 * Extract sidebar items for a specific language's guides section
 */
function extractGuidesSidebar(content, lang) {
  // Match the sidebar section for guides
  const sidebarPattern = new RegExp(
    `'/${lang}/guides/':\\s*\\[\\s*\\{[^}]*items:\\s*\\[([^\\]]+)\\]`,
    's'
  );
  
  const match = content.match(sidebarPattern);
  if (!match) {
    console.error(`Warning: Could not find /${lang}/guides/ sidebar`);
    return [];
  }

  const itemsStr = match[1];
  const items = [];
  
  // Match each item: { text: '...', link: '...' }
  const itemPattern = /\{\s*text:\s*'([^']+)',\s*link:\s*'([^']+)'\s*\}/g;
  let itemMatch;
  
  while ((itemMatch = itemPattern.exec(itemsStr)) !== null) {
    const [, text, link] = itemMatch;
    // Transform link: /zh/guides/xxx -> /kimi-cli/guides/xxx
    // For en: /en/guides/xxx -> /en/kimi-cli/guides/xxx
    let newLink;
    if (lang === 'zh') {
      newLink = link.replace(/^\/zh\/guides\//, '/kimi-cli/guides/');
    } else {
      newLink = link.replace(/^\/en\/guides\//, '/en/kimi-cli/guides/');
    }
    items.push({ text, link: newLink });
  }

  return items;
}

const sidebar = {
  zh: {
    items: extractGuidesSidebar(content, 'zh')
  },
  en: {
    items: extractGuidesSidebar(content, 'en')
  }
};

// Ensure output directory exists
const outputDir = path.dirname(outputPath);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(sidebar, null, 2));
console.log(`Extracted ${sidebar.zh.items.length} zh items, ${sidebar.en.items.length} en items`);
