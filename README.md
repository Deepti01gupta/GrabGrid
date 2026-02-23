# 🏠 Hostel Resource Sharing Platform - GrabGrid

A production-level MERN (MongoDB, Express, React, Node.js) stack application for hostel students to share resources and reduce expenses.

---

## 📋 Project Overview

**Problem:** Hostel students waste money buying books, lab kits, and appliances used only temporarily.

**Solution:** A digital platform where students can list items, borrow from others, and manage resource sharing efficiently.

---

## 🎯 Key Features

✅ **User Authentication** - Register, Login with JWT tokens
✅ **Item Management** - Add, edit, delete, and search items
✅ **Borrow System** - Request to borrow, approve/reject, track returns
✅ **Rating System** - Build trust through community ratings
✅ **Search & Filter** - Find items by category, condition, hostel block
✅ **Dashboard** - Monitor requests and borrowed items
✅ **Auto Deadline Tracking** - Calculate late fees automatically

---

## 📁 Project Structure

```
GrabGrid/
│
├── backend/                           # Node.js + Express Server
│   ├── config/
│   │   └── db.js                     # MongoDB connection
│   │
│   ├── controllers/
│   │   ├── authController.js         # Auth logic (register, login)
│   │   ├── itemController.js         # Item CRUD operations
│   │   └── borrowController.js       # Borrow request management
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js         # JWT verification
│   │   └── errorMiddleware.js        # Error handling
│   │
│   ├── models/
│   │   ├── User.js                   # User schema
│   │   ├── Item.js                   # Item schema
│   │   └── Borrow.js                 # Borrow transaction schema
│   │
│   ├── routes/
│   │   ├── authRoutes.js             # Auth endpoints
│   │   ├── itemRoutes.js             # Item endpoints
│   │   └── borrowRoutes.js           # Borrow endpoints
│   │
│   ├── utils/
│   │   └── generateToken.js          # JWT token generator
│   │
│   ├── .env                          # Environment variables
│   ├── server.js                     # Express server entry point
│   └── package.json
│
└── frontend/                          # React Application
    ├── public/
    │   └── index.html                # HTML template
    │
    ├── src/
    │   ├── api/
    │   │   └── axios.js              # Axios instance with interceptors
    │   │
    │   ├── components/
    │   │   ├── Navbar.jsx            # Navigation bar
    │   │   ├── ItemCard.jsx          # Item card component
    │   │   ├── ProtectedRoute.jsx    # Route protection wrapper
    │   │   └── Loader.jsx            # Loading spinner
    │   │
    │   ├── pages/
    │   │   ├── Login.jsx             # Login page
    │   │   ├── Register.jsx          # Registration page
    │   │   ├── Dashboard.jsx         # User dashboard
    │   │   ├── Items.jsx             # Browse items page
    │   │   ├── AddItem.jsx           # Add new item page
    │   │   └── MyRequests.jsx        # Manage requests page
    │   │
    │   ├── context/
    │   │   └── AuthContext.js        # Global auth state
    │   │
    │   ├── hooks/
    │   │   └── useAuth.js            # Custom auth hook
    │   │
    │   ├── styles/
    │   │   ├── Navbar.css
    │   │   ├── Auth.css              # Login/Register styles
    │   │   ├── ItemCard.css
    │   │   ├── Dashboard.css
    │   │   ├── AddItem.css
    │   │   ├── Items.css
    │   │   ├── MyRequests.css
    │   │   ├── Loader.css
    │   │   ├── index.css
    │   │   └── App.css
    │   │
    │   ├── App.js                    # React app root
    │   ├── index.js                  # ReactDOM render
    │   └── .env
    │
    ├── package.json
    └── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file (already provided):**
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/hostel-share
   JWT_SECRET=your_secret_key_here
   NODE_ENV=development
   ```

4. **Start MongoDB** (if using local):
   ```bash
   mongod
   ```

5. **Run the server:**
   ```bash
   npm run dev    # With nodemon (auto-reload)
   # or
   npm start      # Normal start
   ```

   Server runs on `http://localhost:5000`

---

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file (already provided):**
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start React app:**
   ```bash
   npm start
   ```

   App opens at `http://localhost:3000`

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (Protected)
- `PUT /api/auth/profile` - Update profile (Protected)

### Items
- `GET /api/items` - Get all available items
- `GET /api/items/:id` - Get item details
- `GET /api/items/search?category=Book` - Search items
- `POST /api/items` - Add new item (Protected)
- `PUT /api/items/:id` - Update item (Protected)
- `DELETE /api/items/:id` - Delete item (Protected)
- `GET /api/items/my-items` - Get user's items (Protected)

### Borrow
- `POST /api/borrow/request` - Request to borrow (Protected)
- `POST /api/borrow/approve` - Approve request (Protected)
- `POST /api/borrow/reject` - Reject request (Protected)
- `POST /api/borrow/return` - Return item (Protected)
- `GET /api/borrow/my-requests` - Get borrow requests (Protected)
- `GET /api/borrow/my-borrows` - Get borrowed items (Protected)

---

## 🗄 Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  hostelBlock: String,
  roomNumber: String,
  phoneNumber: String,
  rating: Number (1-5),
  itemsShared: Number,
  itemsBorrowed: Number,
  isBanned: Boolean,
  createdAt: Date
}
```

### Item Model
```javascript
{
  itemName: String,
  category: String (Book/Lab Kit/Appliance/Sports/Other),
  condition: String (New/Good/Used),
  description: String,
  ownerId: ObjectId (reference to User),
  hostelBlock: String,
  roomNumber: String,
  securityDeposit: Number,
  status: String (Available/Requested/Borrowed/Unavailable),
  borrowDuration: Number (days),
  availableFrom: Date,
  availableUntil: Date,
  currentBorrower: ObjectId,
  createdAt: Date
}
```

### Borrow Model
```javascript
{
  itemId: ObjectId (reference to Item),
  borrowerId: ObjectId (reference to User),
  ownerId: ObjectId (reference to User),
  borrowDate: Date,
  expectedReturnDate: Date,
  actualReturnDate: Date,
  status: String (Pending/Approved/Rejected/Active/Returned),
  daysLate: Number,
  fine: Number,
  conditionOnReturn: String,
  notes: String,
  createdAt: Date
}
```

---

## 🔐 Authentication Flow

1. User registers with email and password
2. Password is hashed using bcryptjs
3. JWT token is generated on login
4. Token is stored in localStorage (frontend)
5. Token is sent with every request in Authorization header
6. Backend validates token using authMiddleware
7. Token expires after 7 days

---

## 🎯 Workflow Examples

### Adding an Item
1. User logs in
2. Goes to "Add Item" page
3. Fills item details (name, category, condition, duration, etc.)
4. Submits form
5. Item status = "Available"

### Borrowing an Item
1. User browses items on "Browse Items" page
2. Clicks "View Details"
3. Clicks "Request Borrow"
4. Status → "Requested" (awaiting owner approval)
5. Owner receives request on Dashboard
6. Owner approves → Status → "Borrowed"
7. Borrower can see expected return date

### Returning an Item
1. Borrower goes to "My Requests" tab "My Borrows"
2. Clicks "Mark as Returned"
3. System calculates if late
4. Fine applied if late (₹10/day)
5. Item status back → "Available"

---

## 🛠 Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **JWT** - Token-based authentication
- **CORS** - Cross-origin requests

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management
- **CSS** - Styling

---

## 📝 How to Explain in Interview

### Project Description
"I built a Hostel Resource Sharing Platform to solve real-world problem where students waste money buying items used temporarily. It's a MERN stack application with user authentication, item management, and borrowing system with automatic deadline tracking and fine calculation."

### Architecture Highlight
"I followed MVC architecture:
- **Controllers** contain business logic
- **Models** define database schemas
- **Routes** handle API endpoints
- **Middleware** manages authentication and error handling
This separation makes code maintainable and scalable."

### Key Implementation Details
- JWT-based authentication with 7-day token expiration
- Bcryptjs for secure password hashing
- MongoDB indexes on frequently queried fields
- Axios interceptors for automatic token attachment
- Protected routes on frontend using ProtectedRoute component
- Auto status updates when borrowing/returning items

### Challenges & Solutions
1. **Challenge**: Preventing duplicate borrow requests
   - **Solution**: Query existing pending/active borrows before allowing new request

2. **Challenge**: Calculating late fees
   - **Solution**: Compare actual return date with expected return date on backend

3. **Challenge**: Data consistency
   - **Solution**: Update both Item and Borrow documents in transaction

---

## 🚀 Future Enhancements

1. **Mobile App** - React Native version
2. **Notifications** - Email/SMS alerts for requests
3. **QR Code** - Generate QRcode for item handover verification
4. **Payment Integration** - Online security deposit system
5. **Analytics Dashboard** - Demand analysis, trends
6. **Sustainability Score** - Track environmental impact
7. **Admin Panel** - Monitor misuse and ban users
8. **Ratings** - Detailed review system
9. **Chat** - Direct messaging between users
10. **Push Notifications** - WebSocket for real-time updates

---

## 📜 License

This project is created for educational purposes.

---

## 👨‍💻 Author

Created by **Deepti**  
Contact: [Your Email]

---

## 🤝 Contributing

Contributions are welcome! Please follow best practices:
- Create feature branches
- Write clean code
- Add comments where necessary
- Test before submitting

---

**Happy Coding! 🚀**
