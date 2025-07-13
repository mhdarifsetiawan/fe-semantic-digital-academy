// src/app/(auth)/layout.tsx
'use client';

import React, { useEffect } from 'react';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'next/navigation';
import PageLoader from '@/components/ui/PageLoader';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, _hasHydrated } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        // Tunggu sampai store terhidrasi
        if (!_hasHydrated) {
            return;
        }

        // Jika pengguna sudah login, arahkan ke dashboard
        if (isAuthenticated) {
            router.replace('/dashboard');
        }
    }, [isAuthenticated, _hasHydrated, router]);

    // Selama proses hidrasi, atau jika pengguna sudah login (dan akan diarahkan),
    // tampilkan layar loading untuk mencegah "flash" halaman login.
    if (!_hasHydrated || isAuthenticated) {
        return <PageLoader />;
    }
    
    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-blue-200 px-4 text-gray-700">
            <div className="w-full max-w-md px-6 py-10 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">🎓 Semantic Academy</h1>
                {children}
            </div>
        </main>
    );
}
