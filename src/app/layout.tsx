
import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from '@/context/AuthContext';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

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

async function AppBody({ children, locale }: { children: React.ReactNode, locale: string }) {
  const messages = await getMessages();
  return (
    <body className="font-body antialiased">
      <NextIntlClientProvider messages={messages}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </NextIntlClientProvider>
    </body>
  );
}

export default function RootLayout({
  children,
  params: {locale}
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {
  return (
    <html lang={locale} className={`${inter.variable} scroll-smooth`}>
      <AppBody locale={locale}>{children}</AppBody>
    </html>
  );
}
