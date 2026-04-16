# Login Debug Guide - GrabGrid

## 🔍 Issues Fixed

### 1. **Token Service Module Format** ✅
- **Problem**: `tokenService.js` was using ES6 syntax (`import/export`) while rest of app uses CommonJS (`require`)
- **Fix**: Converted to CommonJS format with proper error handling
- **Impact**: Token generation should now work properly

### 2. **JWT_SECRET Configuration** ✅
- **Problem**: JWT_SECRET was placeholder text
- **Fix**: Updated to proper development secret
- **Impact**: Tokens can now be generated and verified correctly

### 3. **Enhanced Logging** ✅
- **Problem**: No debugging info on login failures
- **Fix**: Added detailed console logs to auth controller
- **Impact**: Can now trace exactly where login fails

---

## 🚀 Steps to Test Login

### Step 1: Start MongoDB
```bash
# Windows - if installed locally
mongod

# OR use MongoDB Atlas (cloud)
# Just ensure MONGODB_URI in .env points to your instance
```

### Step 2: Start Backend Server
```bash
cd backend
npm install  # if you haven't already
npm run dev  # or: node server.js
```

**Expected output:**
```
🚀 Server running on port 5000
📍 API URL: http://localhost:5000
❓ Health Check: http://localhost:5000/api/health
```

### Step 3: Test Health Endpoint (Verify Backend is Running)
```bash
# Option A: Browser - visit:
http://localhost:5000/api/health

# Option B: Terminal (curl):
curl http://localhost:5000/api/health

# Expected response:
{
  "message": "Server is running",
  "timestamp": "2024-...",
  "mongodb": "Connected" or "Disconnected"
}
```

⚠️ **If mongodb shows "Disconnected", start MongoDB first!**

### Step 4: Register a Test User (Using Browser or Postman)

**Via Postman:**
- Method: POST
- URL: `http://localhost:5000/api/auth/register`
- Body (JSON):
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123",
  "hostelBlock": "A",
  "roomNumber": "101",
  "phoneNumber": "9876543210"
}
```

**Or via Browser:**
1. Start frontend: `cd frontend && npm start`
2. Go to Register page
3. Fill in form and submit

### Step 5: Test Login

**Via Postman:**
- Method: POST
- URL: `http://localhost:5000/api/auth/login`
- Body (JSON):
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

**Expected response:**
```json
{
  "success": true,
  "message": "Login successful",
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "...",
    "name": "Test User",
    "email": "test@example.com",
    "role": "user"
  }
}
```

---

## 🐛 Backend Console Logs

When you attempt login, check **backend server console** for logs like:

```
🔓 Login attempt for: test@example.com
✅ User found: 507f1f77bcf86cd799439011
✅ Password verified for user: test@example.com
✅ Tokens generated for user: 507f1f77bcf86cd799439011
📋 Access Token: eyJhbGciOiJIUzI1NiIs...
✅ Login successful for: test@example.com
```

If you see an error like:
- `❌ User not found: test@example.com` → User doesn't exist in DB
- `❌ Invalid password for user: test@example.com` → Wrong password
- `❌ JWT_SECRET is not defined` → .env not loaded properly

---

## 🌐 Frontend Browser Console

When attempting login from the frontend:

1. Open DevTools: **F12 or Ctrl+Shift+I**
2. Go to **Console** tab
3. Look for messages

**If successful:** You'll see a redirect to `/dashboard`

**If error:** Check for messages like:
- `Network error` → Backend not running
- `401 Unauthorized` → Token issue
- `400 Invalid credentials` → Wrong email/password

---

## 🔧 Troubleshooting

### Login returns 400 "Invalid credentials"
❌ **Not a token issue - it's authentication**
1. Verify email exists in database
2. Verify password is correct
3. Check MongoDB has the user record

### Login returns 500 error
❌ **Server error in auth controller**
1. Check backend console for error message
2. Verify JWT_SECRET is set in .env
3. Verify MongoDB is connected

### Frontend shows "Network Error"
❌ **Can't reach backend**
1. Verify backend is running on port 5000
2. Verify REACT_APP_API_URL=http://localhost:5000/api in frontend/.env
3. Check CORS isn't blocking (should be enabled)

### "Access Denied" or 401 error during dashboard access
❌ **Token not being sent properly**
1. Check browser > DevTools > Application > Local Storage
2. Look for `accessToken` and `refreshToken` keys
3. Verify tokens are valid JWT format (start with `eyJ`)

---

## 📋 Checklist Before Login

- [ ] MongoDB is running and connected
- [ ] Backend is running on port 5000
- [ ] Frontend is running on port 3000
- [ ] .env files are configured correctly
- [ ] User is registered (or use test data)
- [ ] Browser console shows no errors
- [ ] Backend console shows login logs

---

## 🎯 Quick Test Commands

```bash
# Test backend health
curl http://localhost:5000/api/health

# Test login endpoint
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Test with valid credentials (assuming user exists)
# Should return accessToken and refreshToken
```

---

## ✨ Next Steps

1. Follow the "Steps to Test Login" section above
2. Monitor backend console logs for detailed error messages
3. Check MongoDB is running and storing users
4. Report any specific error messages if login still fails

**All issues should now be resolved! 🎉**
