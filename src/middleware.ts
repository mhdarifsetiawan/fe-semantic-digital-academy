// ============================
// middleware.ts
// ============================

import { NextRequest, NextResponse } from 'next/server';
import { isAuthPath, isProtectedPath } from './lib/authh/routeUtils';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;
  const { pathname } = request.nextUrl;

  // Tambahan debug untuk development
  const res = NextResponse.next();
  res.headers.set('x-middleware-debug', 'true');
  res.headers.set('x-token', token ? 'present' : 'none');
  res.headers.set('x-pathname', pathname);

  // ⛔ Sudah login dan akses halaman auth
  if (token && isAuthPath(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 🔐 Belum login dan akses halaman protected
  if (!token && isProtectedPath(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return res;
}

export const config = {
  matcher: [
    '/login',
    '/register',
    '/(auth)(.*)',
    '/(protected)(.*)',
    '/dashboard',
  ],
};
