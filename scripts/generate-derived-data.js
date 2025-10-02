#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Generate derived JSON files from the master model.json
 *
 * This ensures that assessment.json and guide.json are always in sync
 * with model.json - preventing drift between files.
 */

function generateAssessmentData(modelData) {
  const practices = [];

  modelData.levels.forEach(level => {
    const levelNumber = parseInt(level.id.replace('level', ''));
    const levelName = level.name.split(': ')[1]; // Extract "Foundational Practices" from "Level 1: Foundational Practices"

    level.practices.forEach(practice => {
      practices.push({
        id: practice.id,
        name: practice.name,
        level: levelNumber,
        levelName: levelName
      });
    });
  });

  return { practices };
}

function generateGuideData(modelData, guideImplementation) {
  const levels = [];

  modelData.levels.forEach((level, index) => {
    const implementation = guideImplementation.levels[index];

    levels.push({
      id: level.id,
      name: level.name,
      color: level.color,
      headerColor: level.headerColor,
      ...implementation  // Merge in the implementation content
    });
  });

  return { levels };
}

function generateDerivedData() {
  const buildDir = path.join(__dirname, '..', 'build');

  console.log('Reading source files...');

  // Read master data
  const modelPath = path.join(buildDir, 'model.json');
  const guideSourcePath = path.join(buildDir, 'guide-source.json');

  if (!fs.existsSync(modelPath)) {
    console.error('Error: model.json not found in build/');
    process.exit(1);
  }

  if (!fs.existsSync(guideSourcePath)) {
    console.error('Error: guide-source.json not found in build/');
    process.exit(1);
  }

  const modelData = JSON.parse(fs.readFileSync(modelPath, 'utf-8'));
  const guideImplementation = JSON.parse(fs.readFileSync(guideSourcePath, 'utf-8'));

  // Validation
  if (modelData.levels.length !== guideImplementation.levels.length) {
    console.error(`Error: Mismatch between model.json (${modelData.levels.length} levels) and guide-source.json (${guideImplementation.levels.length} levels)`);
    process.exit(1);
  }

  console.log('Generating derived data files...');

  // Generate assessment.json
  const assessmentData = generateAssessmentData(modelData);
  const assessmentPath = path.join(buildDir, 'assessment.json');
  fs.writeFileSync(assessmentPath, JSON.stringify(assessmentData, null, 2));
  console.log('✓ Generated assessment.json');

  // Generate guide.json
  const guideData = generateGuideData(modelData, guideImplementation);
  const guidePath = path.join(buildDir, 'guide.json');
  fs.writeFileSync(guidePath, JSON.stringify(guideData, null, 2));
  console.log('✓ Generated guide.json');

  console.log('\nDerived data generation complete!');
  console.log('  • assessment.json - Auto-generated from model.json');
  console.log('  • guide.json - Auto-generated from model.json + guide-source.json');
}

// Run if executed directly
if (require.main === module) {
  generateDerivedData();
}

module.exports = { generateDerivedData };
