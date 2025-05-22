
import { apiClient } from './apiClient';

export interface LoginCredentials {
  correo: string;
  contraseña: string;
}

export interface RegisterData {
  nombre: string;
  correo: string;
  contraseña: string;
}

export interface AuthResponse {
  token: string;
  user?: {
    id: string;
    nombre: string;
    correo: string;
    role?: string;
  };
  usuario?: {
    _id: string;
    nombre: string;
    correo: string;
  };
  mensaje?: string;
  status?: boolean;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Using the correct API endpoint for login
      const response = await apiClient.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      // Using the correct API endpoint for registration
      const response = await apiClient.post('/auth/registrar', userData);
      return response.data.user; // According to your example response structure
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  },

  async getCurrentUser(): Promise<any> {
    try {
      // Using the correct API endpoint for getting user profile
      // You might need to adjust this endpoint based on your API documentation
      const response = await apiClient.get('/auth/perfil');
      return response.data;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  },
};
