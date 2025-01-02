import type { AxiosInstance } from 'axios';
import authAxiosInstance from './authAxiosInstance';
import { TAuthForm, TAuthState, TBackendAuthInfo } from './types';

class AuthService {
  constructor(private client: AxiosInstance) {}

  async authenticate(formData: TAuthForm): Promise<TAuthState> {
    try {
      const response = await this.client.post<TBackendAuthInfo>(
        '/auth/authenticate',
        formData
      );

      if (response.status !== 200)
        return Promise.reject(
          new Error(`Expected status 200, received ${response.status}`)
        );

      return {
        ...response.data,
        user: { ...response.data.user, status: 'logged' },
        isAuthed: true,
      };
    } catch (error) {
      throw new Error(`Unknown error occured with authentication, ${error}`);
    }
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

export const authService = new AuthService(authAxiosInstance);
