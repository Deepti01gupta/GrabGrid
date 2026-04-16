# 📡 Dashboard API Reference

## Endpoint Overview

### Dashboard Endpoint

```
GET /api/dashboard
```

**Authentication:** Required (JWT Bearer Token)

**Purpose:** Fetch complete dashboard data for authenticated user

**Response Time:** ~50-100ms

---

## Request

### Headers
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

### Example Request
```bash
curl -X GET http://localhost:5000/api/dashboard \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"
```

---

## Response Structure

### Success Response (200 OK)

```json
{
  "success": true,
  "message": "Dashboard data retrieved successfully",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Alice Johnson",
      "email": "alice@hostel.com",
      "hostelBlock": "A",
      "roomNumber": "101",
      "rating": 4.5,
      "totalEarnings": 1500
    },
    "summary": {
      "totalItemsAdded": 5,
      "totalItemsBorrowed": 3,
      "activeBorrowedCount": 1,
      "activeIncomingCount": 2,
      "totalEarnings": 1500,
      "pendingEarnings": 350
    },
    "incomingRequests": [
      {
        "_id": "507f1f77bcf86cd799439012",
        "borrowerId": "507f1f77bcf86cd799439013",
        "borrowerName": "Bob Smith",
        "itemId": "507f1f77bcf86cd799439014",
        "itemName": "Economics Textbook",
        "borrowDate": "2026-03-01T10:00:00.000Z",
        "expectedReturnDate": "2026-03-08T10:00:00.000Z",
        "status": "Pending",
        "totalAmount": 0
      }
    ],
    "outgoingRequests": [
      {
        "_id": "507f1f77bcf86cd799439015",
        "ownerId": "507f1f77bcf86cd799439011",
        "ownerName": "Alice Johnson",
        "itemId": "507f1f77bcf86cd799439016",
        "itemName": "Data Structures Book",
        "borrowDate": "2026-02-28T10:00:00.000Z",
        "expectedReturnDate": "2026-03-07T10:00:00.000Z",
        "status": "Active",
        "totalAmount": 700
      }
    ],
    "borrowHistory": [
      {
        "_id": "507f1f77bcf86cd799439017",
        "itemId": "507f1f77bcf86cd799439018",
        "itemName": "Chemistry Lab Manual",
        "ownerId": "507f1f77bcf86cd799439019",
        "ownerName": "Charlie Davis",
        "borrowDate": "2026-02-01T10:00:00.000Z",
        "expectedReturnDate": "2026-02-15T10:00:00.000Z",
        "actualReturnDate": "2026-02-16T10:00:00.000Z",
        "status": "Returned",
        "totalAmount": 500,
        "daysLate": 1,
        "lateFees": 50
      }
    ],
    "itemsShared": [
      {
        "_id": "507f1f77bcf86cd799439020",
        "itemName": "Advanced Programming",
        "category": "Book",
        "condition": "Good",
        "pricePerDay": 100,
        "totalTimesBorrowed": 3,
        "status": "Available",
        "borrowDuration": 7,
        "availableUntil": "2026-12-31T00:00:00.000Z"
      }
    ]
  }
}
```

### Error Response (400/401/500)

```json
{
  "success": false,
  "message": "Unable to fetch dashboard data",
  "error": "Internal server error"
}
```

---

## Response Fields Explained

### User Object

| Field | Type | Description |
|-------|------|-------------|
| `_id` | String (ObjectId) | User's unique identifier |
| `name` | String | User's full name |
| `email` | String | User's email address |
| `hostelBlock` | String | Hostel block (A, B, C, etc.) |
| `roomNumber` | String | Room number in block |
| `rating` | Number | User's average rating (0-5) |
| `totalEarnings` | Number | Total money earned from completed borrows |

### Summary Object

| Field | Type | Description |
|-------|------|-------------|
| `totalItemsAdded` | Number | Count of items user has shared |
| `totalItemsBorrowed` | Number | Count of items borrowed by user |
| `activeBorrowedCount` | Number | Count of currently borrowed items |
| `activeIncomingCount` | Number | Count of pending incoming requests |
| `totalEarnings` | Number | Total completed earnings |
| `pendingEarnings` | Number | Money from active borrows (not yet returned) |

### Incoming Request Object

| Field | Type | Description |
|-------|------|-------------|
| `_id` | String | Borrow request ID |
| `borrowerId` | String | ID of person borrowing |
| `borrowerName` | String | Name of person borrowing |
| `itemId` | String | Item being borrowed |
| `itemName` | String | Name of item |
| `borrowDate` | Date | When borrow starts |
| `expectedReturnDate` | Date | When should return |
| `status` | String | "Pending", "Active", "Returned", or "Rejected" |
| `totalAmount` | Number | Calculated amount (0 if pending) |

### Outgoing Request Object

| Field | Type | Description |
|-------|------|-------------|
| `_id` | String | Borrow request ID |
| `ownerId` | String | ID of item owner |
| `ownerName` | String | Name of item owner |
| `itemId` | String | Item being borrowed |
| `itemName` | String | Name of item |
| `borrowDate` | Date | When borrow starts |
| `expectedReturnDate` | Date | When should return |
| `status` | String | "Pending", "Active", "Returned", or "Rejected" |
| `totalAmount` | Number | Amount you'll pay (0 if pending) |

### Borrow History Object

| Field | Type | Description |
|-------|------|-------------|
| `_id` | String | Borrow request ID |
| `itemId` | String | Item that was borrowed |
| `itemName` | String | Name of item |
| `ownerId` | String | ID of item owner |
| `ownerName` | String | Name of item owner |
| `borrowDate` | Date | When borrow started |
| `expectedReturnDate` | Date | Expected return date |
| `actualReturnDate` | Date | When actually returned |
| `status` | String | "Returned" (always) |
| `totalAmount` | Number | Amount paid |
| `daysLate` | Number | How many days late (if any) |
| `lateFees` | Number | Penalty for late return |

### Items Shared Object

| Field | Type | Description |
|-------|------|-------------|
| `_id` | String | Item ID |
| `itemName` | String | Name of item |
| `category` | String | Category (Book, Electronics, etc.) |
| `condition` | String | Current condition |
| `pricePerDay` | Number | Rental price per day (0 if free) |
| `totalTimesBorrowed` | Number | How many times item has been borrowed |
| `status` | String | "Available" or "Borrowed" |
| `borrowDuration` | Number | Suggested borrow duration in days |
| `availableUntil` | Date | Until when item is shareable |

---

## Status Values

### Borrow Status
- **Pending** - Owner hasn't approved yet
- **Active** - Owner approved, currently borrowed
- **Returned** - Borrower returned item
- **Rejected** - Owner rejected request

### Item Status
- **Available** - Not currently borrowed
- **Borrowed** - Someone has borrowed it

### Request Type (via operation)
- **Incoming** - Someone wants to borrow YOUR item
- **Outgoing** - You want to borrow SOMEONE ELSE'S item

---

## Earnings Calculation

### How It's Calculated

```javascript
// When request is APPROVED:
totalAmount = item.pricePerDay × Math.ceil(days between dates)

// Example:
// pricePerDay = 100
// borrowDate = 2026-03-01
// expectedReturnDate = 2026-03-08
// days = 7
// totalAmount = 100 × 7 = 700
```

### When Earnings Added

**Total Earnings** - Updated when:
- Status changes from "Active" → "Returned"
- Owner's totalEarnings += borrow.totalAmount

**Pending Earnings** - Shows:
- Sum of all "Active" borrows' totalAmount
- Not yet confirmed completed

---

## Code Examples

### Using Fetch API (Frontend)

```javascript
async function getDashboardData() {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/dashboard', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch dashboard');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Dashboard error:', error);
  }
}
```

### Using Axios (Frontend)

```javascript
import api from './api/axios';

async function getDashboardData() {
  try {
    const response = await api.get('/dashboard');
    console.log('Dashboard:', response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Error:', error.response?.data?.message);
  }
}
```

### Using Postman

1. **Create Request:**
   - Method: `GET`
   - URL: `http://localhost:5000/api/dashboard`

2. **Add Headers:**
   - Key: `Authorization`
   - Value: `Bearer YOUR_JWT_TOKEN`

3. **Send Request**

4. **Response:** Complete dashboard data

---

## Error Handling

### 401 Unauthorized
```json
{
  "success": false,
  "message": "No token provided or token is invalid"
}
```
**Solution:** Include valid JWT token in Authorization header

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Unable to fetch dashboard data",
  "error": "MongoDB connection failed"
}
```
**Solution:** Check backend logs, verify MongoDB is running

### Network Error
```
Error: Cannot reach server at localhost:5000
```
**Solution:** Verify backend is running with `npm run dev`

---

## Performance Notes

- **Response Time:** 50-100ms typical
- **Data Size:** ~5-15KB depending on requests
- **Database Queries:** Optimized with aggregation pipelines
- **Caching:** None (always fresh data)

---

## Data Sync

API always returns **fresh data**:
- No caching on server
- Direct MongoDB queries
- Real-time aggregation
- Up-to-date calculations

---

## Limitations & Notes

1. **Pagination:** Not implemented (shows all records)
   - Recommend frontend pagination for large lists
   - Sort by date for better UX

2. **Filtering:** Not implemented
   - Filter on frontend by status/date/amount
   - Could add backend filters if needed

3. **Relationships:** All data populated
   - User details included
   - Item names included
   - Owner/borrower info included

4. **Calculations:** All server-side
   - Never trust frontend calculations
   - Always verify totalAmount on backend

---

## Common Questions

**Q: Why is totalAmount 0 for Pending requests?**
A: Amount is only calculated when owner approves. Not calculated before approval.

**Q: How is pending earnings calculated?**
A: Sum of all `totalAmount` where status is "Active"

**Q: When are earnings finalized?**
A: When borrower returns item and status changes to "Returned"

**Q: Can users change pricePerDay after creating item?**
A: Currently no. Item edit endpoint would need to be added.

**Q: Are late fees included in total earnings?**
A: Late fees are tracked separately in borrow history.

---

## Integration Checklist

- [ ] Frontend can fetch `/api/dashboard`
- [ ] Dashboard displays all 5 tabs
- [ ] Summary cards show correct counts
- [ ] Incoming/Outgoing requests populate
- [ ] Borrow history displays correctly
- [ ] Items shared shows all items
- [ ] Earnings total is accurate
- [ ] Pending earnings shows correctly
- [ ] Error handling works
- [ ] Loading states display
- [ ] Dark mode looks good

---

