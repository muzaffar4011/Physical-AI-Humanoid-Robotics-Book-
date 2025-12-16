# Quick Deployment Checklist

## Before Deployment

### Frontend (GitHub Pages)
- [ ] Update `docusaurus.config.js`:
  - [ ] Set correct `url` (your GitHub Pages URL)
  - [ ] Set correct `organizationName` (your GitHub username/org)
  - [ ] Set correct `projectName` (your repository name)
  - [ ] If repo name is not root, update `baseUrl` (e.g., `/repo-name/`)

### Backend (Render)
- [ ] Ensure `requirements.txt` has all dependencies
- [ ] Test backend locally: `uvicorn api:app --port 8000`
- [ ] Verify all environment variables are ready:
  - [ ] COHERE_API_KEY
  - [ ] OPENAI_API_KEY
  - [ ] QDRANT_URL
  - [ ] QDRANT_API_KEY

---

## Deployment Steps

### 1. Deploy Backend to Render (Do this first)

1. Go to https://render.com and sign in
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Render will auto-detect `render.yaml`
5. Add environment variables in Render dashboard
6. Click "Create Web Service"
7. Wait for deployment (5-10 minutes)
8. **Copy your Render URL** (e.g., `https://your-service.onrender.com`)

### 2. Update Frontend API URL

1. Edit `docusaurus_textbook/src/components/ChatWidget.js`
2. Find line with: `"https://your-backend-name.onrender.com"`
3. Replace with your actual Render URL
4. Save and commit

### 3. Deploy Frontend to GitHub Pages

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. Enable GitHub Pages:
   - Go to repository Settings → Pages
   - Source: "GitHub Actions"
   - Save

3. GitHub Actions will automatically:
   - Build your site
   - Deploy to GitHub Pages
   - Check Actions tab for progress

4. Your site will be live at:
   - `https://username.github.io/repo-name`
   - Or custom domain if configured

---

## After Deployment

### Verify Frontend
- [ ] Site loads at GitHub Pages URL
- [ ] All pages accessible
- [ ] Chat widget visible
- [ ] No console errors

### Verify Backend
- [ ] Health check: `https://your-service.onrender.com/health`
- [ ] API docs: `https://your-service.onrender.com/docs`
- [ ] Test query: `https://your-service.onrender.com/ask`

### Verify Integration
- [ ] Open frontend in browser
- [ ] Open chat widget
- [ ] Send a test message
- [ ] Verify response received

---

## Common Issues & Fixes

### Issue: GitHub Pages 404
**Fix:** Check `baseUrl` in `docusaurus.config.js` matches your repo structure

### Issue: Chat widget can't connect
**Fix:** 
1. Verify Render backend URL in `ChatWidget.js`
2. Check CORS settings in `api.py` (should allow all origins)
3. Check browser console for errors

### Issue: Render deployment fails
**Fix:**
1. Check build logs in Render dashboard
2. Verify `requirements.txt` has all dependencies
3. Check Python version (should be 3.11)

### Issue: Environment variables not working
**Fix:**
1. Verify all variables are set in Render dashboard
2. Check variable names match exactly (case-sensitive)
3. Redeploy service after adding variables

---

## URLs to Update

After deployment, update these in your code:

1. **ChatWidget.js** - Backend API URL
   ```javascript
   const API_URL = "https://your-actual-render-url.onrender.com";
   ```

2. **docusaurus.config.js** - GitHub Pages URL
   ```javascript
   url: 'https://your-username.github.io',
   baseUrl: '/repo-name/', // If not root
   ```

---

## Need Help?

- GitHub Actions logs: Repository → Actions tab
- Render logs: Dashboard → Your Service → Logs
- Check service health: Render Dashboard → Metrics

