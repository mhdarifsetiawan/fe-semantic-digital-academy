'use client';

import Button from '@/components/ui/Button';
import { GraduationCap, Video, Lock } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-100 to-blue-200 px-4 text-gray-800">
      {/* Hero Section */}
      <section className="text-center py-20 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Selamat datang di <span className="text-blue-700">Digital Academy</span>
        </h1>
        <p className="text-gray-700 mb-8 text-lg">
          Belajar kapan saja dan di mana saja dengan kursus berkualitas tinggi.
        </p>
        <div className="flex justify-center gap-4">
          <Button as="a" href="/login" variant="primary">
            Masuk
          </Button>
          <Button as="a" href="/register" variant="outline">
            Daftar Gratis
          </Button>
        </div>
      </section>

      {/* Fitur Section */}
      <section className="w-full max-w-5xl px-4 py-12 grid md:grid-cols-3 gap-8 text-center">
        <div className="bg-white rounded-lg p-6 shadow hover:shadow-md transition">
          <GraduationCap className="mx-auto text-blue-600 mb-4" size={32} />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Materi Berkualitas</h3>
          <p className="text-gray-600 text-sm">Dibuat oleh mentor ahli dan berpengalaman di bidangnya.</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow hover:shadow-md transition">
          <Video className="mx-auto text-blue-600 mb-4" size={32} />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Video Interaktif</h3>
          <p className="text-gray-600 text-sm">Pembelajaran dengan video yang mudah dipahami dan menarik.</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow hover:shadow-md transition">
          <Lock className="mx-auto text-blue-600 mb-4" size={32} />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Akses Aman</h3>
          <p className="text-gray-600 text-sm">Login dengan sistem token & cookies untuk keamanan optimal.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-sm text-gray-600 text-center">
        &copy; {new Date().getFullYear()} Digital Academy. All rights reserved.
      </footer>
    </main>
  );
}
