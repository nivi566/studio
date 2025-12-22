
import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'InTrack | Envíos rápidos, seguros y al mejor precio',
  description: 'Soluciones de paquetería nacional e internacional para empresas y particulares.',
};

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter', 
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'] 
});

function AppBody({ children }: { children: React.ReactNode }) {
  return (
    <body className="font-body antialiased">
      <AuthProvider>
        {children}
        <Toaster />
      </AuthProvider>
    </body>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} scroll-smooth`}>
      <AppBody>{children}</AppBody>
    </html>
  );
}
