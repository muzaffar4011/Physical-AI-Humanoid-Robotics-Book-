"""Test Qdrant search functionality"""
from qdrant_client import QdrantClient
import os
from dotenv import load_dotenv

load_dotenv()

qdrant_url = os.getenv("QDRANT_URL")
qdrant_api_key = os.getenv("QDRANT_API_KEY")

print(f"Qdrant URL: {qdrant_url}")
print(f"Has API Key: {bool(qdrant_api_key)}")

# Create client
if qdrant_api_key:
    client = QdrantClient(url=qdrant_url, api_key=qdrant_api_key)
else:
    client = QdrantClient(url=qdrant_url)

print(f"\nClient type: {type(client)}")
print(f"Client methods with 'search': {[m for m in dir(client) if 'search' in m.lower()]}")
print(f"Client methods with 'query': {[m for m in dir(client) if 'query' in m.lower()]}")

# Check if collection exists
collections = client.get_collections()
print(f"\nCollections: {[c.name for c in collections.collections]}")

# Try to get a sample point to test
if collections.collections:
    collection_name = collections.collections[0].name
    print(f"\nTesting with collection: {collection_name}")
    
    # Try to scroll to get one point
    try:
        points, _ = client.scroll(
            collection_name=collection_name,
            limit=1,
            with_payload=True,
            with_vectors=True
        )
        if points:
            print(f"Got {len(points)} point(s)")
            if points[0].vector:
                print(f"Vector dimension: {len(points[0].vector)}")
                # Try search
                print("\nTrying search method...")
                try:
                    results = client.search(
                        collection_name=collection_name,
                        query_vector=points[0].vector,
                        limit=1
                    )
                    print(f"✅ Search method works! Got {len(results)} result(s)")
                except Exception as e:
                    print(f"❌ Search method failed: {e}")
                    print(f"   Error type: {type(e).__name__}")
        else:
            print("No points found in collection")
    except Exception as e:
        print(f"Error scrolling: {e}")

