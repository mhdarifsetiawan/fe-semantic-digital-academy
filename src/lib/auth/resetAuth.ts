// src/lib/auth/resetAuth.ts
import API_ROUTES from '@/constants/apiRoutes';
import { useAuthStore } from '@/store/useAuthStore';

/**
 * Membersihkan state login di client-side:
 * - Reset Zustand auth store
 * - Hapus semua cache terkait (localStorage + sessionStorage)
 * - Opsional: redirect ke halaman login
 */
export async function resetAuthClientSide(redirect: boolean = true) {
    // ✅ Reset Zustand store
    useAuthStore.setState({
        isAuthenticated: false,
        user: null,
    });

    // ✅ Hapus semua storage yang mungkin menyimpan auth
    const keysToRemove = ['isAuthenticated', 'auth-storage', 'accessToken',];
    const storages = [localStorage, sessionStorage];

    for (const storage of storages) {
        keysToRemove.forEach((key) => storage.removeItem(key));
    }

    // ✅ Redirect jika diminta
    if (redirect && typeof window !== 'undefined') {
        window.location.href = API_ROUTES.LOGIN;
    }
}
