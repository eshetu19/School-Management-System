# Student Management System

A full-stack student management system for high schools. Manage students, teachers, attendance, grades, and registrations with role-based access.

## Features

- **Role-Based Access** - Admin, Teacher, and Student portals
- **Student Management** - Add, edit, delete, and view student profiles
- **Teacher Management** - Manage teacher accounts and subject assignments
- **Class Management** - Create classes and assign students/teachers
- **Attendance Tracking** - Mark daily attendance with present/absent/late status
- **Grade Management** - Enter and view grades with automatic grade calculation
- **Registration Portal** - Online student registration with admin approval
- **Reports** - Generate attendance and grade reports (CSV/Excel)

## Tech Stack

### Frontend
- React 18
- Vite
- TailwindCSS
- Recharts
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcryptjs

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)

### Backend Setup
bash
cd backend
npm install
npm start
###frontend setup
bash
cd frontend
npm install
npm run dev

Environment Variables

Create .env in backend folder:
env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
CLIENT_URL=
Project Structure

backend/
├── controllers/     # Request handlers
├── models/          # Database models
├── routes/          # API routes
├── middleware/      # Auth, validation, error handlers
├── config/          # Database config
└── utils/           # Helper functions

frontend/
├── components/      # Reusable UI components
├── pages/           # Page components
├── contexts/        # React contexts (Auth, Role, etc.)
├── services/        # API services
├── layouts/         # Layout wrappers
└── routes/          # Route definitions
Deployment

Backend (Render/Railway)

1. Push code to GitHub
2. Connect repository to Render/Railway
3. Add environment variables
4. Deploy

Frontend (Vercel/Netlify)

1. Push code to GitHub
2. Connect repository to Vercel/Netlify
3. Set build command: npm run build
4. Set publish directory: dist

License

MIT

Author

Eshetu Tsegaye


