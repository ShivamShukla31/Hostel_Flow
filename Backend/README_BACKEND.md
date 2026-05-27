# Campus Care - Backend

Campus Care Backend API is a Node.js/Express server for managing hostel operations and problem reporting.

## 📁 Project Structure

```
Backend/
├── src/
│   ├── controllers/          # Business logic
│   │   ├── authController.js # Authentication logic
│   │   └── problemController.js # Problem management logic
│   │
│   ├── middleware/           # Express middleware
│   │   ├── asyncHandler.js  # Async error handling
│   │   ├── auth.Middleware.js # JWT authentication
│   │   ├── globalError.Middleware.js # Global error handler
│   │   ├── imageUploader.Middleware.js # Image upload
│   │   ├── logger.Middleware.js # Request logging
│   │   ├── profile.Middleware.js # Profile access control
│   │   ├── role.Middleware.js # Role-based access
│   │   ├── validateStatusChange.js # Status validation
│   │   └── validateStatusTransition.js # Status transitions
│   │
│   ├── models/               # Database models
│   │   ├── problem.model.js  # Problem schema
│   │   ├── refreshToken.model.js # Refresh token schema
│   │   └── users.model.js    # User schema
│   │
│   ├── routes/               # API routes
│   │   ├── auth.routes.js    # Authentication routes
│   │   └── problem.routes.js # Problem routes
│   │
│   ├── utils/                # Utility functions
│   │   ├── Api_Error.js      # Custom error class
│   │   ├── cloudinary.js     # Cloudinary config
│   │   ├── constants.js      # Constants
│   │   ├── generateTicketId.js # Ticket ID generator
│   │   ├── generateToken.js  # JWT token generator
│   │   ├── sendResponse.js   # Response formatter
│   │   ├── statusTransition.js # Status transition rules
│   │   └── constants.js      # App constants
│   │
│   ├── db/                   # Database configuration
│   │   └── db.config.js      # MongoDB connection
│   │
│   └── app.js                # Express app setup
│
├── index.js                  # Server entry point
├── package.json              # Dependencies
└── .env.example              # Environment template
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Backend
```

2. Install dependencies
```bash
npm install
```

3. Create environment file
```bash
cp .env.example .env
```

4. Update .env with your configuration
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/campus-care
JWT_SECRET=your_secret_key
JWT_REFRESH_SECRET=your_refresh_secret
NODE_ENV=development
```

### Running the Application

```bash
npm run dev
```

The API will start at `http://localhost:3000`

## 📚 API Endpoints

### Authentication Routes (`/api/auth`)

- **POST** `/register` - Register new user
  ```json
  {
    "name": "John Doe",
    "email": "john@paruluniversity.ac.in",
    "password": "password123",
    "role": "Student"
  }
  ```

- **POST** `/login` - Login user
  ```json
  {
    "email": "john@paruluniversity.ac.in",
    "password": "password123"
  }
  ```

- **POST** `/refresh-token` - Refresh access token
- **POST** `/logout` - Logout user
- **GET** `/profile` - Get user profile (Protected)

### Problem Routes (`/api/problems`)

- **POST** `/` - Create problem (Students only)
- **GET** `/my` - Get my problems (Students)
- **GET** `/` - Get all problems (Rectors)
- **GET** `/dashboard` - Dashboard statistics
- **GET** `/issue_stats` - Issue statistics
- **PUT** `/:id/status` - Update problem status
- **PUT** `/:id/assign` - Assign worker (Rectors)

## 🔐 Authentication

Uses JWT (JSON Web Tokens) for authentication:
- Access tokens: Short-lived (stored in-memory)
- Refresh tokens: Long-lived (stored in database)

### Protected Routes
Add Authorization header:
```
Authorization: Bearer <access_token>
```

## 👥 User Roles

- **Student**: Report problems, view own problems
- **Rector**: View all problems, assign workers, update status
- **Worker**: Update problem status when assigned

## 📦 Database Models

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required),
  role: String (enum: Student, Rector, Worker),
  hostel: String,
  mobile: String,
  profilePicture: String,
  isActive: Boolean
}
```

### Problem Model
```javascript
{
  title: String,
  description: String,
  category: String,
  priority: String (Low, Medium, High, Urgent),
  status: String (Open, In Progress, Resolved, Closed),
  reportedBy: ObjectId (User),
  assignedTo: ObjectId (User),
  problemImage: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🛠️ Technologies Used

- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **File Upload**: Cloudinary
- **Image Processing**: Multer
- **Password Hashing**: bcryptjs

## 📝 Environment Variables

Create a `.env` file with:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/campus-care
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d
NODE_ENV=development
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 🔄 Middleware

- **asyncHandler**: Wraps async route handlers to catch errors
- **protect**: Verifies JWT token (authentication)
- **authorizeRoles**: Checks user role (authorization)
- **upload**: Handles image uploads via Multer
- **validate**: Validates request data

## 📊 API Response Format

### Success Response
```json
{
  "success": true,
  "data": { /* data */ },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "status": 400
}
```

## 🚨 Error Handling

All errors are caught and returned with appropriate HTTP status codes:
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

## 📝 Available Scripts

- `npm run dev` - Start with nodemon (development)
- `npm start` - Start production server
- `npm test` - Run tests (if configured)

## 🤝 Contributing

Follow the existing code structure and naming conventions.

## 📄 License

This project is part of Campus Care - Hostel Management System.
