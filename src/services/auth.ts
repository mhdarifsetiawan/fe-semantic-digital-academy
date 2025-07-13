import api from "@/lib/api";

/**
 * Service untuk otentikasi
 */

// Definisikan tipe data untuk kredensial login agar lebih jelas
interface LoginCredentials {
    email: string;
    password: string;
}

// Fungsi login yang lebih bersih
export const login = async (credentials: LoginCredentials) => {
    try {
        // Panggil API dan langsung kembalikan datanya
        const response = await api.post('/login', credentials);
        return response.data;
    } catch (error) {
        // Jika terjadi error, lempar kembali agar bisa ditangani oleh pemanggil
        console.error('Login service error:', error);
        throw error;
    }
};

// Fungsi logout
export const logout = async () => {
    try {
        const response = await api.post('/logout');
        return response.data;
    } catch (error) {
        console.error('Logout service error:', error);
        // Tidak perlu melempar error di sini, karena logout harusnya tidak gagal
        // di sisi client bahkan jika server gagal merespons.
    }
};