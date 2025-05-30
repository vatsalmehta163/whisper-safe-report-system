
import { useState, useEffect } from 'react';

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if admin is already logged in
    const storedAuth = localStorage.getItem('whistlepro_admin_auth');
    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth);
        setIsAuthenticated(true);
        setAdminUser(authData.user);
      } catch (error) {
        localStorage.removeItem('whistlepro_admin_auth');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock admin credentials
    const validCredentials = [
      { email: 'admin@whistlepro.com', password: 'admin123' },
      { email: 'supervisor@whistlepro.com', password: 'super123' },
      { email: 'hr@whistlepro.com', password: 'hr123' }
    ];

    const validUser = validCredentials.find(
      cred => cred.email === email && cred.password === password
    );

    if (validUser) {
      const user: AdminUser = {
        id: Math.random().toString(36).substr(2, 9),
        email: validUser.email,
        name: validUser.email.split('@')[0].charAt(0).toUpperCase() + validUser.email.split('@')[0].slice(1),
        role: validUser.email.includes('admin') ? 'Administrator' : 
              validUser.email.includes('supervisor') ? 'Supervisor' : 'HR Manager'
      };

      setIsAuthenticated(true);
      setAdminUser(user);
      
      localStorage.setItem('whistlepro_admin_auth', JSON.stringify({ user }));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdminUser(null);
    localStorage.removeItem('whistlepro_admin_auth');
  };

  return {
    isAuthenticated,
    adminUser,
    isLoading,
    login,
    logout
  };
};
