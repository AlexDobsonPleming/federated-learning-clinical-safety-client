'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { createBaseClient } from './api';

type AuthContextType = {
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    typeof window !== 'undefined' ? localStorage.getItem('token') : null
  );

  useEffect(() => {
    // whenever token changes, sync to localStorage
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = async (username: string, password: string) => {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL;
    const client = createBaseClient();
    const res = await client.post(`${base}/auth/token/`, { username, password });
    setToken(res.data.token);
  };

  const logout = () => {
    setToken(null);
  };

  return <AuthContext.Provider value={{ token, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
