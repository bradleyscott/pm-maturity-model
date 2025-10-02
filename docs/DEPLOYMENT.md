# Deployment Guide

The PM Maturity Model is a static site that can be deployed to any static hosting service.

## 📦 What Gets Deployed

The `public/` directory contains all the files needed for deployment:
- `index.html` - Home page
- `model.html` - The maturity model
- `assessment.html` - Self-assessment tool
- `guide.html` - Getting started guide

All files are completely self-contained - no build process needed at runtime.

## 🚀 Deployment Options

### Option 1: Netlify (Recommended)

**Quick Deploy (Drag & Drop):**

1. Run the build to ensure HTML files are up to date:
   ```bash
   npm run build
   ```

2. Go to [Netlify Drop](https://app.netlify.com/drop)

3. Drag the entire `public/` folder onto the page

4. Done! Netlify gives you a URL like: `https://random-name-123.netlify.app`

**Deploy from GitHub (Automatic):**

1. Push your repository to GitHub

2. Connect to Netlify:
   - Go to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select your repository

3. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `public`

4. Click "Deploy site"

**Using netlify.toml (Included):**

The repository includes a `netlify.toml` configuration file:

```toml
[build]
  publish = "public"
  command = "npm run build"
```

This automatically configures the build when you connect via GitHub.

### Option 2: Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   npm run build
   cd public
   vercel
   ```

3. Follow the prompts

### Option 3: GitHub Pages

1. Build the project:
   ```bash
   npm run build
   ```

2. Enable GitHub Pages:
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: Select your branch
   - Folder: Select `/public`

3. Save and wait for deployment

**Alternatively, use a GitHub Action:**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

### Option 4: Any Static Host

The `public/` folder can be deployed to any static hosting service:
- **AWS S3 + CloudFront**
- **Google Cloud Storage**
- **Azure Static Web Apps**
- **Cloudflare Pages**
- **Render**
- **Surge**

Simply upload the contents of the `public/` directory.

## 🔄 Continuous Deployment Workflow

**For contributors:**

1. Edit TSX files in `src/`
2. Run `npm run build` locally
3. Commit both TSX and generated HTML files
4. Push to GitHub
5. Deployment happens automatically (if configured)

**Best practice:**

Always commit the generated HTML files along with TSX changes. This ensures:
- The site works even without running the build
- Deployment is simpler
- Version control tracks both source and output

## ⚙️ Custom Domain Setup

### Netlify

1. In Netlify dashboard → Domain management
2. Click "Add custom domain"
3. Enter your domain (e.g., `pm-maturity.yourcompany.com`)
4. Follow DNS configuration instructions
5. Enable HTTPS (automatic with Netlify)

### GitHub Pages

1. In repository Settings → Pages
2. Enter custom domain
3. Add CNAME record in your DNS:
   ```
   CNAME  pm-maturity  yourusername.github.io
   ```
4. Wait for DNS propagation
5. Enable "Enforce HTTPS"

## 🏗️ Build Process

The build process converts TSX files to HTML:

```bash
npm run build
```

This runs:
1. Extract data from TSX files → `data/*.json`
2. Generate HTML from data → `public/*.html`

See [BUILD.md](BUILD.md) for technical details.

## ✅ Pre-Deployment Checklist

Before deploying:

- [ ] Run `npm run build` to regenerate HTML
- [ ] Test all HTML files in a browser locally
- [ ] Verify navigation between pages works
- [ ] Check that assessment tool functions correctly
- [ ] Ensure all content is up to date
- [ ] Commit both source and generated files

## 🔍 Troubleshooting

**Issue: "Page not found" errors**

- Check that `public/` contains all 4 HTML files
- Verify the publish directory is set correctly
- Make sure index.html is in the root of public/

**Issue: Build fails on deployment platform**

- Ensure `package.json` and `package-lock.json` are committed
- Check that Node.js version is 16+ (update in deployment settings)
- Verify all dependencies are in `package.json`, not just `devDependencies`

**Issue: CSS doesn't load**

- The site uses Tailwind CSS from CDN (no build step needed for CSS)
- Check that `<script src="https://cdn.tailwindcss.com"></script>` is in HTML
- If CDN is blocked, consider self-hosting Tailwind

**Issue: Changes not appearing**

- Clear browser cache
- Use incognito/private mode
- Wait a few minutes for CDN cache to clear
- Run `npm run build` before committing

## 📊 Monitoring

The site is static with no backend, so monitoring is minimal:

- **Uptime:** Use a service like UptimeRobot or Better Uptime
- **Analytics:** Add Google Analytics or Plausible to track usage
- **Performance:** Use Lighthouse or WebPageTest

To add analytics, edit the HTML files in `public/` after building, or modify the generation templates in `scripts/generate-html.js`.

## 🌍 Multi-Environment Setup

You can maintain multiple environments:

**Development:**
- Local: `npm run build` + open `public/index.html`
- Dev branch deployed to `dev.pm-maturity.com`

**Staging:**
- Staging branch deployed to `staging.pm-maturity.com`
- Test changes before production

**Production:**
- Main branch deployed to `pm-maturity.com`
- Protected branch with required reviews

## 📝 Notes

- The site has **no runtime dependencies** - everything runs in the browser
- No database or backend required
- **Free to host** on most platforms
- **Fast** - static files served from CDN
- **Secure** - no server-side code to exploit

---

For technical build details, see [BUILD.md](BUILD.md).

For content editing, see [../CONTRIBUTING.md](../CONTRIBUTING.md).
