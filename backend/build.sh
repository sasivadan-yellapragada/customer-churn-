#!/bin/bash
# Clean up unnecessary files from site-packages to reduce bundle size

SITE_PACKAGES=".vercel/python/.venv/lib/python*/site-packages"

# Remove test files and docs
find $SITE_PACKAGES -type d -name "tests" -exec rm -rf {} + 2>/dev/null
find $SITE_PACKAGES -type d -name "test" -exec rm -rf {} + 2>/dev/null
find $SITE_PACKAGES -type d -name "docs" -exec rm -rf {} + 2>/dev/null
find $SITE_PACKAGES -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null
find $SITE_PACKAGES -type f -name "*.pyc" -delete 2>/dev/null
find $SITE_PACKAGES -type f -name "*.pyo" -delete 2>/dev/null
find $SITE_PACKAGES -type f -name "*.dist-info" -delete 2>/dev/null
find $SITE_PACKAGES -type f -name "*.egg-info" -delete 2>/dev/null

# Remove from numpy (keep only essential files)
rm -rf $SITE_PACKAGES/numpy/*/tests 2>/dev/null

echo "Cleanup completed"
