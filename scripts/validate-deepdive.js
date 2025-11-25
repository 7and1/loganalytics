#!/usr/bin/env node

/**
 * Word count validator for DeepDive.tsx content
 * Ensures the marketing copy meets the 1000+ word requirement
 */

const fs = require('fs');
const path = require('path');

const DEEPDIVE_PATH = path.join(__dirname, '../components/home/DeepDive.tsx');
const MIN_WORD_COUNT = 1000;

function stripJSXAndCountWords(content) {
  // Remove imports, exports, and JSX component wrapper
  let text = content
    .replace(/^import .+$/gm, '')
    .replace(/^export .+$/gm, '')
    .replace(/^const .+$/gm, '')
    .replace(/<[^>]+>/g, ' ') // Remove JSX tags
    .replace(/className="[^"]+"/g, '') // Remove className props
    .replace(/href="[^"]+"/g, '') // Remove href props
    .replace(/\{[^}]+\}/g, ' ') // Remove JSX expressions
    .replace(/[{}();]/g, ' ') // Remove JavaScript syntax
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();

  const words = text.split(/\s+/).filter(word => word.length > 0);
  return words.length;
}

function main() {
  try {
    if (!fs.existsSync(DEEPDIVE_PATH)) {
      console.error(`❌ File not found: ${DEEPDIVE_PATH}`);
      process.exit(1);
    }

    const content = fs.readFileSync(DEEPDIVE_PATH, 'utf-8');
    const wordCount = stripJSXAndCountWords(content);

    console.log(`📊 DeepDive Word Count Validation`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`File: ${path.relative(process.cwd(), DEEPDIVE_PATH)}`);
    console.log(`Word count: ${wordCount}`);
    console.log(`Minimum required: ${MIN_WORD_COUNT}`);
    console.log(`Status: ${wordCount >= MIN_WORD_COUNT ? '✅ PASS' : '❌ FAIL'}`);

    if (wordCount < MIN_WORD_COUNT) {
      const shortage = MIN_WORD_COUNT - wordCount;
      console.log(`\n⚠️  Need ${shortage} more words to meet requirement`);
      process.exit(1);
    }

    console.log(`\n✅ DeepDive content meets word count requirement`);
    process.exit(0);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
}

main();
