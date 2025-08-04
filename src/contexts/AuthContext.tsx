import React, { createContext, useContext, useState, ReactNode } from 'react';
import { addNotification } from '@/lib/localStorage';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'parent' | 'student' | 'admin' | 'coordinator';
  accessLevel: number; // 1-6 access levels
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  getAccessLevel: () => number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, role: string) => {
    // Admin credential validation
    if (role === 'admin') {
      const ADMIN_EMAIL = 'admin@myrobot.com';
      const ADMIN_PASSWORD = 'admin123';
      
      if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
        throw new Error('Invalid admin credentials. Please use the correct admin email and password.');
      }
    }
    
    // Simulate user creation with different access levels
    const mockUser: User = {
      id: '1',
      name: email.split('@')[0],
      email,
      role: role as 'parent' | 'student' | 'admin' | 'coordinator',
      accessLevel: role === 'admin' ? 6 : role === 'coordinator' ? 5 : role === 'parent' ? 4 : 2
    };
    setUser(mockUser);
    
    // Add notification for admin when someone logs in
    addNotification(`User ${email} logged in as ${role}`, 'login');
  };

  const logout = () => {
    setUser(null);
    // Redirect to home page after logout
    window.location.href = '/';
  };

  const getAccessLevel = () => {
    if (!user) return 1; // Public access
    return user.accessLevel;
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user,
      getAccessLevel
    }}>
      {children}
    </AuthContext.Provider>
  );
};