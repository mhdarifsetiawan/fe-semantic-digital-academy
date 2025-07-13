import React from 'react';

/**
 * Komponen untuk menampilkan indikator loading satu halaman penuh.
 * Berguna untuk proses seperti memeriksa sesi autentikasi.
 */
export default function PageLoader() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
}