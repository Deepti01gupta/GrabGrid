# 🚀 GrabGrid - Quick Start Guide

Get the Hostel Resource Sharing Platform running in 5 minutes!

---

## ⚡ Ultra-Quick Start (5 minutes)

### Prerequisites
- Node.js installed: Check with `node --version`
- MongoDB running locally or Atlas account created

### Step 1: Navigate to Backend
```bash
cd backend
```

### Step 2: Start Backend Server
```bash
npm run dev
```

You should see:
```
✓ Server running on port 5000
✓ MongoDB Connected
```

### Step 3: Open New Terminal - Navigate to Frontend
```bash
cd frontend
```

### Step 4: Start Frontend
```bash
npm start
```

Browser opens at `http://localhost:3000`

---

## ✅ Verify It's Working

1. **Backend Health Check**: Visit `http://localhost:5000/api/health`
   - Should show: `{"message":"Server is running"}`

2. **Register**: Click "Register" on frontend
   - Create test account

3. **Login**: Use registered credentials
   - Should see Dashboard

4. **Add Item**: Add a test item
   - Item should appear in Items list

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Windows - Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

### MongoDB Connection Error
```
Error: connect ECONNREFUSED
```
**Solution**: Ensure MongoDB is running
```bash
# Start MongoDB (if installed locally)
mongod
```

### Missing Dependencies
```bash
# Reinstall all dependencies
cd backend
rm -rf node_modules
npm install

cd ../frontend
rm -rf node_modules
npm install
```

### Clear Cache & Restart
```bash
# Frontend
cd frontend
rm -rf node_modules .cache
npm install
npm start

# Backend
cd backend
npm run dev
```

---

## 📚 Full Documentation

- **Setup Guide**: See [SETUP.md](SETUP.md)
- **Architecture**: See [ARCHITECTURE.md](ARCHITECTURE.md)
- **Deployment**: See [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 🎯 What to Test Next

1. **Register new account**
2. **Add items**
3. **Browse items**
4. **Request to borrow**
5. **Approve/reject requests**
6. **Return items**

---

## 💡 Pro Tips

- **Dark Mode**: Toggle button in Navbar
- **Search**: Filter items by category, block, condition
- **Dashboard**: Track your items and requests
- **My Requests**: Manage borrow requests as owner/borrower

---

**Happy coding! 🎉**
