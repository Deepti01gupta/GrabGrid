# MongoDB Connection Reference

Quick reference for managing MongoDB connections for the GrabGrid project.

---

## 📍 Current Setup

### Local MongoDB (Development)
```
Connection String: mongodb://localhost:27017/hostel-share
Status: ✅ Running
Service: Windows Service - MongoDB
```

### .env Configuration
```env
MONGODB_URI=mongodb://localhost:27017/hostel-share
```

### server.js Configuration
```javascript
// Properly awaited database connection
const startServer = async () => {
  await connectDB();  // ✅ Waits for connection before starting server
  app.listen(PORT, () => { console.log(`Server running on port ${PORT}`); });
};
startServer();
```

### config/db.js Features
```javascript
// Enhanced connection with:
- Connection pooling (min: 5, max: 10)
- Server selection timeout (5s)
- Socket timeout (45s)
- Automatic retry writes
- Connection event listeners
- Graceful shutdown handling
```

---

## 🔄 Connection String Formats

### Local Development
```
mongodb://localhost:27017/hostel-share
```

### MongoDB Atlas Cloud
```
mongodb+srv://username:password@cluster-name.xxxxx.mongodb.net/hostel-share?retryWrites=true&w=majority
```

### Docker MongoDB
```
mongodb://admin:password@localhost:27017/hostel-share?authSource=admin
```

---

## ✅ Verification Checklist

### Before Starting Backend

```bash
# 1. Check MongoDB Service Status
Get-Service MongoDB | Select-Object Status
# Expected: Status: Running

# 2. Test MongoDB Connection
mongosh
# Expected: test> (MongoDB shell prompt)

# 3. Verify Database Exists
mongosh -e "show databases" | grep hostel-share
# Expected: hostel-share  (should list the database)

# 4. Check .env File
cat backend/.env | grep MONGODB_URI
# Expected: MONGODB_URI=mongodb://localhost:27017/hostel-share
```

### After Starting Backend

```bash
# 5. Test Health Check Endpoint
curl http://localhost:5000/api/health

# Expected Response:
# {
#   "message": "Server is running",
#   "timestamp": "2024-01-20T10:30:45.123Z",
#   "mongodb": "Connected"
# }

# 6. Check MongoDB Collections
mongosh
> use hostel-share
> show collections
# Expected: users, items, borrows
```

---

## 🚀 Connection Lifecycle

### 1. Server Startup
```
┌─────────────────────────────┐
│ server.js starts            │
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│ startServer() runs          │
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│ connectDB() awaited         │
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│ mongoose.connect() called   │
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│ Connection to MongoDB       │
│ ✅ Success / ❌ Error       │
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│ If Success: app.listen()    │
│ Port 5000 is listening      │
└─────────────────────────────┘
```

### 2. Request/Response Flow
```
Client Request
     │
     ▼
Express Middleware
     │
     ▼
authMiddleware (verify JWT)
     │
     ▼
Route Handler (Controller)
     │
     ▼
MongoDB Query (Mongoose)
     │
     ▼
Database Operation
     │
     ▼
Response to Client
```

---

## 🔧 Common Connection Tasks

### Restart MongoDB Service
```bash
# Stop service
Stop-Service MongoDB

# Start service
Start-Service MongoDB

# Check status
Get-Service MongoDB
```

### Connect to MongoDB Shell
```bash
# Start shell
mongosh

# Commands:
show databases           # List databases
use hostel-share       # Select database
show collections       # List collections
db.users.find()        # View documents
db.users.countDocuments()  # Count documents
```

### View Connection Logs
```bash
# Terminal where backend is running - look for:
✅ MongoDB Connected Successfully
   Host: localhost
   Database: hostel-share
   Connection State: CONNECTED
```

### Test Token Authentication Flow
```bash
# 1. Register User
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Test@1234"
  }'

# 2. Login (get token)
RESPONSE=$(curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@1234"
  }')

TOKEN=$(echo $RESPONSE | jq -r '.token')

# 3. Use token for protected route
curl http://localhost:5000/api/items \
  -H "Authorization: Bearer $TOKEN"
```

---

## 📊 Database Monitoring

### Check Connection Pool
```bash
mongosh
> db.adminCommand({ connectionStatus: 1 })
```

### View Slow Queries
```bash
mongosh
> db.setProfilingLevel(1)  # Enable profiling
> db.system.profile.find().limit(5).pretty()
```

### Database Statistics
```bash
mongosh
> use hostel-share
> db.stats()
```

### Collection Size
```bash
mongosh
> use hostel-share
> db.users.stats()
> db.items.stats()
> db.borrows.stats()
```

---

## ⚠️ Troubleshooting Connection

### Issue: "ECONNREFUSED"

```bash
# MongoDB not running
# Solution:
Start-Service MongoDB

# Or verify with:
mongosh  # Should connect without error
```

### Issue: "Timeout connecting to server"

```bash
# Check if MongoDB is listening on port 27017
netstat -ano | findstr :27017

# If not, restart MongoDB
Stop-Service MongoDB
Start-Service MongoDB
```

### Issue: "MongooseError: Cannot connect"

```bash
# Check .env file
cat backend/.env | grep MONGODB_URI

# Ensure it matches:
MONGODB_URI=mongodb://localhost:27017/hostel-share

# Test connection directly
mongosh "mongodb://localhost:27017/hostel-share"
```

### Issue: "Connection Dropped After X Mins"

```javascript
// Already handled in config/db.js with:
retryWrites: true,      // Automatic retry
maxPoolSize: 10,        // Better connection management
minPoolSize: 5,         // Keep connections alive
serverSelectionTimeoutMS: 5000,
socketTimeoutMS: 45000,
```

### Issue: "MongoAuthenticationError"

```bash
# For local development (no auth):
MONGODB_URI=mongodb://localhost:27017/hostel-share

# For MongoDB Atlas with auth:
MONGODB_URI=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/hostel-share?retryWrites=true&w=majority

# Ensure password is URL-encoded if it has special characters:
# @ → %40
# ! → %21
# # → %23
```

---

## 🌍 Migration to MongoDB Atlas

When ready for production:

### 1. Create Atlas Account
- Visit: https://www.mongodb.com/cloud/atlas
- Create free tier cluster
- Create database user
- Whitelist IP addresses

### 2. Get Connection String
```
mongodb+srv://grabgrid_user:PASSWORD@cluster-name.xxxxx.mongodb.net/hostel-share?retryWrites=true&w=majority
```

### 3. Update .env
```env
# Local (development)
MONGODB_URI=mongodb://localhost:27017/hostel-share

# Atlas (production)
MONGODB_URI=mongodb+srv://grabgrid_user:YOUR_PASSWORD@cluster-name.xxxxx.mongodb.net/hostel-share?retryWrites=true&w=majority
```

### 4. Test Connection
```bash
# Verify new connection works
npm run dev  # Start backend
curl http://localhost:5000/api/health
# Should show: "mongodb": "Connected"
```

---

## 📝 Environment Variables

### Minimal Configuration
```env
MONGODB_URI=mongodb://localhost:27017/hostel-share
```

### Full Configuration
```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/hostel-share

# Authentication
JWT_SECRET=your_super_secret_key_change_in_production
JWT_EXPIRE=7d

# Frontend
FRONTEND_URL=http://localhost:3000
```

### Production Configuration
```env
PORT=5000
NODE_ENV=production

# MongoDB Atlas
MONGODB_URI=mongodb+srv://user:password@cluster.xxxxx.mongodb.net/hostel-share?retryWrites=true&w=majority

# Secure JWT Secret (generate one)
JWT_SECRET=generate-long-random-string-here-use-crypto

# URLs
FRONTEND_URL=https://grabgrid.vercel.app
```

---

## 🔐 Security Checklist

- ✅ Never commit `.env` file (use `.env.example`)
- ✅ Change `JWT_SECRET` in production
- ✅ Use MongoDB Atlas with IP whitelisting for production
- ✅ Enable HTTPS for all connections
- ✅ Keep Node.js packages updated: `npm audit fix`
- ✅ Use strong database passwords
- ✅ Implement rate limiting for API
- ✅ Validate all user inputs

---

## 📞 Quick Support

| Problem | Solution |
|---------|----------|
| MongoDB won't start | `Start-Service MongoDB` |
| Port 5000 in use | Kill process or use different port |
| Connection timeout | Check MongoDB is running |
| Auth errors | Verify .env MONGODB_URI |
| Database not found | Mongoose auto-creates collections |
| No data visible | Check you're in correct database with `use hostel-share` |

---

## 🎓 Connection Best Practices

1. **Always await connectDB()** before starting server
2. **Use connection pooling** for better performance
3. **Monitor slow queries** in production
4. **Enable auto-reconnection** for reliability
5. **Use separate databases** for dev/prod
6. **Keep connection strings in .env** (never hardcode)
7. **Test connection** before deploying
8. **Log connection events** for debugging
9. **Set appropriate timeouts** for your use case
10. **Backup data regularly** in production

---

**Last Updated:** January 2024
**Current Status:** ✅ Connection Verified & Working
