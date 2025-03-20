import api from './api';
import { LoginRequest, LoginResponse, RegisterRequest, User } from '../types/auth';

export const authService = {
  async register(data: RegisterRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/api/auth/register', data);
    if (response.data.access_token) {
      localStorage.setItem('divine_sight_token', response.data.access_token);
    }
    return response.data;
  },

  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/api/auth/login', data);
    if (response.data.access_token) {
      localStorage.setItem('divine_sight_token', response.data.access_token);
    }
    return response.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>('/api/auth/user');
    return response.data;
  },

  logout(): void {
    localStorage.removeItem('divine_sight_token');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('divine_sight_token');
  }
};
