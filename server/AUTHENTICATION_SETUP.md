# BlockCert Authentication System Setup Guide

## Overview
This authentication system provides organization-based login and signup functionality for the BlockCert certificate issuing platform. Only authenticated organizations can issue certificates.

---

## 1. Installation & Setup

### Step 1: Install Dependencies
Run the following command in your `server` directory:

```bash
npm install bcryptjs jsonwebtoken
```

**Or** use the updated package.json that already includes these dependencies:

```bash
npm install
```

### Step 2: Configure Environment Variables
Create or update your `.env` file in the `server` directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/blockcert
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blockcert?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
JWT_EXPIRE=7d

# Server
PORT=5000
NODE_ENV=development
```

**Important:** Change `JWT_SECRET` to a strong, unique secret key in production!

---

## 2. API Endpoints

### Authentication Routes (`/api/auth`)

#### **POST /api/auth/signup**
Register a new organization

**Request Body:**
```json
{
  "organizationName": "ABC University",
  "organizationRegistrationId": "REG-2024-001",
  "email": "admin@abcuniversity.edu",
  "password": "SecurePassword123",
  "confirmPassword": "SecurePassword123",
  "organizationType": "University",
  "about": "A prestigious university...",
  "address": "123 Main Street, City, Country",
  "website": "https://www.abcuniversity.edu",
  "phone": "+1234567890"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Organization registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "organizationName": "ABC University",
    "email": "admin@abcuniversity.edu",
    "organizationType": "University",
    "role": "organization"
  }
}
```

---

#### **POST /api/auth/login**
Login to an existing account

**Request Body:**
```json
{
  "email": "admin@abcuniversity.edu",
  "password": "SecurePassword123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "organizationName": "ABC University",
    "email": "admin@abcuniversity.edu",
    "organizationType": "University",
    "role": "organization"
  }
}
```

---

#### **GET /api/auth/me**
Get current authenticated user profile

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "organizationName": "ABC University",
    "organizationRegistrationId": "REG-2024-001",
    "email": "admin@abcuniversity.edu",
    "organizationType": "University",
    "about": "A prestigious university...",
    "address": "123 Main Street, City, Country",
    "website": "https://www.abcuniversity.edu",
    "phone": "+1234567890",
    "role": "organization",
    "isActive": true,
    "createdAt": "2024-03-20T10:30:00Z",
    "updatedAt": "2024-03-20T10:30:00Z"
  }
}
```

---

#### **PUT /api/auth/update-profile**
Update organization profile (Requires authentication)

**Headers:**
```
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "organizationName": "ABC University (Updated)",
  "about": "Updated description...",
  "address": "456 New Street, City, Country",
  "website": "https://www.newdomain.edu",
  "phone": "+0987654321"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": { /* updated user object */ }
}
```

---

### Certificate Routes (Updated)

#### **POST /api/certificates/upload**
Issue a new certificate (PROTECTED - Requires Authentication)

**Headers:**
```
Authorization: Bearer <your_jwt_token>
Content-Type: multipart/form-data
```

**Form Data:**
```
certificate: <file>
studentName: John Doe
course: Computer Science
year: 2024
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Certificate Uploaded & Stored on Blockchain + IPFS 🚀",
  "certificate": {
    "_id": "507f1f77bcf86cd799439012",
    "certificateId": "CERT-1710938400000",
    "studentName": "John Doe",
    "course": "Computer Science",
    "year": "2024",
    "cid": "QmXxxx...",
    "issuedBy": {
      "_id": "507f1f77bcf86cd799439011",
      "organizationName": "ABC University",
      "email": "admin@abcuniversity.edu",
      "organizationType": "University"
    },
    "issuedAt": "2024-03-20T10:30:00Z"
  }
}
```

---

#### **GET /api/certificates/verify/:id**
Verify a certificate (PUBLIC - No Authentication Required)

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Certificate Verified from Blockchain ✅",
  "certificateId": "CERT-1710938400000",
  "cid": "QmXxxx...",
  "ipfsLink": "https://gateway.pinata.cloud/ipfs/QmXxxx...",
  "cert": {
    "_id": "507f1f77bcf86cd799439012",
    "certificateId": "CERT-1710938400000",
    "studentName": "John Doe",
    "course": "Computer Science",
    "year": "2024",
    "issuedBy": {
      "_id": "507f1f77bcf86cd799439011",
      "organizationName": "ABC University",
      "email": "admin@abcuniversity.edu",
      "organizationType": "University"
    },
    "issuedAt": "2024-03-20T10:30:00Z"
  }
}
```

---

## 3. Error Handling

### Common Error Responses

#### **400 Bad Request**
```json
{
  "success": false,
  "message": "Please provide all required fields"
}
```

#### **401 Unauthorized**
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

#### **401 Invalid Credentials**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

#### **409 Conflict (Duplicate)**
```json
{
  "success": false,
  "message": "Email already registered"
}
```

#### **500 Server Error**
```json
{
  "success": false,
  "message": "Error during signup / login"
}
```

---

## 4. Security Features Implemented

✅ **Password Hashing:** bcryptjs with 10 salt rounds  
✅ **JWT Authentication:** 7-day token expiry  
✅ **Password Validation:** Minimum 6 characters  
✅ **Email Validation:** RFC-compliant regex  
✅ **Token Verification:** Middleware checks token validity  
✅ **Account Deactivation:** Support for disabling accounts  
✅ **Input Sanitization:** MongoDB schema validation  
✅ **Protected Routes:** Certificate upload requires authentication  

---

## 5. Project Folder Structure

```
server/
├── models/
│   ├── Certificate.js (updated with issuedBy)
│   └── User.js (NEW)
├── controllers/
│   ├── certificateController.js (updated to track issuedBy)
│   └── authController.js (NEW)
├── routes/
│   ├── certificateRoutes.js (updated with auth middleware)
│   └── authRoutes.js (NEW)
├── middleware/
│   └── authMiddleware.js (NEW)
├── config/
│   ├── db.js
│   └── multer.js
├── utils/
│   ├── blockchain.js
│   └── uploadToIPFS.js
├── index.js (updated with auth routes)
├── package.json (updated with new dependencies)
└── .env
```

---

## 6. Frontend Integration Examples

### Signup Example (React/JavaScript)

```javascript
async function signup(data) {
  try {
    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (result.success) {
      localStorage.setItem("token", result.token);
      console.log("Signup successful!");
    }
  } catch (error) {
    console.error("Signup failed:", error);
  }
}
```

### Login Example

```javascript
async function login(email, password) {
  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const result = await response.json();
    if (result.success) {
      localStorage.setItem("token", result.token);
      console.log("Login successful!");
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
}
```

### Upload Certificate (with Token)

```javascript
async function uploadCertificate(file, studentName, course, year) {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("certificate", file);
  formData.append("studentName", studentName);
  formData.append("course", course);
  formData.append("year", year);

  try {
    const response = await fetch("http://localhost:5000/api/certificates/upload", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: formData
    });
    const result = await response.json();
    console.log("Certificate uploaded:", result);
  } catch (error) {
    console.error("Upload failed:", error);
  }
}
```

---

## 7. Testing with Postman/cURL

### Signup Request
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "organizationName": "Test University",
    "organizationRegistrationId": "REG-TEST-001",
    "email": "test@university.com",
    "password": "Test@1234",
    "confirmPassword": "Test@1234",
    "organizationType": "University"
  }'
```

### Login Request
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@university.com",
    "password": "Test@1234"
  }'
```

### Upload Certificate (Replace TOKEN with actual token)
```bash
curl -X POST http://localhost:5000/api/certificates/upload \
  -H "Authorization: Bearer TOKEN" \
  -F "certificate=@certificate.pdf" \
  -F "studentName=John Doe" \
  -F "course=Computer Science" \
  -F "year=2024"
```

---

## 8. Important Notes

1. **JWT Secret:** Set a strong, unique JWT_SECRET in production
2. **HTTPS:** Use HTTPS in production for token transmission
3. **CORS:** Configure CORS properly for your frontend domain
4. **Database:** Ensure MongoDB is running and MONGODB_URI is correct
5. **Token Storage:** Store tokens securely (preferably httpOnly cookies)
6. **Token Refresh:** Consider implementing token refresh mechanism for better UX
7. **Rate Limiting:** Consider adding rate limiting to auth endpoints in production

---

## 9. Troubleshooting

### "Cannot find module 'bcryptjs'"
```bash
npm install bcryptjs
```

### "Cannot find module 'jsonwebtoken'"
```bash
npm install jsonwebtoken
```

### "ECONNREFUSED" - MongoDB not running
Start MongoDB:
```bash
# macOS/Linux
mongod

# Windows
"C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe"
```

### "Invalid token" error
- Token may have expired (7 days)
- Token format incorrect (should be "Bearer TOKEN")
- JWT_SECRET mismatch between token generation and verification

---

## 10. Next Steps

1. Install dependencies: `npm install`
2. Configure `.env` file with your values
3. Start MongoDB
4. Run server: `npm start`
5. Test endpoints with Postman or cURL
6. Integrate authentication into frontend
7. Implement token refresh mechanism
8. Add rate limiting & logging in production
9. Set up HTTPS for security
10. Deploy to production

---

**Your complete authentication system is now ready! 🚀**
