/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, UserPlus } from 'lucide-react';
import api from '@/lib/api';
import FormField from '@/components/ui/FormField';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function RegisterPage() {
    const router = useRouter();

    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [serverError, setServerError] = useState('');
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const newErrors: typeof errors = {};

        if (!form.name.trim()) newErrors.name = 'Nama wajib diisi';
        if (!form.email.includes('@')) newErrors.email = 'Email tidak valid';
        if (form.password.length < 6) newErrors.password = 'Password minimal 6 karakter';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setServerError('');

        if (!validate()) return;

        setLoading(true);

        try {
            await api.post('/register', form);
            router.push('/login');
        } catch (err: any) {
            setServerError(err.response?.data?.message || 'Terjadi kesalahan');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='contenWrap'>
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md space-y-6"
            >
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800">Buat Akun</h1>
                    <p className="text-gray-500 text-sm">Mulai belajar hari ini 🚀</p>
                </div>

                <FormField
                    label="Nama Lengkap"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    error={errors.name}
                    placeholder="Contoh: Muhammad Arif"
                    icon={<UserPlus size={16} />}
                />

                <FormField
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder="arif@example.com"
                    icon={<Mail size={16} />}
                />

                <FormField
                    label="Password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    error={errors.password}
                    placeholder="******"
                    icon={<Lock size={16} />}
                />

                {serverError && (
                    <p className="text-sm text-red-600 text-center -mt-3">{serverError}</p>
                )}

                <Button
                    type="submit"
                    fullWidth
                    variant="primary"
                    loading={loading}
                >
                    Daftar Sekarang
                </Button>

                <p className="text-sm text-center text-gray-600">
                    Sudah punya akun?{' '}
                    <Link href="/login" className="text-blue-600 hover:underline font-medium">Login di sini</Link>
                </p>
            </form>
        </div>
    );
}
