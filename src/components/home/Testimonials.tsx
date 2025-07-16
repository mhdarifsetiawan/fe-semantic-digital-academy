// components/home/Testimonials.tsx
'use client';

export default function Testimonials({ items }: { items: any[] }) {
    return (
        <section className="bg-gray-50 py-16 px-6">
            <h2 className="text-2xl font-bold mb-8 text-center">Apa Kata Mereka</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {items.map((t) => (
                    <div key={t.id} className="bg-white p-6 rounded-lg shadow">
                        <p className="italic mb-4">“{t.quote}”</p>
                        <p className="font-semibold">{t.name}</p>
                        <p className="text-sm text-gray-500">{t.role}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
