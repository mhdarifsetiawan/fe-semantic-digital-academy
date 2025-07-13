'use client';

import { useAuthStore } from '@/store/auth';
import { LogOut, UserCircle, Mail } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { getMe } from '@/services/user';

export default function DashboardPage() {
    const { user, logout } = useAuthStore();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push('/login');
    };

    // Contoh cara memanggil service langsung dari komponen jika diperlukan
    const handleFetchManual = async () => {
       try {
           const res = await getMe();
           console.log('Manual fetch result: ', res);
       } catch (error) {
           console.error("Gagal fetch manual:", error);
       }
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
                <h1 className="text-3xl font-bold text-blue-700 mb-6">Dashboard</h1>

                <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <UserCircle className="text-blue-600" size={32} />
                        <div>
                            <p className="text-lg font-medium text-gray-800">Halo, {user?.name}</p>
                            <p className="text-sm text-gray-500">Selamat datang kembali!</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Mail className="text-blue-600" size={24} />
                        <p className="text-sm text-gray-700">{user?.email}</p>
                    </div>
                </div>

                <div className="mt-8">
                    <Button
                        onClick={handleLogout}
                        variant="danger"
                        iconLeft={<LogOut size={16} />}
                        fullWidth
                    >
                        Logout
                    </Button>
                    {/* Tombol di bawah ini hanya untuk contoh, bisa dihapus */}
                    <Button
                        onClick={handleFetchManual}
                        variant="secondary"
                        className="mt-2"
                        fullWidth
                    >
                        Test Manual Fetch
                    </Button>
                </div>
            </div>
        </div>
    );
}
