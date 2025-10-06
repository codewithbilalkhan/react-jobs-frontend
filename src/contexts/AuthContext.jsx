import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext();

// Mock users for fallback authentication
const mockUsers = [
  {
    id: 1,
    name: 'John Employer',
    email: 'employer@example.com',
    password: 'password123',
    role: 'employer'
  },
  {
    id: 2,
    name: 'Jane JobSeeker',
    email: 'jobseeker@example.com',
    password: 'password123',
    role: 'jobseeker'
  }
];

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing token on app load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Try to verify token with backend, fallback to mock
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        // Fallback: try to decode mock token
        try {
          const tokenData = token.replace('.token.signature', '');
          const decoded = JSON.parse(atob(tokenData));
          setUser(decoded);
        } catch {
          localStorage.removeItem('authToken');
        }
      }
    } catch (error) {
      console.error('Token verification failed, using mock auth:', error);
      // Fallback: try to decode mock token
      try {
        const tokenData = token.replace('.token.signature', '');
        const decoded = JSON.parse(atob(tokenData));
        setUser(decoded);
      } catch {
        localStorage.removeItem('authToken');
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        setUser(data.user);
        toast.success(`Welcome back, ${data.user.name}!`);
        return { success: true, user: data.user };
      } else {
        throw new Error(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error, trying mock auth:', error);
      
      // Fallback: Mock authentication
      const mockUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (mockUser) {
        const mockToken = btoa(JSON.stringify({
          id: mockUser.id,
          name: mockUser.name,
          email: mockUser.email,
          role: mockUser.role
        })) + '.token.signature';
        
        localStorage.setItem('authToken', mockToken);
        setUser({
          id: mockUser.id,
          name: mockUser.name,
          email: mockUser.email,
          role: mockUser.role
        });
        toast.success(`Welcome back, ${mockUser.name}! (Demo mode)`);
        return { success: true, user: mockUser };
      } else {
        toast.error('Invalid credentials');
        return { success: false, error: 'Invalid credentials' };
      }
    }
  };

  const signup = async (name, email, password, role) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, role })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        setUser(data.user);
        toast.success(`Welcome, ${data.user.name}! Account created successfully.`);
        return { success: true, user: data.user };
      } else {
        throw new Error(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Signup error, using mock auth:', error);
      
      // Fallback: Mock registration
      // Check if user already exists in mock data
      const existingUser = mockUsers.find(u => u.email === email);
      if (existingUser) {
        toast.error('User already exists. Try logging in instead.');
        return { success: false, error: 'User already exists' };
      }
      
      // Create new mock user
      const newUser = {
        id: mockUsers.length + 1,
        name,
        email,
        role
      };
      
      const mockToken = btoa(JSON.stringify(newUser)) + '.token.signature';
      
      localStorage.setItem('authToken', mockToken);
      setUser(newUser);
      toast.success(`Welcome, ${newUser.name}! Account created successfully. (Demo mode)`);
      return { success: true, user: newUser };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const getAuthToken = () => {
    return localStorage.getItem('authToken');
  };

  const isEmployer = () => {
    return user?.role === 'employer';
  };

  const isJobSeeker = () => {
    return user?.role === 'jobseeker';
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    getAuthToken,
    isEmployer,
    isJobSeeker,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;