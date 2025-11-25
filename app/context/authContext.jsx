"use client";

import { createContext, useState, useEffect } from "react";
import api from "../lib/axios";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // fetch user from token on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/v1/auth/me");
        setUser(res.data.user);
      } catch {
        setUser(null); // user not logged in
      }
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post("/api/v1/auth/login", { email, password });
    setUser(data.user);
  };

  const logout = async () => {
    await api.post("/api/v1/auth/logout");
    setUser(null);
  };

  const register = async (info) => {
    const { data } = await api.post("/api/v1/auth/register", info);
    setUser(data.user);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}
