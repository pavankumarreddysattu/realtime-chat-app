# Real-Time Chat App

A full-stack MERN (MongoDB, Express.js, React, Node.js) real-time chat application powered by Socket.IO, featuring secure httpOnly JWT authentication, rate limiting, real-time message delivery acknowledgements, glassmorphism UI design, automated Jest tests, and GitHub Actions CI.


---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Zustand (State Management), React Router DOM, Axios, Socket.IO Client, Tailwind CSS v4, Lucide Icons
- **Backend**: Node.js, Express 5, Mongoose 9, MongoDB Atlas / Local MongoDB, Socket.IO, Bcrypt.js, JsonWebToken, Cookie-Parser, Helmet, Express-Rate-Limit
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

The application will be running at `http://localhost:5173` pointing to `http://localhost:5001/api`.

---

## 🌐 Production Deployment

- **Backend**: Set `NODE_ENV=production` and `CLIENT_URL=https://your-frontend-domain.com`. Cookie flags will automatically configure `sameSite="none"` and `secure=true` for cross-domain HTTPS support.
- **Frontend**: Set environment variable `VITE_API_URL=https://your-backend-domain.com/api` during `npm run build`.
