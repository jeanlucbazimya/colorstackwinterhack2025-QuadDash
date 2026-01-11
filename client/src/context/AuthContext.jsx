/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../api/client';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      setIsAuthenticated(false);
      return;
    }

    try {
      const response = await authApi.getMe();
      setUser(response.data);
      setIsAuthenticated(true);
    } catch {
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = useCallback((token) => {
    localStorage.setItem('token', token);
    fetchUser();
  }, [fetchUser]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        logout,
        refetchUser: fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
