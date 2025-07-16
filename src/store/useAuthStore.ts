// src/store/useAuthStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    id: string;
    email: string;
    // Tambahkan properti lain sesuai struktur user-mu
}

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    setAuthenticated: (auth: boolean) => void;
    setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            user: null,
            setAuthenticated: (auth) => set({ isAuthenticated: auth }),
            setUser: (user) => set({ user }),
        }),
        {
            name: 'auth-storage',
        }
    )
);
