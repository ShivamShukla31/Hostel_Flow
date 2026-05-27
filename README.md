# Campus Care - Hostel Management System

A comprehensive digital platform for managing hostel operations, problem reporting, and issue tracking at educational institutions.

## 📚 Overview

Campus Care is a **role-based web application** designed to streamline hostel management through:
- Student problem reporting and tracking
- Administrative oversight and worker assignment
- Real-time status updates
- Document and image management

**Built for**: Educational institutions (colleges, universities, hostels)
**Use Cases**: Maintenance issues, infrastructure problems, facility requests, complaints

## 🏗️ Project Architecture

```
Hostel_Management/
├── Frontend/                          # React + Vite SPA
│   └── Hostel_mangement_frontend/
│       ├── src/
│       │   ├── components/           # Reusable UI components
│       │   ├── pages/                # Page components
│       │   ├── routes/               # Route configuration
│       │   ├── services/             # API service layer
│       │   ├── context/              # Auth context
│       │   ├── api/                  # Axios configuration
│       │   ├── utils/                # Helpers and utilities
│       │   ├── App.jsx
│       │   └── main.jsx
│       └── README_FRONTEND.md
│
└── Backend/                           # Express.js server
    ├── src/
    │   ├── controllers/              # Business logic
    │   ├── middleware/               # Express middleware
    │   ├── models/                   # Database schemas
    │   ├── routes/                   # API routes
    │   ├── utils/                    # Utilities
    │   ├── db/                       # Database config
    │   └── app.js
    ├── index.js
    └── README_BACKEND.md
```

## 🎯 Key Features

### 👥 Role-Based Access
- **Students**: Report problems, track status
- **Rectors**: View all problems, assign workers, manage system
- **Workers**: Update problem status on assigned tasks
- **Admins**: Full system access

### 📋 Problem Management
- Create detailed problem reports with images
- Track status in real-time (Open → In Progress → Resolved → Closed)
- Priority levels (Low, Medium, High, Urgent)
- Category-based organization

### 🖼️ Media Support
- Image upload for problem reports
- Cloudinary integration for image hosting
- Profile picture management

### 🔐 Security
- JWT-based authentication
- Refresh token mechanism
- Password encryption (bcryptjs)
- Role-based access control

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm or yarn

### Backend Setup

```bash
cd Backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

Server runs on `http://localhost:3000`

### Frontend Setup

```bash
cd Frontend/Hostel_mangement_frontend
npm install
cp .env.example .env
# Edit .env with API URL (http://localhost:3000)
npm run dev
```

Client runs on `http://localhost:5173`

## 📋 Tech Stack

### Frontend
- **React 19.2.4** - UI library
- **Vite** - Build tool
- **React Router 7** - Routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Context API** - State management

### Backend
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File uploads
- **Cloudinary** - Image hosting

## 📚 Documentation

- [Frontend README](Frontend/Hostel_mangement_frontend/README_FRONTEND.md) - Frontend architecture, components, services
- [Backend README](Backend/README_BACKEND.md) - Backend structure, API endpoints, database models

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh-token` - Refresh token
- `POST /api/auth/logout` - Logout
- `GET /api/auth/profile` - Get user profile

### Problems
- `POST /api/problems` - Create problem
- `GET /api/problems/my` - Get my problems
- `GET /api/problems` - Get all problems (Admin)
- `PUT /api/problems/:id/status` - Update status
- `PUT /api/problems/:id/assign` - Assign worker

## 🌐 CORS Configuration

Frontend can run on multiple ports during development:
- localhost:5173 (default Vite)
- localhost:5174
- localhost:5175
- localhost:5176

Backend API accepts requests from all configured ports with credentials.

## 📝 Environment Configuration

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:3000/api
```

### Backend (.env)
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/campus-care
JWT_SECRET=your_secret_key
JWT_REFRESH_SECRET=your_refresh_secret
NODE_ENV=development
```

## 🎨 Design Features

- **Modern UI**: Glassmorphism effects, gradient buttons
- **Responsive Design**: Mobile-first approach with Tailwind
- **Consistent Branding**: Campus Care theme throughout
- **Error Handling**: User-friendly error messages
- **Loading States**: Visual feedback during operations

## 📊 User Flow

```
┌─────────────────────────────────────────────────────────┐
│                    Landing Page                          │
│              (Public, no auth required)                 │
└─────────────────┬───────────────────────────────────────┘
                  │
        ┌─────────┴─────────────────────┐
        │                               │
        ▼                               ▼
   [Register]                      [Login]
        │                               │
        └─────────────────┬─────────────┘
                          │
                          ▼
                    [Dashboard]
                   (Role-based)
                          │
        ┌─────────┬───────┼───────┬─────────────┐
        │         │       │       │             │
        ▼         ▼       ▼       ▼             ▼
     [Student]  [Rector] [Worker] [Admin]
```

## 🔄 Authentication Flow

```
1. User registers/logs in with email & password
2. Backend validates and returns JWT access token
3. Frontend stores token in localStorage
4. Axios interceptor adds token to all requests
5. Backend validates token on protected routes
6. Expired token triggers refresh token exchange
7. Fresh token returned, request retried automatically
```

## 🛡️ Security Features

- ✅ Password hashing with bcryptjs (10 rounds)
- ✅ JWT authentication with short expiration
- ✅ Refresh token rotation
- ✅ Cookie-based storage for sensitive data
- ✅ Role-based access control
- ✅ Protected routes
- ✅ CORS configuration
- ✅ Error message sanitization

## 📦 Project Statistics

| Metric | Count |
|--------|-------|
| Frontend Components | 7+ |
| Backend Routes | 15+ |
| Database Models | 3 |
| Middleware Functions | 8+ |
| API Endpoints | 10+ |
| Utility Files | 8+ |

## 🚦 Development Workflow

1. **Feature Branch**: Create feature branch from main
2. **Frontend Development**: Build components and integrate with services
3. **Backend Development**: Create endpoints and validate business logic
4. **Testing**: Test API endpoints with frontend
5. **Code Review**: Check code quality and consistency
6. **Merge**: Merge to main branch

## 📱 Responsive Design

- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+

All components use Tailwind's responsive classes for proper scaling.

## 🔗 API Response Format

### Success
```json
{
  "success": true,
  "data": { /* data */ },
  "message": "Success message"
}
```

### Error
```json
{
  "success": false,
  "message": "Error message",
  "status": 400
}
```

## 🎯 Future Enhancements

- [ ] Real-time notifications (Socket.io)
- [ ] Email notifications
- [ ] Admin analytics dashboard
- [ ] Mobile app
- [ ] Two-factor authentication
- [ ] Bulk problem operations
- [ ] Advanced reporting
- [ ] Work order scheduling
- [ ] Customer ratings/feedback

## 🤝 Contributing

1. Follow the existing code structure
2. Use meaningful variable/function names
3. Comment complex logic
4. Test before pushing
5. Follow convention over configuration

## 📄 License

Campus Care © 2024. All rights reserved.

## 📞 Support

For issues or questions:
- Check the [Frontend README](Frontend/Hostel_mangement_frontend/README_FRONTEND.md)
- Check the [Backend README](Backend/README_BACKEND.md)
- Review the code comments

---

**Built with ❤️ for better hostel management**
