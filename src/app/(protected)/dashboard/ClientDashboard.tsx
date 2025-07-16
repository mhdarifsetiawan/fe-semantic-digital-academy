'use client';

// import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { LogOut, Mail, UserCircle } from 'lucide-react';
import { logout } from '@/services/auth';
import { getMe } from '@/services/user';
// import API_ROUTES from '@/constants/apiRoutes';

type Props = {
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export default function ClientDashboard({ user }: Props) {
  // const router = useRouter();

  const handleLogout = async () => {
    await logout();
    // router.push(API_ROUTES.LOGIN);
  };

  const handleTesting = async () => {
    const doGetMe = await getMe();
    console.log('doGetMe: ', doGetMe)
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
            <Button onClick={handleLogout} iconLeft={<LogOut size={16} />} className="mt-4">
                Logout
            </Button>
            <Button onClick={handleTesting} iconLeft={<LogOut size={16} />} className="mt-4">
                Testing
            </Button>
      </div>
    </div>
  );
}
