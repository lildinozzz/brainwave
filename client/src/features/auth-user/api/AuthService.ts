import type { AxiosInstance } from 'axios';
import { authAxiosInstance } from 'src/features/api-axios-instances/authAxiosInstance';
import {
  TAuthForm,
  TAuthState,
  TBackendAuthInfo,
} from 'src/shared/types/auth.types';

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
}

export const authService = new AuthService(authAxiosInstance);
