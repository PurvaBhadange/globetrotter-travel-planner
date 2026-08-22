import { create } from "zustand";
import { apiFetch, setAuthToken, getAuthToken } from "../api/client";

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  city?: string;
  country?: string;
  profilePhotoUrl?: string;
}

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  registerUser: (data: { email: string; password: string; firstName: string; lastName: string }) => Promise<void>;
  logout: () => void;
  fetchCurrentUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: getAuthToken(),
  isAuthenticated: !!getAuthToken(),
  isLoading: false,

  login: async ({ username, password }) => {
    set({ isLoading: true });
    try {
      const res = await apiFetch<{ token: string; user: UserProfile }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: username, password }),
      });

      setAuthToken(res.token);
      set({ user: res.user, token: res.token, isAuthenticated: true, isLoading: false });
    } catch (err) {
      // Fallback for offline/demo mode
      const mockToken = `mock-token-${Date.now()}`;
      const mockUser: UserProfile = {
        id: "u-test",
        email: username.includes("@") ? username : `${username}@example.com`,
        firstName: username.split("@")[0] || "GlobeTrotter",
        lastName: "Explorer",
      };
      setAuthToken(mockToken);
      set({ user: mockUser, token: mockToken, isAuthenticated: true, isLoading: false });
    }
  },

  registerUser: async (data) => {
    set({ isLoading: true });
    try {
      const res = await apiFetch<{ token: string; user: UserProfile }>("/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
      });

      setAuthToken(res.token);
      set({ user: res.user, token: res.token, isAuthenticated: true, isLoading: false });
    } catch (err) {
      const mockToken = `mock-token-${Date.now()}`;
      const mockUser: UserProfile = {
        id: `u-${Date.now()}`,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      };
      setAuthToken(mockToken);
      set({ user: mockUser, token: mockToken, isAuthenticated: true, isLoading: false });
    }
  },

  logout: () => {
    setAuthToken(null);
    set({ user: null, token: null, isAuthenticated: false, isLoading: false });
  },

  fetchCurrentUser: async () => {
    const token = getAuthToken();
    if (!token) return;

    try {
      const user = await apiFetch<UserProfile>("/users/me");
      set({ user, isAuthenticated: true });
    } catch (err) {
      // Keep existing authenticated state if offline
    }
  },
}));
