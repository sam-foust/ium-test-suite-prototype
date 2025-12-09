# GitHub Pages Deployment Fix

## Issue
When deploying to GitHub Pages, you see the README instead of the React application.

## Solution

The issue is that GitHub Pages needs the correct base path configured. I've updated the configuration to fix this.

### Changes Made:

1. **Updated `vite.config.ts`** to use the repository name as the base path
2. **Verified workflow** deploys the correct folder (`test-suite-ui/dist`)
3. **Added `.nojekyll` file** to prevent Jekyll processing

### How to Fix:

#### Option 1: Let Vite Auto-Detect (Recommended)

The workflow now passes the repository name to Vite, which automatically sets the correct base path.

Just rebuild and redeploy:

```bash
git add .
git commit -m "Fix GitHub Pages base path"
git push origin main
```

#### Option 2: Manually Set Base Path

If you know your repository URL, you can hardcode it in `vite.config.ts`:

```typescript
base: '/your-repo-name/',  // Replace with your actual repo name
```

For example, if your repo is `https://github.com/username/test-suite-viewer`:
```typescript
base: '/test-suite-viewer/',
```

### Verify Your Repository Name

Your GitHub Pages URL will be:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

The base path should match `YOUR_REPO_NAME`.

### Alternative: Use a User/Organization Site

If you want the site at just `https://YOUR_USERNAME.github.io/`:

1. Name your repository: `YOUR_USERNAME.github.io`
2. Set `base: '/'` in `vite.config.ts`

### Testing Locally

After changing the base path, test locally:

```bash
cd test-suite-ui

# Build
npm run build

# Preview (simulates GitHub Pages)
npm run preview
```

Visit `http://localhost:4173/YOUR_REPO_NAME/` to test.

### Common Issues:

**Problem:** Still showing README  
**Solution:** Make sure you're visiting `https://username.github.io/repo-name/` (with trailing slash)

**Problem:** 404 errors  
**Solution:** Check that `base` in `vite.config.ts` matches your repository name exactly

**Problem:** Assets not loading  
**Solution:** Clear browser cache and verify base path is correct

### Quick Fix Command:

```bash
# If your repo name is "test-suite-viewer"
cd test-suite-ui
npm run build
git add .
git commit -m "Fix GitHub Pages deployment"
git push origin main
```

Wait 1-2 minutes for deployment, then visit:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

### Debugging:

1. Check GitHub Actions logs in the **Actions** tab
2. Verify build succeeded
3. Check that Files were uploaded to pages artifact
4. Make sure you're visiting the correct URL (include repo name!)

---

**After this fix, your site should load correctly!**

