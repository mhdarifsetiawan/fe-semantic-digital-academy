// ============================
// src/lib/auth/routeUtils.ts
// ============================

import { AUTH_PATHS, PROTECTED_PATHS, PUBLIC_PATHS } from "@/constants/routeGroups";

export function isAuthPath(pathname: string): boolean {
    return AUTH_PATHS.some(path => pathname.startsWith(path)) || pathname.includes('/(auth)');
}

export function isProtectedPath(pathname: string): boolean {
    return PROTECTED_PATHS.some(path => pathname.startsWith(path)) || pathname.includes('/(protected)');
}

export function isPublicPath(pathname: string): boolean {
    return PUBLIC_PATHS.some(path => pathname.startsWith(path)) || pathname.includes('/(public)');
}
