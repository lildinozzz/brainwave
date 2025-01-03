import type { AxiosInstance } from 'axios';
import { authAxiosInstance } from 'src/features/api-axios-instances/authAxiosInstance';
import { TAuthState, TBackendAuthInfo } from 'src/shared/types/auth.types';

class RefreshTokensService {
  constructor(private client: AxiosInstance) {}

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
}

export const refreshTokensService = new RefreshTokensService(authAxiosInstance);
