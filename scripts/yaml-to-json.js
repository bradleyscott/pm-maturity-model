#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

/**
 * Convert YAML source files to JSON
 *
 * This is part of the build process. YAML is the source format (human-friendly),
 * but the rest of the build pipeline works with JSON (machine-friendly).
 */

function convertYamlToJson(yamlPath, jsonPath) {
  const filename = path.basename(yamlPath);

  if (!fs.existsSync(yamlPath)) {
    console.error(`Error: ${filename} not found`);
    process.exit(1);
  }

  console.log(`Converting ${filename} → JSON...`);

  try {
    // Read and parse YAML
    const yamlContent = fs.readFileSync(yamlPath, 'utf-8');
    const data = yaml.load(yamlContent);

    // Write as JSON
    const jsonContent = JSON.stringify(data, null, 2);
    fs.writeFileSync(jsonPath, jsonContent);

    console.log(`✓ Generated ${path.basename(jsonPath)}`);
  } catch (error) {
    console.error(`Error converting ${filename}:`, error.message);
    process.exit(1);
  }
}

function convertAll() {
  const srcDir = path.join(__dirname, '..', 'src');
  const buildDir = path.join(__dirname, '..', 'build');

  // Ensure build directory exists
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
  }

  console.log('Converting YAML source files to JSON...');
  console.log('-'.repeat(60));

  // Convert the two source YAML files to JSON
  convertYamlToJson(
    path.join(srcDir, 'model.yaml'),
    path.join(buildDir, 'model.json')
  );

  convertYamlToJson(
    path.join(srcDir, 'guide.yaml'),
    path.join(buildDir, 'guide-source.json')
  );

  console.log('\nYAML → JSON conversion complete!');
}

// Run if executed directly
if (require.main === module) {
  convertAll();
}

module.exports = { convertAll };
