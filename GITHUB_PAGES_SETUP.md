# GitHub Pages Setup Instructions

## Enable GitHub Pages

Before the workflow can deploy, you need to enable GitHub Pages in your repository settings:

### Steps:

1. **Go to Repository Settings**
   - Navigate to your GitHub repository
   - Click on **Settings** tab (top menu)

2. **Enable GitHub Pages**
   - Scroll down to **Pages** section (left sidebar)
   - Under **Source**, select: **"GitHub Actions"**
   - Click **Save**

3. **Verify Permissions**
   - Go to **Settings** → **Actions** → **General**
   - Under **Workflow permissions**, ensure:
     - ✅ "Read and write permissions" is selected
     - ✅ "Allow GitHub Actions to create and approve pull requests" is checked (if available)

4. **Push Your Code**
   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment"
   git push origin main
   ```

5. **Check Workflow**
   - Go to **Actions** tab in your repository
   - You should see the workflow running
   - Wait for it to complete (usually 2-5 minutes)

6. **Access Your Site**
   - After successful deployment, your site will be available at:
   - `https://username.github.io/repo-name`
   - Or check the workflow output for the exact URL

## Troubleshooting

### Error: "Get Pages site failed"
**Solution:** Make sure GitHub Pages is enabled with "GitHub Actions" as the source in repository Settings → Pages

### Error: "Permission denied"
**Solution:** 
- Check repository Settings → Actions → General → Workflow permissions
- Ensure "Read and write permissions" is enabled

### Error: "Not Found"
**Solution:**
- Verify the repository exists and is accessible
- Check that you have admin/write access to the repository
- Ensure GitHub Pages is enabled in Settings → Pages

## After First Deployment

Once the first deployment succeeds:
- Your site will be live at the GitHub Pages URL
- Future pushes to `main` will automatically redeploy
- Check the Actions tab to see deployment status

## Custom Domain (Optional)

If you want to use a custom domain:
1. Add `CNAME` file in `docusaurus_textbook/static/CNAME` with your domain
2. Update DNS records as per GitHub Pages instructions
3. Update `url` in `docusaurus.config.js` to match your domain

