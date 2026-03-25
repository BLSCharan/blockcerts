# BlockCert Authentication & Certificate API Reference

## Quick Start

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env` and update with your values:
```bash
cp .env.example .env
# Edit .env with your actual MongoDB URI and JWT_SECRET
```

### 3. Start Server
```bash
npm start
```

---

## Authentication Endpoints

### 1. Sign Up (Register Organization)
```
POST /api/auth/signup
Content-Type: application/json

{
  "organizationName": "University Name",
  "organizationRegistrationId": "REG-001",
  "email": "admin@university.edu",
  "password": "SecurePass123",
  "confirmPassword": "SecurePass123",
  "organizationType": "University",
  "about": "Description of organization",
  "address": "Street Address",
  "website": "https://university.edu",
  "phone": "+1234567890"
}

Returns: { success, token, user }
```

### 2. Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@university.edu",
  "password": "SecurePass123"
}

Returns: { success, token, user }
```

### 3. Get Current User Profile
```
GET /api/auth/me
Authorization: Bearer <token>

Returns: { success, user }
```

### 4. Update Profile
```
PUT /api/auth/update-profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "organizationName": "Updated Name",
  "about": "Updated description",
  "address": "New address",
  "website": "https://newsite.edu",
  "phone": "+0987654321"
}

Returns: { success, message, user }
```

---

## Certificate Endpoints

### 5. Upload Certificate (Protected - Requires Auth)
```
POST /api/certificates/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

Form Data:
- certificate: <file>
- studentName: John Doe
- course: Computer Science
- year: 2024

Returns: { success, message, certificate }
```

### 6. Verify Certificate (Public)
```
GET /api/certificates/verify/{certificateId}

Returns: { success, message, certificateId, cid, ipfsLink, cert }
```

---

## Field Validations

### Organization Types
- College
- University
- Company
- School
- Institute
- Other

### Required Fields for Signup
- organizationName (2+ characters)
- organizationRegistrationId (unique)
- email (valid email format, unique)
- password (minimum 6 characters)
- confirmPassword (must match password)
- organizationType (one of the above)

### Optional Fields for Signup/Update
- about (max 1000 characters)
- address
- website (valid URL format)
- phone (valid phone format)

---

## Security Features

✅ **Password Hashing** - bcryptjs with 10 salt rounds  
✅ **JWT Tokens** - 7-day expiry  
✅ **Protected Routes** - Certificate upload requires authentication  
✅ **Email Validation** - RFC-compliant regex  
✅ **Phone Validation** - Standard international format  
✅ **Account Deactivation** - Can disable accounts  
✅ **Unique Constraints** - Email & Registration ID  

---

## Error Responses

### 400 Bad Request
```json
{ "success": false, "message": "Please provide all required fields" }
```

### 401 Unauthorized
```json
{ "success": false, "message": "Not authorized to access this route" }
```

### 409 Conflict
```json
{ "success": false, "message": "Email already registered" }
```

### 500 Server Error
```json
{ "success": false, "message": "Error message here" }
```

---

## Testing with cURL

### Register Organization
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "organizationName": "Test Uni",
    "organizationRegistrationId": "TEST-001",
    "email": "test@uni.edu",
    "password": "Test1234",
    "confirmPassword": "Test1234",
    "organizationType": "University"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@uni.edu",
    "password": "Test1234"
  }'
```

### Get Profile (Replace TOKEN with actual token)
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer TOKEN"
```

### Upload Certificate (Replace TOKEN with actual token)
```bash
curl -X POST http://localhost:5000/api/certificates/upload \
  -H "Authorization: Bearer TOKEN" \
  -F "certificate=@path/to/certificate.pdf" \
  -F "studentName=John Doe" \
  -F "course=Computer Science" \
  -F "year=2024"
```

### Verify Certificate
```bash
curl -X GET http://localhost:5000/api/certificates/verify/CERT-1710938400000
```

---

## File Structure

```
server/
├── models/
│   ├── User.js (NEW)
│   └── Certificate.js (updated)
├── controllers/
│   ├── authController.js (NEW)
│   └── certificateController.js (updated)
├── routes/
│   ├── authRoutes.js (NEW)
│   └── certificateRoutes.js (updated)
├── middleware/
│   └── authMiddleware.js (NEW)
├── config/
│   ├── db.js
│   └── multer.js
├── utils/
│   ├── blockchain.js
│   └── uploadToIPFS.js
├── index.js (updated)
├── package.json (updated)
├── .env (create from .env.example)
├── .env.example (updated)
└── AUTHENTICATION_SETUP.md (NEW)
```

---

## Environment Variables Required

```
MONGODB_URI=mongodb://localhost:27017/blockcert
JWT_SECRET=your_strong_secret_key_here
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
```

---

## Integration Notes

1. **Frontend Token Storage**: Store JWT token in localStorage/sessionStorage or httpOnly cookies
2. **Request Headers**: Always include `Authorization: Bearer <token>` for protected routes
3. **CORS**: Already configured, adjust origins if needed
4. **Error Handling**: Check both `success` flag and `message` in responses
5. **Token Expiry**: Tokens expire in 7 days - implement refresh mechanism for UX

---

For detailed setup instructions, see [AUTHENTICATION_SETUP.md](./AUTHENTICATION_SETUP.md)
