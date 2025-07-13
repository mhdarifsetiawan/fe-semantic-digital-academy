import api from "@/lib/api";

import { User } from "@/store/auth";

/**
 * Service untuk data pengguna
 */

// Fungsi untuk mengambil data pengguna yang sedang login
export const getMe = async (): Promise<User> => {
    try {
        // Panggil endpoint /me
        const response = await api.get<{ user: User }>('/me');
        // Kembalikan objek user yang ada di dalam properti 'user'
        return response.data.user;
    } catch (error) {
        // Jika terjadi error, lempar kembali
        console.error('GetMe service error:', error);
        throw error;
    }
};