#!/usr/bin/env node

/**
 * One-time converter: JSON → YAML
 * This script helps convert existing JSON files to YAML format
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

function convertJsonToYaml(jsonPath, yamlPath) {
  console.log(`Converting ${path.basename(jsonPath)} → ${path.basename(yamlPath)}...`);

  const jsonContent = fs.readFileSync(jsonPath, 'utf-8');
  const data = JSON.parse(jsonContent);

  // Convert to YAML with proper formatting
  const yamlContent = yaml.dump(data, {
    indent: 2,
    lineWidth: 120,
    noRefs: true,
    sortKeys: false
  });

  fs.writeFileSync(yamlPath, yamlContent);
  console.log(`✓ Created ${path.basename(yamlPath)}`);
}

// Convert the two source files
const srcDir = path.join(__dirname, '..', 'src');

convertJsonToYaml(
  path.join(srcDir, 'model.json'),
  path.join(srcDir, 'model.yaml')
);

convertJsonToYaml(
  path.join(srcDir, 'guide-implementation.json'),
  path.join(srcDir, 'guide-implementation.yaml')
);

console.log('\n✅ Conversion complete!');
console.log('Next steps:');
console.log('1. Review the YAML files');
console.log('2. Delete the old JSON files when ready');
console.log('3. Update the build process to use YAML');
