export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface LoginResponse {
  access_token: string;
  message: string;
  user: User;
}

export interface RegisterRequest {
  name: string;
  email: string;
}

export interface LoginRequest {
  email: string;
}
