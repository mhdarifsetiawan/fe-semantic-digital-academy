import { getCurrentUser } from '@/lib/authh/getCurrentUser';
import ClientDashboard from './ClientDashboard';

export default async function DashboardPage() {
    const user = await getCurrentUser(); // dari cookie, jwt, dll

    return <ClientDashboard user={user} />;
}
