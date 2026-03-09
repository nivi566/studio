import type { Metadata } from 'next';
import { Roboto_Slab } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/context/AuthContext';
import { LanguageProvider } from '@/context/LanguageContext';

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

const robotoSlab = Roboto_Slab({ 
  subsets: ['latin'], 
  variable: '--font-aptos-slab', 
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'] 
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${robotoSlab.variable} scroll-smooth`}>
       <body className="font-body antialiased selection:bg-primary/30 selection:text-primary-foreground font-light">
        <LanguageProvider>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
