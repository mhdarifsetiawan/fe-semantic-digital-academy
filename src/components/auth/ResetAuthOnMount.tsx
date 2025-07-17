'use client';

import { useEffect } from 'react';
import { resetAuthClientSide } from '@/lib/auth/resetAuth';

export default function ResetAuthOnMount() {
    useEffect(() => {
        const localData = localStorage.getItem('auth-storage');

        // Periksa jika localStorage ada tapi user dianggap tidak login
        if (localData) {
            try {
                const parsed = JSON.parse(localData);
                if (parsed?.state?.isAuthenticated && !parsed?.state?.user) {
                    console.warn('[ResetAuth] Detected inconsistent auth state. Resetting...');
                    resetAuthClientSide(false); // false = tidak redirect ulang
                }
            } catch (e) {
                console.error('[ResetAuth] Gagal parse localStorage auth-storage:', e);
                resetAuthClientSide(false);
            }
        }
    }, []);

    return null;
}
