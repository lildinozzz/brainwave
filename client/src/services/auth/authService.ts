import type { AxiosInstance } from 'axios';
import authAxiosInstance from './authAxiosInstance';
import { TAuthForm, TAuthState, TBackendAuthInfo } from './types';

class AuthService {
  constructor(private client: AxiosInstance) {}

  async login(formData: TAuthForm): Promise<TAuthState> {
    const res = await this.client.post<TBackendAuthInfo>(
      '/auth/login',
      formData
    );
    if (res.status !== 200) return Promise.reject(new Error('Failed login'));
    return {
      ...res.data,
      user: { ...res.data.user, status: 'logged' },
      isAuthed: true,
    };
  }

  async register(formData: TAuthForm): Promise<TAuthState> {
    const response = await this.client.post<TBackendAuthInfo>(
      'auth/signup',
      formData
    );
    if (response.status !== 200)
      return Promise.reject(new Error('ошибка на фронте с регой'));
    return {
      ...response.data,
      user: { ...response.data.user, status: 'logged' },
      isAuthed: true,
    };
  }

  async refresh(): Promise<TAuthState> {
    const res = await this.client<TBackendAuthInfo>('/tokens/refresh');
    if (res.status !== 200)
      return Promise.reject(new Error('Cannot refresh tokens'));
    return {
      ...res.data,
      user: { ...res.data.user, status: 'logged' },
      isAuthed: true,
    };
  }

  async logout(): Promise<void> {
    return this.client('/auth/logout');
  }
}

const authService = new AuthService(authAxiosInstance);

export default authService;
