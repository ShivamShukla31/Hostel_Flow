# Campus Care - Troubleshooting Guide

Common issues and their solutions.

## 🔴 Backend Issues

### 1. MongoDB Connection Errors

#### Error: `connect ECONNREFUSED 127.0.0.1:27017`

**Cause**: MongoDB service is not running

**Solution**:
```bash
# Windows - Start MongoDB service
net start MongoDB

# Mac - Start MongoDB service
brew services start mongodb-community

# Linux - Start MongoDB service
sudo systemctl start mongod

# Verify MongoDB is running
mongod --version
```

#### Error: `MongoNetworkError: Failed to connect to database`

**Cause**: MongoDB URI is incorrect in .env file

**Solution**:
1. Check your .env file:
   ```bash
   cat .env | grep MONGODB_URI
   ```

2. Verify the connection string:
   - Local: `mongodb://localhost:27017/campus-care`
   - Atlas: `mongodb+srv://username:password@cluster.mongodb.net/campus-care?retryWrites=true&w=majority`

3. For MongoDB Atlas, whitelist your IP:
   - Go to MongoDB Atlas dashboard
   - Click "Network Access"
   - Click "Add IP Address"
   - Choose "Add Current IP Address" or "0.0.0.0/0" for development

#### Error: `Authentication failed` (MongoDB Atlas)

**Cause**: Wrong username/password in connection string

**Solution**:
1. Go to MongoDB Atlas
2. Click "Database Access"
3. Click "Edit" on your user
4. Update password
5. Update connection string in .env
6. Restart backend: `npm run dev`

### 2. Port Already in Use

#### Error: `Error: listen EADDRINUSE: address already in use :::3000`

**Cause**: Port 3000 is already occupied

**Solution**:

**Windows**:
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

**Mac/Linux**:
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process (replace PID with actual process ID)
kill -9 <PID>
```

**Alternative**: Change port in .env file
```env
PORT=3001
```

### 3. Dependencies Not Installed

#### Error: `Cannot find module 'express'`

**Cause**: Dependencies not installed or node_modules corrupted

**Solution**:
```bash
# Clean install
rm -rf node_modules
rm package-lock.json
npm cache clean --force
npm install

# Verify installation
npm list express
```

### 4. Environment Variables Not Loading

#### Error: `undefined` values for environment variables

**Cause**: .env file not created or dotenv not configured

**Solution**:
```bash
# Verify .env exists in Backend directory
ls -la Backend/.env

# If not exists, create it
cp Backend/.env.example Backend/.env

# Check if dotenv is imported in index.js
grep "require('dotenv')" Backend/index.js

# Should see output, if not add to top of Backend/index.js:
# require('dotenv').config();
```

### 5. CORS Errors in Frontend Requests

#### Error: `CORS policy: No 'Access-Control-Allow-Origin' header is present`

**Cause**: Backend CORS not configured correctly

**Solution**:
1. Check Backend/index.js has proper CORS config:
   ```javascript
   const cors = require('cors');
   const corsOptions = {
     origin: ['http://localhost:5173', 'http://localhost:5174'],
     credentials: true
   };
   app.use(cors(corsOptions));
   ```

2. Verify frontend is using correct API URL in .env:
   ```env
   VITE_API_BASE_URL=http://localhost:3000/api
   ```

3. Restart both servers

### 6. JWT Token Errors

#### Error: `Invalid token` or `Token expired`

**Cause**: JWT secret changed or token is old

**Solution**:
1. Check JWT_SECRET in .env hasn't changed
2. Clear localStorage on client:
   ```javascript
   // In browser console
   localStorage.clear()
   // Then refresh page and login again
   ```

3. Verify token generation in backend:
   ```bash
   # Check generateToken.js exists
   ls Backend/src/utils/generateToken.js
   ```

---

## 🟡 Frontend Issues

### 1. Page Shows Blank

#### Error: White page with no content

**Cause**: JavaScript error or incorrect routing

**Solution**:
```bash
# Check browser console
# Press F12 or right-click → Inspect → Console

# Hard refresh
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (Mac)

# Clear browser cache
# Chrome: Settings → Privacy → Clear browsing data
# Firefox: History → Clear Recent History

# Check if server is running
curl http://localhost:5173
```

### 2. API Requests Fail

#### Error: `Network Error` in console

**Cause**: Backend not running or CORS issue

**Solution**:
```bash
# 1. Verify backend is running
curl http://localhost:3000/api/auth/profile
# Should return unauthorized error (expected)

# 2. Check CORS configuration
# Backend/index.js should have proper origin list

# 3. Verify API URL in frontend .env
cat Frontend/Hostel_mangement_frontend/.env

# 4. Restart both servers
```

### 3. Port 5173 Already in Use

#### Error: `Port 5173 is in use`

**Cause**: Another vite dev server already running

**Solution**:

**Windows**:
```powershell
# Find process using port 5173
netstat -ano | findstr :5173

# Kill the process
taskkill /PID <PID> /F
```

**Mac/Linux**:
```bash
# Find process using port 5173
lsof -i :5173

# Kill the process
kill -9 <PID>
```

**Alternative**: Use different port
```bash
npm run dev -- --port 5174
```

### 4. Login/Register Not Working

#### Error: Registration fails silently

**Cause**: Backend returns error or API not responding

**Solution**:
1. Check browser DevTools Console (F12)
2. Look for error message
3. Check Network tab:
   - Click on the failed request
   - Check Response tab for error details
4. Verify backend is running: `curl http://localhost:3000/api/auth/profile`

#### Error: "Invalid email format"

**Cause**: Email doesn't match Parul University format

**Solution**:
- Use email ending with: `@paruluniversity.ac.in`
- Example: `john@paruluniversity.ac.in`

### 5. Components Not Rendering

#### Error: `Cannot read property of undefined`

**Cause**: Component prop or state undefined

**Solution**:
1. Add error boundary logging in component:
   ```jsx
   console.log('Component mounted');
   console.log('User from context:', user);
   ```

2. Check if context provider wraps the component:
   - App.jsx should have `<AuthProvider>`
   - Verify in App.jsx

3. Check useAuth hook is used correctly:
   ```jsx
   const { user } = useAuth();
   console.log(user); // Should not be undefined
   ```

### 6. Styles Not Applied

#### Error: Components not styled (missing Tailwind)

**Cause**: Tailwind not configured or classes not loaded

**Solution**:
```bash
# Verify Tailwind is installed
npm list tailwindcss

# Check tailwind.config.js exists
ls tailwind.config.js

# Check index.css imports Tailwind
grep "@tailwind" src/index.css

# Restart dev server
npm run dev
```

### 7. Protected Routes Redirect to Login

#### Error: Dashboard shows login instead of content

**Cause**: Token not in localStorage or invalid

**Solution**:
1. Clear localStorage and login again:
   ```javascript
   // In browser console
   localStorage.clear()
   location.reload()
   ```

2. Check token is being saved:
   ```javascript
   // In browser console
   console.log(localStorage.getItem('token'))
   ```

3. If empty, backend login endpoint not returning token:
   - Check backend logs
   - Verify user was created in database

---

## 🟢 Both Frontend & Backend

### 1. npm install Fails

#### Error: `npm ERR! ERESOLVE unable to resolve dependency tree`

**Cause**: Version conflicts in dependencies

**Solution**:
```bash
# Use legacy peer dependencies
npm install --legacy-peer-deps

# Or use npm version 7+
npm --version  # Should be >= 7

# Or clear npm cache
npm cache clean --force
npm install
```

### 2. Node/npm Version Issues

#### Error: `engines: node version does not satisfy package.json requirement`

**Cause**: Wrong Node.js version

**Solution**:
```bash
# Check current version
node --version
npm --version

# Expected: Node 14+ and npm 6+

# Update Node.js
# Download from https://nodejs.org/

# Or use nvm (Node Version Manager)
nvm install 18
nvm use 18
node --version
```

### 3. Git Issues

#### Error: `fatal: not a git repository`

**Cause**: Project not initialized as git repo

**Solution**:
```bash
cd Hostel_Management
git init
git add .
git commit -m "Initial commit"
```

#### Error: `Permission denied (publickey)`

**Cause**: SSH key not configured for GitHub

**Solution**:
1. Add SSH key to GitHub:
   ```bash
   # Generate SSH key (if not exists)
   ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa
   
   # Copy public key
   cat ~/.ssh/id_rsa.pub
   ```

2. Add to GitHub: Settings → SSH and GPG keys → New SSH key

3. Test connection:
   ```bash
   ssh -T git@github.com
   ```

---

## 🔵 Database Issues

### 1. Cannot Connect to MongoDB

**Solution**:
```bash
# Test connection with mongosh
mongosh "mongodb://localhost:27017/campus-care"

# If mongosh not found, install it
npm install -g mongosh

# Or use MongoDB Compass GUI (download from mongodb.com)
```

### 2. Collections Not Created

#### Error: Finding document returns null

**Cause**: Collection not initialized

**Solution**:
1. Ensure model is properly defined:
   ```bash
   cat Backend/src/models/users.model.js
   ```

2. Connect to MongoDB and check:
   ```bash
   mongosh
   > use campus-care
   > db.collections()
   ```

3. Insert test data:
   ```bash
   mongosh
   > use campus-care
   > db.users.insertOne({name: "Test", email: "test@example.com"})
   ```

---

## 🛠️ Advanced Debugging

### Enable Verbose Logging

**Backend**:
```bash
# Set debug env var
export DEBUG=*
npm run dev

# Or in .env
NODE_ENV=development
DEBUG=express:*
```

**Frontend**:
```javascript
// In api.js
api.interceptors.response.use(
  response => {
    console.log('API Response:', response);
    return response;
  },
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);
```

### Check Database State

```bash
# MongoDB shell
mongosh

# Use database
> use campus-care

# View users
> db.users.find()

# View problems
> db.problems.find()

# View refresh tokens
> db.refreshtokens.find()

# Count documents
> db.users.countDocuments()
```

### Browser DevTools

1. **Console Tab**: Check for JavaScript errors
2. **Network Tab**: Check API requests and responses
3. **Application Tab**: Check localStorage/cookies
4. **Sources Tab**: Set breakpoints and debug

---

## 📞 Still Having Issues?

1. **Check existing issues** on GitHub
2. **Read the READMEs**:
   - [README.md](README.md) - Overview
   - [Frontend README](Frontend/Hostel_mangement_frontend/README_FRONTEND.md)
   - [Backend README](Backend/README_BACKEND.md)
3. **Check SETUP.md** - Detailed setup guide
4. **Review your .env files** - Common issue source

---

**Remember**: Most issues are due to:
1. ❌ Forgetting to run `npm install`
2. ❌ MongoDB not running
3. ❌ Environment variables not set
4. ❌ Wrong API URL in frontend
5. ❌ Port already in use

**Good luck! 🚀**
