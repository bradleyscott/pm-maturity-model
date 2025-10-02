# HTML Build System for PM Maturity Model

This directory contains a simple build system that generates HTML files from YAML sources.

## Overview

The build system converts YAML source files to JSON, generates derived data files, and then generates standalone HTML files using templates. This ensures the HTML files are always in sync with the YAML source files.

## Quick Start

```bash
# Generate HTML files from YAML sources
npm run build
```

That's it! The build converts YAML → JSON → HTML automatically.

## How It Works

### Build Process

The build runs in three steps:

**Step 1: YAML to JSON Conversion** (`scripts/yaml-to-json.js`)
- Reads `model.yaml` and `guide.yaml` from `src/`
- Converts YAML to JSON using js-yaml parser
- Generates `model.json` and `guide-source.json` in `build/`

**Step 2: Generate Derived Data** (`scripts/generate-derived-data.js`)
- Reads `model.json` and `guide-source.json` from `build/`
- Generates `assessment.json` from model.json
- Generates `guide.json` by merging model.json + guide-source.json
- Writes all outputs to `build/`

**Step 3: HTML Generation** (`scripts/generate-html.js`)
- Reads all JSON data files from `build/`
- Applies HTML templates with embedded JavaScript
- Generates complete standalone HTML files in `public/`

### File Structure

```
pm-maturity-model/
├── package.json              # Build scripts + js-yaml dependency
├── scripts/
│   ├── build.js             # Main build orchestrator
│   ├── yaml-to-json.js      # Converts YAML → JSON
│   ├── generate-derived-data.js  # Generates assessment.json and guide.json
│   ├── generate-html.js     # HTML template generator
│   └── icons.js             # SVG icon library
├── src/
│   ├── model.yaml           # SOURCE - Edit this
│   └── guide.yaml           # SOURCE - Edit this
├── build/                   # GENERATED - Do not edit
│   ├── model.json           # Converted from model.yaml
│   ├── guide-source.json    # Converted from guide.yaml
│   ├── assessment.json      # Derived from model.json
│   └── guide.json           # Merged from model.json + guide-source.json
└── public/                  # Generated HTML files
    ├── index.html           # SOURCE - Edit this
    ├── model.html           # GENERATED
    ├── assessment.html      # GENERATED
    └── guide.html           # GENERATED
```

## When to Run the Build

Run `npm run build` whenever you:

- Modify `model.yaml` - levels, practices, criteria, or AI examples
- Modify `guide.yaml` - implementation tips and guidance
- Add or remove levels or practices

The build is **fast** (runs in under a second) and **deterministic** (same input always produces the same output).

**No Drift Possible:** Since all JSON files are generated from YAML sources, they're always guaranteed to stay in sync. You cannot have mismatched IDs or names between files.

## Dependencies

The build system has **minimal dependencies**:

- **js-yaml** - YAML parser (only dependency, ~20KB)
- Pure Node.js standard library (fs, path)
- No React, no bundlers, no build frameworks
- No Babel, no heavy parsers

## Workflow

### Making Changes

1. Edit the YAML files in `src/` (model.yaml or guide-implementation.yaml)
2. Run `npm run build`
3. JSON and HTML files are regenerated automatically
4. Commit YAML sources and generated HTML files (JSON files are gitignored)

### Advantages

✅ **Single source of truth** - YAML files are the canonical source
✅ **Human-friendly format** - No JSON quote/comma syntax issues
✅ **Fully deterministic** - Same input = same output
✅ **Fast** - Builds in milliseconds
✅ **Simple** - No complex toolchain
✅ **Easy to maintain** - Clear separation between data and presentation
✅ **Version controlled** - YAML sources and HTML are committed
✅ **Minimal dependencies** - Just js-yaml + Node.js

## Validating YAML

Before running the build, make sure your YAML is valid:

Most code editors (VS Code, vim, etc.) will validate YAML syntax automatically and highlight errors.

Common YAML issues:
- **Indentation** - Must use spaces (not tabs) and be consistent
- **Colons in values** - Quote strings that contain colons: `name: 'Level 1: Foundation'`

The build process will fail with a clear error message if YAML is invalid.

## Verify the Build

The generated HTML files should accurately reflect the YAML source data. You can verify by:

```bash
# Check that key content appears in HTML
grep "Strategic Innovation Engine" public/model.html
grep "Strategic Innovation Engine" public/assessment.html
grep "Strategic Innovation Engine" public/guide.html
```

## Troubleshooting

### Build fails with "src directory not found"

Make sure you're running the command from the root of the repository.

### Generated HTML doesn't match YAML

1. Make sure you've saved all YAML files
2. Check that the YAML files don't have syntax errors
3. Run `npm run build` again

### YAML syntax errors

Common mistakes:

- **Tabs instead of spaces**: Use spaces for indentation
- **Inconsistent indentation**: Must be consistent (2 or 4 spaces)
- **Unquoted colons**: `name: Level 1: Foundation` ← Should be `name: 'Level 1: Foundation'`
- **Missing space after dash**: `-item` ← Should be `- item`

### Icons look wrong

Icons are hardcoded as inline SVG in `scripts/icons.js`. These are converted from Lucide icon names.

## Technical Details

### How HTML Generation Works

1. YAML files are parsed using js-yaml library
2. Converted to JSON format
3. JSON data is injected into HTML template literals using `JSON.parse()`

The templates include:
1. Static HTML structure (header, footer, etc.)
2. A `<script>` tag containing the data as a JavaScript variable
3. Vanilla JavaScript code for interactivity (collapsible sections, etc.)

The generated HTML files are **completely standalone** - they don't require any external JavaScript files or frameworks.

### File Outputs

Each HTML file is self-contained:

- **model.html** (~31KB) - Interactive maturity model with all 15 practices
- **assessment.html** (~19KB) - Self-assessment worksheet with progress tracking
- **guide.html** (~31KB) - Implementation guidance with step-by-step instructions

All files include Tailwind CSS loaded from CDN for styling.

## Future Enhancements

Potential improvements:

- Add a file watcher to auto-rebuild on JSON changes
- Add JSON schema validation
- Generate TypeScript type definitions from the data
- Create a visual diff tool to compare generated HTML with previous versions

---

**Questions?** Check the code in `scripts/` - it's well-commented and straightforward.
