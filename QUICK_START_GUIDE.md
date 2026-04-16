# 🚀 Quick Start Guide - GrabGrid MERN Application

Complete guide to start developing and testing the GrabGrid application locally.

---

## ✅ Prerequisites Check

Before starting, verify you have:

- [x] Node.js 14+ installed
- [x] MongoDB installed and running (Windows Service)
- [x] npm packages installed in both `backend/` and `frontend/`
- [x] Environment variables configured (`.env` files)

---

## 📝 Step-by-Step Startup

### Step 1: Verify MongoDB is Running

```powershell
# Windows
Get-Service MongoDB | Select-Object Status

# Should show: Status: Running
```

If MongoDB is not running:
```powershell
# Start MongoDB Service
Start-Service MongoDB

# Or manually start
mongod
```

### Step 2: Start Backend Server

```bash
# Navigate to backend directory
cd backend

# Install dependencies (if not done)
npm install

# Start development server
npm run dev
```

**Expected Output:**
```
🔄 Attempting to connect to MongoDB...
✅ MongoDB Connected Successfully
   Host: localhost
   Database: hostel-share
   Connection State: CONNECTED
✅ Mongoose connected to MongoDB

🚀 Server running on port 5000
📍 API URL: http://localhost:5000
❓ Health Check: http://localhost:5000/api/health
```

### Step 3: Test Backend Health Check

In a **new terminal**:
```bash
# Test API is working
curl http://localhost:5000/api/health

# Expected response:
# {
#   "message": "Server is running",
#   "timestamp": "2024-01-20T10:30:45.123Z",
#   "mongodb": "Connected"
# }
```

### Step 4: Start Frontend Server

In a **new terminal**:
```bash
# Navigate to frontend
cd frontend

# Install dependencies (if not done)
npm install

# Start development server
npm start
```

**Expected Output:**
```
webpack compiled successfully
Local:   http://localhost:3000
Network: http://192.168.x.x:3000
```

Browser should automatically open to `http://localhost:3000`

---

## 🧪 Test Application Endpoints

### Public Endpoints (No Auth Required)

```bash
# Health Check
curl http://localhost:5000/api/health

# Register New User
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Test@1234"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@1234"
  }'

# Response includes token:
# {
#   "token": "eyJhbGciOiJIUzI1NiIs...",
#   "user": {...}
# }
```

### Protected Endpoints (Requires Token)

```bash
# Get All Items
TOKEN="your_token_here"
curl http://localhost:5000/api/items \
  -H "Authorization: Bearer $TOKEN"

# Get User's Items
curl http://localhost:5000/api/items/my-items \
  -H "Authorization: Bearer $TOKEN"

# Create New Item
curl -X POST http://localhost:5000/api/items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Laptop",
    "description": "Dell XPS 15",
    "category": "Electronics",
    "available": true
  }'
```

---

## 🐛 Troubleshooting Startup Issues

### Issue: "Error: connect ECONNREFUSED 127.0.0.1:27017"

**MongoDB not running**
```bash
# Start MongoDB
Get-Service MongoDB | Start-Service
# OR
mongod
```

### Issue: "Error: listen EADDRINUSE: address already in use :::5000"

**Port already in use**
```bash
# Kill process using port 5000
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process -Force

# Or use different port
PORT=5001 npm run dev
```

### Issue: "Cannot GET /" Frontend

**Check if backend is running**
```bash
# Test backend health
curl http://localhost:5000/api/health

# Should show: {"message":"Server is running",...}
```

### Issue: Environment Variables Not Found

**Create .env file in backend**
```bash
# Check if file exists
ls backend/.env

# If not, create it
echo "PORT=5000" > backend/.env
echo "MONGODB_URI=mongodb://localhost:27017/hostel-share" >> backend/.env
echo "JWT_SECRET=your_secret_key" >> backend/.env
echo "NODE_ENV=development" >> backend/.env
```

### Issue: "MongoAuthenticationError"

**Check .env is correct**
```bash
# View backend .env
cat backend/.env

# Should show:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/hostel-share
# JWT_SECRET=your_secret_key
# NODE_ENV=development
```

---

## 📊 Database Check

```bash
# Connect to MongoDB shell
mongosh

# In MongoDB shell:
# List all databases
show databases

# Select hostel-share database
use hostel-share

# Check collections
show collections

# View sample documents
db.users.findOne()
db.items.findOne()
db.borrows.findOne()

# Count documents
db.users.countDocuments()
db.items.countDocuments()
db.borrows.countDocuments()

# Exit
exit
```

---

## 🌐 Application URLs

| Component | URL | Status |
|-----------|-----|--------|
| Frontend | http://localhost:3000 | [Check](#step-4-start-frontend-server) |
| Backend API | http://localhost:5000 | [Check](#step-3-test-backend-health-check) |
| Health Check | http://localhost:5000/api/health | [Test](#step-3-test-backend-health-check) |
| MongoDB | localhost:27017 | [Verify](#step-1-verify-mongodb-is-running) |
| MongoDB Shell | mongosh | [Test](#database-check) |

---

## 📁 Project Structure

```
GrabGrid/
├── backend/
│   ├── server.js          ← Main server file
│   ├── package.json       ← Dependencies
│   ├── .env               ← Configuration
│   ├── config/db.js       ← MongoDB connection
│   ├── controllers/       ← Business logic
│   ├── models/            ← Database schemas
│   ├── routes/            ← API endpoints
│   ├── middleware/        ← Auth & error handling
│   └── utils/             ← Helper functions
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── pages/         ← React pages
│   │   ├── components/    ← React components
│   │   ├── context/       ← State management
│   │   ├── api/           ← API client
│   │   └── App.js         ← Root component
│   └── package.json       ← Dependencies
│
└── Documentation/
    ├── README.md
    ├── MONGODB_SETUP.md
    ├── SETUP.md
    ├── DEPLOYMENT.md
    └── ARCHITECTURE.md
```

---

## 🔒 User Authentication Flow

1. **Register** (`POST /api/auth/register`)
   - Create new account with email and password
   - Password hashed with bcryptjs (10 salt rounds)
   - Returns JWT token (7-day expiration)

2. **Login** (`POST /api/auth/login`)
   - Verify credentials
   - Generate JWT token
   - Token stored in browser localStorage

3. **Protected Routes**
   - All item, borrow, and user routes require token
   - Token sent in `Authorization: Bearer <token>` header
   - Verified by authMiddleware before endpoint execution

---

## 🎯 Using the Application

### As Item Owner:
1. Login to account
2. Go to "Dashboard" → "Add Item"
3. Fill item details (name, description, category)
4. Item appears in "My Items"
5. View borrow requests in "My Requests"
6. Approve/Reject requests from others

### As Borrower:
1. Login to account
2. Go to "Items" → Browse available items
3. Click "Request to Borrow" on any item
4. Request appears in "My Requests" (Outgoing)
5. Owner approves/rejects request
6. Once approved, item appears in your borrowed list
7. Return item when done

---

## 📚 API Documentation

### Authentication Endpoints

```
POST   /api/auth/register     - Create new account
POST   /api/auth/login        - Login & get token
GET    /api/auth/profile      - Get current user (protected)
```

### Item Endpoints

```
GET    /api/items             - List all items
GET    /api/items/:id         - Get item details
GET    /api/items/my-items    - Get user's items (protected)
POST   /api/items             - Create new item (protected)
PUT    /api/items/:id         - Update item (protected)
DELETE /api/items/:id         - Delete item (protected)
```

### Borrow Endpoints

```
GET    /api/borrow            - Get all borrow requests (protected)
POST   /api/borrow/:itemId    - Create borrow request (protected)
PUT    /api/borrow/:id/approve   - Approve request (protected)
PUT    /api/borrow/:id/reject    - Reject request (protected)
PUT    /api/borrow/:id/return    - Return borrowed item (protected)
```

---

## 🔧 Environment Variables

**Backend (.env)**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/hostel-share
JWT_SECRET=your_super_secret_key_change_in_production
JWT_EXPIRE=7d
```

**Frontend (.env.local - optional)**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 📱 Development Tools

### Recommended Extensions:
- **VS Code**: REST Client (to test APIs)
- **Browser**: React Developer Tools
- **MongoDB**: MongoDB Compass (GUI)

### Test API Requests:

Create file: `test-api.rest`
```rest
### Test Health Check
GET http://localhost:5000/api/health

### Register User
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "Test@1234"
}

### Login
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "Test@1234"
}

### Get All Items (add token from login)
GET http://localhost:5000/api/items
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

---

## 📊 Testing Checklist

- [ ] MongoDB service is running
- [ ] Backend starts without errors
- [ ] Health check endpoint responds
- [ ] Frontend loads at http://localhost:3000
- [ ] Can register new user
- [ ] Can login with created user
- [ ] Can create new item
- [ ] Can view all items
- [ ] Can request to borrow item
- [ ] Can approve/reject borrow request
- [ ] Can return borrowed item

---

## 🎓 Next Steps

1. ✅ Start both servers (backend & frontend)
2. ✅ Register and login test accounts
3. ✅ Create test items
4. ✅ Test borrowing flow
5. ✅ Check data in MongoDB
6. ✅ Review [ARCHITECTURE.md](./ARCHITECTURE.md) for system design
7. ✅ Review [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup

---

## 📞 Support

If issues occur:

1. Check [MONGODB_SETUP.md](./MONGODB_SETUP.md) for connection issues
2. Check [TROUBLESHOOTING](#-troubleshooting-startup-issues) section above
3. View logs in terminal for error messages
4. Verify .env files have correct values
5. Ensure MongoDB is running: `Get-Service MongoDB`

---

**Happy coding! 🚀**
