# Campus Care - API Documentation

Complete API reference for Campus Care Backend.

## 🌐 Base URL

```
http://localhost:3000/api
```

## 🔐 Authentication

All protected endpoints require a valid JWT token in the Authorization header:

```
Authorization: Bearer <access_token>
```

### Token Management

- **Access Token**: Short-lived (1 hour by default)
- **Refresh Token**: Long-lived (7 days by default)
- **Storage**: Access token in memory, Refresh token in database

---

## 📚 API Endpoints

### 1. Authentication Endpoints

#### Register New User

```http
POST /auth/register
```

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@paruluniversity.ac.in",
  "password": "StrongPassword@123",
  "role": "Student"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@paruluniversity.ac.in",
    "role": "Student"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Status Codes**:
- 201: User created successfully
- 400: Invalid input or user already exists
- 500: Server error

---

#### Login

```http
POST /auth/login
```

**Request Body**:
```json
{
  "email": "john@paruluniversity.ac.in",
  "password": "StrongPassword@123"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@paruluniversity.ac.in",
    "role": "Student"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Status Codes**:
- 200: Login successful
- 401: Invalid credentials
- 404: User not found
- 500: Server error

---

#### Get User Profile

```http
GET /auth/profile
Authorization: Bearer <access_token>
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@paruluniversity.ac.in",
    "role": "Student",
    "hostel": "Hostel A",
    "mobile": "+91-9876543210",
    "profilePicture": "https://cloudinary.com/image.jpg"
  }
}
```

**Status Codes**:
- 200: Profile retrieved
- 401: Unauthorized (no valid token)
- 404: User not found
- 500: Server error

---

#### Refresh Token

```http
POST /auth/refresh-token
```

**Request Body**:
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Status Codes**:
- 200: Token refreshed
- 401: Invalid refresh token
- 500: Server error

---

#### Logout

```http
POST /auth/logout
Authorization: Bearer <access_token>
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

**Status Codes**:
- 200: Logout successful
- 401: Unauthorized
- 500: Server error

---

### 2. Problem Endpoints

#### Create Problem

```http
POST /problems
Authorization: Bearer <access_token>
Content-Type: multipart/form-data
```

**Request Body** (form-data):
- `title` (text): Problem title *required*
- `description` (text): Detailed description *required*
- `category` (text): Problem category (maintenance, infrastructure, etc.)
- `priority` (text): Low, Medium, High, Urgent
- `image` (file): Problem image *optional*

**Example**:
```json
{
  "title": "Broken tap in bathroom",
  "description": "The tap in bathroom 2nd floor is leaking",
  "category": "maintenance",
  "priority": "High"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Broken tap in bathroom",
    "description": "The tap in bathroom 2nd floor is leaking",
    "category": "maintenance",
    "priority": "High",
    "status": "Open",
    "reportedBy": "507f1f77bcf86cd799439011",
    "ticketId": "MAI-2024-01-15-0001",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

**Status Codes**:
- 201: Problem created
- 400: Invalid input
- 401: Unauthorized
- 500: Server error

---

#### Get My Problems

```http
GET /problems/my
Authorization: Bearer <access_token>
```

**Query Parameters**:
- `status` (optional): Filter by status (Open, In Progress, Resolved, Closed)
- `priority` (optional): Filter by priority (Low, Medium, High, Urgent)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Example**: `GET /problems/my?status=Open&page=1&limit=5`

**Response** (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Broken tap in bathroom",
      "description": "The tap in bathroom 2nd floor is leaking",
      "category": "maintenance",
      "priority": "High",
      "status": "Open",
      "reportedBy": "507f1f77bcf86cd799439011",
      "ticketId": "MAI-2024-01-15-0001",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 15,
    "page": 1,
    "pages": 3,
    "limit": 5
  }
}
```

**Status Codes**:
- 200: Problems retrieved
- 401: Unauthorized
- 500: Server error

---

#### Get All Problems (Rectors)

```http
GET /problems
Authorization: Bearer <access_token>
```

**Query Parameters**:
- `status` (optional): Filter by status
- `priority` (optional): Filter by priority
- `category` (optional): Filter by category
- `assignedTo` (optional): Filter by assigned worker ID
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Example**: `GET /problems?status=In%20Progress&priority=High&page=1`

**Response** (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Broken tap in bathroom",
      "category": "maintenance",
      "priority": "High",
      "status": "Open",
      "reportedBy": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe"
      },
      "assignedTo": null,
      "ticketId": "MAI-2024-01-15-0001",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 45,
    "page": 1,
    "pages": 5
  }
}
```

**Status Codes**:
- 200: Problems retrieved
- 401: Unauthorized
- 403: Forbidden (insufficient role)
- 500: Server error

---

#### Get Problem by ID

```http
GET /problems/:id
Authorization: Bearer <access_token>
```

**URL Parameters**:
- `id` (required): Problem ID

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Broken tap in bathroom",
    "description": "The tap in bathroom 2nd floor is leaking",
    "category": "maintenance",
    "priority": "High",
    "status": "Open",
    "reportedBy": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@paruluniversity.ac.in"
    },
    "assignedTo": null,
    "problemImage": "https://cloudinary.com/image.jpg",
    "ticketId": "MAI-2024-01-15-0001",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

**Status Codes**:
- 200: Problem retrieved
- 401: Unauthorized
- 404: Problem not found
- 500: Server error

---

#### Update Problem Status

```http
PUT /problems/:id/status
Authorization: Bearer <access_token>
Content-Type: application/json
```

**URL Parameters**:
- `id` (required): Problem ID

**Request Body**:
```json
{
  "status": "In Progress",
  "notes": "Work started on the issue"
}
```

**Valid Status Transitions**:
- Open → In Progress / Resolved / Closed
- In Progress → Resolved / Closed
- Resolved → Closed

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Broken tap in bathroom",
    "status": "In Progress",
    "updatedAt": "2024-01-15T11:45:00Z"
  }
}
```

**Status Codes**:
- 200: Status updated
- 400: Invalid status transition
- 401: Unauthorized
- 403: Forbidden (cannot update other's problems)
- 404: Problem not found
- 500: Server error

---

#### Assign Problem to Worker

```http
PUT /problems/:id/assign
Authorization: Bearer <access_token>
Content-Type: application/json
```

**URL Parameters**:
- `id` (required): Problem ID

**Request Body**:
```json
{
  "workerId": "507f1f77bcf86cd799439013",
  "notes": "Assigned to maintenance team"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Broken tap in bathroom",
    "assignedTo": {
      "_id": "507f1f77bcf86cd799439013",
      "name": "Mike Smith",
      "role": "Worker"
    },
    "status": "In Progress"
  }
}
```

**Status Codes**:
- 200: Problem assigned
- 400: Invalid worker ID
- 401: Unauthorized
- 403: Forbidden (only Rectors can assign)
- 404: Problem or worker not found
- 500: Server error

---

#### Dashboard Statistics

```http
GET /problems/dashboard
Authorization: Bearer <access_token>
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "totalProblems": 45,
    "openProblems": 15,
    "inProgressProblems": 20,
    "resolvedProblems": 8,
    "closedProblems": 2,
    "avgResolutionTime": "2.5 days",
    "priorityBreakdown": {
      "Low": 5,
      "Medium": 15,
      "High": 20,
      "Urgent": 5
    },
    "categoryBreakdown": {
      "maintenance": 20,
      "infrastructure": 15,
      "facilities": 10
    }
  }
}
```

**Status Codes**:
- 200: Statistics retrieved
- 401: Unauthorized
- 500: Server error

---

## 🎯 User Roles & Permissions

| Role | Register | Login | Create Problem | View My Problems | View All Problems | Assign Worker | Update Status |
|------|----------|-------|-----------------|-----------------|-------------------|---------------|---------------|
| Student | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Rector | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Worker | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |

---

## 📊 Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "status": 400,
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

### Common Errors

**400 Bad Request**:
```json
{
  "success": false,
  "message": "Invalid input",
  "errors": [
    {
      "field": "title",
      "message": "Title is required"
    }
  ]
}
```

**401 Unauthorized**:
```json
{
  "success": false,
  "message": "Unauthorized - No token provided",
  "status": 401
}
```

**403 Forbidden**:
```json
{
  "success": false,
  "message": "Forbidden - Insufficient permissions",
  "status": 403
}
```

**404 Not Found**:
```json
{
  "success": false,
  "message": "Problem not found",
  "status": 404
}
```

**500 Server Error**:
```json
{
  "success": false,
  "message": "Internal server error",
  "status": 500
}
```

---

## 🔄 Status Transitions

Valid status flow for problems:

```
Open
  ├── → In Progress
  ├── → Resolved
  └── → Closed

In Progress
  ├── → Resolved
  └── → Closed

Resolved
  └── → Closed

Closed (Final state)
```

---

## 💾 Data Models

### User Model
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (Student|Rector|Worker),
  hostel: String,
  mobile: String,
  profilePicture: String (URL),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Problem Model
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  category: String,
  priority: String (Low|Medium|High|Urgent),
  status: String (Open|In Progress|Resolved|Closed),
  reportedBy: ObjectId (User),
  assignedTo: ObjectId (User, optional),
  problemImage: String (URL),
  ticketId: String (unique),
  notes: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

### Refresh Token Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId (User),
  token: String,
  expiresAt: Date
}
```

---

## 🧪 Testing API Endpoints

### Using cURL

```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name":"John Doe",
    "email":"john@paruluniversity.ac.in",
    "password":"Test@123",
    "role":"Student"
  }'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"john@paruluniversity.ac.in",
    "password":"Test@123"
  }'

# Get Profile (replace TOKEN with actual token)
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer TOKEN"

# Create Problem
curl -X POST http://localhost:3000/api/problems \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title":"Broken tap",
    "description":"Leaking tap in bathroom",
    "category":"maintenance",
    "priority":"High"
  }'
```

### Using Postman

1. Create a new collection "Campus Care"
2. Add requests for each endpoint
3. Set `Authorization` header: `Bearer {{token}}`
4. Use variables for base URL and token

---

## 📝 Rate Limiting

Currently no rate limiting implemented. For production, consider:
- 100 requests per minute per IP
- 10 requests per second per user
- Custom limits for expensive operations

---

## 🔐 Security Considerations

- All passwords are hashed with bcryptjs (10 rounds)
- JWT tokens expire after 1 hour
- Refresh tokens expire after 7 days
- HTTPS required in production
- CORS enabled for whitelisted origins only
- Input validation on all endpoints
- SQL injection prevention via Mongoose

---

**Last Updated**: 2024-01-15

For issues or clarifications, refer to the [Backend README](Backend/README_BACKEND.md)
