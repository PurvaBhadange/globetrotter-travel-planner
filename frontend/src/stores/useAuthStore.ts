import create from 'zustand';
import { persist } from 'zustand/middleware';
import axiosInstance from '../api/axiosInstance';
import { getAuthToken, setAuthToken } from '../api/client';

interface UserProfile {
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
  login: (email: string, password: string) => Promise<void>;
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchCurrentUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: getAuthToken(),
      isAuthenticated: !!getAuthToken(),
      isLoading: false,

      async login(email, password) {
        set({ isLoading: true });
        try {
          const res = await axiosInstance.post('/auth/login', { email, password });
          const { token, user } = res.data;
          setAuthToken(token);
          set({ user, token, isAuthenticated: true, isLoading: false });
        } catch (err) {
          console.error('Login error', err);
          set({ isLoading: false });
        }
      },

      async register(firstName, lastName, email, password) {
        set({ isLoading: true });
        try {
          const res = await axiosInstance.post('/auth/register', {
            firstName,
            lastName,
            email,
            password,
          });
          const { token, user } = res.data;
          setAuthToken(token);
          set({ user, token, isAuthenticated: true, isLoading: false });
        } catch (err) {
          console.error('Register error', err);
          set({ isLoading: false });
        }
      },

      logout() {
        setAuthToken(null);
        set({ user: null, token: null, isAuthenticated: false });
      },

      async fetchCurrentUser() {
        const token = getAuthToken();
        if (!token) return;
        try {
          const res = await axiosInstance.get<UserProfile>('/users/me');
          set({ user: res.data, isAuthenticated: true });
        } catch (err) {
          console.warn('Fetch current user failed', err);
        }
      },
    }),
    { name: 'auth-store' }
  )
);
