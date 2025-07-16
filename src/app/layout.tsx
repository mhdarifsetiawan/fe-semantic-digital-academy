// app/layout.tsx
import AuthProvider from '@/providers/AuthProvider';
import './globals.css';
import Navbar from '@/components/ui/Navbar';
// import { AuthProvider } from '@/providers/AuthProvider';

export const metadata = {
  title: 'Semantic Digital Academy',
  description: 'Belajar kapan saja, di mana saja',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <AuthProvider> {/* ✅ PENTING */}
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
