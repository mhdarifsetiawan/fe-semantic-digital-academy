// src/lib/auth/getCurrentUser.ts

import { cookies } from 'next/headers';

export async function getCurrentUser() {
    const cookieStore = cookies();
    const accessToken = (await cookieStore).get('accessToken')?.value;

    if (!accessToken) return null;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
        credentials: 'include',
        headers: {
            Cookie: `accessToken=${accessToken}`,
        },
        cache: 'no-store',
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.user; // { id, name, email, created_at }
}
