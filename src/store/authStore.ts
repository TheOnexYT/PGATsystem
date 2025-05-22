
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '@/api/authService';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthorized: (roles: string[]) => boolean;
  refreshUserProfile: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        try {
          const response = await authService.login({ 
            correo: email, 
            contraseña: password 
          });
          
          // Extract user info from the response
          const userData = {
            id: response.usuario?._id || "",
            name: response.usuario?.nombre || "",
            email: response.usuario?.correo || email,
            role: "user", // Default role, adjust as needed
          };
          
          set({ 
            user: userData,
            token: response.token, 
            isAuthenticated: true 
          });
          localStorage.setItem('pgat-auth-token', response.token);
          return true;
        } catch (error) {
          console.error('Login error:', error);
          return false;
        }
      },

      register: async (name: string, email: string, password: string) => {
        try {
          await authService.register({ 
            nombre: name, 
            correo: email, 
            contraseña: password 
          });
          // Registration success
          return true;
        } catch (error) {
          console.error('Register error:', error);
          return false;
        }
      },

      logout: () => {
        localStorage.removeItem('pgat-auth-token');
        set({ user: null, token: null, isAuthenticated: false });
      },

      isAuthorized: (roles: string[]) => {
        const { user } = get();
        if (!user) return false;
        return roles.includes(user.role);
      },

      refreshUserProfile: async () => {
        const user = await authService.getCurrentUser();
        if (user) {
          set({ user });
        }
      }
    }),
    {
      name: 'pgat-auth-storage',
    }
  )
);
