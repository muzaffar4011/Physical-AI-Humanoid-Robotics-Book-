# Deployment Guide

This guide covers deploying the frontend to GitHub Pages and the backend to Render.

## Frontend Deployment (GitHub Pages)

### Prerequisites
- GitHub repository
- GitHub Pages enabled in repository settings

### Steps

1. **Enable GitHub Pages**
   - Go to your repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` (will be created automatically)
   - Folder: `/ (root)`

2. **Update Docusaurus Config** (if needed)
   - The `docusaurus.config.js` is already configured for GitHub Pages
   - Update `organizationName` and `projectName` if your repo name differs
   - Update `url` to match your GitHub Pages URL (e.g., `https://username.github.io/repo-name`)

3. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Setup GitHub Pages deployment"
   git push origin main
   ```

4. **GitHub Actions will automatically:**
   - Build the Docusaurus site
   - Deploy to GitHub Pages
   - The workflow runs on every push to `main` branch

5. **Access your site**
   - Your site will be available at: `https://username.github.io/repo-name`
   - Or: `https://organization.github.io/repo-name`

### Manual Deployment (Alternative)
If you prefer manual deployment:
```bash
cd docusaurus_textbook
npm run build
npm run deploy
```

---

## Backend Deployment (Render)

### Prerequisites
- Render account (sign up at https://render.com)
- GitHub repository connected to Render

### Steps

1. **Prepare Backend for Deployment**
   - The `render.yaml` file is already created in the root directory
   - Make sure `requirements.txt` includes all dependencies

2. **Create New Web Service on Render**
   - Go to Render Dashboard → New → Web Service
   - Connect your GitHub repository
   - Render will detect the `render.yaml` file automatically

3. **Configure Environment Variables**
   In Render dashboard, add these environment variables:
   ```
   COHERE_API_KEY=your_cohere_api_key
   OPENAI_API_KEY=your_openai_api_key
   QDRANT_URL=your_qdrant_cloud_url
   QDRANT_API_KEY=your_qdrant_api_key
   PYTHON_VERSION=3.11
   ```

4. **Deploy**
   - Render will automatically:
     - Detect Python service
     - Install dependencies from `requirements.txt`
     - Start the service with `uvicorn api:app --host 0.0.0.0 --port $PORT`
   - Wait for deployment to complete (usually 5-10 minutes)

5. **Get Your Backend URL**
   - After deployment, Render will provide a URL like: `https://your-service-name.onrender.com`
   - Copy this URL

6. **Update Frontend API URL**
   - Edit `docusaurus_textbook/src/components/ChatWidget.js`
   - Replace `"https://your-backend-name.onrender.com"` with your actual Render URL
   - Commit and push to trigger GitHub Pages rebuild

---

## Post-Deployment Checklist

### Frontend (GitHub Pages)
- [ ] Site is accessible at GitHub Pages URL
- [ ] All pages load correctly
- [ ] Chat widget appears
- [ ] API URL points to Render backend (not localhost)

### Backend (Render)
- [ ] Service is running and healthy
- [ ] Environment variables are set correctly
- [ ] API endpoint `/health` returns 200
- [ ] API endpoint `/ask` works correctly
- [ ] CORS is configured (should allow all origins in `api.py`)

### Integration
- [ ] Chat widget can connect to Render backend
- [ ] Queries return responses
- [ ] Error handling works correctly

---

## Troubleshooting

### Frontend Issues

**Problem: GitHub Pages shows 404**
- Check that `baseUrl` in `docusaurus.config.js` matches your repo name
- Ensure GitHub Actions workflow completed successfully
- Check repository Settings → Pages for correct branch

**Problem: Chat widget not working**
- Verify API URL in `ChatWidget.js` points to Render backend
- Check browser console for CORS errors
- Ensure backend is running and accessible

### Backend Issues

**Problem: Render deployment fails**
- Check build logs in Render dashboard
- Verify all dependencies are in `requirements.txt`
- Ensure Python version is correct (3.11)

**Problem: API returns errors**
- Check environment variables in Render dashboard
- Verify Qdrant Cloud connection
- Check Render service logs

**Problem: CORS errors**
- Verify `api.py` has CORS middleware configured
- Check that frontend URL is allowed (or use `allow_origins=["*"]` for development)

---

## Environment Variables Reference

### Backend (Render)
```
COHERE_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here
QDRANT_URL=https://your-cluster.qdrant.io:6333
QDRANT_API_KEY=your_key_here
PYTHON_VERSION=3.11
```

### Frontend (GitHub Pages)
No environment variables needed. API URL is hardcoded in `ChatWidget.js`.

---

## Updating Deployments

### Frontend Updates
- Simply push to `main` branch
- GitHub Actions will automatically rebuild and deploy

### Backend Updates
- Push changes to repository
- Render will automatically detect changes and redeploy
- Or manually trigger redeploy from Render dashboard

---

## Custom Domain (Optional)

### GitHub Pages Custom Domain
1. Add `CNAME` file in `docusaurus_textbook/static/` with your domain
2. Configure DNS records as per GitHub Pages instructions
3. Update `url` in `docusaurus.config.js`

### Render Custom Domain
1. Go to Render dashboard → Your Service → Settings
2. Add custom domain
3. Configure DNS records as per Render instructions

---

## Support

For issues:
- GitHub Actions logs: Repository → Actions tab
- Render logs: Render Dashboard → Your Service → Logs
- Check service health: Render Dashboard → Your Service → Metrics

