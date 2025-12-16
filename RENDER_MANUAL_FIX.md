# Render Deployment - Manual Fix Required

## Problem
Render is still using the old command: `uvicorn api:app --reload --port 8000`
This binds to `127.0.0.1` instead of `0.0.0.0`, causing port detection failure.

## Solution: Update Start Command in Render Dashboard

### Step-by-Step:

1. **Go to Render Dashboard**
   - Visit: https://dashboard.render.com
   - Sign in to your account

2. **Select Your Service**
   - Click on your web service (likely named `physical-ai-backend` or `chatbot`)

3. **Go to Settings**
   - Click on **"Settings"** tab (top menu)

4. **Find Start Command**
   - Scroll down to find **"Start Command"** field
   - You'll see it currently has: `uvicorn api:app --reload --port 8000`

5. **Replace with Correct Command**
   - **Delete** the current command
   - **Type** this exact command:
     ```
     python start_render.py
     ```
   - OR if that doesn't work, use:
     ```
     uvicorn api:app --host 0.0.0.0 --port $PORT
     ```

6. **Save Changes**
   - Click **"Save Changes"** button
   - Render will automatically redeploy

7. **Wait for Deployment**
   - Watch the logs
   - You should see: `Running 'python start_render.py'` or `Running 'uvicorn api:app --host 0.0.0.0 --port $PORT'`
   - Server should bind to `0.0.0.0` instead of `127.0.0.1`

## What to Look For in Logs

**Before (Wrong):**
```
==> Running 'uvicorn api:app --reload --port 8000'
INFO: Uvicorn running on http://127.0.0.1:8000
```

**After (Correct):**
```
==> Running 'python start_render.py'
INFO: Uvicorn running on http://0.0.0.0:10000
```
OR
```
==> Running 'uvicorn api:app --host 0.0.0.0 --port $PORT'
INFO: Uvicorn running on http://0.0.0.0:10000
```

## Why This Happens

Render sometimes doesn't automatically pick up changes from `render.yaml` if:
- The service was created before `render.yaml` existed
- The service was created manually through the dashboard
- Render needs manual configuration override

## After Fix

Once the start command is updated:
- ✅ Server will bind to `0.0.0.0`
- ✅ Render will detect the port
- ✅ Service will go "Live"
- ✅ Your frontend can connect to it

## Test Your Backend

After successful deployment:
- Health check: `https://your-service.onrender.com/health`
- API docs: `https://your-service.onrender.com/docs`
- Test endpoint: `https://your-service.onrender.com/ask`

