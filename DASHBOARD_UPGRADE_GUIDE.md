# 🎯 Advanced Dashboard Upgrade - Complete Guide

## Overview

Your GrabGrid dashboard has been upgraded with **advanced tracking features** including:
- Real-time summary statistics
- Incoming/Outgoing borrow requests
- Complete borrow history
- Items shared tracking
- Earnings management system

---

## ✅ What's been Updated

### 1. Database Models

#### User Model (NEW FIELD)
```javascript
totalEarnings: {
  type: Number,
  default: 0,
  min: 0,
}
```
Tracks total money earned from shared items.

#### Item Model (NEW FIELDS)
```javascript
pricePerDay: {
  type: Number,
  default: 0,
  min: 0,
}

totalTimesBorrowed: {
  type: Number,
  default: 0,
}
```
- `pricePerDay`: Set when creating an item (optional)
- `totalTimesBorrowed`: Increments each time item is approved for borrow

#### Borrow Model (NEW FIELD)
```javascript
totalAmount: {
  type: Number,
  default: 0,
  min: 0,
}
```
Calculated as: `pricePerDay × number of days borrowed`

---

## 🔧 Backend Implementation

### New Dashboard Controller

**File:** `backend/controllers/dashboardController.js`

#### Function: `getDashboardData()`

**Purpose:** Fetch complete dashboard data for logged-in user

**What it does:**
1. Fetches user information
2. Gets all incoming requests (user is owner)
3. Gets all outgoing requests (user is borrower)
4. Gets borrow history (completed borrows)
5. Gets all items shared by user
6. Calculates summary statistics:
   - Total items added
   - Total items borrowed
   - Active borrowed count
   - Active incoming requests count
   - Total earnings (from completed returns)
   - Pending earnings (from active borrows)

**Analysis Queries Used:**
```javascript
// Aggregation for total earnings (returned items only)
Borrow.aggregate([
  { $match: { ownerId: userId, status: 'Returned' } },
  { $group: { _id: null, totalEarnings: { $sum: '$totalAmount' } } }
])

// Aggregation for pending earnings (active items)
Borrow.aggregate([
  { $match: { ownerId: userId, status: 'Active' } },
  { $group: { _id: null, pendingAmount: { $sum: '$totalAmount' } } }
])
```

**Response Format:**
```json
{
  "success": true,
  "user": {
    "_id": "...",
    "name": "Alice",
    "email": "alice@hostel.com",
    "hostelBlock": "A",
    "roomNumber": "101",
    "rating": 4.5
  },
  "summary": {
    "totalItemsAdded": 5,
    "totalItemsBorrowed": 3,
    "activeBorrowedCount": 1,
    "activeIncomingCount": 2,
    "totalEarnings": 1500,
    "pendingEarnings": 300
  },
  "incomingRequests": [...],
  "outgoingRequests": [...],
  "borrowHistory": [...],
  "itemsShared": [...]
}
```

---

### Updated Controller: Borrow Controller

#### Function: `approveBorrow()` (ENHANCED)

**New Logic:**
```javascript
// Calculate total amount based on price per day
const durationInMs = borrow.expectedReturnDate - borrow.borrowDate;
const durationInDays = Math.ceil(durationInMs / (1000 * 60 * 60 * 24));
borrow.totalAmount = (item.pricePerDay || 0) * durationInDays;

// Increment times borrowed
item.totalTimesBorrowed = (item.totalTimesBorrowed || 0) + 1;
```

**When called:**
- totalAmount is calculated based on item's pricePerDay
- item.totalTimesBorrowed increments
- Borrow status changes to "Active"

#### Function: `returnItem()` (ENHANCED)

**New Logic:**
```javascript
// Add earnings to owner when item is returned
await User.findByIdAndUpdate(
  borrow.ownerId,
  { $inc: { totalEarnings: borrow.totalAmount } }
);
```

**When called:**
- Owner's totalEarnings increases by borrowAmount
- Item status reverts to "Available"
- Borrow status changes to "Returned"

---

### New Route

**File:** `backend/routes/dashboardRoutes.js`

```javascript
GET /api/dashboard
[Protected - Requires JWT]

Returns:
- User info
- Summary statistics
- All requests and history
- Earnings data
```

---

## 📱 Frontend Implementation

### Updated Dashboard Component

**File:** `frontend/src/pages/Dashboard.jsx`

#### Features:

1. **Summary Cards Section**
   - Total Items Added
   - Total Items Borrowed
   - Active Borrows
   - Pending Requests (with badge notification)
   - Total Earnings

2. **Tab Navigation**
   - Overview (stats & user info)
   - Incoming Requests (for owners)
   - My Requests (for borrowers)
   - Borrow History (completed)
   - Items Shared (all shared items)

3. **Real-Time Data**
   - Fetches data from `/api/dashboard`
   - Loading state during fetch
   - Error handling & retry button
   - Auto-refresh on tab change

4. **Components:**
   - `SummaryCard` - Display statistics
   - `StatBox` - Show detailed stats
   - `RequestsList` - Show incoming/outgoing requests
   - `BorrowHistoryList` - Show completed borrows
   - `ItemsSharedList` - Show your items

#### Data Flow:

```
User visits Dashboard
    ↓
Component mounts → Calls fetchDashboardData()
    ↓
API call: GET /api/dashboard
    ↓
Backend:
  - Fetches user requests
  - Calculates earnings
  - Aggregates data
    ↓
Returns structured data
    ↓
Component stores in state
    ↓
Renders tabs with real data
```

---

## 💰 Earnings System

### How it Works:

**Step 1: User Creates Item**
```javascript
{
  itemName: "Data Structures Book",
  pricePerDay: 100,  // Optional - set when creating
  ...
}
```

**Step 2: Borrower Requests Item**
```
Borrow created with:
- totalAmount: 0 (not yet calculated)
- status: "Pending"
```

**Step 3: Owner Approves Request**
```javascript
// Calculation happens here:
const durationInDays = Math.ceil(
  (expectedReturnDate - borrowDate) / (1000 * 60 * 60 * 24)
);
borrow.totalAmount = pricePerDay × durationInDays;

// Example: 100 rupees/day × 7 days = 700 rupees
```

**Step 4: Borrower Returns Item**
```javascript
// Owner's earnings updated:
user.totalEarnings += borrow.totalAmount;

// Example: 0 + 700 = 700 rupees total earnings
```

### Viewing Earnings:

1. **Total Earnings** - From completed & returned items
2. **Pending Earnings** - From active borrowed items (not yet returned)
3. **Summary Card** - Shows total earnings at top

---

## 🧪 Testing Instructions

### Test Scenario 1: End-to-End Earnings Tracking

**Step 1: Create Item with Price**
```bash
POST /api/items
{
  "itemName": "Economics Textbook",
  "category": "Book",
  "condition": "Good",
  "description": "Complete with notes",
  "hostelBlock": "A",
  "roomNumber": "101",
  "borrowDuration": 7,
  "pricePerDay": 50,
  "availableUntil": "2026-12-31"
}
```

**Step 2: Borrower Requests Item**
```bash
POST /api/borrow/request
{
  "itemId": "{ITEM_ID}"
}
```
**Result:** Borrow created with `totalAmount: 0`

**Step 3: Owner Approves Request**
```bash
POST /api/borrow/approve
{
  "borrowId": "{BORROW_ID}"
}
```
**Result:** `totalAmount` calculated as 50 × 7 = 350 rupees

**Step 4: Borrower Returns Item**
```bash
POST /api/borrow/return
{
  "borrowId": "{BORROW_ID}",
  "conditionOnReturn": "Good"
}
```
**Result:** Owner's `totalEarnings` increases by 350

**Step 5: Check Dashboard**
```bash
GET /api/dashboard
```
**Result:**
```json
{
  "summary": {
    "totalEarnings": 350,
    "pendingEarnings": 0
  }
}
```

---

### Test Scenario 2: Multiple Active Borrows

**Setup:**
- Create 3 items with `pricePerDay: 100`
- Borrow all 3 items (7 days each)
- Approve all requests

**Results:**
- Each borrow: `totalAmount = 700`
- Dashboard shows: `pendingEarnings = 2100` (before return)

**When first item is returned:**
- Owner's `totalEarnings` increases by 700
- Dashboard: `totalEarnings = 700`, `pendingEarnings = 1400`

---

### Using Postman

**1. Create Collection: "GrabGrid Dashboard"**

**2. Set Variables:**
```
owner_token: [from alice login]
borrower_token: [from bob login]
item_id: [from item creation]
borrow_id: [from request creation]
```

**3. Test Requests:**

**Get Dashboard Data:**
```
GET {{base_url}}/api/dashboard
Authorization: Bearer {{owner_token}}
```

**Expected Response:**
```json
{
  "success": true,
  "summary": {
    "totalItemsAdded": 5,
    "totalItemsBorrowed": 2,
    "activeBorrowedCount": 1,
    "activeIncomingCount": 1,
    "totalEarnings": 500,
    "pendingEarnings": 700
  },
  "incomingRequests": [...],
  "outgoingRequests": [...],
  "borrowHistory": [...],
  "itemsShared": [...]
}
```

---

## 🎨 Frontend Testing

### Test 1: Dashboard Loads Successfully

1. Login as user with items shared
2. Navigate to Dashboard
3. **Verify:**
   - Summary cards show correct counts
   - Tabs are clickable
   - No loading errors

### Test 2: View Incoming Requests

1. Login as item owner
2. Click "Incoming Requests" tab
3. **Verify:**
   - All requests visible
   - Shows borrower details
   - Shows requested dates
   - Accept/Reject buttons visible for Pending

### Test 3: View My Requests

1. Login as borrower
2. Click "My Requests" tab
3. **Verify:**
   - All requests visible
   - Shows owner details
   - Shows calculated amount (if item has price)
   - Status badges correct

### Test 4: View Borrow History

1. Login as user who returned items
2. Click "Borrow History" tab
3. **Verify:**
   - All returned items shown
   - Dates accurate
   - Total amount paid visible
   - Late fees shown if applicable

### Test 5: View Items Shared

1. Login as item owner
2. Click "Items Shared" tab
3. **Verify:**
   - All items listed
   - Times borrowed increment
   - Price per day shows
   - Status updated correctly

---

## 📊 Database Queries

### Query: Get user's total earnings
```javascript
db.users.findOne({ _id: userId }, { totalEarnings: 1 })
```

### Query: Get pending earnings
```javascript
db.borrows.aggregate([
  { $match: { ownerId: ObjectId(userId), status: "Active" } },
  { $group: { _id: null, total: { $sum: "$totalAmount" } } }
])
```

### Query: Get completed transactions
```javascript
db.borrows.find({
  ownerId: ObjectId(userId),
  status: "Returned"
}).sort({ actualReturnDate: -1 })
```

### Query: Get item borrow count
```javascript
db.borrows.countDocuments({
  itemId: ObjectId(itemId),
  status: "Returned"
})
```

---

## 🔒 Security & Authorization

✅ **Protected Routes:**
- `/api/dashboard` requires JWT token
- User can only see their own data
- Backend validates ownerId/borrowerId

✅ **Data Validation:**
- `pricePerDay` must be ≥ 0
- `totalAmount` calculated server-side (not frontend)
- Earnings only updated on confirmed return

✅ **Business Rules Enforced:**
- Owner must approve before amount calculated
- Amount locked once approved
- Earnings finalized only on return

---

## 💡 Key Benefits

1. **Transparency** - Users see all activity in one dashboard
2. **Earnings Tracking** - Clear view of money earned
3. **Request Management** - Easy accept/reject incoming requests
4. **History** - Complete record of all transactions
5. **Analytics** - Summary stats for quick overview

---

## 🚀 Advanced Features

### Feature 1: Aggregation Queries
- Efficient database queries using `$group` and `$sum`
- Minimizes API calls
- Single endpoint returns all data

### Feature 2: Real-Time Calculations
- `totalAmount` calculated at approval time
- Based on actual `pricePerDay` of item
- Prevents disputes over pricing

### Feature 3: Comprehensive History
- Complete audit trail of all transactions
- Shows late fees and penalties
- Tracks condition on return

---

## 📈 Next Enhancements

Consider adding:
1. **Filters** - By date range, status, category
2. **Sorting** - By amount, date, status
3. **Export** - Download history as CSV/PDF
4. **Charts** - Visualize earnings over time
5. **Notifications** - Alert for incoming requests
6. **Messaging** - DM between borrower/owner
7. **Ratings** - Rate items and users
8. **Verification** - Confirm payment received

---

## 🐛 Debugging

### Check Dashboard Loads
```bash
curl http://localhost:5000/api/dashboard \
  -H "Authorization: Bearer {TOKEN}"
```

### View Backend Logs
- Look for `📊 Dashboard request for user:` in terminal
- Look for `✅ Dashboard data compiled successfully`
- Check for aggregation query results

### Check Frontend Console
- `📊 Fetching dashboard data...`
- `✅ Dashboard data received:` shows complete response
- `❌ Dashboard error:` shows any errors

---

## ✨ Summary

Your dashboard now includes:

| Feature | Status | Location |
|---------|--------|----------|
| Summary Cards | ✅ | Top of dashboard |
| Incoming Requests | ✅ | Tab section |
| Outgoing Requests | ✅ | Tab section |
| Borrow History | ✅ | Tab section |
| Items Shared | ✅ | Tab section |
| Earnings Tracking | ✅ | Summary + History |
| Real-Time Data | ✅ | API driven |
| Dark Mode Support | ✅ | All sections |

---

**Everything is production-ready and fully integrated!** 🚀

Test the dashboard now by logging in and navigating to your Dashboard page!

