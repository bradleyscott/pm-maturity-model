# Contributing to PM Maturity Model

Thank you for your interest in improving this model! 🎉

## 🎯 What We're Looking For

This model should reflect real-world product management practices. We especially value:

- **Specific, actionable criteria** that teams can self-assess against
- **Real examples** from your experience
- **AI acceleration opportunities** where AI/LLMs genuinely help
- **Balance** between aspiration and practicality
- **B2B/Enterprise context** (not consumer products)

## 📝 How to Contribute Content

### Step 1: What to Edit

Content lives in **source YAML files in the `src/` directory**:

**EDIT THESE FILES:**

- **`src/model.yaml`** - **SOURCE OF TRUTH** for the core model
  - Practice definitions
  - Pass criteria for each practice
  - AI acceleration examples
  - Level descriptions and context

- **`src/guide.yaml`** - Implementation guidance
  - "Ready when" criteria
  - Step-by-step implementation guides
  - Quick wins
  - Common pitfalls
  - Success criteria

**DO NOT EDIT THESE FILES** (they're auto-generated in `build/` directory):

- **`build/model.json`, `build/guide-source.json`** - Generated from YAML sources
- **`build/assessment.json`** - Generated from model.json
- **`build/guide.json`** - Generated from model.json + guide-source.json

### Step 2: Understanding the Structure

**Finding the data in YAML files:**

YAML is easier to edit than JSON - no quotes, commas, or brackets to worry about. Look for the `levels` array in `src/model.yaml`:

```yaml
levels:
  - id: level1
    name: 'Level 1: Foundational Practices'
    description: Establishing core product management disciplines...
    context: At this level, teams establish...
    value: 'Business value: Reduced rework...'
    practices:
      - id: p1-teaming
        name: Teaming Models
        criteria:
          - Product teams are organized around specific product areas...
          - Clear PM/PO ownership is established for each team
          - Teams include dedicated UX and engineering leadership
          - Cross-functional collaboration rhythms are defined...
        ai:
          enabled: false
          examples: []
```

**Why YAML?**
- No quote/comma syntax errors - easier for non-developers
- Multi-line text support - better for long descriptions
- Comments allowed - add notes with `# comment`
- More readable - cleaner structure

**What you can edit:**
- Practice names
- Criteria (bullet points teams use to self-assess)
- Descriptions and context
- AI enabled flag and examples
- Timeline estimates
- Implementation steps
- Quick wins, pitfalls, success criteria

See [src/README.md](src/README.md) for detailed field descriptions.

### Step 3: Making Your Changes

**Option A: GitHub UI (No coding required)**

1. Navigate to the file in GitHub (e.g., `src/model.yaml`)
2. Click the pencil icon ("Edit this file") in the top right
3. Make your changes directly in the browser
4. **Important:** Maintain proper YAML indentation (use spaces, not tabs)
5. Scroll down, add a commit message describing your change
6. Select "Create a new branch for this commit and start a pull request"
7. Click "Propose changes"

**Option B: Local Development**

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR-USERNAME/pm-maturity-model.git
   cd pm-maturity-model
   ```
3. Create a branch:
   ```bash
   git checkout -b improve-practice-criteria
   ```
4. Edit the YAML files in `src/` (model.yaml or guide.yaml)
5. Regenerate JSON and HTML files:
   ```bash
   npm run build
   ```
6. Preview your changes by opening `public/model.html` in your browser
7. Commit your changes (only commit YAML and generated HTML):
   ```bash
   git add src/*.yaml public/
   git commit -m "Improve Level 2 discovery criteria"
   ```
8. Push and create a pull request:
   ```bash
   git push origin improve-practice-criteria
   ```

### Step 4: Testing Your Changes

After editing YAML files, run the build process:

```bash
npm run build
```

This converts YAML → JSON → HTML. Open the HTML files in your browser to preview:
- `public/model.html` - The maturity model
- `public/assessment.html` - Assessment tool
- `public/guide.html` - Getting started guide

## ✅ Content Guidelines

### Writing Good Criteria

**Good examples:**
- ✅ "Regular cadence of customer interviews (monthly minimum)"
- ✅ "Definition of Ready exists for work entering development"
- ✅ "Product teams are organized around specific product areas or customer segments"

**Needs improvement:**
- ❌ "Team does discovery" (too vague, not measurable)
- ❌ "World-class research practices" (subjective, not actionable)
- ❌ "Everyone is aligned" (unclear what this means)

### Adding AI Acceleration Examples

Only add AI examples where:
- AI **genuinely** makes the practice faster/better/cheaper
- It's about **doing PM work**, not building AI products
- You can cite real tools or specific techniques
- It's practical for most teams to implement

**Good AI examples:**
- ✅ "AI synthesis of customer interview transcripts into key themes"
- ✅ "LLM-powered analysis of sales call recordings for common objections"
- ✅ "Automated generation of outcome hypotheses based on similar past initiatives"

**Not appropriate:**
- ❌ "AI makes this better" (too vague)
- ❌ Building AI features into your product (not about PM work itself)

### Maintaining Cumulative Structure

Remember:
- **Level 2 assumes Level 1 is in place**
- **Level 3 assumes both Level 1 and 2 are in place**

Don't duplicate criteria across levels—each level should add new capabilities.

**Example:**
- Level 1: "Customer feedback is collected from support tickets"
- Level 2: "Research insights are documented and shared across teams" (builds on L1)
- Level 3: "Discovery insights feed directly into quarterly strategy" (builds on both)

### Writing Style

- Use **present tense** - "Teams maintain" not "Teams should maintain"
- Be **direct and actionable** - Specific enough to self-assess
- **Avoid jargon** where possible - Or define it clearly
- Focus on **B2B/Enterprise context** - These practices are for software product teams

## 🔍 Review Process

1. **Submit PR** - Your pull request with clear description
2. **Maintainer review** - Usually within 1 week
3. **Discussion/iteration** - We may ask clarifying questions or suggest refinements
4. **Approval** - Once the changes look good
5. **Merge** - Changes are merged and deployed

We'll work collaboratively to get your contribution across the finish line!

## 💡 Ideas Without Code

Not comfortable editing JSON files? That's totally fine!

**Create an issue instead:**
1. Go to [Issues](../../issues)
2. Click "New Issue"
3. Choose "💡 Content Improvement" template
4. Describe what should change and why
5. We'll discuss and implement it

## 📋 Pull Request Checklist

When submitting a PR, please ensure:

- [ ] I've edited YAML files in `src/` (not JSON or HTML files directly)
- [ ] YAML indentation is correct (use spaces, not tabs)
- [ ] I've run `npm run build` to regenerate JSON and HTML files
- [ ] I've tested the changes in my browser
- [ ] Content follows the guidelines above
- [ ] Changes maintain the cumulative level structure
- [ ] Commit includes YAML sources and generated HTML files (JSON files are gitignored)

## 📚 Questions?

- **Content structure details:** See [src/README.md](src/README.md)
- **Build system:** See [docs/BUILD.md](docs/BUILD.md)
- **General questions:** Open a [Discussion](../../discussions)

## 🌟 Types of Contributions We Love

- **Clarifying vague criteria** - Make it more specific and measurable
- **Adding context** - Real-world examples of what "good" looks like
- **Practical AI examples** - Specific tools/techniques that actually help
- **Fixing contradictions** - Spot something that doesn't make sense?
- **Balancing rigor and reality** - Too aspirational? Too basic? Help us find the sweet spot

Thank you for helping make this model better! 🙏

Every contribution, no matter how small, makes this resource more valuable for product teams everywhere.
