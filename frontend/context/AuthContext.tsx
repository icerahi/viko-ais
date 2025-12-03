"use client";

import { AuthService, User } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: User | null;
  login: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check localStorage for user data on mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user from local storage", e);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (data: any) => {
    setIsLoading(true);
    try {
      console.log({ data });
      const user = await AuthService.login(data);
      console.log({ user });
      if (user) {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));

        // Redirect based on role
        if (user.role === "ADMIN") router.push("/admin");
        else if (user.role === "TEACHER") router.push("/teacher");
        else if (user.role === "STUDENT") router.push("/student");
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Login error", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await AuthService.logout();
      setUser(null);
      localStorage.removeItem("user");
      router.push("/");
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
