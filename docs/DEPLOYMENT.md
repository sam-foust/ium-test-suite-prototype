# Deploying to GitHub Pages

## Overview

The Test Suite Viewer is configured to automatically deploy to GitHub Pages whenever you push to the `main` branch. The application is fully static - it loads and parses YAML test suite files directly in the browser.

## Prerequisites

- A GitHub repository for this project
- GitHub Pages enabled in repository settings

## Setup Instructions

### 1. Create GitHub Repository

```bash
# Initialize git (if not already done)
cd C:\ServiceTitan\src\ium-test-suite-prototype
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Test Suite Viewer"

# Add remote (replace with your repository URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, select:
   - Source: **GitHub Actions**
4. Save the settings

### 3. Automatic Deployment

That's it! The GitHub Actions workflow will automatically:

1. **Trigger on push to main**
2. **Install Node.js and dependencies**
3. **Build the React application**
4. **Deploy to GitHub Pages**

Your site will be available at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

## Adding New Test Suites

### Step 1: Create YAML File

Create a new YAML file following the schema in `YAML_SCHEMA.md`:

```yaml
# example-test-suite.yaml
metadata:
  title: "Your Test Suite Name"
  feature: "Feature Name"
  createdBy: "Your Name"
  dateCreated: "2025-12-09"
  lastUpdated: "2025-12-09"
  status: "Draft"

# ... rest of the structure
```

### Step 2: Add to Public Folder with Category

Organize by category in subfolders:

```
test-suite-ui/public/test-suites/
  ├── authn/              # Authentication tests
  │   └── password-management.yaml
  ├── payments/           # Payment tests
  │   └── checkout-flow.yaml
  ├── reporting/          # Reporting tests
  └── ...
```

For example, place an authentication test in:
```
test-suite-ui/public/test-suites/authn/login-flow.yaml
```

### Step 3: Update Manifest

Edit `test-suite-ui/public/test-suites/manifest.json`:

```json
{
  "testSuites": [
    {
      "id": "password-management",
      "file": "authn/password-management.yaml",
      "category": "Authentication"
    },
    {
      "id": "login-flow",
      "file": "authn/login-flow.yaml",
      "category": "Authentication"
    },
    {
      "id": "checkout-flow",
      "file": "payments/checkout-flow.yaml",
      "category": "Payments"
    }
  ]
}
```

**Note:** The `file` path is relative to `test-suites/` folder, and `category` groups tests in the UI.

### Step 4: Commit and Push

```bash
git add .
git commit -m "Add new test suite: Login Flow"
git push origin main
```

The site will automatically rebuild and deploy with your new test suite!

## Local Development

### Start Development Server

```bash
cd test-suite-ui
npm run dev
```

Opens at: `http://localhost:5173`

### Build for Production

```bash
cd test-suite-ui
npm run build
```

### Preview Production Build

```bash
cd test-suite-ui
npm run preview
```

Opens at: `http://localhost:4173`

## Architecture

### Static Site Benefits

✅ **Free hosting** on GitHub Pages  
✅ **No backend needed** - all processing in browser  
✅ **Fast** - served via CDN  
✅ **Automatic deployment** - just push to main  
✅ **Version controlled** - easy rollbacks  
✅ **Secure** - no server vulnerabilities  

### How It Works

```
User Browser
    ↓
Load React App
    ↓
Fetch manifest.json → List of test suites
    ↓
Fetch test-suite.yaml → Parse with js-yaml
    ↓
Render UI
```

**No API calls, no backend, all static files!**

## File Structure

```
test-suite-ui/
├── public/
│   └── test-suites/
│       ├── manifest.json              # Lists all test suites
│       └── password-management.yaml   # Test suite files
├── src/
│   ├── services/
│   │   └── api.ts                     # Fetches and parses YAML
│   └── ...
└── dist/                              # Built files (GitHub Pages serves this)
```

## GitHub Actions Workflow

The workflow (`.github/workflows/deploy.yml`) does:

1. **Checkout code**
2. **Setup Node.js 20**
3. **Install dependencies** (`npm ci`)
4. **Build** (`npm run build`)
5. **Upload to GitHub Pages**
6. **Deploy**

## Troubleshooting

### Deployment Failed

Check the **Actions** tab in your GitHub repository to see the error.

Common issues:
- **Permissions**: Ensure GitHub Actions has write permissions
- **Node version**: Workflow uses Node.js 20
- **Build errors**: Check that `npm run build` works locally

### Site Shows 404

1. Verify GitHub Pages is enabled (Settings → Pages)
2. Ensure source is set to "GitHub Actions"
3. Check that deployment workflow ran successfully
4. Wait a few minutes for DNS propagation

### YAML Files Not Loading

1. Verify files are in `test-suite-ui/public/test-suites/`
2. Check `manifest.json` lists the correct filenames
3. Check browser console for errors (F12)
4. Verify relative paths in `vite.config.ts` (base: `'./'`)

### Styles Not Loading

Make sure `vite.config.ts` has:
```typescript
base: './', // Use relative paths
```

## Updating the Site

Just push to main:

```bash
git add .
git commit -m "Update test suites"
git push origin main
```

GitHub Actions will automatically rebuild and deploy (takes ~1-2 minutes).

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to `test-suite-ui/public/`:
   ```
   your-domain.com
   ```

2. Configure DNS with your domain provider:
   - Add CNAME record pointing to `YOUR_USERNAME.github.io`

3. In GitHub Settings → Pages:
   - Enter your custom domain
   - Enable "Enforce HTTPS"

## Monitoring

### View Deployments

Go to: `https://github.com/YOUR_USERNAME/YOUR_REPO_NAME/deployments`

See all deployment history and status.

### Check Build Logs

1. Go to **Actions** tab
2. Click on the latest workflow run
3. View logs for each step

## Security

✅ **No backend** = No server vulnerabilities  
✅ **Static files only** = Reduced attack surface  
✅ **HTTPS enforced** = Secure connections  
✅ **GitHub's infrastructure** = DDoS protection  

⚠️ **Note**: All YAML files are publicly accessible. Don't include sensitive information!

## Performance

- **Fast loads**: Static files served from CDN
- **Caching**: Browser caches YAML files
- **Small size**: Typical build ~200KB gzipped
- **No server delay**: No backend API calls

## Costs

**FREE!** GitHub Pages is free for public repositories.

Limits:
- 1GB storage
- 100GB bandwidth/month
- Soft limit: 10 builds per hour

Perfect for documentation and test suite viewers!

## Next Steps

1. ✅ Push to GitHub
2. ✅ Enable GitHub Pages
3. ✅ Wait for deployment
4. ✅ Share the URL with your team
5. ✅ Add more test suites as needed

---

**Your site will be live at:**
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

**Happy deploying! 🚀**

