/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FormField from '@/components/ui/FormField';
import Button from '@/components/ui/Button';
import { CircleArrowRight, Mail, Lock } from 'lucide-react';
import Link from 'next/link';
import { login } from '@/services/auth';
import API_ROUTES from '@/constants/apiRoutes';
import { useAuthStore } from '@/store/useAuthStore';

export default function LoginPage() {
    const { setAuthenticated } = useAuthStore();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{
        name?: string;
        email?: string;
        password?: string;
        general?: string;
    }>({});
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const newErrors: typeof errors = {};

        if (!email.trim()) {
            newErrors.email = 'Email wajib diisi';
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            newErrors.email = 'Email tidak valid';
        }

        if (!password) {
            newErrors.password = 'Password wajib diisi';
        } else if (password.length < 6) {
            newErrors.password = 'Minimal 6 karakter';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setLoading(true)

        if (!validate()) {
            return;
        }

        try {
            console.log('[Login] Attempting login...');
            await login({ email, password });
            console.log('[Login] Login success');

            setAuthenticated(true);
            console.log('[Login] isAuthenticated set to true');

            router.push(API_ROUTES.DASHBOARD);
            console.log('[Login] Pushed to dashboard');
        } catch (err) {
            const error = err as any;
            setErrors({ general: error.response?.data?.message || 'Email atau password salah' });
            setLoading(false)
        }
    };

    return (
        <div className='contenWrap'>
            <form
                onSubmit={handleLogin}
                className="w-full max-w-md space-y-6"
            >
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800">Selamat Datang 👋</h1>
                    <p className="text-sm text-gray-500">Login untuk mengakses dashboard</p>
                </div>

                {errors.general && (
                    <p className="text-sm text-red-600 text-center -mt-2">{errors.general}</p>
                )}

                <FormField
                    label="Email"
                    name="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                    icon={<Mail size={16} />}
                />

                <FormField
                    label="Password"
                    name="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password}
                    icon={<Lock size={16} />}
                />

                <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    loading={loading}
                    iconLeft={<CircleArrowRight size={16} />}
                >
                    Login
                </Button>

                <p className="text-sm text-center text-gray-600">
                    Belum punya akun?{' '}
                    <Link href="/register" className="text-blue-600 hover:underline font-medium">Daftar di sini</Link>
                </p>
                <p>
                        <Link href="/forgot-password" className="text-blue-600 hover:underline text-sm">Lupa password?</Link>
                    </p>
            </form>
        </div>
    );
}
