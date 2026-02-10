import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'InTrack | Logística Inteligente y Envíos 24h',
  description: 'La red de lockers inteligentes líder en España. Envíos nacionales e internacionales, gestión de devoluciones y soluciones e-commerce con trazabilidad total.',
  keywords: ['logística', 'lockers', 'paquetería', 'envíos urgentes', 'logística inversa', 'ecommerce', 'InTrack'],
  authors: [{ name: 'InTrack Logistics' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://intrack-logistics.es',
    title: 'InTrack | Tu paquete, a tu ritmo',
    description: 'Recogida y envío de paquetes en lockers 24/7. La solución más sostenible y eficiente.',
    siteName: 'InTrack Logistics',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InTrack Logistics',
    description: 'Envíos rápidos, seguros y al mejor precio.',
  },
};

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter', 
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'] 
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} scroll-smooth`}>
       <body className="font-body antialiased selection:bg-primary/30 selection:text-primary-foreground">
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
