// src/app/(auth)/layout.tsx
import React from 'react';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-blue-200 px-4 text-gray-700">
            <div className="w-full">
                {children}
            </div>
        </main>
    );
}
