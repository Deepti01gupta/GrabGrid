# 🚀 GrabGrid - Production Deployment Guide

Complete guide to deploy the Hostel Resource Sharing Platform to production using Render (Backend) and Vercel (Frontend).

---

## 📋 Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Backend Deployment on Render](#backend-deployment-on-render)
3. [Frontend Deployment on Vercel](#frontend-deployment-on-vercel)
4. [Database Setup (MongoDB Atlas)](#database-setup-mongodb-atlas)
5. [Environment Variables](#environment-variables)
6. [Post-Deployment Testing](#post-deployment-testing)
7. [Monitoring & Maintenance](#monitoring--maintenance)
8. [Troubleshooting](#troubleshooting)

---

## ✅ Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All code is committed to Git
- [ ] No sensitive data in code (use .env files)
- [ ] All environment variables documented
- [ ] Application tested locally
- [ ] All tests passing
- [ ] No console errors or warnings
- [ ] Database indexes optimized
- [ ] Error handling complete
- [ ] CORS configured correctly
- [ ] JWT secret is strong and secure
- [ ] MongoDB Atlas cluster created
- [ ] GitHub repository is public
- [ ] .gitignore includes node_modules, .env

---

## 🔧 Backend Deployment on Render

### Step 1: Prepare Repository

```bash
# Ensure all changes are committed
git status

# Add and commit changes
git add .
git commit -m "Production ready: GrabGrid deployment"

# Push to GitHub
git push origin main
```

### Step 2: Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create new repository: `grabgrid`
3. Initialize with README
4. Clone and push your code:

```bash
# If not already on GitHub
git remote add origin https://github.com/YOUR_USERNAME/grabgrid.git
git branch -M main
git push -u origin main
```

### Step 3: Set Up MongoDB Atlas

Follow the [Database Setup section](#database-setup-mongodb-atlas) below.

### Step 4: Create Render Account

1. Go to [Render.com](https://render.com/)
2. Sign up with GitHub account
3. Authorize Render to access your repositories

### Step 5: Deploy Backend on Render

1. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Select your GitHub repository: `grabgrid`
   - Choose branch: `main`

2. **Configure Settings**
   - **Name**: `grabgrid-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or Paid if needed)

3. **Add Environment Variables**
   Click "Environment" tab and add:
   ```
   PORT=5000
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@your-cluster.mongodb.net/grabgrid
   JWT_SECRET=use_a_very_strong_secret_key_here_min_32_chars
   JWT_EXPIRE=7d
   CORS_ORIGIN=https://yourdomain.vercel.app
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (2-5 minutes)
   - Note the deployed URL: `https://grabgrid-api.onrender.com`

### Step 6: Verify Backend Deployment

```bash
# Check health endpoint
curl https://grabgrid-api.onrender.com/api/health

# Expected response:
# {"message":"Server is running"}
```

---

## ⚛️ Frontend Deployment on Vercel

### Step 1: Install Vercel CLI (Optional)

```bash
npm install -g vercel
```

### Step 2: Create Vercel Account

1. Go to [Vercel.com](https://vercel.com/)
2. Sign up with GitHub account
3. Authorize Vercel

### Step 3: Deploy Frontend

#### Option A: Using Vercel Dashboard (Recommended)

1. **Import Project**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New..." → "Project"
   - Import your GitHub repository

2. **Configure Project**
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

3. **Add Environment Variables**
   Click "Environment Variables" and add:
   ```
   REACT_APP_API_URL=https://grabgrid-api.onrender.com/api
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment (1-3 minutes)
   - Note the URL: `https://grabgrid.vercel.app`

#### Option B: Using Vercel CLI

```bash
# Navigate to frontend
cd frontend

# Login to Vercel
vercel login

# Deploy
vercel --prod

# Follow prompts and set environment variables
```

### Step 4: Verify Frontend Deployment

1. Visit: `https://grabgrid.vercel.app`
2. Verify all pages load
3. Check browser console for errors
4. Test login functionality

---

## 🗄️ Database Setup (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Try Free"
3. Sign up with email or Google

### Step 2: Create Cluster

1. **Create Project**
   - Project Name: `GrabGrid`
   - Click "Create Project"

2. **Build Cluster**
   - Choose Free tier
   - Cloud Provider: AWS
   - Region: Select closest to your users
   - Cluster Name: `grabgrid`
   - Click "Create Deployment"

### Step 3: Configure Security

1. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `grabgrid_user`
   - Password: Generate secure password (save it!)
   - Database Permissions: "Read and write to any database"
   - Click "Add User"

2. **Add IP Whitelist**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for Render)
   - IP Address: `0.0.0.0/0`
   - Click "Confirm"

### Step 4: Get Connection String

1. Click "Databases" → "Connect"
2. Choose "Connect your application"
3. Copy connection string:
   ```
   mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@your-cluster.mongodb.net/grabgrid
   ```
4. Replace `PASSWORD` with your database password
5. Replace `/grabgrid` with your database name

### Step 5: Verify Connection

```bash
# In your local backend .env
MONGODB_URI=mongodb+srv://grabgrid_user:password@cluster.mongodb.net/grabgrid

# Start server and check logs
npm run dev

# Should see: "MongoDB Connected: cluster.mongodb.net"
```

---

## 🔐 Environment Variables

### Backend Environment Variables

**Production (.env)**
```env
# Server
PORT=5000
NODE_ENV=production

# Database - MongoDB Atlas
# Replace with your actual credentials from MongoDB Atlas dashboard
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@your-cluster.mongodb.net/grabgrid

# JWT - Generate using node:
# require('crypto').randomBytes(32).toString('hex')
JWT_SECRET=your_generated_secure_key_here_minimum_32_characters
JWT_EXPIRE=7d

# CORS - Allow frontend domain
CORS_ORIGIN=https://grabgrid.vercel.app
```

**How to Generate JWT Secret:**
```bash
# Open Node.js REPL
node

# Run this command:
require('crypto').randomBytes(32).toString('hex')

# Copy the output and use as JWT_SECRET
```

### Frontend Environment Variables

**Production (.env)**
```env
# API URL - Your deployed backend
REACT_APP_API_URL=https://grabgrid-api.onrender.com/api
```

---

## 🧪 Post-Deployment Testing

### Test Backend API

```bash
# 1. Health Check
curl https://grabgrid-api.onrender.com/api/health

# 2. Register User
curl -X POST https://grabgrid-api.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "TestPassword123",
    "hostelBlock": "A",
    "roomNumber": "101",
    "phoneNumber": "9876543210"
  }'

# 3. Login
curl -X POST https://grabgrid-api.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123"
  }'

# 4. Get Items (use token from login)
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://grabgrid-api.onrender.com/api/items
```

### Test Frontend Application

1. **Visit Application**: `https://grabgrid.vercel.app`
2. **Test Registration**:
   - Fill registration form
   - Submit
   - Should redirect to login

3. **Test Login**:
   - Use your registered credentials
   - Should redirect to dashboard
   - Verify user data displays

4. **Test Core Features**:
   - Add Item
   - View Items
   - Request Borrow
   - Check requests on dashboard

5. **Check Browser Console**:
   - Press F12 to open DevTools
   - Check Console tab
   - Should be no errors (some warnings are OK)

### Test API Integration

1. Open browser DevTools (F12)
2. Go to Network tab
3. Navigate app
4. Verify:
   - API calls return correct status codes (200, 201, 401)
   - Token is sent in Authorization header
   - No CORS errors

---

## 📊 Monitoring & Maintenance

### Monitor Backend (Render)

1. **View Logs**
   - Go to Render Dashboard
   - Select `grabgrid-api`
   - Click "Logs"
   - Monitor real-time logs

2. **Health Checks**
   ```bash
   # Set up automated health checks
   curl https://grabgrid-api.onrender.com/api/health
   ```

3. **Error Tracking**
   - Review logs regularly
   - Watch for 5xx errors
   - Monitor database connection issues

### Monitor Frontend (Vercel)

1. **View Analytics**
   - Go to Vercel Dashboard
   - Select `grabgrid` project
   - View Analytics tab

2. **Error Monitoring**
   - Check "Deployments" tab
   - View build logs
   - Monitor runtime errors

### Database Monitoring (MongoDB Atlas)

1. **Go to MongoDB Atlas Dashboard**
   - Click your cluster
   - View Metrics tab
   - Monitor:
     - CPU usage
     - Memory usage
     - Network I/O
     - Connections

2. **Backup**
   - Go to Backup tab
   - Enable automatic backups
   - Set backup frequency (daily recommended)

### Set Up Alerts

```bash
# Email alerts for errors
# Configure in Render and Vercel dashboards
```

---

## 🔄 Continuous Deployment

### Automatic Deployment on Push

Both Render and Vercel support automatic deployments:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Your message"
   git push origin main
   ```

2. **Automatic Deployment**
   - Render automatically rebuilds and deploys backend
   - Vercel automatically rebuilds and deploys frontend

3. **Check Status**
   - Render Dashboard: See build status
   - Vercel Dashboard: See deployment status

### Manual Trigger

**Render**: Go to Dashboard → Select Service → Click "Deploy"
**Vercel**: Go to Dashboard → Select Project → Click "Redeploy"

---

## 🔐 Security Best Practices

### Secrets Management

```bash
# ✅ DO: Use environment variables
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@your-cluster.mongodb.net/database-name

# ❌ DON'T: Hardcode secrets
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/database-name";
```

### CORS Configuration

```javascript
// ✅ Production: Allow only your frontend
CORS_ORIGIN=https://grabgrid.vercel.app

// ❌ Development: Never use '*' in production
CORS_ORIGIN=*
```

### JWT Secret

```bash
# ✅ Use strong random key (minimum 32 characters)
# Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=your_generated_32_character_secret_key_here

# ❌ Don't use simple passwords
# NEVER use weak secrets like 'password123'. Generate a strong key instead.
JWT_SECRET=your_generated_32_character_secret_key_here
```

### Database Access

```bash
# ✅ Use IP Whitelist
Allow: 0.0.0.0/0 (restrictive enough for serverless)

# ✅ Use Strong User Passwords
# ❌ Don't use admin credentials for API
```

---

## 🐛 Troubleshooting

### Render Deployment Issues

**Build Failed**
- Check build logs in Render Dashboard
- Ensure backend/package.json has correct scripts
- Verify `npm install` completes successfully

```bash
# Test build locally
npm install
npm run build  # if applicable
npm start
```

**Application Not Starting**
- Check environment variables are set correctly
- Verify MongoDB connection string
- Check port is 5000

**Cold Starts**
- Free tier Render may have cold starts (normal)
- Use paid tier for zero cold starts

### Vercel Deployment Issues

**Build Failed**
```bash
# Test build locally
cd frontend
npm install
npm run build
```

**API Connection Errors**
- Verify `REACT_APP_API_URL` matches backend URL
- Ensure backend is deployed first
- Check CORS configuration in backend

**Page Not Found**
- Configure Vercel for React Router:
  - Go to Project Settings → Build & Development Settings
  - Set Build Command: `npm run build`
  - Vercel auto-detects Next.js/React

### CORS Errors

```
Access to XMLHttpRequest at 'https://grabgrid-api.onrender.com' 
blocked by CORS policy
```

**Solution:**
1. Check backend `.env`:
   ```
   CORS_ORIGIN=https://grabgrid.vercel.app
   ```

2. Restart backend on Render

3. Test from browser:
   ```javascript
   fetch('https://grabgrid-api.onrender.com/api/health')
     .then(r => r.json())
     .then(d => console.log(d))
   ```

### MongoDB Connection Issues

**Authentication Failed**
```
Error: authentication failed
```
- Verify username and password in connection string
- Check user exists in MongoDB Atlas
- Verify IP whitelist includes your server's IP

**Connection Timeout**
```
Error: connect ETIMEDOUT
```
- Check MongoDB Atlas cluster is running
- Verify network access is allowed (0.0.0.0/0)
- Check internet connection

### Token/Authorization Issues

**401 Unauthorized**
- Token missing or expired
- Clear localStorage and login again
- Check JWT_SECRET matches between requests

**Token Not Sent**
- Verify Axios interceptor adds Authorization header
- Check browser DevTools Network tab
- Ensure token is stored in localStorage

---

## 📈 Performance Optimization

### Backend

```javascript
// 1. Add database indexes
// In schemas, mark frequently queried fields:
email: { type: String, index: true, unique: true }

// 2. Limit result sets
const items = await Item.find().limit(20);

// 3. Use pagination
const page = parseInt(req.query.page) || 1;
const limit = 20;
const skip = (page - 1) * limit;
const items = await Item.find().skip(skip).limit(limit);
```

### Frontend

```javascript
// 1. Lazy loading
const Items = React.lazy(() => import('./pages/Items'));

// 2. Code splitting
// Already done with React Router

// 3. Image optimization
// Use smaller images, compress before upload

// 4. Remove unused dependencies
npm prune
```

---

## 🚀 Scaling for Production

### When to Upgrade

- **Free Tier Render**: ~10,000 requests/day
- **Paid Tier**: Handles more traffic, better performance

### Upgrade Steps

1. **Render Backend**
   - Go to Service settings
   - Change plan to "Standard" or higher
   - Handles load balancing automatically

2. **Vercel Frontend**
   - Usually sufficient on free tier
   - Upgrade if needed for more bandwidth

3. **MongoDB Atlas**
   - Free tier: 512MB storage
   - Upgrade when storage reaches 80%

---

## 📞 Quick Reference

### Deployed URLs

```
Backend API: https://grabgrid-api.onrender.com
Frontend App: https://grabgrid.vercel.app
API Base: https://grabgrid-api.onrender.com/api
```

### Important Commands

```bash
# Monitor backend logs
curl https://grabgrid-api.onrender.com/api/health

# Clear frontend cache
npm run build

# Test API endpoint
curl https://grabgrid-api.onrender.com/api/items

# Generate new JWT secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Support Resources

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com

---

## ✅ Deployment Checklist

- [ ] All code pushed to GitHub
- [ ] Backend deployed on Render
- [ ] Frontend deployed on Vercel
- [ ] MongoDB Atlas cluster created
- [ ] Environment variables configured
- [ ] Health check passing
- [ ] User registration working
- [ ] Login functionality working
- [ ] Items can be added
- [ ] Borrow requests working
- [ ] API tokens being sent correctly
- [ ] CORS errors resolved
- [ ] Database connections stable
- [ ] No console errors in browser
- [ ] Application fully functional

---

## 🎉 Congratulations!

Your GrabGrid application is now live in production! 

**Share your application:**
- Send frontend URL to friends: `https://grabgrid.vercel.app`
- API is accessible at: `https://grabgrid-api.onrender.com/api`

**Next Steps:**
1. Monitor logs regularly
2. Collect user feedback
3. Add new features
4. Scale as needed

---

**For support or questions, refer to the SETUP.md file or documentation links above.**
