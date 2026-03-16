# CI/CD Deployment Guide

## Setup Instructions

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### 🔧 Prerequisites

1. Your code must be pushed to GitHub
2. Repository should be accessible at: `https://github.com/maheshpawarI2E/Demo-AI`

### 📋 Configuration Complete

The following have been configured:

✅ **package.json** 
- Added `homepage`: `https://maheshpawarI2E.github.io/Demo-AI`
- Added deployment scripts

✅ **GitHub Actions Workflows**
- `.github/workflows/deploy.yml` - Builds and deploys to GitHub Pages on push to `main`
- `.github/workflows/ci.yml` - Runs tests and validation

### 🚀 First Time Setup

1. **Push your code to GitHub**
   ```bash
   git remote add origin https://github.com/maheshpawarI2E/Demo-AI.git
   git branch -M main
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to: `https://github.com/maheshpawarI2E/Demo-AI/settings/pages`
   - Under "Build and deployment"
   - Select: **Deploy from a branch**
   - Branch: Select `gh-pages` and `/ (root)`
   - Click Save

3. **Wait for Deployment**
   - GitHub Actions will automatically trigger on push
   - Monitor progress: `https://github.com/maheshpawarI2E/Demo-AI/actions`
   - Once complete, your app will be live at: `https://maheshpawarI2E.github.io/Demo-AI`

### 📊 Workflow Details

#### Deploy Workflow (deploy.yml)
- **Triggers**: Push to `main` branch or pull requests
- **Steps**:
  1. Checks out code
  2. Sets up Node.js v18
  3. Installs dependencies
  4. Runs tests
  5. Builds the application
  6. Deploys to GitHub Pages

#### CI Workflow (ci.yml)
- **Triggers**: Push to `main` or `develop`, pull requests
- **Steps**:
  1. Validates build
  2. Runs tests
  3. Checks for errors

### 🔄 Automatic Deployment

After initial setup, every push to `main` will:
1. ✅ Run all tests
2. ✅ Build the application
3. ✅ Deploy to GitHub Pages automatically

### 🌐 Access Your App

- **Production URL**: `https://maheshpawarI2E.github.io/Demo-AI`
- **GitHub Repository**: `https://github.com/maheshpawarI2E/Demo-AI`

### ✅ Verification

To verify the deployment:
1. Go to the Actions tab in your GitHub repository
2. Check the "Build and Deploy to GitHub Pages" workflow
3. Confirm it shows a green checkmark ✅
4. Visit your live URL to see the deployed app

### 🐛 Troubleshooting

**Deployment fails?**
- Check GitHub Actions logs for errors
- Ensure `main` branch exists and has your latest code
- Verify GitHub Pages settings point to `gh-pages` branch

**App displays 404?**
- Wait a few minutes for GitHub Pages to update
- Clear browser cache and refresh
- Verify `homepage` in package.json is correct

**Need to update?**
- Simply push changes to `main` branch
- GitHub Actions will automatically rebuild and redeploy

---

**Deployed automatically on**: March 16, 2026
