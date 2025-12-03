import api from "@/lib/api";
import { jwtDecode } from "jwt-decode";

export interface User {
  id: number;
  login: string;
  role: "ADMIN" | "TEACHER" | "STUDENT";
}

interface LoginResponse {
  data: {
    accessToken: string;
  };
  message: string;
  statusCode: number;
  success: boolean;
}

export const AuthService = {
  login: async (data: any): Promise<User | null> => {
    const response = await api.post<LoginResponse>("/auth/login", data);
    console.log({ response });
    if (response.success && response.data.accessToken) {
      const token = response.data.accessToken;
      // Decode token
      try {
        const decoded: any = jwtDecode(token);
        return decoded;
      } catch (e) {
        console.error("Failed to decode token", e);
        return null;
      }
    }
    return null;
  },

  logout: async () => {
    await api.post("/auth/logout", {});
  },
};
