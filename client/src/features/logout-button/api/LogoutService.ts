import { AxiosInstance } from 'axios';
import { authAxiosInstance } from 'src/features/api-axios-instances/authAxiosInstance';

class LogoutService {
  constructor(private client: AxiosInstance) {}

  async logout(): Promise<void> {
    return this.client('/auth/logout');
  }
}

export const logoutService = new LogoutService(authAxiosInstance);
