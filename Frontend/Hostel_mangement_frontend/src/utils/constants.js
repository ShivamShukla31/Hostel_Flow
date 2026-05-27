// API Configuration
// API Configuration
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const API_TIMEOUT = 10000;

// Auth Constants
export const AUTH_TOKEN_KEY = 'token';
export const USER_KEY = 'user';

// User Roles
export const ROLES = {
  STUDENT: 'Student',
  RECTOR: 'Rector',
  WORKER: 'Worker'
};

// Problem Status
export const PROBLEM_STATUS = {
  OPEN: 'Open',
  IN_PROGRESS: 'In Progress',
  RESOLVED: 'Resolved',
  CLOSED: 'Closed'
};

// Problem Priority
export const PROBLEM_PRIORITY = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  URGENT: 'Urgent'
};

// Messages
export const MESSAGES = {
  SUCCESS: {
    LOGIN: 'Login successful!',
    REGISTER: 'Registration successful!',
    UPDATE: 'Updated successfully!',
    DELETE: 'Deleted successfully!',
    PROBLEM_CREATED: 'Problem reported successfully!'
  },
  ERROR: {
    LOGIN_FAILED: 'Login failed. Please try again.',
    REGISTER_FAILED: 'Registration failed. Please try again.',
    INVALID_CREDENTIALS: 'Invalid email or password',
    REQUIRED_FIELD: 'This field is required',
    UNAUTHORIZED: 'You are not authorized to perform this action',
    SERVER_ERROR: 'Server error. Please try again later.'
  }
};

// Routes
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/student/dashboard',
  NOT_FOUND: '/404'
};

// Pagination
export const ITEMS_PER_PAGE = 10;

// Date Format
export const DATE_FORMAT = 'MMM DD, YYYY';
export const DATETIME_FORMAT = 'MMM DD, YYYY hh:mm A';
