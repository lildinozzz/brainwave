import axios from 'axios';

export const authAxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_URL}/api`,
  withCredentials: true,
});
