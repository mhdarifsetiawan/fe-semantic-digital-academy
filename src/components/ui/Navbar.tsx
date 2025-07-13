'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth';
import Button from './Button';
import { useRouter, usePathname } from 'next/navigation';
import { LogOut, LogIn, UserPlus, UserCircle, LayoutDashboard, Menu, X } from 'lucide-react';
import Dropdown, { DropdownItem } from './Dropdown';
import Avatar from './Avatar';

export default function Navbar() {
    const { isAuthenticated, user, logout } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        router.push('/login');
        setIsMobileMenuOpen(false);
    };

    const handleLinkClick = (path: string) => {
        router.push(path);
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className="bg-white/95 shadow-md sticky top-0 z-50 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-16">
                    {/* Grup Kiri: Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
                            🎓 Semantic Academy
                        </Link>
                    </div>

                    {/* Grup Kanan (Desktop & Mobile) - didorong ke kanan */}
                    <div className="ml-auto flex items-center">
                        {/* Navigasi & Aksi Desktop */}
                        <div className="hidden md:flex items-center space-x-4">
                            <Link href="/" className="text-gray-600 hover:bg-blue-50 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Home
                            </Link>
                            <Link href="/blog" className="text-gray-600 hover:bg-blue-50 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Blog
                            </Link>

                            {/* Aksi Pengguna */}
                            {isAuthenticated && user ? (
                                <Dropdown trigger={<Avatar name={user.name} />}>
                                    <DropdownItem onClick={() => handleLinkClick('/dashboard')}>
                                        <div className="flex items-center space-x-2">
                                            <LayoutDashboard size={16} />
                                            <span>Dashboard</span>
                                        </div>
                                    </DropdownItem>
                                    <DropdownItem onClick={() => handleLinkClick('/profile')}>
                                        <div className="flex items-center space-x-2">
                                            <UserCircle size={16} />
                                            <span>Profil</span>
                                        </div>
                                    </DropdownItem>
                                    <DropdownItem onClick={handleLogout}>
                                        <div className="flex items-center space-x-2 text-red-600">
                                            <LogOut size={16} />
                                            <span>Logout</span>
                                        </div>
                                    </DropdownItem>
                                </Dropdown>
                            ) : (
                                <>
                                    {pathname !== '/login' && pathname !== '/register' && (
                                        <div className="space-x-2">
                                            <Link href="/login">
                                                <Button variant="secondary" iconLeft={<LogIn size={16} />}>
                                                    Login
                                                </Button>
                                            </Link>
                                            <Link href="/register">
                                                <Button variant="primary" iconLeft={<UserPlus size={16} />}>
                                                    Daftar
                                                </Button>
                                            </Link>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Tombol Hamburger Menu */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-100 focus:outline-none"
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Menu Mobile */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a onClick={() => handleLinkClick('/')} className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium cursor-pointer">Home</a>
                        <a onClick={() => handleLinkClick('/blog')} className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium cursor-pointer">Blog</a>
                        {isAuthenticated ? (
                            <>
                                <a onClick={() => handleLinkClick('/dashboard')} className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium cursor-pointer">Dashboard</a>
                                <a onClick={() => handleLinkClick('/profile')} className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium cursor-pointer">Profil</a>
                                <a onClick={handleLogout} className="text-red-600 hover:bg-red-50 block px-3 py-2 rounded-md text-base font-medium cursor-pointer">Logout</a>
                            </>
                        ) : (
                            <>
                                <a onClick={() => handleLinkClick('/login')} className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium cursor-pointer">Login</a>
                                <a onClick={() => handleLinkClick('/register')} className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium cursor-pointer">Daftar</a>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}