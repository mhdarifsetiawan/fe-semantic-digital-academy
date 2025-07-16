import API_ROUTES from '@/constants/apiRoutes';

// src/lib/auth/resetAuth.ts
export async function resetAuthClientSide(redirect: boolean = true) {
    const { setAuthenticated, setUser } = (await import('@/store/useAuthStore')).useAuthStore.getState();

    setAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');

    if (redirect && typeof window !== 'undefined') {
        window.location.href = API_ROUTES.LOGIN;
    }
}
