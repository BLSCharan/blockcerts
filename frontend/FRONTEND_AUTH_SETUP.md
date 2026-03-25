# BlockCert Frontend Authentication Setup Guide

## Overview
Complete integration of authentication system for the BlockCert frontend. Users can now register organizations, login, and issue certificates with blockchain storage.

---

## 📦 Installation

### Step 1: Install Dependencies
```bash
cd frontend
npm install
```

This will install:
- `react-toastify` - For toast notifications
- All existing dependencies

### Step 2: Create Environment Configuration
Create `.env` file in `frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

**Note:** Currently configured to work with local backend. Update for production.

---

## 📁 New Files Created

### Services
- **[src/services/authApi.js](src/services/authApi.js)** - Authentication API functions
  - `signup(formData)` - Register new organization
  - `login(email, password)` - Login to account
  - `getCurrentUser(token)` - Get user profile
  - `updateProfile(token, profileData)` - Update organization info

### Components
- **[src/components/ProtectedRoute.jsx](src/components/ProtectedRoute.jsx)** - Route protection wrapper

### Pages
- **[src/pages/Login.jsx](src/pages/Login.jsx)** - Login page with validation
- **[src/pages/Signup.jsx](src/pages/Signup.jsx)** - Registration page with all fields

---

## 📝 Updated Files

### src/App.jsx
- Added `/login` and `/signup` routes
- Integrated `ToastContainer` for notifications
- Protected `/issue` route with `ProtectedRoute`

### src/components/layout/Header.jsx
- Added user authentication display
- Shows organization name when logged in
- Login/Signup buttons for non-authenticated users
- Logout functionality
- Mobile responsive auth menu

### src/services/api.js
- Added JWT token to authorization header
- Updated `uploadCertificate()` to require authentication
- Improved error handling

### src/pages/IssueCertificate.jsx
- Added loading state with spinner
- Form validation
- Toast notifications for success/error
- Display issuing organization
- Improved UI/UX

---

## 🎨 UI/UX Features

### Consistent Design
- ✅ Glass-card styling
- ✅ Gradient text and buttons
- ✅ Dark theme with accent colors
- ✅ Smooth animations (fade-in, slide-up)
- ✅ Responsive design (mobile & desktop)

### User Experience
- ✅ Loading spinners during API calls
- ✅ Toast notifications (success/error)
- ✅ Form validation with error messages
- ✅ User organization display in header
- ✅ Protected routes auto-redirect to login

### Form Features
- ✅ Real-time validation
- ✅ Password confirmation check
- ✅ Email format validation
- ✅ Optional fields clearly marked
- ✅ Helpful error messages

---

## 🔐 Authentication Flow

```
1. User visits /signup
   ↓
2. Fills registration form with:
   - Organization details
   - Email & password
   ↓
3. Submits to /api/auth/signup
   ↓
4. Backend validates & hashes password
   ↓
5. Returns JWT token
   ↓
6. Frontend stores in localStorage
   ↓
7. User can now issue certificates
   ↓
8. Token sent with each request in header:
   Authorization: Bearer <token>
```

---

## 🔗 API Integration

### Signup Flow
```javascript
import { signup, setToken, setStoredUser } from "@/services/authApi";

const result = await signup({
  organizationName: "ABC University",
  organizationRegistrationId: "REG-2024-001",
  email: "admin@abcuniversity.edu",
  password: "SecurePass123",
  confirmPassword: "SecurePass123",
  organizationType: "University",
  about: "...",
  address: "...",
  website: "...",
  phone: "..."
});

// Store token and user
setToken(result.token);
setStoredUser(result.user);
```

### Login Flow
```javascript
import { login, setToken, setStoredUser } from "@/services/authApi";

const result = await login(email, password);

setToken(result.token);
setStoredUser(result.user);
```

### Protected API Calls
```javascript
import { uploadCertificate } from "@/services/api";

// Token is automatically included in Authorization header
const result = await uploadCertificate(formData);
```

### Logout
```javascript
import { removeToken } from "@/services/authApi";

const handleLogout = () => {
  removeToken(); // Clears token and user from localStorage
  navigate("/");
};
```

---

## 🛡️ Route Protection

### Protected Routes
Routes that require authentication:
- ✅ `/issue` - Issue certificates (must be logged in)

### Public Routes
- ✅ `/` - Home page
- ✅ `/login` - Login page
- ✅ `/signup` - Signup page
- ✅ `/verify` - Verify certificates

### Auto-Redirect
- If accessing `/issue` without token → redirect to `/login`
- If accessing `/login` while logged in → can still view
- If accessing `/signup` while logged in → can still view

---

## 📱 Responsive Design

### Desktop
- Full navigation bar with user info
- Optimized form layouts
- All features visible

### Mobile
- Hamburger menu with auth options
- Responsive form inputs
- Touch-friendly buttons
- Mobile-optimized modals

---

## ⚙️ Key Features Implemented

### ✅ Authentication
- JWT token-based authentication
- Secure password hashing (bcryptjs on backend)
- 7-day token expiry
- Logout clears all auth data

### ✅ Form Validation
- Required field checking
- Email format validation
- Password strength (minimum 6 characters)
- Password confirmation matching
- Optional field handling

### ✅ Error Handling
- Network error handling
- Validation error messages
- Duplicate email/registration ID errors
- Toast notifications for user feedback

### ✅ User Experience
- Loading spinners during requests
- Smooth animations
- Toast notifications
- Form auto-clear after submission
- Recent submission display

### ✅ Security
- Token stored in localStorage (can upgrade to httpOnly)
- Authorization header on protected routes
- Logout removes all sensitive data
- Protected routes require valid token

---

## 🚀 Getting Started

### Start the Frontend
```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173` or `http://localhost:5174`

### Start the Backend
```bash
cd server
npm install
npm start
```

The backend will run on `http://localhost:5000`

### Test the Flow
1. Go to `http://localhost:5173/signup`
2. Fill in organization details
3. Submit form
4. You'll be logged in and redirected to `/issue`
5. Upload a certificate
6. Check success notification

---

## 🔗 API Endpoints Reference

### Authentication Endpoints
```
POST /api/auth/signup        - Register organization
POST /api/auth/login         - Login to account
GET  /api/auth/me            - Get user profile (requires token)
PUT  /api/auth/update-profile - Update profile (requires token)
```

### Certificate Endpoints
```
POST /api/certificates/upload - Upload certificate (requires token)
GET  /api/certificates/verify/:id - Verify certificate (public)
```

---

## 🎯 Component Structure

```
src/
├── components/
│   ├── ProtectedRoute.jsx (NEW)
│   └── layout/
│       └── Header.jsx (UPDATED)
├── pages/
│   ├── Login.jsx (NEW)
│   ├── Signup.jsx (NEW)
│   ├── IssueCertificate.jsx (UPDATED)
│   ├── VerifyCertificate.jsx
│   └── Home.jsx
├── services/
│   ├── authApi.js (NEW)
│   └── api.js (UPDATED)
├── App.jsx (UPDATED)
└── index.css
```

---

## 🔧 Customization

### Change Backend URL
Update in `src/services/authApi.js` and `src/services/api.js`:
```javascript
const BASE_URL = "YOUR_BACKEND_URL/api";
```

### Change Toast Position
In `src/App.jsx`, update `ToastContainer`:
```javascript
<ToastContainer position="top-center" /> // Change position
```

### Modify Form Fields
Edit `src/pages/Signup.jsx` to add/remove fields

### Change Colors/Theme
Update `src/index.css` and `tailwind.config.js`

---

## 🐛 Troubleshooting

### "Cannot find module 'react-toastify'"
```bash
npm install react-toastify
```

### CORS Error when calling backend
- Ensure backend has CORS enabled
- Check backend is running on `http://localhost:5000`
- Verify API URL in authApi.js

### Token not being sent
- Check localStorage for `token` key
- Verify `getToken()` function returns value
- Check Authorization header in browser DevTools Network tab

### Login/Signup not working
1. Ensure backend is running
2. Check MongoDB is connected
3. Verify environment variables in backend
4. Check API URL is correct

### Page redirects to login unexpectedly
- Token may have expired (7 days)
- localStorage might be cleared
- Browser may not support localStorage

---

## 📊 State Management

### Using localStorage
```javascript
import { getToken, setToken, removeToken } from "@/services/authApi";

// Get token
const token = getToken();

// Set token after login
setToken(token);

// Remove token on logout
removeToken();
```

### Getting User Info
```javascript
import { getStoredUser } from "@/services/authApi";

const user = getStoredUser();
console.log(user.organizationName);
```

---

## 🔐 Security Best Practices

✅ **Implemented:**
- Token-based authentication
- Protected API routes
- Logout clears all data
- Password hashingnow done on backend

⚠️ **Future Improvements:**
- Use httpOnly cookies instead of localStorage
- Implement token refresh mechanism
- Add rate limiting to login/signup
- HTTPS only in production
- CSRF protection

---

## 📈 Performance Optimizations

✅ **Implemented:**
- Loading states prevent multiple submissions
- Proper error handling prevents crashes
- API calls are efficiently structured
- Components properly separated

---

## 🎓 Learning Resources

### Related Files
- [Backend Authentication Setup](../server/AUTHENTICATION_SETUP.md)
- [Backend API Reference](../server/API_REFERENCE.md)
- [Backend User Model](../server/models/User.js)
- [Backend Auth Controller](../server/controllers/authController.js)

---

## ✅ Verification Checklist

- [ ] `npm install` completed successfully
- [ ] Both frontend and backend running
- [ ] Can navigate to `/signup`
- [ ] Can register new organization
- [ ] Redirected to `/issue` after signup
- [ ] Can see organization name in header
- [ ] Can upload certificate
- [ ] Logout clears auth data
- [ ] `/issue` redirects to login if not authenticated
- [ ] Toast notifications appear on success/error

---

**Your complete authentication system is ready to use! 🚀**

For backend setup, see [AUTHENTICATION_SETUP.md](../server/AUTHENTICATION_SETUP.md)
