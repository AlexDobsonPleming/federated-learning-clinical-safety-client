"use client";

import { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';

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
    if (token) {localStorage.setItem('token', token);}
    else {localStorage.removeItem('token');}
  }, [token]);

  const login = async (username: string, password: string) => {
    const res = await axios.post('http://127.0.0.1:8000/api/auth/token/', { username, password });
    setToken(res.data.token);
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
);
}

export function useAuth() {
  return useContext(AuthContext);
}
