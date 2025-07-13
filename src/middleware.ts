// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('accessToken')?.value;

    console.log('🔒 Token dari cookie:', accessToken); // ⬅️ lihat di terminal (bukan browser)
    
    // Jika tidak ada token, redirect ke /login
    if (!accessToken) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next(); // lanjutkan ke route tujuan
}

// Tentukan halaman yang butuh proteksi
export const config = {
    matcher: ['/dashboard'], // bisa tambah: ['/dashboard', '/admin', ...]
};
