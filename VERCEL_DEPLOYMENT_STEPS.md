# 🚀 Vercel Deployment Action Plan

## What Was Fixed
✅ Removed conflicting `builds` configuration from `vercel.json`
✅ Simplified configuration to use Vercel Project Settings
✅ Added comprehensive setup guide

---

## ⚡ IMMEDIATE ACTIONS IN VERCEL DASHBOARD

### 1. Open Your Project
- Go to: https://vercel.com/dashboard
- Select: `customer-churn-` project
- Click: **Settings** tab

### 2. Configure Root Directory
1. Go to **Settings** → **Root Directory**
2. Change from `/` to: **`backend`**
3. Click **Save**

### 3. Set Build Settings
Navigate to **Settings** → **Build & Development Settings**

**Build Command:**
```
pip install -r requirements.txt
```

**Output Directory:**
(Leave empty)

**Install Command:**
```
pip install -r requirements.txt
```

### 4. Set Environment Variables
Go to **Settings** → **Environment Variables**

Add this variable:
- **Name:** `PYTHONUNBUFFERED`
- **Value:** `1`
- **Environments:** Production, Preview, Development

### 5. Redeploy
1. Go to **Deployments** tab
2. Click the three dots (•••) on the latest deployment
3. Select **Redeploy**
4. Choose **Use existing Build Cache** (optional)
5. Wait for deployment to complete

---

## ✅ Verification Checklist

After deployment, verify these:

- [ ] No "builds existing" warning in build logs
- [ ] Build completes successfully
- [ ] Dependencies install without errors (< 500 MB)
- [ ] Test root endpoint: `https://your-domain.vercel.app/`
- [ ] Test health endpoint: `https://your-domain.vercel.app/api/health`

### Test Commands (after deployment)
```bash
# Root endpoint
curl https://your-domain.vercel.app/

# Health check
curl https://your-domain.vercel.app/api/health

# Predict endpoint
curl -X POST https://your-domain.vercel.app/api/predict \
  -H "Content-Type: application/json" \
  -d '{
    "gender": "Male",
    "SeniorCitizen": 0,
    "Partner": "Yes",
    "Dependents": "No",
    "tenure": 1,
    "PhoneService": "No",
    "MultipleLines": "No phone service",
    "InternetService": "DSL",
    "OnlineSecurity": "No",
    "OnlineBackup": "Yes",
    "DeviceProtection": "No",
    "TechSupport": "No",
    "StreamingTV": "No",
    "StreamingMovies": "No",
    "Contract": "Month-to-month",
    "PaperlessBilling": "Yes",
    "PaymentMethod": "Electronic check",
    "MonthlyCharges": 29.85,
    "TotalCharges": 29.85
  }'
```

---

## 📋 Files Updated

| File | Change | Purpose |
|------|--------|---------|
| `vercel.json` (root) | Created | Global Vercel config |
| `backend/vercel.json` | Simplified | Removed conflicting builds |
| `backend/requirements.txt` | Updated | All dependencies included |
| `VERCEL_SETUP.md` | Created | Full setup guide |
| `.vercelignore` | Exists | Excludes unnecessary files |
| `.python-version` | Exists | Ensures Python 3.12 |

---

## 🔧 Troubleshooting

### Still seeing "builds existing" warning?
- Verify you're using the latest pushed code
- Clear Vercel cache: Deployments → Redeploy with cache cleared

### Bundle size still too large?
- Check `.vercelignore` is in backend folder
- Verify no test files or docs are being included
- Run: `pip install -r requirements.txt --no-deps`

### Import errors in logs?
- Check `requirements.txt` includes all dependencies
- Verify Python version is 3.12
- Check model files exist in `backend/models/`

### Connection timeout errors?
- Ensure FastAPI is properly configured
- Check CORS settings in `main.py`
- Verify all endpoints return valid responses

---

## 📞 Need Help?

If deployment still fails:
1. Check Vercel build logs for exact error
2. Review `VERCEL_SETUP.md` for detailed configuration
3. Verify `backend/requirements.txt` has all dependencies
4. Ensure `backend/models/` files are not in `.gitignore`

---

## 🎉 Success Indicators

Your deployment is successful when:
- ✅ Build completes without "builds existing" warning
- ✅ All dependencies install (< 500 MB)
- ✅ API endpoints respond correctly
- ✅ No errors in Vercel logs

Happy deploying! 🚀
