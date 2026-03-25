# 🚀 FIX DEPLOYMENT STEPS

## ✅ Changes Made
1. ✅ Updated config.js - Now always includes `/api` in URL
2. ✅ Updated .env.production - Explicit `/api` in path
3. ✅ Added detailed logging to show exact URLs being used

## 📋 NEXT STEPS (DO THESE NOW)

### Step 1: Clear and Rebuild
```bash
cd frontend
rm -rf dist
npm run build
```

### Step 2: Check Build Output
After build completes, you should see in dist/:
- index.html
- assets/ folder with JS/CSS files

### Step 3: Push to GitHub
```bash
git add .
git commit -m "Fix API URL - ensure /api is always included"
git push origin main
```

### Step 4: IMPORTANT - Set Environment Variables on Your Hosting
If deploying to **Vercel**:
1. Go to Project Settings
2. Go to "Environment Variables"
3. Add:
   ```
   VITE_API_URL = https://blockcerts.onrender.com/api
   ```

If deploying to **Netlify**:
1. Go to Site Settings
2. Go to "Build & Deploy" → "Environment"
3. Add:
   ```
   VITE_API_URL = https://blockcerts.onrender.com/api
   ```

### Step 5: Redeploy
- **Vercel**: Auto-redeploys on git push
- **Netlify**: Auto-redeploys on git push
- **Other**: Manually deploy the `dist/` folder

### Step 6: Clear Browser Cache
```
Ctrl+Shift+Delete (Windows) 
or 
Cmd+Shift+Delete (Mac)
→ Select "Cached images and files" 
→ Click "Clear data"
```

### Step 7: Hard Refresh Browser
```
Ctrl+F5 (Windows)
or
Cmd+Shift+R (Mac)
```

### Step 8: Check Console (F12)
You should see:
```
🔍 VITE_API_URL from env: https://blockcerts.onrender.com/api
📍 API_BASE_URL: https://blockcerts.onrender.com/api
📍 AUTH_API_URL: https://blockcerts.onrender.com/api/auth
📍 CERTIFICATES_API_URL: https://blockcerts.onrender.com/api/certificates
✓ Auth API called: https://blockcerts.onrender.com/api/auth
```

### Step 9: Test Signup
Try to signup - should see:
```
✅ Response Status: 201
```

---

## ❌ If Still Getting 404 Error

**Check the console for:**
1. Is `API_BASE_URL` showing with `/api`? If not → Environment variable not set at hosting
2. Is the URL showing `/auth` instead of `/api/auth`? If yes → Environment variable issue

**Fix:**
1. Set `VITE_API_URL=https://blockcerts.onrender.com/api` in your hosting's environment variables
2. Trigger a redeploy
3. Clear cache and refresh

---

## ✅ Expected URLs
```
✓ https://blockcerts.onrender.com/api/auth/signup
✓ https://blockcerts.onrender.com/api/auth/login
✓ https://blockcerts.onrender.com/api/certificates/upload
```

❌ WRONG:
```
✗ https://blockcerts.onrender.com/auth/signup (missing /api)
✗ https://blockcerts.onrender.com/api/signup (missing /auth)
```
