// src/store/auth.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { login as loginService, logout as logoutService } from '@/services/auth';
import { getMe } from '@/services/user';

// Definisikan tipe User di sini sebagai sumber kebenaran tunggal
export interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthStore {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    _hasHydrated: boolean;
}

interface AuthActions {
    login: (email: string, password: string) => Promise<void>;
    fetchUser: () => Promise<void>;
    logout: () => void;
}

export const useAuthStore = create<AuthStore & AuthActions>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            loading: false,
            _hasHydrated: false,
            login: async (email, password) => {
                set({ loading: true });
                try {
                    await loginService({ email, password });
                    await get().fetchUser(); // Ambil data user setelah login
                } catch (error) {
                    set({ loading: false });
                    throw error; // Lempar error agar bisa ditangani UI
                }
            },
            fetchUser: async () => {
                set({ loading: true });
                try {
                    const userData = await getMe();
                    // Validasi data yang diterima dari API
                    if (userData && userData.id && userData.name && userData.email) {
                        set({ user: userData, isAuthenticated: true, loading: false });
                    } else {
                        // Jika data tidak valid, anggap sebagai error dan bersihkan sesi
                        throw new Error('Invalid user data received from API');
                    }
                } catch (error) {
                    console.error("Fetch user failed:", error);
                    // Jika terjadi error (termasuk data tidak valid), bersihkan sesi
                    set({ user: null, isAuthenticated: false, loading: false });
                }
            },
            logout: async () => {
                await logoutService();
                set({ user: null, isAuthenticated: false, loading: false });
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state._hasHydrated = true;
                }
            },
        }
    )
);
