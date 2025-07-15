// layout.tsx
import { getCurrentUser } from '@/lib/authh/getCurrentUser';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
    const user = await getCurrentUser();

    if (!user) {
        redirect('/login');
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-6">
            {/* kamu juga bisa pasang Navbar atau Sidebar di sini */}
            <div className="max-w-5xl mx-auto">
                {/* 💡 Kirim user ke client via prop, context, atau bisa lewat children */}
                {children}
            </div>
        </div>
    );
}
