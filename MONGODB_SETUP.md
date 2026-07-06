# MongoDB Setup & Configuration Guide

Complete guide for setting up MongoDB for the GrabGrid MERN application. Choose between local MongoDB or cloud-based MongoDB Atlas.

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Local MongoDB Setup](#local-mongodb-setup)
3. [MongoDB Atlas Cloud Setup](#mongodb-atlas-cloud-setup)
4. [Connection Testing](#connection-testing)
5. [Troubleshooting](#troubleshooting)

---

## Quick Start

The fastest way to get started:

```bash
# 1. Backend already has MongoDB connection configured
# 2. For local MongoDB: Just start MongoDB server
# 3. For MongoDB Atlas: Update .env with connection string
# 4. Start backend server
cd backend
npm run dev
```

**Current Configuration in `.env`:**
```
MONGODB_URI=mongodb://localhost:27017/hostel-share
```

---

## Local MongoDB Setup

### Option A: Windows Installation

#### 1. **Download MongoDB Community Server**
   - Visit: https://www.mongodb.com/try/download/community
   - Download MongoDB Community Edition for Windows
   - Choose **msi** installer (recommended)

#### 2. **Install MongoDB**
   - Run the installer
   - Click "Next" through setup wizard
   - Choose "Complete" installation
   - Check "Install MongoDB Compass" (recommended for GUI)
   - Check "Run the MongoDB service as a Windows Service"
   - Complete installation

#### 3. **Verify Installation**
   ```bash
   mongod --version
   ```
   Should show MongoDB version number.

#### 4. **Start MongoDB Service**
   
   **Option 1: Auto-start (recommended)**
   - Already configured if you chose "Windows Service" during install
   - MongoDB starts automatically on Windows boot

   **Option 2: Manual start**
   ```bash
   mongod
   ```
   Service runs on default port `27017`

#### 5. **Verify Connection**
   Open new terminal:
   ```bash
   mongosh
   ```
   Should connect to MongoDB shell showing:
   ```
   test>
   ```

---

### Option B: Using Docker (Advanced)

If you already have Docker installed:

```bash
# Pull and run MongoDB image
docker run -d \
  --name mongodb \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  -p 27017:27017 \
  mongo:latest

# Verify container is running
docker ps | grep mongodb
```

**Update `.env` for Docker:**
```
MONGODB_URI=mongodb://admin:password@localhost:27017/hostel-share?authSource=admin
```

---

### Option C: Mac/Linux Installation

#### Mac (using Homebrew):
```bash
# Install MongoDB
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Verify
mongosh
```

#### Linux (Ubuntu):
```bash
# Import MongoDB key
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start service
sudo systemctl start mongod

# Verify
mongosh
```

---

## MongoDB Atlas Cloud Setup

### Setup MongoDB Atlas Account

#### 1. **Create Account**
   - Visit: https://www.mongodb.com/cloud/atlas
   - Click "Start Free"
   - Sign up with email or Google account
   - Verify email address

#### 2. **Create Organization & Project**
   - Enter Organization name: "GrabGrid"
   - Create Project: "GrabGrid Development"
   - Click "Create Project"

#### 3. **Create Database Cluster**

   **Step 1: Choose Cluster Type**
   - Click "Build a Cluster"
   - Select "Shared" cluster (free tier)
   - Click "Create"

   **Step 2: Configure Cluster**
   - Cloud Provider: AWS
   - Region: Choose closest to you (e.g., `us-east-1`)
   - Cluster Tier: M0 Sandbox (free - 512MB storage)
   - Cluster Name: `grabgrid-dev`
   - Click "Create Cluster"

   Wait 3-5 minutes for cluster to initialize...

#### 4. **Create Database User**
   - In Atlas Dashboard, go to "Database Access"
   - Click "Add New Database User"
   - **Username:** `grabgrid_user`
   - **Password:** Create a strong password
     - Example format: `MyG$reat!Pass123`
     - ⚠️ **SAVE THIS PASSWORD - You'll need it!**
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

#### 5. **Set Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - **Development:** Click "Allow Access from Anywhere" → "0.0.0.0/0"
     - ⚠️ Only for development! Use IP whitelisting for production
   - Click "Confirm"

#### 6. **Get Connection String**
   - Go to "Clusters"
   - Click "Connect" button on your cluster
   - Choose "MongoDB for VS Code" or "Shell"
   - Copy the connection string:
     ```
     mongodb+srv://grabgrid_user:<password>@grabgrid-dev.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - **Replace `<password>` with your actual password**

#### 7. **Update `.env` File**
   ```bash
   # Local MongoDB (for development)
   MONGODB_URI=mongodb://localhost:27017/hostel-share

   # OR MongoDB Atlas (cloud)
   # Replace with your actual MongoDB Atlas connection string from UI
   MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@your-cluster.mongodb.net/hostel-share?retryWrites=true&w=majority
   ```

   **⚠️ IMPORTANT:**
   - Replace `<password>` with actual password
   - Replace `xxxxx` with your cluster subdomain
   - Keep this file **PRIVATE** - never commit to Git!

---

## Connection Testing

### Test Local MongoDB Connection

```bash
# Terminal 1: Start MongoDB service
mongod

# Terminal 2: Test connection
mongosh
```

Expected output:
```
Current Mongosh Log ID: xxxxxxxxxxxxxxxxxxxx
Connecting to:          mongodb://127.0.0.1:27017/?directConnection=true
Using MongoDB:          5.0.0
Using Mongosh:          1.5.4
...
test>
```

### Test Application Connection

```bash
# Terminal 1: Start MongoDB
mongod

# Terminal 2: Start backend server
cd backend
npm run dev
```

Expected output:
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

### Test API Endpoint

```bash
# Test health check endpoint
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "message": "Server is running",
  "timestamp": "2024-01-20T10:30:45.123Z",
  "mongodb": "Connected"
}
```

---

## Connection String Format

### Local MongoDB
```
mongodb://localhost:27017/hostel-share
```

Components:
- `mongodb://` - Protocol
- `localhost:27017` - Host and port
- `/hostel-share` - Database name

### MongoDB Atlas
```
mongodb+srv://username:password@cluster-name.xxxxx.mongodb.net/database-name?retryWrites=true&w=majority
```

Components:
- `mongodb+srv://` - Secure protocol
- `username:password` - Credentials
- `cluster-name.xxxxx` - Cluster address
- `/database-name` - Database name
- `?retryWrites=true&w=majority` - Options for reliability

---

## Environment Variables Configuration

### `.env` File Example
```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB (choose one)
# LOCAL:
MONGODB_URI=mongodb://localhost:27017/hostel-share

# MONGODB ATLAS:
# Replace with your actual MongoDB Atlas connection string
# MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@your-cluster.mongodb.net/hostel-share?retryWrites=true&w=majority

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d

# Frontend
FRONTEND_URL=http://localhost:3000
```

### Create `.env.example` (for Git)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/hostel-share
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

---

## Database Initialization

### Create Initial Collections & Indexes

The application automatically creates collections and indexes through Mongoose schemas. When you start the server for the first time:

1. Mongoose connects to MongoDB
2. Models (User, Item, Borrow) are loaded
3. Collections are automatically created
4. Indexes are automatically built

### Manual Collection Setup (if needed)

```bash
# Connect to MongoDB
mongosh

# Select database
use hostel-share

# View collections
show collections

# View users collection
db.users.find()

# View items collection
db.items.find()

# View borrows collection
db.borrows.find()
```

---

## Production Deployment

### MongoDB Atlas Production Setup

For deploying to production (Render, Railway, etc.):

1. **Create Production Database**
   - Create separate MongoDB Atlas cluster for production
   - Name: `grabgrid-prod`
   - Enable backups: M1+ tier

2. **Create Production User**
   - Different username/password than development
   - Follow same steps as development setup

3. **IP Whitelisting**
   - Don't use "Allow Access from Anywhere"
   - Add your production server's IP address
   - For Render: Get IP from Render dashboard

4. **Update Production Environment**
   - Set `NODE_ENV=production` on production server
   - Update `MONGODB_URI` with production connection string
   - Use secure passwords with special characters

5. **Database Backups**
   - Enable automatic backups in MongoDB Atlas
   - Set backup window during low usage time

---

## Troubleshooting

### Issue: "connect ECONNREFUSED 127.0.0.1:27017"

**Cause:** MongoDB server not running

**Solution:**
```bash
# Windows: Check if MongoDB service is running
Get-Service MongoDB -ErrorAction SilentlyContinue

# Start MongoDB
mongod

# Or use Services app:
# Press Win+R → services.msc → Find MongoDB → Right-click → Start
```

### Issue: "ENOTFOUND mongodb+srv://..."

**Cause:** Invalid MongoDB Atlas connection string

**Solution:**
1. Verify cluster name is correct
2. Check username and password
3. Ensure special characters are URL-encoded:
   - `@` → `%40`
   - `!` → `%21`
   - `#` → `%23`

### Issue: "MongoServerSelectionError: connect ETIMEDOUT"

**Cause:** Network timeout connecting to MongoDB

**Solution:**
```bash
# Local: Check MongoDB is running
mongod

# Atlas: Check these
# 1. Network Access whitelist includes your IP
# 2. VPN/Firewall not blocking port 27017
# 3. Connection string is correct
```

### Issue: "MongoAuthenticationError: auth failed"

**Cause:** Invalid username/password

**Solution:**
1. Double-check username in `.env`
2. Verify password is correct
3. For special chars, ensure they're URL-encoded
4. Reset password in MongoDB Atlas if needed:
   - Go to "Database Access" → Edit User → Change Password

### Issue: "MongoParseError: URI malformed"

**Cause:** Invalid connection string format

**Solution - Examples:**
```bash
# ❌ WRONG
mongodb://username:password@localhost/dbname

# ✅ CORRECT (local)
mongodb://localhost:27017/hostel-share

# ❌ WRONG
mongodb+srv://username:password@cluster.mongodb.net

# ✅ CORRECT (Atlas)
mongodb+srv://username:password@cluster.xxxxx.mongodb.net/hostel-share?retryWrites=true&w=majority
```

### Issue: "Cannot connect - MONGODB_URI not defined"

**Cause:** Environment variable not set

**Solution:**
1. Verify `.env` file exists in `backend/` directory
2. Check `MONGODB_URI=...` is in the file
3. Restart terminal/IDE after creating `.env`
4. Verify syntax:
   ```bash
   # Check if .env file exists
   ls backend/.env
   
   # View file content
   cat backend/.env
   ```

---

## Quick Reference

| Task | Command |
|------|---------|
| Start MongoDB (local) | `mongod` |
| Open MongoDB shell | `mongosh` |
| View all databases | `show databases` |
| Select database | `use hostel-share` |
| View collections | `show collections` |
| View documents | `db.users.find()` |
| Count documents | `db.users.countDocuments()` |
| Drop collection | `db.users.deleteMany({})` |

---

## Next Steps

1. ✅ Choose MongoDB setup (local or Atlas)
2. ✅ Install and configure MongoDB
3. ✅ Update `.env` with connection string
4. ✅ Start backend server
5. ✅ Test health endpoint
6. ✅ Start frontend server
7. ✅ Run application at `http://localhost:3000`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment steps.
