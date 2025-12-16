"""Quick script to test Qdrant Cloud connection"""
from qdrant_client import QdrantClient
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get credentials from .env
qdrant_url = os.getenv('QDRANT_URL')
qdrant_api_key = os.getenv('QDRANT_API_KEY')

if not qdrant_url:
    print("❌ ERROR: QDRANT_URL not found in .env file")
    exit(1)

if not qdrant_api_key:
    print("⚠️  WARNING: QDRANT_API_KEY not found in .env file (may be required for cloud)")

print(f"Connecting to Qdrant at: {qdrant_url}")

try:
    # Create client
    if qdrant_api_key:
        client = QdrantClient(url=qdrant_url, api_key=qdrant_api_key)
    else:
        client = QdrantClient(url=qdrant_url)
    
    # Test connection by getting collections
    collections = client.get_collections()
    collection_names = [c.name for c in collections.collections]
    
    print("✅ Connected successfully!")
    print(f"📦 Found {len(collection_names)} collection(s):")
    for name in collection_names:
        print(f"   - {name}")
    
    if not collection_names:
        print("ℹ️  No collections found. Run 'python main.py' to create embeddings.")
    
except Exception as e:
    print(f"❌ Connection failed: {e}")
    print("\nTroubleshooting:")
    print("1. Check that QDRANT_URL and QDRANT_API_KEY are correct in .env")
    print("2. Verify your Qdrant Cloud cluster is active at https://cloud.qdrant.io/")
    print("3. Ensure the URL includes the port: https://your-cluster.qdrant.io:6333")
    exit(1)

