# Ex No: 1 - MERN Environment Setup Guide
**Date: 24-02-2026**

## MERN Stack Overview
MERN Stack is a JavaScript stack that comprises:
- **M**ongoDB - NoSQL Database
- **E**xpress - Backend Framework
- **R**eact - Frontend Library
- **N**ode.js - JavaScript Runtime

---

## 1. Prerequisites & Software Installation

### 1.1 System Requirements
- **OS**: Windows/Mac/Linux
- **RAM**: Minimum 4GB (8GB recommended)
- **Disk Space**: At least 5GB free space

### 1.2 Required Software Installation

#### A. Node.js and NPM
**Purpose**: Node.js is the JavaScript runtime environment; NPM is the package manager.

**Installation Steps**:
1. Visit: https://nodejs.org/
2. Download LTS version (Long Term Support)
3. Run the installer and follow the setup wizard
4. Verify installation:
   ```bash
   node --version
   npm --version
   ```
**Expected Output**:
```
v18.16.0 (or higher)
8.19.4 (or higher)
```

#### B. MongoDB
**Purpose**: NoSQL database for storing application data.

**Installation Options**:

**Option 1: MongoDB Community Edition (Local)**
1. Download from: https://www.mongodb.com/try/download/community
2. Install following the official guide for your OS
3. Start MongoDB service:
   ```bash
   mongod  # macOS/Linux
   # or on Windows: "C:\Program Files\MongoDB\Server\<version>\bin\mongod.exe"
   ```

**Option 2: MongoDB Atlas (Cloud - Recommended)**
1. Visit: https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/dbname`

#### C. Code Editor
**Recommended**: Visual Studio Code
- Download: https://code.visualstudio.com/
- Install extensions:
  - ES7+ React/Redux/React-Native snippets
  - Prettier - Code formatter
  - MongoDB for VS Code
  - REST Client

#### D. Git
**Purpose**: Version control system.
1. Download: https://git-scm.com/
2. Install and verify:
   ```bash
   git --version
   ```

---

## 2. Project Initialization

### 2.1 Create Project Directory Structure

```bash
# Create main project folder
mkdir smart-campus-complaint-management
cd smart-campus-complaint-management

# Create frontend folder
mkdir frontend
cd frontend

# Create React app using Create React App
npx create-react-app .
# or using Vite (faster)
npm create vite@latest . -- --template react

cd ..

# Create backend folder
mkdir backend
cd backend

# Initialize Node.js project
npm init -y
```

---

## 3. Frontend Setup (React)

### 3.1 Core Dependencies

**Navigate to frontend folder**:
```bash
cd frontend
```

**Install essential packages**:
```bash
# React and React Router
npm install react-router-dom

# HTTP client for API calls
npm install axios

# State management (optional but useful)
npm install zustand
# or
npm install redux @reduxjs/toolkit react-redux

# UI Components (optional)
npm install mui @emotion/react @emotion/styled
# or
npm install antd

# Form handling (optional)
npm install react-hook-form

# Date handling
npm install date-fns dayjs
```

### 3.2 Frontend File Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── ComplaintForm.jsx
│   │   ├── ComplaintList.jsx
│   │   └── Navigation.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Dashboard.jsx
│   │   └── AdminPanel.jsx
│   ├── hooks/
│   │   ├── useComplaints.js
│   │   └── useFetch.js
│   ├── context/
│   │   ├── ComplaintContext.js
│   │   └── AuthContext.js
│   ├── services/
│   │   ├── api.js
│   │   └── auth.js
│   ├── App.jsx
│   └── main.jsx
├── .env
├── package.json
└── vite.config.js (if using Vite)
```

### 3.3 Environment Configuration

**Create `.env` file in frontend folder**:
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Smart Campus Complaint Management
```

---

## 4. Backend Setup (Node.js + Express)

### 4.1 Core Dependencies

**Navigate to backend folder**:
```bash
cd backend
```

**Install essential packages**:
```bash
# Express web framework
npm install express

# MongoDB driver
npm install mongoose

# Environment variables
npm install dotenv

# Middleware
npm install cors
npm install body-parser

# Authentication
npm install jsonwebtoken
npm install bcryptjs

# Data validation
npm install joi
npm install express-validator

# Development tools
npm install --save-dev nodemon

# API Documentation (optional)
npm install swagger-ui-express swagger-jsdoc
```

### 4.2 Backend File Structure

```
backend/
├── models/
│   ├── Complaint.js
│   ├── User.js
│   └── Category.js
├── routes/
│   ├── complaintRoutes.js
│   ├── userRoutes.js
│   └── adminRoutes.js
├── controllers/
│   ├── complaintController.js
│   ├── userController.js
│   └── adminController.js
├── middleware/
│   ├── auth.js
│   └── validation.js
├── config/
│   └── db.js
├── server.js
├── .env
└── package.json
```

### 4.3 Backend Configuration

**Create `.env` file in backend folder**:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/complaints
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000,http://localhost:5173
```

### 4.4 Basic Server Setup

**Create `server.js`**:
```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN.split(',')
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/api/complaints', require('./routes/complaintRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Basic route
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## 5. MongoDB Setup

### 5.1 Creating Collections

**Sample Complaint Schema**:
```javascript
{
  _id: ObjectId,
  studentId: String,
  studentName: String,
  category: String,
  title: String,
  description: String,
  priority: String, // "Low", "Medium", "High"
  status: String, // "Open", "In Progress", "Resolved", "Closed"
  attachments: [String],
  createdAt: Date,
  updatedAt: Date,
  resolution: String
}
```

**Sample User Schema**:
```javascript
{
  _id: ObjectId,
  email: String,
  password: String (hashed),
  role: String, // "student", "admin"
  fullName: String,
  createdAt: Date
}
```

---

## 6. Development Workflow

### 6.1 Running the Application

**Terminal 1 - Start Backend**:
```bash
cd backend
npm install
nodemon server.js
# Output: Server running on port 5000
```

**Terminal 2 - Start Frontend**:
```bash
cd frontend
npm install
npm run dev
# Output: ➜ Local: http://localhost:5173/
```

### 6.2 Testing the Setup

1. **Check Backend Health**:
   ```bash
   curl http://localhost:5000/api/health
   # Response: {"status":"Server is running"}
   ```

2. **Check Frontend**: Open http://localhost:5173/ in browser

---

## 7. Package.json Scripts Configuration

### Frontend Scripts

**package.json**:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext js,jsx"
  }
}
```

### Backend Scripts

**package.json**:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest"
  }
}
```

---

## 8. API Communication Setup

### 8.1 Axios Configuration (Frontend)

**Create `src/services/api.js`**:
```javascript
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
```

---

## 9. Security Best Practices

1. **Never commit `.env` files** - Add to `.gitignore`
2. **Use HTTPS in production**
3. **Hash passwords** with bcryptjs
4. **Validate all inputs** on both frontend and backend
5. **Use JWT for authentication**
6. **Set CORS properly** - don't use '*' in production
7. **Use environment variables** for sensitive data

---

## 10. Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 5000 already in use | `lsof -i :5000` then kill process or use different port |
| MongoDB connection fails | Check connection string and IP whitelist in Atlas |
| CORS errors | Verify CORS_ORIGIN in .env matches frontend URL |
| npm dependencies conflict | Delete node_modules and package-lock.json, then `npm install` |
| React not refreshing | Check if port is correct and dev server is running |

---

## 11. Useful Commands Reference

```bash
# Backend
npm init -y                           # Initialize project
npm install <package-name>            # Install package
npm install --save-dev <package-name> # Install dev dependency
nodemon server.js                     # Run with auto-reload
npm start                             # Run server

# Frontend
npx create-react-app .               # Create React app
npm install                          # Install dependencies
npm run dev                          # Start dev server
npm run build                        # Build for production
npm run preview                      # Preview production build

# Database
mongod                               # Start MongoDB local
mongo                                # Connect to MongoDB
db.complaints.find()                # View all complaints
```

---

## Summary Checklist

✅ Install Node.js and NPM
✅ Install MongoDB (local or Atlas)
✅ Install Visual Studio Code
✅ Create project directory structure
✅ Initialize frontend with React/Vite
✅ Initialize backend with Express
✅ Install all dependencies
✅ Configure environment variables
✅ Set up API endpoints
✅ Configure CORS
✅ Test both frontend and backend
✅ Ready for development!

