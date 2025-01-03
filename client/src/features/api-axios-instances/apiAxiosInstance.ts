import { StoreT } from 'src/app/store/store';
import type { AxiosError } from 'axios';
import axios from 'axios';
import { refreshTokensService } from 'src/features/auth-user';

const apiAxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_URL}/api`,
});

let store: StoreT | undefined;
export const injectStore = (_store: StoreT): void => {
  store = _store;
};

apiAxiosInstance.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${
      store?.getState().userInfo.accessToken
    }`;
  }
  return config;
});

apiAxiosInstance.interceptors.response.use(
  (res) => res,
  async (err: AxiosError & { config: { sent?: boolean; url?: string } }) => {
    const prevRequest = err.config;
    if (err.response?.status === 403 && !prevRequest.sent) {
      prevRequest.sent = true;
      const { accessToken } = await refreshTokensService.refresh();
      prevRequest.headers.Authorization = `Bearer ${accessToken}`;
      return apiAxiosInstance(prevRequest);
    }
    return Promise.reject(err);
  }
);

export default apiAxiosInstance;
