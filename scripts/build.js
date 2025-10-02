#!/usr/bin/env node

/**
 * Main build script to generate HTML files from YAML sources
 *
 * This script:
 * 1. Converts YAML source files to JSON
 * 2. Generates derived JSON files (assessment.json, guide.json) from model.json
 * 3. Generates HTML files from all JSON data
 */

const { convertAll } = require('./yaml-to-json');
const { generateDerivedData } = require('./generate-derived-data');
const { generateAll } = require('./generate-html');

console.log('='.repeat(60));
console.log('PM Maturity Model - HTML Build Process');
console.log('='.repeat(60));
console.log('');

console.log('Step 1: Converting YAML to JSON...');
console.log('-'.repeat(60));
try {
  convertAll();
  console.log('');
} catch (error) {
  console.error('Fatal error during YAML conversion:', error.message);
  process.exit(1);
}

console.log('Step 2: Generating derived data files...');
console.log('-'.repeat(60));
try {
  generateDerivedData();
  console.log('');
} catch (error) {
  console.error('Fatal error during data generation:', error.message);
  process.exit(1);
}

console.log('Step 3: Generating HTML files...');
console.log('-'.repeat(60));
try {
  generateAll();
  console.log('');
} catch (error) {
  console.error('Fatal error during HTML generation:', error.message);
  process.exit(1);
}

console.log('='.repeat(60));
console.log('✅ Build complete! HTML files have been generated.');
console.log('='.repeat(60));
console.log('');
console.log('Generated files:');
console.log('  • public/model.html');
console.log('  • public/assessment.html');
console.log('  • public/guide.html');
console.log('');
console.log('These files are now ready to deploy.');
console.log('');
