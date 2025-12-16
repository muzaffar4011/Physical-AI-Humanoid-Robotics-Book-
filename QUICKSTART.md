# Quick Start Guide

## TL;DR - Get Running in 5 Minutes

### 1. Prerequisites Check
```bash
python --version  # Should be 3.9+
node --version    # Should be 18+
docker --version  # Optional, for Qdrant
```

### 2. Backend Setup (2 minutes)

```bash
cd backend

# Install UV
pip install uv

# Install dependencies
uv sync
# OR
pip install -r requirements.txt

# Create .env file
# Copy the template below and fill in your API keys
```

**Create `backend/.env`:**
```env
COHERE_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here
QDRANT_URL=https://your-cluster-id.region.cloud.qdrant.io:6333
QDRANT_API_KEY=your_qdrant_api_key_here
```

**Get Qdrant credentials from**: https://cloud.qdrant.io/

### 3. Set Up Qdrant Cloud (2 minutes)

1. **Sign up**: Go to https://cloud.qdrant.io/ and create an account
2. **Create cluster**: Click "Create Cluster" and wait for it to be ready
3. **Get credentials**: Copy your cluster URL and API key
4. **Update `.env`**: Add to `backend/.env`:
   ```env
   QDRANT_URL=https://your-cluster-id.region.cloud.qdrant.io:6333
   QDRANT_API_KEY=your_api_key_here
   ```

**Verify**: Test connection (see troubleshooting section if needed)

### 4. Run Embedding Pipeline (2-5 minutes, one-time)

```bash
cd backend
python main.py
```

Wait for it to finish processing all pages.

### 5. Start Backend API (30 seconds)

```bash
cd backend
uvicorn api:app --reload --port 8000
```

**Verify**: http://localhost:8000/docs

### 6. Start Frontend (30 seconds)

**New terminal:**
```bash
cd docusaurus_textbook
npm install
npm run start
```

**Access**: http://localhost:3000

---

## Common Commands

### Backend
```bash
# Run embedding pipeline
cd backend && python main.py

# Start API server
cd backend && uvicorn api:app --reload --port 8000

# Test retrieval
cd backend && python retrieving.py

# Test agent
cd backend && python agent.py
```

### Frontend
```bash
# Start dev server
cd docusaurus_textbook && npm run start

# Build for production
cd docusaurus_textbook && npm run build

# Serve production build
cd docusaurus_textbook && npm run serve
```

### Qdrant Cloud
```bash
# View your clusters
# Go to https://cloud.qdrant.io/

# Test connection
cd backend
python -c "from qdrant_client import QdrantClient; import os; from dotenv import load_dotenv; load_dotenv(); client = QdrantClient(url=os.getenv('QDRANT_URL'), api_key=os.getenv('QDRANT_API_KEY')); print('Connected! Collections:', [c.name for c in client.get_collections().collections])"
```

---

## Troubleshooting Quick Fixes

| Issue | Quick Fix |
|-------|-----------|
| Module not found | `pip install -r requirements.txt` |
| Qdrant connection error | Check `QDRANT_URL` and `QDRANT_API_KEY` in `.env`, verify cluster is active at https://cloud.qdrant.io/ |
| API key error | Check `.env` file exists and has correct keys |
| Port already in use | Change port: `uvicorn api:app --port 8001` |
| Chat widget not working | Check backend is running and CORS is enabled |

---

## Next Steps

1. ✅ Verify everything is running
2. 📝 Read the full [SETUP_GUIDE.md](SETUP_GUIDE.md) for details
3. 🎨 Customize the textbook content
4. 🚀 Deploy to production

