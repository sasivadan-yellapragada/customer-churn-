from fastapi import FastAPI
import sys
import os

# Add backend to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend'))

# Import your main FastAPI app
from main import app

# Export for Vercel
__all__ = ['app']
