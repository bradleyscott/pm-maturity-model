# Product Management Maturity Model

A practice-based framework for B2B/Enterprise product teams to assess and improve their capabilities.

## 🎯 What is this?

This model helps product teams understand their maturity across 3 levels:

- **Level 1: Foundational Practices** - Establishing core product management disciplines and standards
- **Level 2: Outcome-Driven Operations** - Shifting from output focus to outcome ownership and systematic learning
- **Level 3: Strategic Innovation Engine** - Driving organizational strategy, technical direction, and continuous innovation

Each level contains specific practices with clear pass criteria that teams can use for self-assessment.

## 🚀 Use the Model

**[View Live Site](#)** ← Deploy to see the interactive version

- [View the Maturity Model](public/model.html) - Explore all 3 levels and 15 practices
- [Take the Self-Assessment](public/assessment.html) - Evaluate your team's current state
- [Read the Getting Started Guide](public/guide.html) - Step-by-step implementation guidance

## 💡 Key Features

- **Practice-based** - Focuses on what teams actually do, not abstract concepts
- **Cumulative** - Level 2 builds on Level 1, Level 3 builds on both
- **Self-assessment** - Teams can honestly evaluate themselves
- **AI-aware** - Marks practices where AI/LLMs can accelerate work
- **B2B/Enterprise focused** - Tailored for product teams in enterprise software

## 📊 What's Included

The model covers **15 practices across 3 levels**:

**Level 1 (Foundational):**
- Teaming Models
- PRD Standards & Documentation ✨
- Roadmaps & Planning Cadence ✨
- Product Quality Standards
- Delivery Process & DOR

**Level 2 (Outcome-Driven):**
- Discovery & Customer Insight ✨
- Outcomes Over Outputs ✨
- Product Analytics Stack ✨
- Adoption Planning & Marketing ✨
- Experimentation & Learning ✨

**Level 3 (Strategic):**
- Continuous Discovery ✨
- Product-Led Business Strategy ✨
- Technical Architecture & Platform Decisions ✨
- Customer Co-Creation ✨
- Cross-Org Influence & Product Culture

✨ = AI acceleration opportunities available

## 🤝 Contributing

We welcome contributions! This model is a living document that should evolve with product management best practices.

**Ways to contribute:**
- 📝 Improve practice definitions and criteria
- 💡 Add real-world examples
- ✨ Suggest new AI acceleration opportunities
- 🔄 Refine existing practices
- 🐛 Fix typos or clarify language

**See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.**

## 📝 Quick Start for Contributors

**Content contributors:** Edit YAML files in the `src/` directory:
- `src/model.yaml` - **SOURCE OF TRUTH** - The maturity levels and practices
- `src/guide.yaml` - Implementation guidance (tips, pitfalls, quick wins)

**DO NOT EDIT** these files (they're auto-generated in `build/` directory):
- `build/model.json`, `build/guide-source.json` - Auto-generated from YAML sources
- `build/assessment.json` - Auto-generated from model.json
- `build/guide.json` - Auto-generated from model.json + guide-source.json

After editing, run:
```bash
npm run build      # Converts YAML → JSON → HTML
```

See [src/README.md](src/README.md) for detailed content editing guidance.

## 🏗️ For Developers

- **Build system:** [docs/BUILD.md](docs/BUILD.md)
- **Architecture:** [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- **Deployment:** [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

## 🌟 About This Model

This model synthesizes best practices from leading product thinkers including:
- Marty Cagan (SVPG)
- Teresa Torres
- Ravi Mehta
- Melissa Perri
- Lenny Rachitsky

Tailored specifically for B2B/B2E enterprise software product teams.

## 📄 License

[Add your license here]

## 🙏 Acknowledgments

Built with contributions from the product management community.
