// src/lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // kirim cookie otomatis
});

// ⏳ Interceptor bisa ditambahkan di sini (opsional)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Contoh: jika 401, redirect ke /login
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
