# Source Files - Content Editing Guide

This directory contains the **source of truth** for all content in the PM Maturity Model.

## 📁 Files Overview

### Source Files (Edit These)

| File | Purpose | What to Edit |
|------|---------|--------------|
| `model.yaml` | **SOURCE OF TRUTH** - The core maturity model | Levels, practices, criteria, AI examples |
| `guide.yaml` | Implementation guidance content | Step-by-step guidance, tips, pitfalls |

### Generated Files (DO NOT EDIT - Auto-generated in `build/` directory)

| File | Generated From | Purpose |
|------|----------------|---------|
| `build/model.json` | `model.yaml` | Intermediate JSON format |
| `build/guide-source.json` | `guide.yaml` | Intermediate JSON format |
| `build/assessment.json` | `model.json` | Practice metadata for the assessment tool |
| `build/guide.json` | `model.json` + `guide-source.json` | Complete guide with structure + content |

**IMPORTANT:** Only edit YAML files (`model.yaml` and `guide.yaml`). All JSON files are regenerated in the `build/` directory when you run `npm run build`.

**Why YAML?** It's more human-friendly than JSON - no quotes/commas to worry about, supports comments, and handles multi-line text better.

## 📊 Data Structure Reference

### model.yaml

The main file containing all 3 levels and 15 practices.

**Level Object:**
```yaml
- id: level1
  name: 'Level 1: Foundational Practices'
  color: bg-amber-50 border-amber-200
  headerColor: bg-amber-100
  description: One-line summary of the level
  context: 2-3 sentence explanation of what this level means
  value: Business value statement (why this matters)
  practices: []
```

**Field descriptions:**
- `id` - Unique identifier (level1, level2, level3)
- `name` - Display name shown in the UI
- `color` - Tailwind CSS classes for level background
- `headerColor` - Tailwind CSS classes for level header
- `description` - Short one-line summary
- `context` - Detailed explanation (2-3 sentences)
- `value` - Business value proposition
- `practices` - Array of Practice objects (see below)

**Practice Object:**
```yaml
- id: p1-teaming
  name: Teaming Models
  criteria:
    - Product teams are organized around specific product areas...
    - Clear PM/PO ownership is established for each team
    - Teams include dedicated UX and engineering leadership
  ai:
    enabled: false
    examples: []
```

**Field descriptions:**
- `id` - Unique identifier (p1-teaming, p2-discovery, etc.)
- `name` - Practice display name
- `criteria` - Array of pass criteria (bullet points for self-assessment)
- `ai.enabled` - true if AI can accelerate this practice
- `ai.examples` - Array of specific AI use cases (only if enabled is true)

**Example with AI acceleration:**
```yaml
- id: p2-discovery
  name: Discovery & Customer Insight (Evolution)
  criteria:
    - Regular cadence of customer interviews/research (monthly minimum)
    - Research insights are documented and shared across teams
    - Customer feedback is systematically collected from support, sales, success
  ai:
    enabled: true
    examples:
      - AI synthesis of customer interview transcripts into key themes
      - Automated analysis of support tickets and feature requests to identify patterns
      - LLM-powered analysis of sales call recordings for common objections
```

### assessment.json

Simpler structure - just practice metadata for the assessment tool.

**Structure:**
```json
{
  "practices": [
    {
      "id": "p1-teaming",
      "name": "Teaming Models",
      "level": 1,
      "levelName": "Foundational Practices"
    }
  ]
}
```

**Field descriptions:**
- `id` - Must match ID from model.json
- `name` - Practice name (should match model.json)
- `level` - Level number (1, 2, or 3)
- `levelName` - Human-readable level name

**Note:** This file is auto-generated from model.json. Do not edit it directly.

### guide.yaml

Implementation guidance content for each level (NO IDs or names - those come from model.yaml).

**Level Implementation Object:**

**IMPORTANT:** This file contains an array of level objects in the SAME ORDER as model.yaml.
- Do NOT include `id`, `name`, `color`, or `headerColor` - those come from model.yaml
- Each object in the array corresponds to the same position in model.yaml (index 0 = level1, index 1 = level2, etc.)

```yaml
levels:
  - readyWhen:
      - Your team is experiencing chaos—unclear priorities...
      - Different team members work in completely different ways...
    startHere:
      title: Start with the Foundation Trio
      items:
        - name: '1. Establish Teaming Models (Week 1-2)'
          steps:
            - 'Define who owns what: Map product areas to specific PM/PO owners'
            - Formalize your cross-functional teams...
    quickWins:
      - 'Template everything: Create templates for specs...'
      - Run a 'ways of working' workshop...
    pitfalls:
      - ❌ Trying to implement all 5 practices simultaneously...
      - ❌ Creating overly complex specs...
    successLooks:
      - ✅ No one asks 'what are you working on?'...
      - ✅ Engineering rarely has to come back and ask...
    nextLevel:
      - All 5 foundational practices are established...
      - Your team consistently meets commitments...
    timeline: 2-4 months to establish
```

**Field descriptions:**
- `readyWhen` - Array of signals that a team is ready for this level
- `startHere.title` - Title for the getting started section
- `startHere.items` - Array of implementation steps with sub-steps
- `quickWins` - Array of quick win suggestions
- `pitfalls` - Array of common mistakes to avoid (prefix with ❌)
- `successLooks` - Array of success indicators (prefix with ✅)
- `nextLevel` - Array of criteria for moving to next level
- `timeline` - Estimated time to establish this level

## ✍️ Editing Best Practices

### General Guidelines

1. **Keep JSON valid** - Use a JSON validator before committing
2. **Be specific** - Vague criteria aren't useful for self-assessment
3. **Make it measurable** - Teams should know if they pass or not
4. **Stay cumulative** - Level 2 assumes Level 1, Level 3 assumes both
5. **Real-world focus** - Avoid aspirational language; focus on what teams actually do

### Writing Good Criteria

**Good examples:**
- ✅ "Regular cadence of customer interviews (monthly minimum)"
- ✅ "Definition of Ready exists for work entering development"
- ✅ "Product teams are organized around specific product areas or customer segments"

**Needs improvement:**
- ❌ "Team does discovery" (too vague)
- ❌ "World-class research practices" (subjective, not measurable)
- ❌ "Amazing documentation" (not specific or actionable)

### AI Examples

Only mark `ai.enabled: true` if:
- AI/LLMs can **realistically** accelerate the practice today
- The acceleration is **meaningful** (not just marginal)
- Examples are **specific** (mention actual tools/techniques when possible)

**Good AI examples:**
- ✅ "AI synthesis of customer interview transcripts into key themes"
- ✅ "Automated statistical significance calculations and recommendations"
- ✅ "Natural language queries for product analytics"

**Not helpful:**
- ❌ "Use AI to help" (too vague)
- ❌ "ChatGPT can assist" (not specific enough)

### YAML Syntax Tips

Common mistakes to avoid:

1. **Indentation** - Must use spaces (not tabs), and must be consistent
   ```yaml
   # ❌ Wrong (inconsistent indentation)
   levels:
    - id: level1
       name: Level 1

   # ✅ Right (consistent 2-space indentation)
   levels:
     - id: level1
       name: Level 1
   ```

2. **Quotes** - Only needed for special characters or when starting with special chars
   ```yaml
   # ✅ Usually no quotes needed
   name: Teaming Models

   # ✅ Use quotes when needed
   name: 'Level 1: Foundational Practices'  # colon requires quotes
   description: Product teams are organized...  # no quotes needed
   ```

3. **Lists** - Use dash + space for array items
   ```yaml
   # ✅ Right
   criteria:
     - First criterion
     - Second criterion
   ```

4. **Comments** - Use # for comments (a YAML advantage!)
   ```yaml
   # This is a comment
   criteria:
     - Product teams are organized...  # inline comment also works
   ```

## 🔄 After Editing

1. **Validate YAML** - Most editors validate YAML automatically (VS Code, vim, etc.)
2. **Run the build**:
   ```bash
   npm run build
   ```
   This converts YAML → JSON → HTML
3. **Preview changes** - Open `public/model.html`, `public/assessment.html`, or `public/guide.html` in your browser
4. **Test thoroughly** - Click through all levels and practices

## 🆘 Need Help?

- **Structure questions:** Refer to the examples above
- **Content guidance:** See [../CONTRIBUTING.md](../CONTRIBUTING.md)
- **Build issues:** See [../docs/BUILD.md](../docs/BUILD.md)
- **General questions:** Open a [Discussion](../../discussions)
