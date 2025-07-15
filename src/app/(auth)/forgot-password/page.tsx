'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';
import FormField from '@/components/ui/FormField';
import Button from '@/components/ui/Button';
import { forgotPassword } from '@/services/auth';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState<{ email?: string }>();
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const errs: typeof errors = {};
        if (!email.trim()) {
            errs.email = 'Email wajib diisi';
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            errs.email = 'Email tidak valid';
        }
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        setMessage('');

        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const res = await forgotPassword(email);
            setMessage('Jika email terdaftar, link reset telah dikirim.');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setMessage('Terjadi kesalahan, coba lagi nanti.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contenWrap">
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800">Lupa Password?</h1>
                    <p className="text-sm text-gray-500">Masukkan email untuk reset password</p>
                </div>

                {message && (
                    <p className="text-sm text-green-600 text-center -mt-2">{message}</p>
                )}

                <FormField
                    label="Email"
                    name="email"
                    type="email"
                    icon={<Mail size={16} />}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors?.email}
                />

                <Button type="submit" fullWidth variant="primary" loading={loading}>
                    Kirim Link Reset
                </Button>
            </form>
        </div>
    );
}
