// app/page.tsx
import HomeHero from '@/components/home/HomeHero';
import FeaturedCourses from '@/components/home/FeaturedCourses';
import Testimonials from '@/components/home/Testimonials';

export default function HomePage() {
  const courses = [
    {
      id: 1,
      image: 'https://source.unsplash.com/400x200/?coding',
      title: 'Belajar JavaScript Dasar',
      instructor: 'Andi Wijaya',
      price: '149.000',
      slug: 'javascript-dasar',
    },
    {
      id: 2,
      image: 'https://source.unsplash.com/400x200/?design',
      title: 'Desain UI/UX untuk Pemula',
      instructor: 'Rina Saputri',
      price: '199.000',
      slug: 'desain-uiux',
    },
    {
      id: 3,
      image: 'https://source.unsplash.com/400x200/?startup',
      title: 'Membangun Produk Digital',
      instructor: 'Agus Prasetyo',
      price: '249.000',
      slug: 'produk-digital',
    },
  ];

  const testimonials = [
    {
      id: 1,
      quote: 'Materi sangat mudah dipahami dan langsung bisa diterapkan di pekerjaan saya.',
      name: 'Budi Santoso',
      role: 'Web Developer',
    },
    {
      id: 2,
      quote: 'Instruktur ramah dan menjawab semua pertanyaan saya dengan jelas.',
      name: 'Dewi Anggraini',
      role: 'Graphic Designer',
    },
  ];

  return (
    <>
      <HomeHero />
      <FeaturedCourses courses={courses} />
      <Testimonials items={testimonials} />
    </>
  );
}