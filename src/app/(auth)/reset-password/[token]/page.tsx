'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ShieldCheck } from 'lucide-react';
import FormField from '@/components/ui/FormField';
import Button from '@/components/ui/Button';
import { resetPassword } from '@/services/auth';

export default function ResetPasswordPage({ params }: { params: { token: string } }) {
    const router = useRouter();
    const { token } = params;

    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [errors, setErrors] = useState<{ password?: string; confirm?: string }>();
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const errs: typeof errors = {};
        if (password.length < 6) {
            errs.password = 'Minimal 6 karakter';
        }
        if (password !== confirm) {
            errs.confirm = 'Konfirmasi tidak sama';
        }
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);

        try {
            await resetPassword(token, password);
            setSuccess('Password berhasil direset. Redirect ke login...');
            setTimeout(() => router.push('/login'), 3000);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setErrors({ password: 'Token tidak valid atau sudah kedaluwarsa' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contenWrap">
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800">Reset Password</h1>
                    <p className="text-sm text-gray-500">Masukkan password baru kamu</p>
                </div>

                {success && <p className="text-sm text-green-600 text-center">{success}</p>}

                <FormField
                    label="Password Baru"
                    name="new-password"
                    type="password"
                    icon={<Lock size={16} />}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors?.password}
                />

                <FormField
                    label="Konfirmasi Password"
                    name="confirm-password"
                    type="password"
                    icon={<ShieldCheck size={16} />}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    error={errors?.confirm}
                />

                <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    loading={loading}
                >
                    Reset Password
                </Button>
            </form>
        </div>
    );
}
