# 🚀 GrabGrid - Hostel Resource Sharing Platform Setup Guide

A complete production-ready MERN stack application for hostel students to share resources and manage lending/borrowing.

---

## 📋 Table of Contents
1. [Quick Start](#quick-start)
2. [Prerequisites](#prerequisites)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [Database Setup](#database-setup)
6. [Environment Variables](#environment-variables)
7. [Running the Application](#running-the-application)
8. [Project Architecture](#project-architecture)
9. [API Documentation](#api-documentation)
10. [Business Logic Rules](#business-logic-rules)

---

## 🎯 Quick Start

### For Experienced Developers
```bash
# Backend setup
cd backend
npm install
# Create/update .env file (see Environment Variables section)
npm run dev

# Frontend setup (new terminal)
cd frontend
npm install
npm start
```

The application will be available at `http://localhost:3000`

---

## 📋 Prerequisites

### Required Software
- **Node.js**: v14.0.0 or higher ([Download](https://nodejs.org/))
- **npm**: v6.0.0 or higher (comes with Node.js)
- **MongoDB**: Local or Cloud instance
  - **Local MongoDB**: [Installation Guide](https://docs.mongodb.com/manual/installation/)
  - **MongoDB Atlas**: [Cloud Database Setup](https://www.mongodb.com/cloud/atlas)
- **Git**: v2.25.0 or higher ([Download](https://git-scm.com/))

### System Requirements
- 2GB RAM minimum
- 500MB free disk space
- Windows, macOS, or Linux

### Verify Installation
```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check MongoDB (if local)
mongod --version
```

---

## 🔧 Backend Setup

### Step 1: Navigate to Backend Directory
```bash
cd backend
```

### Step 2: Install Dependencies
```bash
npm install
```

**Expected packages to install:**
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication
- `dotenv` - Environment variables
- `cors` - Cross-origin requests
- `axios` - HTTP client
- `nodemon` - Auto-reload during development

### Step 3: Create Environment File

Create a `.env` file in the `backend` directory:

```bash
# On Windows
copy NUL .env

# On macOS/Linux
touch .env
```

### Step 4: Add Environment Variables

Open `.env` and add the following:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/grabgrid
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/grabgrid

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
JWT_EXPIRE=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

### Step 5: Verify Backend Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── authController.js     # Authentication logic
│   ├── itemController.js     # Item management
│   └── borrowController.js   # Borrow requests
├── middleware/
│   ├── authMiddleware.js     # JWT verification
│   └── errorMiddleware.js    # Error handling
├── models/
│   ├── User.js               # User schema
│   ├── Item.js               # Item schema
│   └── Borrow.js             # Borrow transaction schema
├── routes/
│   ├── authRoutes.js         # Auth endpoints
│   ├── itemRoutes.js         # Item endpoints
│   └── borrowRoutes.js       # Borrow endpoints
├── utils/
│   └── generateToken.js      # JWT token generator
├── .env                      # Environment variables
├── server.js                 # Server entry point
└── package.json
```

---

## ⚛️ Frontend Setup

### Step 1: Navigate to Frontend Directory
```bash
cd frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

**Expected packages to install:**
- `react` - UI library
- `react-dom` - React DOM renderer
- `react-router-dom` - Client-side routing
- `axios` - HTTP client
- `react-scripts` - Create React App scripts
- `tailwindcss` - CSS framework
- `postcss` - CSS processor
- `autoprefixer` - CSS vendor prefixes

### Step 3: Create Environment File

Create a `.env` file in the `frontend` directory:

```bash
# On Windows
copy NUL .env

# On macOS/Linux
touch .env
```

### Step 4: Add Environment Variables

Open `.env` and add:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api

# Browser configuration
BROWSER=none
PORT=3000
```

### Step 5: Verify Frontend Structure

```
frontend/
├── public/
│   └── index.html            # HTML template
├── src/
│   ├── api/
│   │   └── axios.js          # Axios instance with interceptors
│   ├── components/
│   │   ├── Navbar.jsx        # Navigation bar
│   │   ├── ItemCard.jsx      # Item card component
│   │   ├── ProtectedRoute.jsx # Route protection
│   │   └── Loader.jsx        # Loading spinner
│   ├── context/
│   │   ├── AuthContext.js    # Authentication context
│   │   └── ThemeContext.js   # Dark mode context
│   ├── hooks/
│   │   └── useAuth.js        # Custom auth hook
│   ├── pages/
│   │   ├── Login.jsx         # Login page
│   │   ├── Register.jsx      # Registration page
│   │   ├── Dashboard.jsx     # User dashboard
│   │   ├── Items.jsx         # Browse items
│   │   ├── AddItem.jsx       # Add new item
│   │   └── MyRequests.jsx    # Manage requests
│   ├── styles/               # CSS files
│   ├── App.js                # Main app component
│   ├── index.js              # React entry point
│   └── index.css             # Global styles
├── .env                      # Environment variables
├── package.json
├── tailwind.config.js        # Tailwind configuration
└── postcss.config.js         # PostCSS configuration
```

---

## 🗄️ Database Setup

### Option 1: Local MongoDB

#### Windows
1. Download [MongoDB Community Edition](https://www.mongodb.com/try/download/community)
2. Run the installer and follow the setup wizard
3. MongoDB will be installed as a Windows service
4. Start MongoDB from Services or command line:
   ```bash
   mongod
   ```
5. Verify connection:
   ```bash
   mongo  # or mongosh
   ```

#### macOS
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Verify connection
mongosh
```

#### Linux (Ubuntu)
```bash
# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb

# Start MongoDB service
sudo systemctl start mongodb
sudo systemctl enable mongodb

# Verify connection
mongosh
```

### Option 2: MongoDB Atlas (Cloud)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Create a database user with username and password
4. Whitelist your IP address
5. Copy connection string
6. Update `.env` in backend:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/grabgrid
   ```

### Verify Database Connection
```bash
# If using local MongoDB, open new terminal
mongosh

# Use the database
use grabgrid

# Check if collections exist
show collections

# Exit
exit
```

---

## 🔐 Environment Variables Reference

### Backend (.env)
```env
# Server
PORT=5000
NODE_ENV=development|production

# Database
MONGODB_URI=mongodb://localhost:27017/grabgrid

# JWT
JWT_SECRET=your_secret_key_min_32_characters
JWT_EXPIRE=7d

# CORS
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)
```env
# API
REACT_APP_API_URL=http://localhost:5000/api

# React
BROWSER=none
PORT=3000
```

### Production Environment Variables

**Backend (.env.production)**
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/grabgrid
JWT_SECRET=use_a_strong_random_key_at_least_32_characters
JWT_EXPIRE=7d
CORS_ORIGIN=https://yourdomain.com
```

**Frontend (.env.production)**
```env
REACT_APP_API_URL=https://api.yourdomain.com/api
```

---

## ▶️ Running the Application

### Development Mode

#### Terminal 1 - Start Backend Server
```bash
cd backend
npm run dev
```

Output should show:
```
Server running on port 5000
MongoDB Connected: localhost
```

#### Terminal 2 - Start Frontend Server
```bash
cd frontend
npm start
```

Output should show:
```
Compiled successfully!
You can now view hostel-share-frontend in the browser.
Local: http://localhost:3000
```

### Accessing the Application

1. **Frontend**: Open browser and go to `http://localhost:3000`
2. **Backend Health Check**: `http://localhost:5000/api/health`
3. **MongoDB**: Check collections using `mongosh`

### Testing the Flow

1. **Register**: Create new account at `/register`
2. **Login**: Sign in with credentials at `/login`
3. **Add Item**: Go to dashboard and add items
4. **Browse Items**: View available items on `/items`
5. **Request Borrow**: Click on item and request to borrow
6. **Approve/Reject**: Check requests on dashboard
7. **Return Item**: Return borrowed items on `/my-requests`

---

## 🏗️ Project Architecture

### Technology Stack

**Frontend:**
- React 18.2.0 - UI library
- React Router 6.8.0 - Client-side routing
- Axios 1.3.0 - HTTP client
- Context API - State management
- Tailwind CSS 3.4.19 - Styling

**Backend:**
- Node.js & Express 4.18.2 - Server framework
- MongoDB 7.0.0 - Database
- Mongoose 7.0.0 - ODM
- JWT - Authentication
- bcryptjs - Password hashing

### Folder Structure Explanation

**Backend MVC Pattern:**
- **Models**: Define database schemas (User, Item, Borrow)
- **Controllers**: Handle business logic for each resource
- **Routes**: Define API endpoints and map to controllers
- **Middleware**: Authentication, error handling, CORS
- **Utils**: Helper functions like JWT generation

**Frontend Component-Based:**
- **Pages**: Complete page components
- **Components**: Reusable UI components
- **Context**: Global state management
- **Hooks**: Custom React hooks
- **API**: HTTP client setup and interceptors
- **Styles**: Component and global CSS

---

## 📡 API Documentation

### Base URL
- **Development**: `http://localhost:5000/api`
- **Production**: `https://api.yourdomain.com/api`

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "hostelBlock": "A",
  "roomNumber": "101",
  "phoneNumber": "9876543210"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Item Endpoints

#### Add Item
```http
POST /items
Authorization: Bearer {token}
Content-Type: application/json

{
  "itemName": "Data Structures Book",
  "category": "Book",
  "condition": "Good",
  "description": "CLRS algorithms book",
  "hostelBlock": "A",
  "roomNumber": "101",
  "securityDeposit": 500,
  "borrowDuration": 14,
  "availableFrom": "2024-01-01",
  "availableUntil": "2024-12-31"
}
```

#### Get All Items
```http
GET /items
```

#### Get Item by ID
```http
GET /items/:id
```

#### Get My Items
```http
GET /items/my-items
Authorization: Bearer {token}
```

#### Update Item
```http
PUT /items/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "itemName": "Updated Name",
  "condition": "Used"
}
```

#### Delete Item
```http
DELETE /items/:id
Authorization: Bearer {token}
```

#### Search Items
```http
GET /items/search?category=Book&condition=Good&hostelBlock=A
```

### Borrow Endpoints

#### Request to Borrow
```http
POST /borrow/request
Authorization: Bearer {token}
Content-Type: application/json

{
  "itemId": "507f1f77bcf86cd799439011"
}
```

#### Approve Request
```http
POST /borrow/approve
Authorization: Bearer {token}
Content-Type: application/json

{
  "borrowId": "507f1f77bcf86cd799439012"
}
```

#### Reject Request
```http
POST /borrow/reject
Authorization: Bearer {token}
Content-Type: application/json

{
  "borrowId": "507f1f77bcf86cd799439012"
}
```

#### Return Item
```http
POST /borrow/return
Authorization: Bearer {token}
Content-Type: application/json

{
  "borrowId": "507f1f77bcf86cd799439012",
  "conditionOnReturn": "Good"
}
```

#### Get My Requests
```http
GET /borrow/my-requests
Authorization: Bearer {token}
```

#### Get My Borrows
```http
GET /borrow/my-borrows
Authorization: Bearer {token}
```

---

## 📋 Business Logic Rules

### User Rules
1. ✅ User cannot borrow their own item
2. ✅ Email must be unique during registration
3. ✅ Password must be at least 6 characters
4. ✅ JWT token expires after 7 days

### Item Rules
1. ✅ Item cannot be requested if status is not "Available"
2. ✅ Only owner can update/delete their items
3. ✅ Status transitions: Available → Requested → Borrowed → Available

### Borrow Rules
1. ✅ Only owner can approve/reject requests
2. ✅ Only borrower can return item
3. ✅ Duplicate requests are prevented
4. ✅ Late fees calculated: ₹10 per day (automatic)
5. ✅ Conditional return required (New/Good/Used/Damaged)

### Security Rules
1. ✅ All protected routes require JWT token
2. ✅ Passwords hashed with bcryptjs (salt rounds: 10)
3. ✅ Token verified on every protected request
4. ✅ Invalid/expired tokens return 401 Unauthorized
5. ✅ CORS enabled only for frontend domain

---

## 🧪 Manual Testing

### Testing Authentication
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123","hostelBlock":"A","roomNumber":"101","phoneNumber":"9876543210"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Testing Items
```bash
# Get all items
curl http://localhost:5000/api/items

# Add item (need token from login)
curl -X POST http://localhost:5000/api/items \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"itemName":"Book","category":"Book","condition":"Good","description":"Test","hostelBlock":"A","roomNumber":"101","borrowDuration":7,"availableFrom":"2024-01-01","availableUntil":"2024-12-31"}'
```

---

## ✅ Verification Checklist

Before deploying to production, verify:

- [ ] MongoDB connection working
- [ ] JWT token generation working
- [ ] Login/Register flow complete
- [ ] Add item functionality working
- [ ] Borrow request functionality working
- [ ] All API endpoints tested
- [ ] Error handling working
- [ ] Protected routes blocking unauthorized access
- [ ] Frontend can communicate with backend
- [ ] All environment variables configured
- [ ] No console errors
- [ ] No console warnings related to dependencies

---

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Error**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:**
- Ensure MongoDB is running: `mongod` or `brew services start mongodb-community`
- Check MONGODB_URI in .env file
- Verify MongoDB is installed

**Port Already in Use**
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
```bash
# Kill process on port 5000
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

**JWT Secret Error**
```
Error: JWT secret must be provided
```
**Solution:**
- Add `JWT_SECRET` to .env file
- Must be at least 32 characters long

### Frontend Issues

**React Cannot Find Module**
```
Module not found: Can't resolve 'axios'
```
**Solution:**
```bash
cd frontend
npm install axios
```

**Port 3000 Already in Use**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

**API Connection Error**
- Check `REACT_APP_API_URL` in frontend/.env
- Ensure backend server is running
- Check browser console for CORS errors

### Common Errors

**CORS Error**
```
Access to XMLHttpRequest at 'http://localhost:5000/api' blocked
```
**Solution:**
- Ensure backend has CORS enabled
- Check CORS_ORIGIN in .env matches frontend URL

**Invalid Token**
```
401 Unauthorized - Invalid or expired token
```
**Solution:**
- Clear localStorage and login again
- Check JWT token in Authorization header
- Verify JWT_SECRET matches between requests

---

## 📞 Support & Further Help

- **GitHub Issues**: Report bugs and request features
- **Documentation**: Check README.md for project overview
- **API Tests**: Use Postman or Insomnia for API testing
- **Database**: Use MongoDB Compass for database management

---

## ✨ Next Steps

1. **Follow Setup Instructions** - Complete backend and frontend setup
2. **Test Application** - Register, login, add items, request borrow
3. **Explore Code** - Review controllers, models, routes
4. **Deploy** - Follow DEPLOYMENT.md for production deployment
5. **Customize** - Add features, modify styling, extend functionality

**Happy coding! 🚀**
