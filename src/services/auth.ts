import API_ROUTES from "@/constants/apiRoutes";
import api from "@/lib/api";
import { resetAuthClientSide } from "@/lib/auth/resetAuth";
import { useAuthStore } from "@/store/useAuthStore";

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
    const { setAuthenticated } = useAuthStore.getState();

    try {
        const response = await api.post(API_ROUTES.LOGIN, credentials);

        // ✅ Simpan flag login di localStorage
        if (typeof window !== 'undefined') {
            setAuthenticated(true);
        }

        return response.data;
    } catch (error) {
        console.error('Login service error:', error);

        // Pastikan flag login dibersihkan jika gagal
        if (typeof window !== 'undefined') {
            setAuthenticated(false);
        }

        throw error;
    }
};

// Fungsi logout
export const logout = async () => {
    try {
        const response = await api.post(API_ROUTES.LOGOUT);
        await resetAuthClientSide();
        return response.data;
    } catch (error) {
        console.error('Logout service error:', error);
    }
};


export async function forgotPassword(email: string) {
    const res = await api.post(API_ROUTES.FORGOT_PASSWORD, { email });
    return res.data;
}

export async function resetPassword(token: string, newPassword: string) {
    const res = await api.post(`${API_ROUTES.RESET_PASSWORD}/${token}`, { password: newPassword });
    return res.data;
}
