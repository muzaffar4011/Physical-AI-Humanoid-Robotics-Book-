# Complete Setup and Run Guide

## Project Overview

This is a **Physical AI Humanoid Robotics Textbook** project with an integrated RAG (Retrieval-Augmented Generation) system. The project consists of:

1. **Backend** (Python): RAG system with embedding pipeline, retrieval, and AI agent
2. **Frontend** (Docusaurus): Interactive textbook with integrated chat widget

### Architecture

- **Embedding Pipeline**: Crawls Docusaurus site, extracts content, generates embeddings using Cohere, stores in Qdrant
- **RAG Retriever**: Retrieves relevant content from Qdrant based on queries
- **RAG Agent**: Uses OpenAI Agents SDK to answer questions using retrieved content
- **FastAPI Server**: Exposes the RAG agent via REST API
- **Docusaurus Frontend**: Textbook interface with chat widget

---

## Prerequisites

### System Requirements

- **Python 3.9+** (Python 3.11 recommended)
- **Node.js 18+** and npm
- **UV package manager** (Python package manager)
- **Qdrant** (vector database) - can be local or cloud instance

### API Keys Required

1. **Cohere API Key** - For generating embeddings
   - Sign up at: https://cohere.com/
   - Get your API key from the dashboard

2. **OpenAI API Key** - For the AI agent
   - Sign up at: https://platform.openai.com/
   - Get your API key from the API keys section

3. **Qdrant** - Vector database
   - Option 1: Local Qdrant (recommended for development)
   - Option 2: Qdrant Cloud (for production)
   - Sign up at: https://cloud.qdrant.io/ (if using cloud)

---

## Step-by-Step Setup

### Step 1: Clone and Navigate to Project

```bash
# You're already in the project directory
cd hackathon-physical-ai-humanoid-textbook
```

### Step 2: Backend Setup

#### 2.1 Install UV Package Manager

```bash
pip install uv
```

#### 2.2 Navigate to Backend Directory

```bash
cd backend
```

#### 2.3 Install Python Dependencies

```bash
# Using UV (recommended)
uv sync

# OR using pip
pip install -r requirements.txt
```

#### 2.4 Create Environment File

Create a `.env` file in the `backend` directory:

```bash
# Windows PowerShell
New-Item -Path .env -ItemType File

# Linux/Mac
touch .env
```

#### 2.5 Configure Environment Variables

Edit the `.env` file and add the following:

```env
# Cohere API Key (required for embeddings)
COHERE_API_KEY=your_cohere_api_key_here

# OpenAI API Key (required for the agent)
OPENAI_API_KEY=your_openai_api_key_here

# Qdrant Cloud Configuration (REQUIRED)
# Get these from: https://cloud.qdrant.io/
QDRANT_URL=https://your-cluster-id.us-east-1-0.aws.cloud.qdrant.io:6333
QDRANT_API_KEY=your_qdrant_api_key_here

# Optional: Target Docusaurus URL (default is already set in code)
# TARGET_URL=https://hackathon-physical-ai-humanoid-text-sigma.vercel.app/
```

**Important**: 
- Replace the placeholder values with your actual API keys!
- For Qdrant Cloud, you **must** provide both `QDRANT_URL` and `QDRANT_API_KEY`
- The URL should include the port number (`:6333`)
- Get your Qdrant Cloud credentials from https://cloud.qdrant.io/

#### 2.6 Install Missing Dependencies

The updated `requirements.txt` now includes all necessary dependencies. If you used `uv sync`, all packages should already be installed. Otherwise, install them with:

```bash
# Using pip (recommended)
pip install -r requirements.txt

# OR install individually
pip install fastapi uvicorn openai openai-agents
```

**Note**: The `openai-agents` package provides the `agents` module used in `agent.py`. This is the OpenAI Agents SDK.

### Step 3: Qdrant Cloud Setup

**Using Qdrant Cloud** (Recommended):

1. **Sign up for Qdrant Cloud**:
   - Go to https://cloud.qdrant.io/
   - Sign up for a free account (or use existing account)

2. **Create a Cluster**:
   - After logging in, click "Create Cluster"
   - Choose a cluster name and region
   - Select the free tier (if available) or your preferred plan
   - Wait for the cluster to be created (usually takes 1-2 minutes)

3. **Get Your Cluster Credentials**:
   - Once the cluster is ready, click on it to view details
   - You'll see:
     - **Cluster URL**: Something like `https://xxxxx-xxxxx.us-east-1-0.aws.cloud.qdrant.io:6333`
     - **API Key**: A long string starting with your cluster identifier

4. **Update Your `.env` File**:
   ```env
   # Replace with your actual Qdrant Cloud credentials
   QDRANT_URL=https://your-cluster-id.us-east-1-0.aws.cloud.qdrant.io:6333
   QDRANT_API_KEY=your_api_key_here
   ```

   **Important**: 
   - Use the full URL including the port (`:6333`)
   - The API key is required for Qdrant Cloud (unlike local Qdrant)
   - Keep your API key secure and never commit it to version control

5. **Verify Connection**:
   - You can test the connection by running:
     ```bash
     cd backend
     python -c "from qdrant_client import QdrantClient; import os; from dotenv import load_dotenv; load_dotenv(); client = QdrantClient(url=os.getenv('QDRANT_URL'), api_key=os.getenv('QDRANT_API_KEY')); print('Connected! Collections:', [c.name for c in client.get_collections().collections])"
     ```

**Note**: If you prefer to use local Qdrant with Docker instead, see the alternative setup in the troubleshooting section.

### Step 4: Run the Embedding Pipeline

This step crawls your Docusaurus site and creates embeddings. **This only needs to be run once** (or when content changes).

```bash
cd backend

# Using UV
uv run main.py

# OR using Python directly
python main.py
```

**What this does**:
- Crawls the Docusaurus site
- Extracts text content from all pages
- Chunks the content
- Generates embeddings using Cohere
- Stores embeddings in Qdrant

**Expected output**: You'll see logs showing URLs being processed and chunks being saved.

**Note**: This may take several minutes depending on the size of your site.

### Step 5: Frontend Setup (Docusaurus)

#### 5.1 Navigate to Docusaurus Directory

```bash
# From project root
cd docusaurus_textbook
```

#### 5.2 Install Node Dependencies

```bash
npm install
```

#### 5.3 Update Chat Widget API Endpoint (Optional)

If you're running the backend on a different URL, update the API endpoint in:

`docusaurus_textbook/src/components/ChatWidget.js`

Change line 24 from:
```javascript
const res = await axios.post("https://backend-deploy-yt.onrender.com/chat", {
```

To your local backend URL:
```javascript
const res = await axios.post("http://localhost:8000/ask", {
```

**Note**: The chat widget currently uses `/chat` endpoint, but your API uses `/ask`. You may need to update this.

---

## Running the Project

### Running the Backend API Server

```bash
cd backend

# Using UV
uv run uvicorn api:app --reload --port 8000

# OR using Python directly
uvicorn api:app --reload --port 8000
```

**Verify the backend is running**:
- API docs: http://localhost:8000/docs
- Health check: http://localhost:8000/health
- Ask endpoint: http://localhost:8000/ask

### Running the Frontend (Docusaurus)

Open a **new terminal** window:

```bash
cd docusaurus_textbook
npm run start
```

**Access the frontend**:
- Local URL: http://localhost:3000
- The chat widget should appear in the bottom-right corner

### Testing the RAG System

#### Test 1: Direct Retrieval

```bash
cd backend
python retrieving.py
```

This will run test queries and show retrieved results.

#### Test 2: Agent Query

```bash
cd backend
python agent.py
```

This will test the full agent system with sample queries.

#### Test 3: API Endpoint

Using curl or Postman:

```bash
curl -X POST "http://localhost:8000/ask" \
  -H "Content-Type: application/json" \
  -d '{"query": "What is ROS2?"}'
```

Or use the interactive API docs at http://localhost:8000/docs

---

## Project Structure

```
hackathon-physical-ai-humanoid-textbook/
├── backend/
│   ├── agent.py          # RAG agent using OpenAI Agents SDK
│   ├── api.py            # FastAPI server
│   ├── main.py           # Embedding pipeline
│   ├── retrieving.py     # RAG retrieval system
│   ├── requirements.txt  # Python dependencies
│   ├── .env              # Environment variables (create this)
│   └── Dockerfile        # Docker configuration
├── docusaurus_textbook/
│   ├── src/
│   │   └── components/
│   │       └── ChatWidget.js  # Chat widget component
│   ├── docs/             # Textbook content
│   └── package.json      # Node dependencies
└── SETUP_GUIDE.md        # This file
```

---

## Troubleshooting

### Common Issues

#### 1. "Module not found" errors

**Solution**: Make sure all dependencies are installed:
```bash
cd backend
pip install -r requirements.txt
pip install fastapi uvicorn openai openai-agents
```

#### 2. Qdrant connection errors

**Solution**: 
- Verify Qdrant Cloud cluster is active: Check https://cloud.qdrant.io/
- Check `QDRANT_URL` and `QDRANT_API_KEY` in `.env` file (both are required for cloud)
- Ensure the URL includes the port: `https://your-cluster.qdrant.io:6333`
- Verify API key is correct and not expired
- Test connection with Python:
  ```bash
  cd backend
  python -c "from qdrant_client import QdrantClient; import os; from dotenv import load_dotenv; load_dotenv(); client = QdrantClient(url=os.getenv('QDRANT_URL'), api_key=os.getenv('QDRANT_API_KEY')); print('Connected!')"
  ```

#### 3. API key errors

**Solution**:
- Verify `.env` file exists in `backend/` directory
- Check that API keys are correctly set (no extra spaces)
- Verify API keys are valid and have credits/quota

#### 4. "Collection not found" errors

**Solution**: Run the embedding pipeline first:
```bash
cd backend
python main.py
```

#### 5. Chat widget not connecting to backend

**Solution**:
- Verify backend is running on port 8000
- Check CORS settings in `api.py` (should allow all origins in dev)
- Update ChatWidget.js to use correct endpoint (`/ask` instead of `/chat`)
- Check browser console for errors

#### 6. Frontend build errors

**Solution**:
```bash
cd docusaurus_textbook
rm -rf node_modules package-lock.json
npm install
npm run start
```

### Verification Checklist

- [ ] Python 3.9+ installed
- [ ] Node.js 18+ installed
- [ ] UV package manager installed
- [ ] Qdrant Cloud cluster created and active
- [ ] `.env` file created with all API keys (including QDRANT_URL and QDRANT_API_KEY)
- [ ] All Python dependencies installed
- [ ] Qdrant Cloud connection verified
- [ ] Embedding pipeline run successfully
- [ ] Backend API server running
- [ ] Frontend Docusaurus running
- [ ] Chat widget appears on frontend

---

## Next Steps

1. **Customize the textbook content**: Edit files in `docusaurus_textbook/docs/`
2. **Update chat widget**: Modify `ChatWidget.js` for styling/behavior
3. **Deploy backend**: Use the Dockerfile or deploy to a cloud service
4. **Deploy frontend**: Deploy Docusaurus to Vercel, Netlify, etc.

---

## Additional Resources

- **Qdrant Documentation**: https://qdrant.tech/documentation/
- **Cohere Documentation**: https://docs.cohere.com/
- **OpenAI Agents SDK**: https://github.com/openai/openai-agents
- **Docusaurus Documentation**: https://docusaurus.io/docs
- **FastAPI Documentation**: https://fastapi.tiangolo.com/

---

## Support

If you encounter issues not covered here:
1. Check the logs in the terminal
2. Verify all environment variables are set correctly
3. Ensure all services are running
4. Check the API documentation at http://localhost:8000/docs

