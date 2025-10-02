# React Jobs - Frontend

A modern job board application built with React, Vite, and Tailwind CSS.

## 🚀 Features

- Browse job listings
- User authentication (Developer/Employer roles)
- Role-based access control
- Responsive design with Tailwind CSS
- Toast notifications
- Modern React with hooks and context

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite 7
- **Routing**: React Router DOM 7
- **Styling**: Tailwind CSS 4
- **State Management**: React Context API
- **Notifications**: React Toastify
- **Icons**: React Icons

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/react-jobs-frontend.git
cd react-jobs-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update the API URL in `.env`:
```
VITE_API_URL=http://localhost:8001
```

## 🔧 Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3002`

## 🏗️ Build

Build for production:
```bash
npm run build
```

## 🚀 Deployment

This project is configured for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Set the environment variable `VITE_API_URL` to your backend API URL
3. Deploy!

## 📱 User Roles

- **Developer**: Can browse and view job listings
- **Employer**: Can create, edit, and delete job listings

## 🔐 Test Accounts

- **Developer**: developer@test.com / password123
- **Employer**: employer@test.com / password123

## 📄 License

MIT License