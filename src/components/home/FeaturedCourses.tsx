// components/home/FeaturedCourses.tsx
'use client';

export default function FeaturedCourses({ courses }: { courses: any[] }) {
    return (
        <section className="py-16 px-6">
            <h2 className="text-2xl font-bold mb-6">Kursus Pilihan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((c) => (
                    <div key={c.id} className="bg-white rounded-lg shadow p-4">
                        <img src={c.image} alt={c.title} className="rounded-md mb-4" />
                        <h3 className="font-semibold text-lg">{c.title}</h3>
                        <p className="text-sm text-gray-500 my-2">{c.instructor}</p>
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-blue-600">Rp{c.price}</span>
                            <a href={`/course/${c.slug}`} className="text-blue-600 hover:underline text-sm">Detail</a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}