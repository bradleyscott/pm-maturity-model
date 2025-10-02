# Technical Architecture

## Overview

The PM Maturity Model is built as a **static site** with a simple build process that converts YAML source files into standalone HTML files.

## Design Principles

1. **Content as Code** - All model content lives in version-controlled YAML files
2. **Static First** - No runtime dependencies, everything runs in the browser
3. **Build-Time Generation** - YAML → JSON → HTML happens at build time
4. **Single Source of Truth** - YAML files are canonical; JSON and HTML are generated
5. **Contributor-Friendly** - Non-technical contributors can edit YAML via GitHub UI (easier than JSON)

## Directory Structure

```
pm-maturity-model/
├── src/
│   ├── model.yaml          # SOURCE - Edit this
│   └── guide.yaml          # SOURCE - Edit this
├── build/                  # GENERATED - Do not edit
│   ├── model.json          # Converted from model.yaml
│   ├── guide-source.json   # Converted from guide.yaml
│   ├── assessment.json     # Derived from model.json
│   └── guide.json          # Merged from model.json + guide-source.json
│
├── public/                 # GENERATED - Deploy these
│   ├── index.html
│   ├── model.html
│   ├── assessment.html
│   └── guide.html
│
├── scripts/                # Build tooling
│   ├── build.js           # Main orchestrator
│   ├── yaml-to-json.js    # YAML → JSON converter
│   ├── generate-derived-data.js  # Generates derived JSON
│   ├── generate-html.js   # HTML generator
│   └── icons.js           # SVG icon library
│
├── docs/                   # Documentation
│   ├── BUILD.md
│   ├── DEPLOYMENT.md
│   └── ARCHITECTURE.md (this file)
│
└── .github/                # GitHub templates
    ├── ISSUE_TEMPLATE/
    └── pull_request_template.md
```

## Build Process

### Step 1: YAML to JSON Conversion

**File:** `scripts/yaml-to-json.js`

1. Read `model.yaml` and `guide.yaml` from `src/`
2. Parse YAML using js-yaml library
3. Generate `model.json` and `guide-source.json` in `build/`

**Why?** YAML is more human-friendly for editing (no quotes/commas, supports comments, better multi-line text).

### Step 2: Generate Derived Data

**File:** `scripts/generate-derived-data.js`

This step prevents drift between files:
1. Read `model.json` and `guide-source.json` from `build/`
2. Generate `assessment.json` - extract practice metadata from model.json
3. Generate `guide.json` - merge model.json structure + guide-source.json content
4. Write all outputs to `build/`

**Why?** This ensures assessment.json and guide.json are always in sync with model.json. Contributors only edit the YAML source files, never the generated ones.

### Step 3: HTML Generation

**File:** `scripts/generate-html.js`

For each page:
1. Load JSON data from `build/` directory
2. Apply HTML template (template literals with embedded JavaScript)
3. Inject data as JavaScript variables
4. Include vanilla JavaScript for interactivity
5. Write complete HTML file to `public/`

**Output:**
- Standalone HTML files
- No external JavaScript dependencies
- Tailwind CSS loaded from CDN
- All interactivity in inline `<script>` tags

## Data Flow

```
┌────────────────────────────┐
│ src/model.yaml             │  ← EDIT: Levels, practices, criteria
│ src/guide.yaml             │  ← EDIT: Implementation tips
└─────────┬──────────────────┘
          │
          │ npm run build (Step 1)
          ↓
┌──────────────────┐
│ yaml-to-json.js  │  Parse YAML → Generate JSON
└─────────┬────────┘
          │
          ↓
┌────────────────────────────┐
│ build/model.json           │  ← GENERATED
│ build/guide-source.json    │  ← GENERATED
└─────────┬──────────────────┘
          │
          │ npm run build (Step 2)
          ↓
┌─────────────────────────┐
│ generate-derived-data.js │  Merge sources → Generate derived JSON
└─────────┬───────────────┘
          │
          ↓
┌────────────────────────┐
│ build/assessment.json  │  ← GENERATED (practice metadata)
│ build/guide.json       │  ← GENERATED (merged structure + content)
└─────────┬──────────────┘
          │
          │ npm run build (Step 3)
          ↓
┌─────────────────┐
│generate-html.js │  Load all JSON + apply templates
└─────────┬───────┘
          │
          ↓
┌─────────────────┐
│ public/*.html   │  ← Deploy these
│ (Static site)   │
└─────────────────┘
```

**Key insight:** With this architecture, you CANNOT have drift between files. If you rename a practice in model.yaml, the change automatically propagates through all generated files (JSON and HTML).

**Clear separation:** The `src/` directory contains ONLY editable source files. All intermediate build artifacts live in `build/`, making it impossible for contributors to accidentally edit generated files.

## Technology Stack

### Build Time
- **Node.js** - Build script runtime (standard library only)
- **js-yaml** - YAML parser (only dependency)
- **Template Literals** - HTML generation
- **Minimal dependencies** - Just js-yaml

### Runtime (Browser)
- **Vanilla JavaScript** - All interactivity
- **Tailwind CSS** (CDN) - Styling
- **No frameworks** - Pure HTML/CSS/JS

### Development
- **YAML** - Source file format (human-friendly, supports comments)
- **Git** - Version control
- **npm** - Script runner (one dependency: js-yaml)

## Key Files

### Source Files (YAML)

**Structure:**
```yaml
levels:
  - id: level1
    name: 'Level 1: Foundational Practices'
    practices:
      - id: p1-teaming
        name: Teaming Models
        criteria:
          - '...'
        ai:
          enabled: false
          examples: []
```

**Why YAML?**
- Human-friendly syntax (no quotes/commas)
- Supports comments with `#`
- Better multi-line text handling
- Easier for non-technical contributors
- Syntax highlighting in GitHub
- Easy to edit via GitHub UI

### Generated HTML Files

**Structure:**
```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>/* minimal custom CSS */</style>
</head>
<body>
  <!-- Static HTML structure -->
  <div id="container"></div>

  <script>
    // Data embedded as JavaScript
    const levels = [/* full data */];

    // Vanilla JavaScript for interactivity
    function render() { /* ... */ }
    render();
  </script>
</body>
</html>
```

**Why this approach?**
- **Zero runtime dependencies** - Works anywhere
- **Fast** - No JavaScript framework overhead
- **SEO-friendly** - All content in HTML
- **Inspectable** - View source to see everything
- **Portable** - Single file contains everything

## Deployment Architecture

### Static Hosting
Any static host works:
- Netlify (recommended - see `netlify.toml`)
- GitHub Pages
- Vercel
- Cloudflare Pages
- AWS S3 + CloudFront

### Build Integration

**Netlify** (automatic):
```toml
[build]
  publish = "public"
  command = "npm run build"
```

**GitHub Actions** (example):
```yaml
- run: npm install
- run: npm run build
- uses: peaceiris/actions-gh-pages@v3
  with:
    publish_dir: ./public
```

## Scalability & Performance

**Build Performance:**
- **Fast** - Completes in <1 second
- **Deterministic** - Same input → same output
- **Incremental** - Only rebuilds what changed

**Runtime Performance:**
- **Instant** - Static files from CDN
- **Small** - ~80KB total (HTML + inline JS)
- **No API calls** - Everything client-side

**Content Scalability:**
- Current: 3 levels, 15 practices
- Can scale to: 10+ levels, 100+ practices
- Limit: Browser memory (realistically thousands of practices)

## Security

**Attack Surface:**
- **None** - No server-side code
- **No database** - No injection attacks
- **No user data** - Nothing to leak
- **Static files only** - Standard CDN security applies

**Headers** (via netlify.toml):
```toml
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
```

## Future Enhancements

Potential improvements:

1. **TypeScript Validation**
   - Add TypeScript types for data structures
   - Validate schema at build time

2. **Content Versioning**
   - Track model version in JSON metadata
   - Show changelog between versions

3. **i18n Support**
   - Extract strings to separate files
   - Generate multilingual HTML

4. **Automated Testing**
   - Validate data structure
   - Test HTML generation
   - Visual regression testing

5. **Progressive Enhancement**
   - Add service worker for offline use
   - Local storage for assessment persistence

## Development Workflow

**For content contributors:**
```
Edit src/*.yaml → PR → Review → Merge → Auto-deploy
```

**For developers:**
```
Edit scripts/*.js → npm run build → Test → PR → Review → Merge
```

## Questions?

- **Build system:** See [BUILD.md](BUILD.md)
- **Deployment:** See [DEPLOYMENT.md](DEPLOYMENT.md)
- **Contributing:** See [../CONTRIBUTING.md](../CONTRIBUTING.md)
