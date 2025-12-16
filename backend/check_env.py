"""Quick script to verify environment variables are set"""
import os
from dotenv import load_dotenv

load_dotenv()

print("Checking environment variables...")
print("-" * 50)

required_vars = {
    "COHERE_API_KEY": "Required for generating embeddings",
    "OPENAI_API_KEY": "Required for the RAG agent",
    "QDRANT_URL": "Required for Qdrant connection",
    "QDRANT_API_KEY": "Required for Qdrant Cloud"
}

all_set = True
for var, description in required_vars.items():
    value = os.getenv(var)
    if value:
        # Mask the key for security
        if "KEY" in var:
            masked = value[:8] + "..." + value[-4:] if len(value) > 12 else "***"
            print(f"✅ {var}: {masked} ({description})")
        else:
            print(f"✅ {var}: {value} ({description})")
    else:
        print(f"❌ {var}: NOT SET ({description})")
        all_set = False

print("-" * 50)
if all_set:
    print("✅ All required environment variables are set!")
    print("You can now run: python main.py")
else:
    print("❌ Some environment variables are missing!")
    print("Please update your .env file in the backend directory.")

