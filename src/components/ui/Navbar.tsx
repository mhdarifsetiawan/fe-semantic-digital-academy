'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, User } from 'lucide-react';
import API_ROUTES from '@/constants/apiRoutes';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const pathname = usePathname();
    const toggleMenu = () => setIsOpen(!isOpen);

    const navItems = [
        { label: 'Beranda', href: '/' },
        { label: 'Kursus', href: '/course-list' },
        { label: 'Blog', href: '/blog' },
    ];

    useEffect(() => {
        const authFlag = localStorage.getItem('isAuthenticated');
        setIsAuthenticated(authFlag === 'true');
    }, [pathname]); // Re-check setiap pindah halaman

    return (
        <nav className="bg-white shadow-md px-4 py-3">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <Link href="/" className="text-xl font-bold text-blue-600">
                    Digital Academy
                </Link>

                <div className="hidden md:flex items-center space-x-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`text-sm font-medium hover:text-blue-600 ${pathname === item.href ? 'text-blue-600' : 'text-gray-700'}`}
                        >
                            {item.label}
                        </Link>
                    ))}

                    {isAuthenticated ? (
                        <Link href={API_ROUTES.DASHBOARD}>
                            <div className="flex items-center space-x-2 hover:text-blue-600">
                                <User size={18} />
                                <span className="text-sm">Profil</span>
                            </div>
                        </Link>
                    ) : (
                        <Link
                            href={API_ROUTES.LOGIN}
                            className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded-md hover:bg-blue-700 transition"
                        >
                            Masuk
                        </Link>
                    )}
                </div>

                <button onClick={toggleMenu} className="md:hidden text-gray-700 focus:outline-none">
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden mt-2 space-y-2 px-2 pb-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="block text-sm text-gray-700 hover:text-blue-600"
                        >
                            {item.label}
                        </Link>
                    ))}

                    {isAuthenticated ? (
                        <Link
                            href={API_ROUTES.DASHBOARD}
                            onClick={() => setIsOpen(false)}
                            className="block text-sm text-gray-700 hover:text-blue-600"
                        >
                            Profil
                        </Link>
                    ) : (
                        <Link
                            href={API_ROUTES.LOGIN}
                            onClick={() => setIsOpen(false)}
                            className="block text-sm text-blue-600 font-medium"
                        >
                            Masuk
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
}
