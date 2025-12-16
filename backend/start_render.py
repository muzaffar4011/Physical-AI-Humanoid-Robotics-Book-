"""
Startup script for Render deployment
Ensures correct host and port binding
"""
import os
import uvicorn
from api import app

if __name__ == "__main__":
    # Render provides PORT environment variable
    port = int(os.environ.get("PORT", 10000))
    # Must bind to 0.0.0.0 for Render to detect the port
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=port,
        log_level="info"
    )

