// src/app/(protected)/layout/.tsx
'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'next/navigation';
import PageLoader from '@/components/ui/PageLoader';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const { user, isAuthenticated, loading, fetchUser, _hasHydrated } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        // Setelah store terhidrasi, panggil fetchUser untuk memastikan
        // kita memiliki data pengguna terbaru dari server.
        if (_hasHydrated) {
            fetchUser();
        }
    }, [_hasHydrated, fetchUser]);


    useEffect(() => {
        // Jangan lakukan apa-apa sampai proses hidrasi selesai.
        if (!_hasHydrated) {
            return;
        }

        // Setelah hidrasi selesai dan tidak ada proses loading,
        // periksa apakah pengguna terautentikasi. Jika tidak, arahkan ke login.
        if (!loading && !isAuthenticated) {
            router.replace('/login');
        }
    }, [loading, isAuthenticated, router, _hasHydrated]);

    // Tampilkan loader jika:
    // 1. Store belum terhidrasi.
    // 2. Sedang dalam proses loading (menjalankan fetchUser).
    // 3. Sudah tidak loading TAPI objek user masih null (menunggu data user masuk).
    if (!_hasHydrated || loading || !user) {
        return <PageLoader />;
    }

    // Hanya render children jika semua pemeriksaan selesai dan data user ada.
    return <>{children}</>;
}
