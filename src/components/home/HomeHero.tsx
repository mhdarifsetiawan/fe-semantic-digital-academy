// components/home/HomeHero.tsx
'use client';

export default function HomeHero() {
    return (
        <section className="bg-blue-600 text-white py-20 px-6 text-center">
            <h1 className="text-4xl font-bold mb-4">Tingkatkan Skill & Kariermu</h1>
            <p className="text-lg mb-8">Belajar online dipandu instruktur handal dan buat portofolio profesional.</p>
            <a href="/course-list" className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100">
                Mulai Sekarang
            </a>
        </section>
    );
}