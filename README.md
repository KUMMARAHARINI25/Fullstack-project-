# Student Management System

A modern, responsive full-stack web application for managing students, courses, grades, and attendance.

## 🚀 Features

- **Student Management**: Add, edit, delete, and search students
- **Course Management**: Manage courses and assignments
- **Grade Tracking**: Track and manage student grades
- **Attendance System**: Monitor student attendance
- **Analytics Dashboard**: Visual insights with charts and statistics
- **Responsive Design**: Mobile-first, works on all devices
- **User Authentication**: Secure login with JWT
- **Role-based Access**: Admin and Student roles
- **Export Functionality**: Export data to PDF/CSV
- **Real-time Search**: Instant search and filtering

## 📦 Tech Stack

### Frontend
- React.js 18+
- Tailwind CSS
- React Router v6
- Axios for API calls
- Chart.js for analytics
- React Hook Form
- Zustand for state management

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose ODM
- JWT Authentication
- Bcrypt for password hashing
- CORS enabled

## 🏗️ Project Structure

```
fullstack-project/
├── client/                 # Frontend (React)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── store/
│   │   ├── services/
│   │   ├── styles/
│   │   └── App.jsx
│   ├── public/
│   ├── package.json
│   └── tailwind.config.js
├── server/                 # Backend (Node/Express)
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── package.json
├── .gitignore
└── README.md
```

## 🔧 Installation

### Prerequisites
- Node.js v16+
- MongoDB
- npm or yarn

### Backend Setup

```bash
cd server
npm install
cp .env.example .env
# Update .env with your MongoDB URI
npm start
```

### Frontend Setup

```bash
cd client
npm install
npm start
```

## 🔐 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/student_management
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
```

### Frontend (.env.local)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Grades
- `GET /api/grades` - Get all grades
- `POST /api/grades` - Add grade
- `PUT /api/grades/:id` - Update grade

### Attendance
- `GET /api/attendance` - Get attendance records
- `POST /api/attendance` - Mark attendance
- `PUT /api/attendance/:id` - Update attendance

## 🎨 UI Features

- Clean, modern interface with Tailwind CSS
- Responsive grid and card layouts
- Interactive charts and graphs
- Modal dialogs for forms
- Toast notifications
- Loading states and error handling
- Smooth animations and transitions
- Dark mode support (optional)

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🤝 Contributing

Feel free to fork and submit pull requests!

## 📄 License

MIT License

## 💬 Support

For issues and questions, please create an issue in the repository.
