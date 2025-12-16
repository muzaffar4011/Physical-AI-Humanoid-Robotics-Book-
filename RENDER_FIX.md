# Render Deployment Fix

## Issue
The server is binding to `127.0.0.1:8000` instead of `0.0.0.0:$PORT`, causing "No open ports detected" error.

## Solution

### Option 1: Update via Render Dashboard (Recommended)

1. Go to your Render dashboard
2. Click on your web service
3. Go to **Settings** tab
4. Scroll to **Start Command**
5. Update it to:
   ```
   uvicorn api:app --host 0.0.0.0 --port $PORT
   ```
6. **Remove** the `--reload` flag if present (not needed in production)
7. Click **Save Changes**
8. Render will automatically redeploy

### Option 2: Update render.yaml and Redeploy

The `render.yaml` file has been updated. To apply:

1. Commit and push the changes:
   ```bash
   git add render.yaml backend/Procfile
   git commit -m "Fix Render deployment port binding"
   git push origin main
   ```

2. Render will automatically detect the change and redeploy

## Verify Fix

After redeployment, check:
- Service should show "Live" status
- Health check: `https://your-service.onrender.com/health`
- API docs: `https://your-service.onrender.com/docs`

## Important Notes

- **Never use `--reload` in production** - it's for development only
- Server **must** bind to `0.0.0.0` (not `127.0.0.1`) for Render to detect it
- Use `$PORT` environment variable (Render provides this automatically)

