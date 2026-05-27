# Campus Care - Frontend

Campus Care is a comprehensive hostel management system designed for educational institutions. This is the React frontend application.

## 📁 Project Structure

```
src/
├── api/                    # API configuration and axios instance
│   └── api.js             # Axios instance with interceptors
│
├── components/            # Reusable React components
│   ├── Alert.jsx          # Alert/Toast component
│   ├── Button.jsx         # Custom Button component
│   ├── Card.jsx           # Card container component
│   ├── Input.jsx          # Form input component
│   ├── LoadingSpinner.jsx # Loading indicator component
│   ├── ProtectedRoute.jsx # Route protection wrapper
│   ├── Select.jsx         # Form select component
│   └── index.js           # Component exports
│
├── context/               # React Context for state management
│   └── AuthContext.jsx    # Authentication context
│
├── pages/                 # Page components
│   ├── About.jsx          # About page
│   ├── Dashboard.jsx      # User dashboard
│   ├── Landing.jsx        # Home/landing page
│   ├── Login.jsx          # Login page
│   ├── NotFound.jsx       # 404 page
│   └── Register.jsx       # Registration page
│
├── routes/                # Route definitions
│   └── AppRoutes.jsx      # Main route configuration
│
├── services/              # API service functions
│   └── api.service.js     # API calls and business logic
│
├── utils/                 # Utility functions
│   ├── constants.js       # App constants and configuration
│   └── helpers.js         # Helper functions
│
├── App.jsx                # Main App component
├── index.css              # Global styles
└── main.jsx               # Entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Frontend/Hostel_mangement_frontend
```

2. Install dependencies
```bash
npm install
```

3. Create environment file
```bash
cp .env.example .env
```

4. Update `.env` with your configuration

Use the Vite environment variable `VITE_API_URL` (do NOT include `/api`). Example for local development:

```
VITE_API_URL=http://localhost:3000
```

For production (Vercel), add the `VITE_API_URL` environment variable in your Vercel project settings pointing to your backend (Render) URL, for example `https://hostel-flow-hpqy.onrender.com`.

Important: Do not commit your `.env` file. Use `.env.example` to document example values.

### Running the Application

```bash
npm run dev
```

The application will start at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 📚 Components Guide

### Button
```jsx
import { Button } from './components';

<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>
```

### Input
```jsx
import { Input } from './components';

<Input 
  label="Email" 
  type="email" 
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={emailError}
/>
```

### Alert
```jsx
import { Alert } from './components';

<Alert 
  type="success" 
  message="Success message" 
  onClose={() => setAlert(null)}
/>
```

### ProtectedRoute
```jsx
import { ProtectedRoute } from './components';

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

## 🔐 Authentication

### Using AuthContext

```jsx
import { useAuth } from './context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user.name}!</p>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
}
```

## 🛠️ Services

### Authentication Service
```jsx
import { authService } from './services/api.service';

// Register
await authService.register({ name, email, password, role });

// Login
await authService.login(email, password);

// Logout
await authService.logout();

// Get Profile
await authService.getProfile();
```

### Problem Service
```jsx
import { problemService } from './services/api.service';

// Create problem
await problemService.createProblem(problemData);

// Get my problems
await problemService.getMyProblems(page, limit);

// Get all problems (admin)
await problemService.getAllProblems(page, limit);

// Update status
await problemService.updateProblemStatus(id, status);
```

## 🛡️ Utils & Helpers

### Constants
```jsx
import { ROLES, PROBLEM_STATUS, ROUTES } from './utils/constants';
```

### Helper Functions
```jsx
import { storage, validation, dateHelpers } from './utils/helpers';

// Storage
storage.setToken(token);
const token = storage.getToken();

// Validation
validation.isValidEmail(email);
validation.isValidPassword(password);

// Date formatting
dateHelpers.formatDate(date);
dateHelpers.getTimeAgo(date);
```

## 📱 Features

- ✅ User Registration & Login
- ✅ Role-Based Access Control
- ✅ Protected Routes
- ✅ Responsive Design
- ✅ Reusable Components
- ✅ Context-based State Management
- ✅ Error Handling
- ✅ Form Validation

## 🔄 API Integration

The frontend communicates with the backend API at `http://localhost:3000/api`

### Environment Variables
- `REACT_APP_API_URL` - Backend API URL

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🤝 Contributing

Please follow the existing code structure and naming conventions.

## 📄 License

This project is part of Campus Care - Hostel Management System.
