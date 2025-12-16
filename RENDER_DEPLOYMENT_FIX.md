# Render Deployment - Complete Fix Guide

## Current Issues
1. ❌ Server binding to `127.0.0.1:8000` instead of `0.0.0.0:$PORT`
2. ❌ Using `--reload` flag (development mode)
3. ❌ CORS errors from frontend

## Solution

### Step 1: Update Start Command in Render Dashboard (CRITICAL)

**This is the most important step!**

1. Go to: https://dashboard.render.com
2. Click on your web service
3. Go to **Settings** tab
4. Find **"Start Command"** field
5. **Delete** the current command completely
6. **Type** this exact command:
   ```
   python start_render.py
   ```
7. Click **"Save Changes"**
8. Render will automatically redeploy

### Step 2: Verify Deployment

After redeployment, check the logs. You should see:
```
==> Running 'python start_render.py'
INFO: Uvicorn running on http://0.0.0.0:10000
```

**NOT:**
```
==> Running 'uvicorn api:app --reload --port 8000'
INFO: Uvicorn running on http://127.0.0.1:8000
```

### Step 3: Test Your Backend

Once deployment succeeds:

1. **Health Check:**
   ```
   https://chat-4xqu.onrender.com/health
   ```
   Should return: `{"status":"healthy","message":"RAG Agent API is running"}`

2. **API Docs:**
   ```
   https://chat-4xqu.onrender.com/docs
   ```
   Should show Swagger UI

3. **Test Query:**
   ```bash
   curl -X POST "https://chat-4xqu.onrender.com/ask" \
     -H "Content-Type: application/json" \
     -d '{"query": "What is ROS2?"}'
   ```

### Step 4: Update Frontend (If Needed)

The frontend already has the correct URL: `https://chat-4xqu.onrender.com`

After backend is live, the chat widget should work automatically.

## CORS Configuration

I've updated the CORS to allow:
- ✅ `https://muzaffar4011.github.io` (your GitHub Pages)
- ✅ `http://localhost:3000` (local development)
- ✅ All origins (`*` for development)

## Files Updated

1. ✅ `backend/api.py` - CORS configuration updated
2. ✅ `backend/start_render.py` - Proper startup script
3. ✅ `render.yaml` - Correct configuration
4. ✅ `backend/Procfile` - Updated command

## Why Manual Update is Needed

Render sometimes doesn't automatically detect `render.yaml` changes if:
- Service was created manually through dashboard
- Service was created before `render.yaml` existed
- Render needs manual override

**Once you update the start command in dashboard, future deployments will use the correct command from `render.yaml`.**

## After Fix

✅ Backend will bind to `0.0.0.0`
✅ Render will detect the port
✅ Service will go "Live"
✅ Frontend can connect via CORS
✅ Chat widget will work

---

**Action Required:** Update Start Command in Render Dashboard to: `python start_render.py`

