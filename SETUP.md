# Campus Care - Complete Setup Guide

Complete step-by-step guide to set up and run the Campus Care hostel management system locally.

## 📋 Prerequisites

Before you start, ensure you have:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** - Either:
  - Local MongoDB server installed
  - MongoDB Atlas account (cloud database)
- **Git** (for version control) - [Download](https://git-scm.com/)
- **Code Editor** - VS Code recommended

### Verify Installation
```bash
# Check Node.js
node --version
# Expected: v14.0.0 or higher

# Check npm
npm --version
# Expected: 6.0.0 or higher
```

## 🗄️ Database Setup

### Option 1: MongoDB Atlas (Recommended for Development)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create an account (free tier available)
3. Create a cluster
4. Click "Connect"
5. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority`

### Option 2: Local MongoDB

1. Install MongoDB Community Edition:
   - [Windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)
   - [Mac](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-macos/)
   - [Linux](https://docs.mongodb.com/manual/administration/install-on-linux/)

2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # Mac
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

3. Local connection string: `mongodb://localhost:27017/campus-care`

## 🛠️ Backend Setup

### Step 1: Navigate to Backend Directory

```bash
cd Backend
```

### Step 2: Install Dependencies

```bash
npm install
```

Expected packages (from package.json):
- express
- mongoose
- jsonwebtoken
- bcryptjs
- cors
- dotenv
- multer
- cloudinary

### Step 3: Create Environment File

```bash
# Copy the example file
cp .env.example .env
```

### Step 4: Configure Environment Variables

Edit `Backend/.env` file:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/campus-care
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/campus-care

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_REFRESH_SECRET=your_super_secret_refresh_key_change_this_in_production
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# Cloudinary (for image uploads)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Step 5: Start Backend Server

```bash
npm run dev
```

Expected output:
```
Server running at http://localhost:3000
MongoDB connected successfully
```

### Step 6: Test Backend (Optional)

```bash
# In a new terminal, test the API
curl http://localhost:3000/api/auth/profile
# Should return an error (no token) - this is expected
```

## 🎨 Frontend Setup

### Step 1: Navigate to Frontend Directory

```bash
cd Frontend/Hostel_mangement_frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

Expected packages (from package.json):
- react
- react-router-dom
- axios
- tailwindcss
- vite
- @vitejs/plugin-react

### Step 3: Create Environment File

```bash
# Copy the example file
cp .env.example .env
```

### Step 4: Configure Environment Variables

Edit `Frontend/Hostel_mangement_frontend/.env` file:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api

# App Configuration
VITE_APP_NAME=Campus Care
```

### Step 5: Start Frontend Development Server

```bash
npm run dev
```

Expected output:
```
VITE v8.0.2  ready in 123 ms

➜  Local:   http://localhost:5173/
```

### Step 6: Open in Browser

Visit [http://localhost:5173](http://localhost:5173) in your browser

## ✅ Verification Checklist

### Backend Verification ✓

- [ ] Backend server starts without errors
- [ ] No database connection errors
- [ ] Console shows "Server running at http://localhost:3000"

### Frontend Verification ✓

- [ ] Frontend loads at http://localhost:5173
- [ ] See Campus Care landing page
- [ ] No console errors in browser DevTools

### End-to-End Verification ✓

1. Click "Register" button on landing page
2. Fill registration form:
   - Name: Test User
   - Email: test@paruluniversity.ac.in
   - Password: Test@123
   - Role: Student
3. Click "Register"
4. Should be redirected to dashboard
5. See user profile information displayed

If all above work ✓, your setup is complete!

## 🚀 Usage

### Running Both Servers

Option 1: Two Terminal Windows
```bash
# Terminal 1 - Backend
cd Backend
npm run dev

# Terminal 2 - Frontend
cd Frontend/Hostel_mangement_frontend
npm run dev
```

Option 2: One Terminal (MacOS/Linux)
```bash
# In Backend directory
npm run dev &

# In Frontend directory
npm run dev
```

## 📁 Project Structure After Setup

```
Hostel_Management/
├── README.md                 # Main documentation
├── SETUP.md                  # This file
│
├── Backend/
│   ├── .env                  # Backend configuration
│   ├── package.json
│   ├── index.js
│   ├── src/
│   │   ├── app.js
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── db/
│   └── README_BACKEND.md
│
└── Frontend/
    └── Hostel_mangement_frontend/
        ├── .env              # Frontend configuration
        ├── package.json
        ├── src/
        │   ├── main.jsx
        │   ├── App.jsx
        │   ├── components/
        │   ├── pages/
        │   ├── routes/
        │   ├── services/
        │   ├── context/
        │   ├── api/
        │   └── utils/
        └── README_FRONTEND.md
```

## 🔍 Troubleshooting

### Backend Issues

**MongoDB Connection Error**
```
Error: connect ECONNREFUSED
```
**Solution**: 
- Check MongoDB service is running: `mongod` or restart your MongoDB service
- Check MongoDB URI in .env file
- For Atlas: Ensure IP whitelist includes your computer's IP

**Port 3000 Already in Use**
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Solution**:
- Change PORT in .env to 3001, 3002, etc.
- Or kill process: `lsof -i :3000` and `kill -9 <PID>`

**Module Not Found**
```
Error: Cannot find module 'express'
```
**Solution**: Run `npm install` in Backend directory

### Frontend Issues

**CORS Error in Console**
```
Access to XMLHttpRequest at 'http://localhost:3000/api/auth/register' 
from origin 'http://localhost:5173' has been blocked by CORS policy
```
**Solution**:
- Ensure backend is running
- Check CORS configuration in Backend/index.js includes 5173
- Check VITE_API_BASE_URL in .env is correct

**Page Showing Blank**
```
Error in console: Cannot read properties of undefined
```
**Solution**:
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache
- Check browser console for specific errors

**Port 5173 Already in Use**
```
Port 5173 is in use
```
**Solution**:
- Use a different port: `npm run dev -- --port 5174`
- Or kill the process occupying port 5173

## 🔐 Security Notes

⚠️ **For Development Only**:
- Current JWT secrets are placeholders
- Change them in production
- Never commit .env file with real secrets
- Use environment variables for production deployment

## 📚 Next Steps

1. **Explore the Codebase**:
   - Read [Frontend README](Frontend/Hostel_mangement_frontend/README_FRONTEND.md)
   - Read [Backend README](Backend/README_BACKEND.md)

2. **Test Features**:
   - Register with different roles (Student, Rector, Worker)
   - Check dashboard functionality
   - Test login after logout

3. **Development**:
   - Create new features on separate branches
   - Follow existing code patterns
   - Add unit tests

## 📞 Common Commands

```bash
# Backend
npm run dev              # Start with nodemon (recommended)
npm start                # Start production
npm test                 # Run tests

# Frontend
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint
```

## 🆘 Getting Help

If you encounter issues:

1. **Check the README files**:
   - [README.md](README.md) - Project overview
   - [Frontend README](Frontend/Hostel_mangement_frontend/README_FRONTEND.md) - Frontend specific
   - [Backend README](Backend/README_BACKEND.md) - Backend specific

2. **Check node_modules/error logs**:
   - Look for specific error messages
   - Search for the error message + technology name online

3. **Verify installations**:
   - `node --version`
   - `npm --version`
   - `mongod --version`

4. **Try clean reinstall**:
   ```bash
   # Backend
   rm -rf Backend/node_modules
   npm install
   
   # Frontend
   rm -rf Frontend/Hostel_mangement_frontend/node_modules
   npm install
   ```

## ✨ What's Working

After successful setup, you should have:

✅ User authentication (register/login/logout)
✅ Role-based dashboards
✅ Protected routes
✅ API service layer
✅ Global state management
✅ Responsive UI design
✅ Error handling
✅ Loading states

## 🎉 Congratulations!

You're all set! Campus Care is ready for development.

For questions about specific features or components, refer to the detailed README files in each directory.

---

**Happy coding! 🚀**
