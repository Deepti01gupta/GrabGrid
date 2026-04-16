# GrabGrid - Complete Architecture & Code Documentation

Comprehensive documentation of the MERN stack application architecture, code structure, and implementation details.

---

## 📑 Table of Contents

1. [Project Architecture Overview](#project-architecture-overview)
2. [Tech Stack Details](#tech-stack-details)
3. [Backend Architecture](#backend-architecture)
4. [Frontend Architecture](#frontend-architecture)
5. [Database Design](#database-design)
6. [Authentication Flow](#authentication-flow)
7. [API Endpoints Documentation](#api-endpoints-documentation)
8. [Code Quality & Best Practices](#code-quality--best-practices)
9. [Error Handling Strategy](#error-handling-strategy)
10. [Data Flow Diagrams](#data-flow-diagrams)

---

## 🏗️ Project Architecture Overview

### Microservice-Ready Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client Layer (React)                 │
│  Browser → Pages → Components → Context API → Hooks     │
└─────────────────────────────────────────────────────────┘
                          ↕
                 (HTTP / REST API)
                          ↕
┌─────────────────────────────────────────────────────────┐
│              API Layer (Express.js)                      │
│  Routes → Controllers → Services → Models → Database    │
└─────────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────────┐
│            Data Layer (MongoDB)                          │
│  Collections: Users, Items, Borrows                      │
└─────────────────────────────────────────────────────────┘
```

### Key Design Decisions

1. **MVC Pattern**: Separation of concerns for maintainability
2. **RESTful API**: Standard HTTP methods for CRUD operations
3. **JWT Authentication**: Stateless, scalable authentication
4. **MongoDB**: NoSQL for flexible schema and horizontal scaling
5. **React Context**: Simple state management without Redux overhead

---

## 🛠️ Tech Stack Details

### Frontend Technology Stack

```json
{
  "react": "18.2.0",
  "react-dom": "18.2.0",
  "react-router-dom": "6.8.0",
  "axios": "1.3.0",
  "tailwindcss": "3.4.19",
  "postcss": "8.5.6",
  "autoprefixer": "10.4.24",
  "react-scripts": "5.0.1"
}
```

**Why These Technologies?**
- **React 18**: Latest features, better performance, automatic batching
- **React Router v6**: Modern routing with hooks and better API
- **Axios**: Better error handling and interceptor support vs fetch
- **Tailwind CSS**: Utility-first CSS for rapid development
- **Context API**: No need for Redux complexity for this scale

### Backend Technology Stack

```json
{
  "express": "4.18.2",
  "mongoose": "7.0.0",
  "bcryptjs": "2.4.3",
  "jsonwebtoken": "9.0.0",
  "dotenv": "16.0.3",
  "cors": "2.8.5",
  "nodemon": "2.0.20"
}
```

**Why These Technologies?**
- **Express.js**: Lightweight, unopinionated web framework
- **Mongoose**: Schema validation and easier MongoDB operations
- **bcryptjs**: Industry-standard password hashing
- **JWT**: Stateless authentication for scalability
- **nodemon**: Automatic server reload during development

---

## 🖥️ Backend Architecture

### Directory Structure

```
backend/
├── config/
│   └── db.js                      # MongoDB connection setup
│
├── controllers/
│   ├── authController.js          # Authentication logic
│   │   ├── register()            # User registration
│   │   ├── login()               # User login
│   │   ├── getProfile()          # Fetch user profile
│   │   └── updateProfile()       # Update user profile
│   │
│   ├── itemController.js          # Item management
│   │   ├── addItem()             # Add new item
│   │   ├── getAllItems()         # Get all available items
│   │   ├── getItemById()         # Get single item
│   │   ├── getMyItems()          # Get user's items
│   │   ├── updateItem()          # Update item details
│   │   ├── deleteItem()          # Delete user's item
│   │   └── searchItems()         # Search with filters
│   │
│   └── borrowController.js        # Borrow management
│       ├── requestBorrow()       # Request to borrow
│       ├── approveBorrow()       # Owner approves request
│       ├── rejectBorrow()        # Owner rejects request
│       ├── returnItem()          # Return borrowed item
│       ├── getMyBorrowRequests() # Get pending requests
│       └── getMyBorrows()        # Get borrowed items
│
├── middleware/
│   ├── authMiddleware.js          # JWT verification
│   │   ├── Extract token from headers
│   │   ├── Verify JWT signature
│   │   ├── Attach userId to request
│   │   └── Return 401 if invalid
│   │
│   └── errorMiddleware.js         # Centralized error handling
│       ├── Format error responses
│       ├── Log errors
│       └── Return appropriate status codes
│
├── models/
│   ├── User.js                    # User schema
│   │   ├── name (String, required)
│   │   ├── email (String, unique, required)
│   │   ├── password (String, hashed)
│   │   ├── hostelBlock (String)
│   │   ├── roomNumber (String)
│   │   ├── phoneNumber (String)
│   │   ├── rating (Number, 1-5)
│   │   ├── itemsShared (Number)
│   │   ├── itemsBorrowed (Number)
│   │   ├── isBanned (Boolean)
│   │   └── createdAt (Date)
│   │
│   ├── Item.js                    # Item schema
│   │   ├── itemName (String, required)
│   │   ├── category (String: Book, Lab Kit, Appliance, Sports, Other)
│   │   ├── condition (String: New, Good, Used)
│   │   ├── description (String)
│   │   ├── ownerId (ObjectId → User)
│   │   ├── hostelBlock (String)
│   │   ├── roomNumber (String)
│   │   ├── securityDeposit (Number)
│   │   ├── status (String: Available, Requested, Borrowed, Unavailable)
│   │   ├── borrowDuration (Number, in days)
│   │   ├── availableFrom (Date)
│   │   ├── availableUntil (Date)
│   │   ├── currentBorrower (ObjectId → User)
│   │   ├── borrowStartDate (Date)
│   │   ├── borrowEndDate (Date)
│   │   └── createdAt (Date)
│   │
│   └── Borrow.js                  # Borrow transaction schema
│       ├── itemId (ObjectId → Item)
│       ├── borrowerId (ObjectId → User)
│       ├── ownerId (ObjectId → User)
│       ├── borrowDate (Date)
│       ├── expectedReturnDate (Date)
│       ├── actualReturnDate (Date)
│       ├── status (String: Pending, Approved, Rejected, Active, Returned)
│       ├── daysLate (Number)
│       ├── fine (Number, calculated)
│       ├── conditionOnReturn (String)
│       ├── notes (String)
│       └── createdAt (Date)
│
├── routes/
│   ├── authRoutes.js              # Auth endpoints
│   │   ├── POST /api/auth/register
│   │   ├── POST /api/auth/login
│   │   ├── GET /api/auth/profile (protected)
│   │   └── PUT /api/auth/profile (protected)
│   │
│   ├── itemRoutes.js              # Item endpoints
│   │   ├── GET /api/items
│   │   ├── GET /api/items/:id
│   │   ├── GET /api/items/search
│   │   ├── POST /api/items (protected)
│   │   ├── PUT /api/items/:id (protected)
│   │   ├── DELETE /api/items/:id (protected)
│   │   └── GET /api/items/my-items (protected)
│   │
│   └── borrowRoutes.js            # Borrow endpoints
│       ├── POST /api/borrow/request (protected)
│       ├── POST /api/borrow/approve (protected)
│       ├── POST /api/borrow/reject (protected)
│       ├── POST /api/borrow/return (protected)
│       ├── GET /api/borrow/my-requests (protected)
│       └── GET /api/borrow/my-borrows (protected)
│
├── utils/
│   └── generateToken.js           # JWT token generation
│       └── generateToken(userId)  # Returns signed JWT
│
├── server.js                      # Express app initialization
│   ├── Middleware setup
│   ├── Route registration
│   ├── Error handling
│   └── Server startup
│
├── .env                           # Environment variables
├── .env.example                   # Environment template
├── .gitignore                     # Git ignore rules
└── package.json
```

### Controller Flow Example: Request to Borrow

```
1. API Request (POST /api/borrow/request)
   └── Express Route Handler
       └── 2. authMiddleware (JWT verification)
           └── 3. borrowController.requestBorrow()
               ├── Validate itemId exists
               ├── Check user ≠ item owner (RULE: Can't borrow own item)
               ├── Check item status = "Available" (RULE: Must be available)
               ├── Check no duplicate request (RULE: Prevent duplicates)
               ├── Create Borrow transaction
               ├── Update Item status → "Requested"
               ├── Calculate expectedReturnDate
               └── 4. Response sent to client
                   └── 5. Frontend receives and updates UI
```

### Request/Response Cycle

```javascript
// Example: Add Item
// FRONTEND sends:
{
  method: 'POST',
  url: '/api/items',
  headers: { 'Authorization': 'Bearer token...' },
  body: { itemName, category, condition, ... }
}

// BACKEND processes:
1. authMiddleware extracts and validates JWT
2. itemController.addItem() receives req with userId
3. Validates all required fields
4. Creates Item document in MongoDB
5. Updates User's itemsShared count
6. Sends response with created item

// FRONTEND receives:
{
  success: true,
  message: 'Item added successfully',
  item: { _id, itemName, ... }
}
```

---

## ⚛️ Frontend Architecture

### Directory Structure

```
frontend/
├── src/
│   ├── pages/
│   │   ├── Login.jsx              # Login page
│   │   │   ├── State: formData, error, loading
│   │   │   ├── Hooks: useState, useNavigate
│   │   │   ├── Functions: handleChange, handleSubmit
│   │   │   └── Calls: useAuth().login()
│   │   │
│   │   ├── Register.jsx           # Registration page
│   │   │   ├── Form validation
│   │   │   ├── Password confirm check
│   │   │   └── Role: useAuth().register()
│   │   │
│   │   ├── Dashboard.jsx          # User dashboard
│   │   │   ├── Shows user stats
│   │   │   ├── Recent requests
│   │   │   ├── Borrowed items
│   │   │   └── Quick actions
│   │   │
│   │   ├── Items.jsx              # Browse items
│   │   │   ├── State: items, loading, filters
│   │   │   ├── Functionality:
│   │   │   │  ├── Display all available items
│   │   │   │  ├── Filter by category, condition
│   │   │   │  ├── Search by name, block
│   │   │   │  └── Paginate results
│   │   │   └── Components: ItemCard x n
│   │   │
│   │   ├── AddItem.jsx            # Add new item
│   │   │   ├── Form with validation
│   │   │   ├── Image upload (future)
│   │   │   ├── Date range selection
│   │   │   └── POST /api/items
│   │   │
│   │   └── MyRequests.jsx         # Manage requests
│   │       ├── Two tabs:
│   │       │  ├── Requests I made (as borrower)
│   │       │  └── Requests I received (as owner)
│   │       ├── Actions:
│   │       │  ├── Approve/Reject
│   │       │  └── Return item
│   │       └── Real-time status updates
│   │
│   ├── components/
│   │   ├── Navbar.jsx             # Navigation bar
│   │   │   ├── Links to pages
│   │   │   ├── User profile dropdown
│   │   │   ├── Logout button
│   │   │   └── Dark mode toggle
│   │   │
│   │   ├── ItemCard.jsx           # Reusable item card
│   │   │   ├── Props: item
│   │   │   ├── Displays:
│   │   │   │  ├── Item name, category
│   │   │   │  ├── Owner info
│   │   │   │  ├── Condition, duration
│   │   │   │  └── Action buttons
│   │   │   └── Emits: onBorrow, onViewDetails
│   │   │
│   │   ├── ProtectedRoute.jsx     # Route protection
│   │   │   ├── Checks authentication
│   │   │   ├── Redirects to login if not auth
│   │   │   └── Renders children if authenticated
│   │   │
│   │   └── Loader.jsx             # Loading spinner
│   │       └── Shows while data loading
│   │
│   ├── context/
│   │   ├── AuthContext.js         # Authentication context
│   │   │   ├── State: user, token, loading
│   │   │   ├── Methods:
│   │   │   │  ├── login(email, password)
│   │   │   │  ├── register(userData)
│   │   │   │  ├── logout()
│   │   │   │  └── checkAuth()
│   │   │   └── Storage: localStorage (token, user)
│   │   │
│   │   └── ThemeContext.js        # Dark mode theme
│   │       ├── State: isDark
│   │       ├── Method: toggleTheme()
│   │       └── Storage: localStorage (theme)
│   │
│   ├── hooks/
│   │   └── useAuth.js             # Custom auth hook
│   │       ├── Returns: { user, token, login, logout, ... }
│   │       ├── Validates: AuthContext exists
│   │       └── Simplifies: Component usage
│   │
│   ├── api/
│   │   └── axios.js               # HTTP client setup
│   │       ├── baseURL: API_URL from .env
│   │       ├── Interceptors:
│   │       │  ├── Request: Add Auth header
│   │       │  └── Response: Handle 401 errors
│   │       └── Error handling
│   │
│   ├── styles/                    # CSS files
│   │   ├── index.css              # Global styles
│   │   ├── Navbar.css
│   │   ├── ItemCard.css
│   │   ├── Dashboard.css
│   │   ├── Auth.css
│   │   └── ... (component styles)
│   │
│   ├── App.js                     # Main app component
│   │   ├── Router setup
│   │   ├── Route definitions
│   │   ├── Protected routes
│   │   └── Provider wrappers
│   │
│   ├── index.js                   # React entry point
│   │   └── ReactDOM.createRoot()
│   │
│   └── index.css                  # Global styles
│
├── public/
│   └── index.html                 # HTML template
│
├── .env                           # Environment variables
├── .env.example                   # Template
├── tailwind.config.js             # Tailwind configuration
├── postcss.config.js              # PostCSS configuration
└── package.json
```

### Component Lifecycle Example: Items Page

```
1. Component Mounts
   ├── useState: items=[], loading=true
   ├── useEffect: runs on mount + filter changes
   │
2. useEffect Hook Fires
   ├── setLoading(true)
   ├── Builds query params from filters
   ├── Calls: api.get('/items/search?...')
   │
3. API Response Arrives
   ├── setItems(response.data.items)
   ├── setLoading(false)
   │
4. Render
   ├── If loading: show <Loader />
   ├── If error: show error message
   ├── Else: render <ItemCard /> for each item
   │
5. User Interaction
   ├── Filter changes
   ├── Dependency array triggers useEffect again
   ├── Go to step 2
```

---

## 🗄️ Database Design

### Data Relationships

```
┌─────────────────────┐
│    Users            │
├─────────────────────┤
│ _id (PK)            │
│ name                │
│ email (unique)      │
│ password (hashed)   │
│ hostelBlock         │
│ roomNumber          │
│ phoneNumber         │
│ rating              │
│ itemsShared         │
│ itemsBorrowed       │
│ isBanned            │
│ createdAt           │
└─────────────────────┘
        ↑
        │ (1:Many)
        │
┌─────────────────────┐          ┌─────────────────────┐
│    Items            │←─────────│    Borrows          │
├─────────────────────┤ (1:Many) ├─────────────────────┤
│ _id (PK)            │          │ _id (PK)            │
│ itemName            │          │ itemId (FK)         │
│ category            │          │ borrowerId (FK)     │
│ condition           │          │ ownerId (FK)        │
│ description         │          │ borrowDate          │
│ ownerId (FK) ───────┼──────────│ expectedReturnDate  │
│ hostelBlock         │          │ actualReturnDate    │
│ roomNumber          │          │ status              │
│ securityDeposit     │          │ daysLate            │
│ status              │          │ fine                │
│ borrowDuration      │          │ conditionOnReturn   │
│ availableFrom       │          │ createdAt           │
│ availableUntil      │          └─────────────────────┘
│ currentBorrower ────┼──────────→ (borrower id)
│ borrowStartDate     │
│ borrowEndDate       │
│ createdAt           │
└─────────────────────┘
```

### Index Strategy

```javascript
// User.js - Indexes for quick lookup
db.users.createIndex({ email: 1 })  // Login queries
db.users.createIndex({ hostelBlock: 1 })  // Filtering

// Item.js - Indexes for search/filter
db.items.createIndex({ ownerId: 1 })  // User's items
db.items.createIndex({ status: 1 })  // Available items
db.items.createIndex({ category: 1 })  // Category filter
db.items.createIndex({ hostelBlock: 1 })  // Location filter
db.items.createIndex({ createdAt: -1 })  // Latest items

// Borrow.js - Indexes for request queries
db.borrows.createIndex({ borrowerId: 1 })  // User's borrows
db.borrows.createIndex({ ownerId: 1 })  // User's requests
db.borrows.createIndex({ itemId: 1 })  // Item references
db.borrows.createIndex({ status: 1 })  // Status filtering
```

---

## 🔐 Authentication Flow

### Register Flow

```
1. User fills registration form
   └── name, email, password, hostelBlock, roomNumber, phoneNumber

2. Frontend sends POST /api/auth/register
   └── { name, email, password, hostelBlock, roomNumber, phoneNumber }

3. Backend authController.register()
   ├── Validate all fields present
   ├── Check email doesn't exist in DB
   ├── Hash password using bcryptjs (salt rounds: 10)
   ├── Create User document
   ├── Generate JWT token
   └── Return { token, user: { id, name, email } }

4. Frontend receives response
   ├── Store token in localStorage
   ├── Store user data in localStorage  
   ├── Update AuthContext
   └── Redirect to /dashboard

5. Axios Interceptor
   ├── On every request, add Authorization header
   └── Header: Authorization: Bearer {token}
```

### Login Flow

```
1. User enters email & password

2. Frontend sends POST /api/auth/login
   └── { email, password }

3. Backend authController.login()
   ├── Find user by email in DB
   ├── Compare password with hash using bcryptjs
   ├── If match:
   │   ├── Generate JWT token
   │   └── Return { token, user }
   └── Else: Return 401 error

4. Frontend handles response
   ├── Store token and user
   ├── Set AuthContext state
   └── Redirect to /dashboard

5. Protected Routes
   ├── ProtectedRoute component checks user
   ├── If authenticated: Render page
   └── Else: Redirect to /login
```

### JWT Token Verification

```
1. Client sends request with Authorization header
   └── Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

2. Backend authMiddleware intercepts
   ├── Extract token from header
   ├── Verify signature using JWT_SECRET
   ├── Extract userId from payload
   └── Attach userId to req object

3. Controller receives req with userId
   └── Use req.userId for authorization checks

4. Token Expiration
   ├── JWT includes exp: Date.now() + 7 days
   ├── If expired: 401 Unauthorized
   └── Frontend should redirect to login
```

---

## 📡 API Endpoints Documentation

### Request/Response Format

**All requests must include:**
```javascript
headers: {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer YOUR_JWT_TOKEN'  // For protected routes
}
```

### Authentication Endpoints

#### POST /api/auth/register
**Public endpoint - No auth required**

Request:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123",
  "hostelBlock": "A",
  "roomNumber": "101",
  "phoneNumber": "9876543210"
}
```

Response (201 Created):
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "hostelBlock": "A",
    "roomNumber": "101"
  }
}
```

Error Response (400 Bad Request):
```json
{
  "message": "User already exists"
}
```

#### POST /api/auth/login
**Public endpoint - No auth required**

Request:
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

Response (200 OK):
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Item Endpoints

#### GET /api/items
**Public - Get all available items**

Query Parameters:
```
?category=Book&condition=Good&hostelBlock=A&itemName=DSA
```

Response (200 OK):
```json
{
  "success": true,
  "items": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "itemName": "Data Structures Book",
      "category": "Book",
      "condition": "Good",
      "description": "CLRS algorithms book",
      "ownerId": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "hostelBlock": "A",
        "roomNumber": "101",
        "rating": 4.5
      },
      "status": "Available",
      "borrowDuration": 14,
      "securityDeposit": 500
    }
  ]
}
```

#### POST /api/items
**Protected - Add new item**

Request:
```json
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

Response (201 Created):
```json
{
  "success": true,
  "message": "Item added successfully",
  "item": {
    "_id": "507f1f77bcf86cd799439012",
    "itemName": "Data Structures Book",
    "status": "Available",
    "ownerId": "507f1f77bcf86cd799439011"
  }
}
```

### Borrow Endpoints

#### POST /api/borrow/request
**Protected - Request to borrow an item**

Request:
```json
{
  "itemId": "507f1f77bcf86cd799439012"
}
```

Response (201 Created):
```json
{
  "success": true,
  "message": "Borrow request sent successfully",
  "borrow": {
    "_id": "507f1f77bcf86cd799439013",
    "itemId": "507f1f77bcf86cd799439012",
    "borrowerId": "507f1f77bcf86cd799439014",
    "ownerId": "507f1f77bcf86cd799439011",
    "status": "Pending",
    "borrowDate": "2024-01-15T10:30:00Z",
    "expectedReturnDate": "2024-01-29T10:30:00Z"
  }
}
```

Error Response (400 Bad Request):
```json
{
  "message": "You cannot borrow your own item"  // Rule 1
}
```
OR
```json
{
  "message": "Item is not available"  // Rule 2
}
```
OR
```json
{
  "message": "You have already requested this item"  // Rule: Prevent duplicates
}
```

#### POST /api/borrow/approve
**Protected - Owner approves borrow request**

Request:
```json
{
  "borrowId": "507f1f77bcf86cd799439013"
}
```

Response (200 OK):
```json
{
  "success": true,
  "message": "Borrow request approved",
  "borrow": {
    "_id": "507f1f77bcf86cd799439013",
    "status": "Approved"
  }
}
```

Authorization Check:
```javascript
if (borrow.ownerId.toString() !== req.userId) {
  return res.status(403).json({ message: 'Not authorized' });
}
```

#### POST /api/borrow/return
**Protected - Borrower returns item**

Request:
```json
{
  "borrowId": "507f1f77bcf86cd799439013",
  "conditionOnReturn": "Good"
}
```

Response (200 OK):
```json
{
  "success": true,
  "message": "Item returned successfully",
  "borrow": {
    "_id": "507f1f77bcf86cd799439013",
    "status": "Returned",
    "actualReturnDate": "2024-01-25T10:30:00Z",
    "daysLate": 0,
    "fine": 0,
    "conditionOnReturn": "Good"
  }
}
```

Fine Calculation:
```javascript
if (returnDate > borrow.expectedReturnDate) {
  const timeDiff = returnDate - borrow.expectedReturnDate;
  borrow.daysLate = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  borrow.fine = borrow.daysLate * 10;  // ₹10 per day
}
```

---

## ✅ Code Quality & Best Practices

### Error Handling Strategy

```javascript
// ✅ GOOD: Specific error messages
if (!item) {
  return res.status(404).json({ message: 'Item not found' });
}

// ❌ BAD: Generic error messages
if (!item) {
  return res.status(400).json({ message: 'Error' });
}
```

### Validation Strategy

```javascript
// ✅ GOOD: Validate before processing
if (!email || !password) {
  return res.status(400).json({ message: 'Email and password required' });
}

// ✅ GOOD: Use Mongoose schema validation
const userSchema = new Schema({
  email: { required: [true, 'Email required'] },
  password: { minlength: [6, 'Min 6 characters'] }
});
```

### Security Best Practices

```javascript
// ✅ Hash passwords
const hashedPassword = await bcrypt.hash(password, 10);

// ✅ JWT with expiration
const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });

// ✅ Secure headers
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json({ limit: '10mb' }));

// ❌ Never store plain passwords
user.password = password;  // BAD

// ❌ Never send password in response
return res.json({ user });  // OK, password not selected
```

### Code Organization Principles

```
1. Separation of Concerns
   - Controllers handle HTTP logic
   - Models handle data structure
   - Routes handle endpoints
   - Middleware handles cross-cutting concerns

2. DRY (Don't Repeat Yourself)
   - Reuse components
   - Create utility functions
   - Use middleware for common logic

3. Error First
   - Validate inputs first
   - Check authorization
   - Then process business logic

4. Consistent Naming
   - camelCase for variables/functions
   - PascalCase for classes/models
   - UPPERCASE for constants
```

---

## 🎯 Error Handling Strategy

### HTTP Status Codes Used

```
200 OK           - Request successful
201 Created      - Resource created
400 Bad Request  - Invalid input
401 Unauthorized - Missing/invalid token
403 Forbidden    - Not authorized for action
404 Not Found    - Resource doesn't exist
500 Server Error - Internal server error
```

### Error Response Format

```javascript
// Success Response
{
  "success": true,
  "message": "Operation completed",
  "data": { ... }
}

// Error Response
{
  "success": false,
  "message": "Descriptive error message"
}

// Development Error Response (includes stack trace)
{
  "success": false,
  "message": "Error message",
  "error": { ... stack trace ... }
}
```

### Frontend Error Handling

```javascript
try {
  const response = await api.post('/auth/login', { email, password });
  // Handle success
} catch (error) {
  // API error response
  const message = error.response?.data?.message || 'Unknown error';
  setError(message);
}

// Axios interceptor handles 401
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Clear auth and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  }
);
```

---

## 📊 Data Flow Diagrams

### Add Item Flow

```
Frontend          Backend         Database
  │                 │                 │
  ├─POST /items─→  │                 │
  │   (with token)  ├─authMiddleware │
  │                 ├─ verify JWT    │
  │                 ├─itemController │
  │                 ├─ validate data │
  │                 ├─ save Item ────→ items collection
  │                 ├─ update User ──→ users collection
  │  ←─ 201, item ──┤                 │
  │                 │                 │
  ├─ update UI      │                 │
  ├─ show success   │                 │
  │                 │                 │
```

### Request Borrow Flow

```
Frontend           Backend          Database
  │                  │                  │
  ├─POST /request──→ │                  │
  │ (itemId, token)  ├─authMiddleware  │
  │                  ├─ verify JWT     │
  │                  ├─borrowController│
  │                  ├─ check item ────→ find item
  │                  ├─ check owner ←──┘
  │                  ├─ check duplicate─→ query borrows
  │                  ├─ create Borrow ──→ borrows collection
  │                  ├─ update Item ────→ items collection
  │  ←─ 201, borrow ─┤                  │
  │                  │                  │
  ├─ show success   │                  │
  │ request pending  │                  │
```

---

## 📚 State Management

### Context API Usage

```javascript
// AuthContext provides:
{
  user: { id, name, email, ... },
  token: "jwt_token",
  loading: false,
  login: async (email, password) => { ... },
  logout: () => { ... },
  register: async (userData) => { ... }
}

// Usage in components:
const { user, login } = useAuth();

// Example:
if (!user) {
  return <ProtectedRoute />;
}
```

---

## 🔄 Middleware Flow

```
Client Request
    ↓
Express Middleware Stack:
    ├─ CORS middleware (allow cross-origin)
    ├─ JSON parser (parse body)
    ├─ urlencoded parser
    ├─ Route matching
    │   └─ authMiddleware (if protected route)
    │       ├─ Extract token
    │       ├─ Verify JWT
    │       ├─ Attach userId
    │       └─ Call next()
    ├─ Controller function
    ├─ errorMiddleware (if error thrown)
    └─ Send Response
    ↓
Client Response
```

---

## 📖 Summary

This architecture provides:

1. **Scalability**: Easy to add new features without affecting existing code
2. **Maintainability**: Clear separation of concerns
3. **Security**: JWT authentication, password hashing, input validation
4. **Performance**: Database indexes, efficient queries
5. **Reliability**: Error handling, data validation
6. **User Experience**: Protected routes, loading states, error messages

The MERN stack with MVC architecture and Context API provides a solid foundation for a production-grade hostel resource sharing platform.

---

**For setup instructions, see SETUP.md**  
**For deployment instructions, see DEPLOYMENT.md**
