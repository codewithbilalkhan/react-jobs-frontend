# React Jobs - Backend API

Express.js REST API for the React Jobs application with authentication and CRUD operations.

## 🚀 Features

- RESTful API for job listings
- User authentication with JWT-style tokens
- Role-based access control (Developer/Employer)
- CORS configuration
- File-based data storage (JSON)
- Input validation and error handling

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js 4
- **Authentication**: Custom JWT implementation
- **Password Hashing**: bcryptjs
- **CORS**: cors middleware
- **Data Storage**: JSON file (jobs.json)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/react-jobs-backend.git
cd react-jobs-backend
```

2. Install dependencies:
```bash
npm install
```

## 🔧 Development

Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:8001`

Start production server:
```bash
npm start
```

## 📋 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `GET /api/auth/me` - Get current user (requires auth)

### Jobs
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get job by ID
- `POST /api/jobs` - Create job (Employer only)
- `PUT /api/jobs/:id` - Update job (Employer only)
- `DELETE /api/jobs/:id` - Delete job (Employer only)

### Health Check
- `GET /api/health` - Server health status

## 🔐 Authentication

The API uses a simple JWT-style token system:
- Tokens are returned upon successful login/signup
- Protected routes require `Authorization: Bearer <token>` header
- Employer-only routes check user role

## 👥 Test Users

The system includes test users:
- **Developer**: developer@test.com / password123
- **Employer**: employer@test.com / password123

## 🚀 Deployment

This project is configured for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Node.js project
3. Deploy!

## 📄 License

MIT License