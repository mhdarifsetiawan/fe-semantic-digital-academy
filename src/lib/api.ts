/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import API_ROUTES from '@/constants/apiRoutes';
import { resetAuthClientSide } from '@/lib/auth/resetAuth';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(promise => {
    if (error) promise.reject(error);
    else promise.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log('🔁 Interceptor error detected:', error);

    const originalRequest = error.config;

    // Normalisasi path URL (handle jika hanya relative path)
    const urlPath = new URL(originalRequest.url, api.defaults.baseURL).pathname;

    const isAuthRoute = [API_ROUTES.LOGIN, API_ROUTES.REGISTER, API_ROUTES.REFRESH_TOKEN].includes(urlPath);

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthRoute
    ) {
      console.log('⏳ Received 401, preparing to refresh token...');
      originalRequest._retry = true;

      if (isRefreshing) {
        console.log('🔄 Queuing request while refreshing token...');
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => api(originalRequest));
      }

      isRefreshing = true;

      try {
        console.log('🔄 Sending refresh-token request...');
        await api.post(API_ROUTES.REFRESH_TOKEN);
        processQueue(null);
        console.log('✅ Token refreshed successfully');
        return api(originalRequest);
      } catch (err) {
        console.warn('❌ Refresh token failed or expired. Logging out...');
        processQueue(err, null);

        // Panggil logout biar cookie HttpOnly kehapus via server
        try {
          await api.post(API_ROUTES.LOGOUT); // logout
        } catch (logoutErr) {
          console.warn('Gagal logout di server:', logoutErr);
        }

        await resetAuthClientSide(true); // << redirect ke /login

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
