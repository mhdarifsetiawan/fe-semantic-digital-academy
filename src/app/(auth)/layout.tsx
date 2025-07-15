// src/app/(auth)/layout.tsx
'use client';

import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    
    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-blue-200 px-4 text-gray-700">
            <div className="w-full max-w-md px-6 py-10 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">🎓 Semantic Academy</h1>
                {children}
            </div>
        </main>
    );
}
