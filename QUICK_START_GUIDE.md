# BlockCert Complete Authentication System - Quick Start Guide

## 🎯 What You Have Now

A complete, production-ready authentication system with:
- ✅ User registration and login
- ✅ JWT token-based authentication
- ✅ Organization-based certificate issuing
- ✅ Blockchain + IPFS storage
- ✅ Protected routes
- ✅ Beautiful, responsive UI
- ✅ Toast notifications
- ✅ Form validation

---

## 🚀 Quick Start (3 Steps)

### Step 1: Install Dependencies

```bash
# Backend
cd server
npm install

# Frontend
cd ../frontend
npm install
```

### Step 2: Configure Environment Variables

**Backend** - Create `server/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/blockcert
JWT_SECRET=your_strong_secret_key_here
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
```

**Frontend** - No additional setup needed (configured for localhost)

### Step 3: Start Both Services

**Terminal 1 - Backend:**
```bash
cd server
npm start
```
Server will run on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

---

## 📋 What Was Created

### Backend Files
```
server/
├── models/User.js (NEW) - User/Organization schema
├── controllers/authController.js (NEW) - Authentication logic
├── routes/authRoutes.js (NEW) - Auth API routes
├── middleware/authMiddleware.js (NEW) - JWT verification
├── models/Certificate.js (UPDATED) - Added issuedBy field
├── controllers/certificateController.js (UPDATED) - Auth integration
├── routes/certificateRoutes.js (UPDATED) - Protected routes
├── index.js (UPDATED) - Added auth routes
├── package.json (UPDATED) - Added bcryptjs, jsonwebtoken
├── .env.example (UPDATED) - JWT config variables
└── AUTHENTICATION_SETUP.md & API_REFERENCE.md (NEW)
```

### Frontend Files
```
frontend/
├── pages/
│   ├── Login.jsx (NEW) - Login page
│   ├── Signup.jsx (NEW) - Registration page
│   └── IssueCertificate.jsx (UPDATED) - Auth integration
├── services/
│   ├── authApi.js (NEW) - Auth functions
│   └── api.js (UPDATED) - Token integration
├── components/
│   ├── ProtectedRoute.jsx (NEW) - Route protection
│   └── layout/Header.jsx (UPDATED) - Auth UI
├── App.jsx (UPDATED) - Routes + ToastContainer
├── package.json (UPDATED) - Added react-toastify
└── FRONTEND_AUTH_SETUP.md (NEW)
```

---

## 🎨 User Interface Highlights

### Login Page (`/login`)
- Clean, minimal login form
- Email & password fields
- Loading state spinner
- Success/error notifications
- Link to signup page

### Signup Page (`/signup`)
- Complete organization registration form
- Fields:
  - Organization Name & Registration ID
  - Email & Password (with confirmation)
  - Organization Type (dropdown)
  - About, Address, Website, Phone
- Form validation
- Success/error notifications
- Link to login page

### Header Updates
- Shows organization name when logged in
- Logout button
- Login/Signup buttons for guests
- Mobile responsive menu

### Issue Certificate Page
- Protected route (redirects to login if not authenticated)
- Shows issuing organization
- Form validation
- Loading spinner
- Success card with Certificate ID
- Toast notifications

---

## 🔐 Authentication Flow

```
User → Signup Form → Backend API → Password Hash (bcrypt)
                          ↓
                    Store in MongoDB
                          ↓
                      Generate JWT Token
                          ↓
                    Frontend saves token to localStorage
                          ↓
                    User can now issue certificates
                          ↓
                    Token sent with every protected request
```

---

## 📡 API Endpoints

### Public (No Auth Required)
```
POST /api/auth/signup              - Register organization
POST /api/auth/login               - Login to account
GET  /api/certificates/verify/:id  - Verify certificate
```

### Protected (Token Required)
```
GET  /api/auth/me                      - Get user profile
PUT  /api/auth/update-profile          - Update profile
POST /api/certificates/upload          - Issue certificate
```

**Token Format:**
```
Authorization: Bearer <your_jwt_token>
```

---

## ✨ Key Features

### Security
- ✅ Passwords hashed with bcryptjs (10 salt rounds)
- ✅ JWT tokens with 7-day expiry
- ✅ Protected routes require authentication
- ✅ Unique email & registration ID constraints
- ✅ Form validation on both frontend & backend

### User Experience
- ✅ Loading spinners show during requests
- ✅ Toast notifications for feedback
- ✅ Form auto-clears after submission
- ✅ Smooth animations & transitions
- ✅ Responsive mobile design
- ✅ Real-time form validation

### Database Integration
- ✅ MongoDB stores user & certificate data
- ✅ Blockchain stores certificate hashes
- ✅ IPFS stores certificate files
- ✅ Organization info linked to certificates

---

## 🧪 Testing the System

### 1. Register Organization
```
Go to: http://localhost:5173/signup

Fill form:
- Organization Name: "Test University"
- Registration ID: "REG-TEST-001"
- Email: "test@university.com"
- Password: "Test1234"
- Org Type: "University"

Click "Create Organization Account"
```

### 2. Issue Certificate
```
You'll be redirected to: http://localhost:5173/issue

Fill form:
- Student Name: "John Doe"
- Course: "Computer Science"
- Year: "2024"
- Certificate File: <select a PDF>

Click "Upload Certificate"

See success message with Certificate ID
```

### 3. Verify Certificate
```
Go to: http://localhost:5173/verify

Enter the Certificate ID shown above

See certificate details verified from blockchain
```

### 4. Logout
```
Click "Logout" button in header

You'll be redirected to homepage

To access /issue again, must login first
```

---

## 🛠️ Troubleshooting

### Frontend won't start
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Backend connection error
Check if backend is running:
```bash
# Backend should be on port 5000
curl http://localhost:5000/
# Should return: 🚀 BlockCert Server Running
```

### Cannot login after signup
1. Check MongoDB is running
2. Verify backend `.env` has correct MONGODB_URI
3. Check browser DevTools Console for errors
4. Try restarting both services

### Token expiry
- Tokens last 7 days
- After expiry, user needs to login again
- Clear localStorage if having issues:
  ```javascript
  localStorage.clear();
  // Then logout and login again
  ```

### CORS errors
- Backend has CORS enabled by default
- If getting CORS error, check:
  1. Frontend & backend on correct ports
  2. Backend is running
  3. No typos in API URLs

---

## 📚 File Structure

```
blockcert/
├── backend/
│   ├── server/
│   │   ├── models/
│   │   │   ├── User.js ← Authentication
│   │   │   └── Certificate.js
│   │   ├── controllers/
│   │   │   ├── authController.js ← Auth logic
│   │   │   └── certificateController.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js ← Auth endpoints
│   │   │   └── certificateRoutes.js
│   │   ├── middleware/
│   │   │   └── authMiddleware.js ← Token verification
│   │   └── index.js
│   └── AUTHENTICATION_SETUP.md
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx ← Login UI
│   │   │   ├── Signup.jsx ← Registration UI
│   │   │   └── IssueCertificate.jsx
│   │   ├── components/
│   │   │   ├── ProtectedRoute.jsx ← Route guard
│   │   │   └── layout/Header.jsx
│   │   ├── services/
│   │   │   ├── authApi.js ← Auth functions
│   │   │   └── api.js
│   │   └── App.jsx
│   └── FRONTEND_AUTH_SETUP.md
│
└── blockchain/
    └── CertificateRegistry.sol
```

---

## 🎯 Next Steps (Optional Improvements)

### Short Term
- [ ] Add remember me functionality
- [ ] Implement password reset
- [ ] Add user profile page
- [ ] Add organization dashboard

### Medium Term
- [ ] Implement token refresh mechanism
- [ ] Add two-factor authentication
- [ ] Add email verification
- [ ] Create admin panel

### Long Term
- [ ] Deploy to production
- [ ] Set up CI/CD pipeline
- [ ] Add analytics
- [ ] Multi-language support

---

## 📞 Support Resources

### Documentation Files
1. [Backend Setup](../server/AUTHENTICATION_SETUP.md)
2. [Frontend Setup](./FRONTEND_AUTH_SETUP.md)
3. [API Reference](../server/API_REFERENCE.md)

### Key Code Files
- **Authentication Logic**: `server/controllers/authController.js`
- **User Model**: `server/models/User.js`
- **Auth Middleware**: `server/middleware/authMiddleware.js`
- **Frontend Auth**: `frontend/src/services/authApi.js`
- **Route Protection**: `frontend/src/components/ProtectedRoute.jsx`

---

## ✅ Verification Checklist

Before deploying to production:

- [ ] Both services (backend & frontend) run without errors
- [ ] Can register a new organization
- [ ] Can login with registered account
- [ ] Can issue a certificate while logged in
- [ ] Cannot access `/issue` without logging in
- [ ] Logout clears user data
- [ ] Can verify certificates without logging in
- [ ] Notifications appear for success/error
- [ ] Mobile responsiveness works
- [ ] No console errors in DevTools

---

## 🎉 Congratulations!

You now have a complete, secure authentication system for your blockchain certificate platform!

The system includes:
- ✅ User registration with validation
- ✅ Secure JWT authentication
- ✅ Protected certificate issuing
- ✅ Beautiful, responsive UI
- ✅ Full error handling
- ✅ Real-time notifications
- ✅ Blockchain + IPFS integration

**Start using it now:**
1. Ensure both services are running
2. Go to `http://localhost:5173`
3. Click "Sign Up"
4. Create your organization account
5. Issue your first certificate! 🎓

---

**Built with ❤️ using React, Node.js, MongoDB, Blockchain, and IPFS**
