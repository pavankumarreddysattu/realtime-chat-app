# 💬 Real-Time Chat Application Using MERN and Socket.IO

![NodeJS](https://img.shields.io/badge/Node.js-20.x-green?style=flat-square&logo=node.js)
![Express](https://img.shields.io/badge/Express-5.x-lightgrey?style=flat-square&logo=express)
![React](https://img.shields.io/badge/React-19.x-blue?style=flat-square&logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square&logo=mongodb)
![Socket.IO](https://img.shields.io/badge/Socket.IO-RealTime-black?style=flat-square&logo=socketdotio)
![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwindcss)
![Jest](https://img.shields.io/badge/Jest-Testing-c21325?style=flat-square&logo=jest)

A full-stack real-time communication framework integrating **MongoDB**, **Express.js**, **React 19**, and **Node.js (MERN)** with **Socket.IO**. The proposed architecture combines **secure HTTP-only JWT authentication**, **in-memory socket handshake authorization**, and **Zustand state management** for real-time presence tracking (`getOnlineUsers`) and bi-directional message delivery acknowledgements (`messageDelivered`), supported by automated **Jest integration testing** and **GitHub Actions CI/CD**.


---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Zustand (State Management), React Router DOM, Axios, Socket.IO Client, Tailwind CSS v4, Lucide Icons
- **Backend**: Node.js, Express 5, Mongoose 9, MongoDB Atlas / Local MongoDB, Socket.IO, Bcryptjs, JsonWebToken, Cookie-Parser, Helmet, Express-Rate-Limit
- **Testing & CI**: Jest, Supertest, MongoDB Memory Server, GitHub Actions CI Workflow

---

## ✨ Features

- **Authentication & Security**:
  - Secure Signup, Login, and Logout flow.
  - Input validation: trimmed & lowercased emails, email regex checks, password length enforcement.
  - JWT tokens stored in `httpOnly`, `sameSite`, and `secure` HTTP cookies.
  - Security headers with `helmet` and strict rate limiting on auth endpoints (10 attempts / 15 mins).
- **Real-Time Communication**:
  - WebSockets powered by Socket.IO with handshake JWT authentication.
  - Live online status tracking (`getOnlineUsers`) with green indicator dots in sidebar.
  - Real-time instant message delivery (`newMessage`).
  - Two-way delivery acknowledgements (`messageDelivered`) updating checkmark icons (`Check` vs `CheckCheck`).
- **User Interface**:
  - Responsive dark-theme glassmorphism UI.
  - Interactive sidebar with live contact searching and online-only filter.
  - Auto-scrolling chat message stream.
  - Image attachments with instant preview.
  - Toast error alert banners and loading spinners.
- **Testing & Quality**:
  - Automated integration test suite running in-memory with `mongodb-memory-server` and `supertest`.
  - GitHub Actions CI pipeline running backend tests and frontend production builds on push/PR.

---

## 📌 Status

- **Status**: **Completed & Production Ready**
- All 6 development phases (Backend Hardening, Real-time Socket.IO, Frontend App, Security & Reliability, Tests & CI, Deployment Prep) are fully built and verified.

---

## 💻 Local Setup Instructions

### Prerequisites
- Node.js (v18+ or v20+)
- npm
- MongoDB Atlas account or local MongoDB server

### 1. Clone & Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder based on `.env.example`:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5001
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

Start the backend development server:

```bash
npm run dev
```

To run backend tests:

```bash
npm test
```

### 2. Setup Frontend

Open a new terminal window:

```bash
cd frontend
npm install
npm run dev
```

The application will be running at `http://localhost:5173` pointing to `http://localhost:3001/api`.

---

## 🌐 Production Deployment

- **Backend**: Set `NODE_ENV=production` and `CLIENT_URL=https://your-frontend-domain.com`. Cookie flags will automatically configure `sameSite="none"` and `secure=true` for cross-domain HTTPS support.
- **Frontend**: Set environment variable `VITE_API_URL=https://your-backend-domain.com/api` during `npm run build`.
