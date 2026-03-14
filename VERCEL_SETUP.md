# Vercel Project Settings Configuration

## Issue Fixed
Removed the `builds` configuration from `vercel.json` that was conflicting with Vercel Project Settings.

## What to Do in Vercel Dashboard

### Step 1: Go to Project Settings
1. Log in to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your project: `customer-churn-`
3. Go to **Settings** tab

### Step 2: Configure Build & Development Settings
Navigate to **Build & Development Settings** and configure:

#### Build Command
```bash
pip install -r requirements.txt && python -m pip list
```

#### Output Directory
Leave empty (FastAPI serves from root)

#### Install Command
```bash
pip install -r requirements.txt
```

#### Development Command
```bash
python -m uvicorn main:app --reload --host 0.0.0.0 --port 3000
```

### Step 3: Environment Variables (if needed)
Add any required environment variables:
- `PYTHONUNBUFFERED`: `1`

### Step 4: Root Directory
Set Root Directory to: `backend`

## vercel.json Configuration

Your `vercel.json` files are now minimal and let Vercel Project Settings take control:

**Root (`vercel.json`):**
```json
{
  "version": 2,
  "regions": ["iad1"],
  "env": {
    "PYTHONUNBUFFERED": "1"
  }
}
```

**Backend (`backend/vercel.json`):**
```json
{
  "version": 2,
  "env": {
    "PYTHONUNBUFFERED": "1"
  }
}
```

## Alternative: If You Want Full Control via vercel.json

If you prefer configuration via `vercel.json` instead of Vercel Dashboard, use:

```json
{
  "version": 2,
  "buildCommand": "pip install -r requirements.txt",
  "outputDirectory": ".",
  "env": {
    "PYTHONUNBUFFERED": "1"
  },
  "framework": "fastapi"
}
```

## Deployment Checklist

- [x] Removed conflicting `builds` section
- [x] Created minimal `vercel.json` files
- [x] Added `PYTHONUNBUFFERED` environment variable
- [x] Requirements.txt includes all dependencies
- [x] `.vercelignore` excludes unnecessary files
- [x] `.python-version` specifies Python 3.12
- [x] Model files are properly loaded

## Next Steps

1. **Push changes to GitHub:**
   ```bash
   git add .
   git commit -m "fix: simplify vercel.json to use project settings"
   git push origin main
   ```

2. **In Vercel Dashboard:**
   - Go to your project settings
   - Set Root Directory to `backend`
   - Configure Build Command as shown above
   - Redeploy

3. **Monitor deployment:**
   - Check the Deployments tab
   - Look for successful build logs
   - Test endpoints: `https://your-domain.vercel.app/api/health`

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "builds exist" warning | ✓ Fixed - removed builds section |
| Bundle size too large | Use `.vercelignore` and requirement optimization |
| Import errors | Ensure all dependencies in `requirements.txt` |
| Model loading fails | Check model files in `backend/models/` directory |

## Key Files Modified

- `vercel.json` - Root configuration (minimal)
- `backend/vercel.json` - Backend configuration (minimal)
- `backend/requirements.txt` - All Python dependencies
- `backend/.vercelignore` - Files to exclude from bundle
- `backend/.python-version` - Python version specification
