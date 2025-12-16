#!/bin/bash
# Render startup script - ensures correct host and port binding
uvicorn api:app --host 0.0.0.0 --port ${PORT:-10000}

